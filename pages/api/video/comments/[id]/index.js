import prisma from "@/lib/prisma/index";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { id } = req.query;
      const { keyword, num, interval } = req.body;

      //fetch comments using videoId
      const messageArrays = await prisma.Comments.findFirst({
        where: {
          videoId: +id,
          hasNextPage: false,
        },
      });

      const comments = messageArrays.messages;
      // console.log(comments.length);
      //build a object that has the intervals of the video as keys and comments typed within that interval as values
      let results = {};
      if (messageArrays.id === 0) {
        for (let i = 0; i < comments.length - 1; i++) {
          for (let j = 0; j < comments[i].msgs.length; j++) {
            function timeCalc(sec) {
              const minutes = Math.floor(sec / 60);
              const extraSec = sec % 60;
              const extraMinutes = minutes % 60;
              const hours = Math.floor(minutes / 60);
              return `${hours}h:${extraMinutes}m:${extraSec}s`;
            }
            const text = comments[i].msgs[j].msg.toLowerCase();
            const x = Math.floor(
              comments[i].msgs[j].contentOffsetSeconds / interval
            );
            const begin = x * interval;
            const end = (x + 1) * interval;
            const currTimea = timeCalc(begin) + " : " + timeCalc(end);
            if (!results[currTimea]) {
              results[currTimea] = [];
            }

            if (text.includes(keyword)) {
              results[currTimea].push(comments[i].msgs[j]);
            }
          }
        }
      } else {
        for (let i = 0; i <= messageArrays.index; i++) {
          const messageArrays = await prisma.Comments.findFirst({
            where: {
              videoId: +id,
              index: i,
            },
          });
          const comments = messageArrays.messages;

          for (let i = 0; i < comments.length - 1; i++) {
            for (let j = 0; j < comments[i].msgs.length; j++) {
              function timeCalc(sec) {
                const minutes = Math.floor(sec / 60);
                const extraSec = sec % 60;
                const extraMinutes = minutes % 60;
                const hours = Math.floor(minutes / 60);
                return `${hours}h:${extraMinutes}m:${extraSec}s`;
              }
              const text = comments[i].msgs[j].msg.toLowerCase();
              const x = Math.floor(
                comments[i].msgs[j].contentOffsetSeconds / interval
              );
              const begin = x * interval;
              const end = (x + 1) * interval;
              const currTimea = timeCalc(begin) + " : " + timeCalc(end);
              if (!results[currTimea]) {
                results[currTimea] = [];
              }

              if (text.includes(keyword)) {
                results[currTimea].push(comments[i].msgs[j]);
              }
            }
          }
        }
      }

      const filtered = Object.keys(results)
        .filter((key) => results[key].length >= num)
        .reduce((obj, key) => {
          return Object.assign(obj, {
            [key]: results[key],
          });
        }, {});
      return res.status(200).send({ data: filtered });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default handler;
