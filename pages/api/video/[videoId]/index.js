import prisma from "@/lib/prisma/index";

const handler = async (req, res) => {
  try {
    const { videoId } = req.query;
    let counter = 0;
    let commentsArr = [];
    let commentIndex = 0;
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
            const comments = {
              videoId: +videoId,
              hasNextPage: hasNextPage,
              index: commentIndex,
              messages: entry,
            };
            const commentsDoc = await prisma.Comments.create({
              data: comments,
            });
            if (hasNextPage) {
              return getComments(cursor, commentsDoc.id);
            } else {
          
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

              if (counter > 150) {
                console.log(second);
                const updateComments = await prisma.Comments.update({
                  where: {
                    id: commentId,
                  },
                  data: {
                    lastCommentSecond: second,
                    hasNextPage: hasNextPage,
                    messages: {
                      push: commentsArr,
                    },
                  },
                });
                counter = 0;
                commentsArr = [];
                if (updateComments.messages.length > 290) {
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
                  hasNextPage: false,
                  messages: {
                    push: commentsArr,
                  },
                },
              });
              const id = await prisma.Video.update({
                where: {
                  videoId: +videoId,
                },
                data: {
                  complete: true,
                },
              });

              counter = 0;
              commentsArr = [];
              console.log("Save Complete");
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
            const hasNextPage =
              data[0].data.video.comments.pageInfo.hasNextPage;
            const lastComment =
              data[0].data.video.comments.edges[
                data[0].data.video.comments.edges.length - 1
              ];
            const second = lastComment.node.contentOffsetSeconds;
            const lastCommentCursor = lastComment.cursor;
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
            const messages = {
              contentOffsetSeconds: second,
              msgs: mapped,
            };
            const comments = {
              videoId: +videoId,
              hasNextPage: hasNextPage,
              index: commentIndex,
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
              getVideoData(+videoId);
              getComments(lastCommentCursor, commentsDoc.id);
              return { status: "saving" };
            } else if (id[0].complete) {
              getVideoData(+videoId);
        
              return { status: "saved" };
            } else {
              return { status: "fetching" };
            }
          });
      }
    }
    async function getVideoData(id) {
      return fetch(`https://api.twitch.tv/helix/videos?id=${id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer kkme0h063j58yzhtenquyc3k8hd58a",
          "Client-Id": "03ui98fof7c081piwhb3oj6ecelzpn",
        },
      })
        .then((data) => data.json())
        .then(async (result) => {
          let { data } = result;
          data = data[0];

          //Title handling
          let titleString = data.title.replace(/[^a-z]/gi, " ").trim();
          titleString = titleString.replace(/\s\s+/g, " ");

          //duration handling
          const [hours, minutes, seconds] = data.duration
            .split(/[hms]/)
            .map(Number);
          const totalSeconds = hours * 3600 + minutes * 60 + seconds;

          //thumbnail_url handling
          let thumbnailUrl = "";
          if (data.thumbnail_url.includes("vod-secure")) {
            thumbnailUrl = data.thumbnail_url
              .replace(/%{width}/, "320")
              .replace(/%{height}/, "180");
          } else {
            thumbnailUrl = data.thumbnail_url
              .replace(/%{width}/, "480")
              .replace(/%{height}/, "270");
          }
          //created_at  handling
          let date = data.created_at.split("T");

          const res = {
            title: titleString,
            lengthSec: totalSeconds,
            thumbnail: thumbnailUrl,
            streamer: data.user_name,
            views: data.view_count,
            language: data.language,
            date: date[0],
          };

          const id = await prisma.Video.update({
            where: {
              videoId: +videoId,
            },
            data: res,
          });
        });
    }

    const { status } = await getComments();
    return res.status(200).send({ status: status });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
