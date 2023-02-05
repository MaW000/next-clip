import prisma from "@/lib/prisma/index";

const handler = async (req, res) => {
  try {
    const { videoId } = req.query;
    let counter = 0;
    let commentsArr = [];
    let commentIndex = 0;
    let prevIndex = 0;
    let createNew = false;
    async function getComments(cursor, commentId) {
      if (cursor && createNew) {
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
            createNew = false;
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
              msgs: mapped,
            };

            const messages = {
              contentOffsetSeconds: second,
              msgs: mapped,
            };
            const comments = {
              videoId: +videoId,
              index: commentIndex,
              messages: messages,
            };
            const commentsDoc = await prisma.Comments.create({
              data: comments,
            });
            return getComments(cursor, commentsDoc.id);
            if (hasNextPage && counter === 0) {
              counter++;
              console.log(commentsDoc);
              return getComments(cursor, commentsDoc.id);
            } else if (hasNextPage) {
              commentsArr.push(entry);
              if (counter > 2) {
                const addComments = await prisma.Comments.update({
                  where: {
                    id: commentId,
                  },
                  data: {
                    lastCommentSecond: second,
                    messages: {
                      push: comments,
                    },
                  },
                });
                console.log(addComments.messages.length);
                counter = 0;
                commentsArr = [];
                if (addComments.messages.length > 4) {
                  commentIndex++;
                  return getComments(cursor, commentId);
                } else {
                  return getComments(cursor, commentId);
                }
              }
            }
          });
      } else if (cursor) {
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
              msgs: mapped,
            };
            commentsArr.push(entry);

            if (hasNextPage) {
              counter++;
              console.log(second);
              if (counter > 60) {
                const addComments = await prisma.Comments.update({
                  where: {
                    id: commentId,
                  },
                  data: {
                    lastCommentSecond: second,
                    messages: {
                      push: commentsArr,
                    },
                  },
                });
                console.log(addComments.messages.length);
                counter = 0;
                commentsArr = [];
                if (addComments.messages.length > 150) {
                  commentIndex++;
                  createNew = true;
                  return getComments(cursor, commentId);
                } else {
                  return getComments(cursor, commentId);
                }
              }
              return getComments(cursor, commentId);
            } else {
              const addComments = await prisma.Comments.update({
                where: {
                  id: commentId,
                },
                data: {
                  lastCommentSecond: second,
                  messages: {
                    push: commentsArr,
                  },
                },
              });
              counter = 0;
              commentsArr = [];
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
              let cur = "";
              let msg = "";
              for (let i = 0; i < comment.node.message.fragments.length; i++) {
                msg += comment.node.message.fragments[i].text;
              }
              if (comment.cursor) {
                cur = comment.cursor;
              }
              return {
                cursor: comment.cursor,
                contentOffsetSeconds: comment.node.contentOffsetSeconds,
                msg: msg,
              };
            });
            const messages = {
              contentOffsetSeconds: second,
              msgs: mapped,
            };
            const comments = {
              videoId: +videoId,

              messages: messages,
            };
            const video = {
              videoId: +videoId,

              complete: false,
            };
            const id = await prisma.Video.findMany({
              where: {
                videoId: +videoId,
              },
            });
            if (id.length < 1) {
              const videoDoc = await prisma.Video.create({ data: video });
              const commentsDoc = await prisma.Comments.create({
                data: comments,
              });
              // console.log(commentsDoc.id);
              getComments(
                data[0].data.video.comments.edges[
                  data[0].data.video.comments.edges.length - 1
                ].cursor,
                commentsDoc.id
              );
              return { status: "saving" };
            } else if (id[0].complete) {
              return { status: "saved" };
            } else {
              return { status: "fetching" };
            }
          });
      }
    }
    async function getVideoData() {
      return fetch("https://api.twitch.tv/helix/videos?id=1698572786", {
        method: "GET",
        headers: {
          Authorization: "Bearer kkme0h063j58yzhtenquyc3k8hd58a",
          "Client-Id": "03ui98fof7c081piwhb3oj6ecelzpn",
        },
      })
        .then((data) => data.json())
        .then((data) => console.log(data));
    }
    // getVideoData();
    const { status } = await getComments();
    return res.status(200).send({ status: status });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
