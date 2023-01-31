import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const handler = async (req, res) => {
  try {
    const { videoId } = req.query;
    let counter = 0
    let comments = []
    async function getComments(cursor, commentId) {
      if (cursor) {
        return fetch("https://gql.twitch.tv/gql", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
            "Client-ID": "kimne78kx3ncx6brgo4mv6wki5h1ko",
          },
          body: JSON.stringify([
            {
              operationName: "VideoCommentsByOffsetOrCursor",
              variables: {
                videoID: `${videoId}`,
                cursor: cursor,
              },
              extensions: {
                persistedQuery: {
                  version: 1,
                  sha256Hash:
                    "b70a3591ff0f4e0313d126c6a1502d79a1c02baebb288227c582044aa76adf6a",
                },
              },
            },
          ]),
        })
          .then((data) => data.json())
          .then(async (data) => {
            const hasNextPage =
              data[0].data.video.comments.pageInfo.hasNextPage;
            const second =
              data[0].data.video.comments.edges[
                data[0].data.video.comments.edges.length - 1
              ].node.contentOffsetSeconds;
            console.log(second);
            const cursor =
              data[0].data.video.comments.edges[
                data[0].data.video.comments.edges.length - 1
              ].cursor;
            const mapped = data[0].data.video.comments.edges.map((comment) => {
              let msg = "";
              for (let i = 0; i < comment.node.message.fragments.length; i++) {
                msg += comment.node.message.fragments[i].text;
              }
              return {
                contentOffsetSeconds: comment.node.contentOffsetSeconds,
                msg: msg,
              };
            });
            const entry = {
              contentOffsetSeconds: second,
              messages: mapped,
            };
            comments.push(entry)
         

            if (hasNextPage) {
              counter++
              if(counter > 500) {
                const addTag = await prisma.Video.update({
                  where: {
                    id: commentId,
                  },
                  data: {
                    comments: {
                      push: comments,
                    },
                  },
                });
                counter = 0
                comments = []
              }
             
              getComments(cursor, commentId);
            } else {
              const addTag = await prisma.Video.update({
                where: {
                  id: commentId,
                },
                data: {
                  comments: {
                    push: comments,
                  },
                },
              });
              return { status: "saving complete" };
            }
          });
      } else {
        return fetch("https://gql.twitch.tv/gql", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
            "Client-ID": "kimne78kx3ncx6brgo4mv6wki5h1ko",
          },
          body: JSON.stringify([
            {
              operationName: "VideoCommentsByOffsetOrCursor",
              variables: {
                videoID: `${videoId}`,
                contentOffsetSeconds: 0.0,
              },
              extensions: {
                persistedQuery: {
                  version: 1,
                  sha256Hash:
                    "b70a3591ff0f4e0313d126c6a1502d79a1c02baebb288227c582044aa76adf6a",
                },
              },
            },
          ]),
        })
          .then((data) => data.json())
          .then(async (data) => {
            const second =
              data[0].data.video.comments.edges[
                data[0].data.video.comments.edges.length - 1
              ].node.contentOffsetSeconds;
            const mapped = data[0].data.video.comments.edges.map((comment) => {
              let msg = "";
              for (let i = 0; i < comment.node.message.fragments.length; i++) {
                msg += comment.node.message.fragments[i].text;
              }
              return {
                contentOffsetSeconds: comment.node.contentOffsetSeconds,
                msg: msg,
              };
            });

            const entry = {
              contentOffsetSeconds: second,
              messages: mapped,
            };
            const video = {
              videoId: +videoId,
              comments: entry,
              
            };
            const id = await prisma.Video.findMany({
              where: {
                videoId: +videoId,
              },
            });

            if (id.length < 1) {
              const comment = await prisma.Video.create({ data: video });
              return getComments(
                data[0].data.video.comments.edges[
                  data[0].data.video.comments.edges.length - 1
                ].cursor,
                comment.id
              );
            } else {
              return { status: "saved" };
            }
          });
      }
    }

    getComments()
    
    return res.status(200).send({ status: "saved" });
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
