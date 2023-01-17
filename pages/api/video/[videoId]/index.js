import { getComments } from "@/lib/prisma/comments";

const handler = async (req, res) => {
  try {
    const { videoId } = req.query;
    let Vid = {}
    fetch("https://gql.twitch.tv/gql", {
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
        const video = {
          videoId: +videoId,
          comments: mapped,
        };
        const comment = await prisma.Video.create({ data: video })
      });
      return res.status(200).send({status: 'complete'})
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
