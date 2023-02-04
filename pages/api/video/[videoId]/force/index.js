import prisma from "@/lib/prisma/index";

const handler = async (req, res) => {
  try {
    const { videoId } = req.query;
    let counter = 0;
    let comments = [];
    const id = await prisma.Video.findMany({
      where: {
        videoId: +videoId,
      },
    });
    const commentsLength = id[0].comments.length - 1;
    const messageLength =
      id[0].comments[commentsLength - 1].messages.length - 1;
    const start =
      id[0].comments[commentsLength - 1].messages[messageLength].cursor;
    getComments(start);
    async function getComments(start, cursor) {
      if (start) {
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
                cursor: start,
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
                cursor: comment.cursor,
                contentOffsetSeconds: comment.node.contentOffsetSeconds,
                msg: msg,
              };
            });
            const entry = {
              contentOffsetSeconds: second,
              messages: mapped,
            };
            comments.push(entry);
            if (hasNextPage) {
              counter++;
              console.log(second);
              if (counter > 150) {
                const addTag = await prisma.Video.update({
                  where: {
                    videoId: +videoId,
                  },
                  data: {
                    comments: {
                      push: comments,
                    },
                  },
                });
                counter = 0;
                comments = [];
              }

              getComments(cursor);
            } else {
              const addTag = await prisma.Video.update({
                where: {
                  videoId: +videoId,
                },
                data: {
                  comments: {
                    push: comments,
                  },
                  complete: true,
                },
              });
              counter = 0;
              comments = [];
              return { status: "saving complete" };
            }
          });
      } else {
        console.log("1");
      }
    }
    return res.status(200).send({ status: "done" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
