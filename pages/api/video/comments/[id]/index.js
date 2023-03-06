import prisma from "@/lib/prisma/index";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { id } = req.query;
      const { keyword, interval } = req.body;

      const cardArr = await prisma.Card.findFirst({
        where: {
          videoId: +id,
          keyword: keyword,
          length: +interval,
        },
        select: {
          keyword: true,
        },
      });

      if (cardArr) {
        return res.status(200).send({ error: "Card already exists" });
      }
      //fetch comments using videoId
      const messageArrays = await prisma.Comments.findFirst({
        where: {
          videoId: +id,
          hasNextPage: false,
        },
        select: {
          index: true,
        },
      });

      //build a object that has the intervals of the video as keys and comments typed within that interval as values
      let results = [];
      let count = 0;

      if (messageArrays.index === 0) {
        const messageArrays = await prisma.Comments.findFirst({
          where: {
            videoId: +id,
            hasNextPage: false,
          },
        });

        const comments = messageArrays.messages;

        for (let i = 0; i < comments.length - 1; i++) {
          for (let j = 0; j < comments[i].msgs.length; j++) {
            function timeCalc(sec) {
              const minutes = Math.floor(sec / 60);
              let extraSec = sec % 60;
              let extraMinutes = minutes % 60;
              const hours = Math.floor(minutes / 60);
              if (extraSec < 10) {
                extraSec = "0" + extraSec;
              }
              if (extraMinutes < 10) {
                extraMinutes = "0" + extraMinutes;
              }

              return `${hours}h:${extraMinutes}m:${extraSec}s`;
            }
            const text = comments[i].msgs[j].msg.toLowerCase();
            const x = Math.floor(
              comments[i].msgs[j].contentOffsetSeconds / interval
            );
            const begin = x * interval;
            const end = (x + 1) * interval;
            const currTimea = timeCalc(begin) + " : " + timeCalc(end);

            if (text.includes(keyword)) {
              count++;
              if (results.length === 0) {
                results.push({
                  timeStamp: currTimea,
                  msgs: [],
                });
              }
              if (results[results.length - 1].timeStamp != currTimea) {
                results[results.length - 1].count =
                  results[results.length - 1].msgs.length;
                results.push({ timeStamp: currTimea, msgs: [] });
              }
              results[results.length - 1].msgs.push(comments[i].msgs[j]);
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
                let extraSec = sec % 60;
                let extraMinutes = minutes % 60;
                const hours = Math.floor(minutes / 60);
                if (extraSec < 10) {
                  extraSec = "0" + extraSec;
                }
                if (extraMinutes < 10) {
                  extraMinutes = "0" + extraMinutes;
                }
                return `${hours}h:${extraMinutes}m:${extraSec}s`;
              }
              const text = comments[i].msgs[j].msg.toLowerCase();
              const x = Math.floor(
                comments[i].msgs[j].contentOffsetSeconds / interval
              );
              const begin = x * interval;
              const end = (x + 1) * interval;
              const currTimea = timeCalc(begin) + " : " + timeCalc(end);

              if (text.includes(keyword)) {
                count++;
                if (results.length === 0) {
                  results.push({
                    timeStamp: currTimea,
                    msgs: [],
                  });
                }
                if (results[results.length - 1].timeStamp != currTimea) {
                  results[results.length - 1].count =
                    results[results.length - 1].msgs.length;
                  results.push({ timeStamp: currTimea, msgs: [] });
                }
                results[results.length - 1].msgs.push(comments[i].msgs[j]);
              }
            }
          }
        }
      }

      results[results.length - 1].count =
        results[results.length - 1].msgs.length;
      const avg = Math.floor(count / results.length);
      let highestCount = results[0].count;
      const filteredArr = results.filter((el) => {
        if (el.count > highestCount) {
          highestCount = el.count;
        }
        return el.count > avg;
      });

      const data = {
        videoId: +id,
        keyword: keyword,
        average: avg,
        length: +interval,
        max: highestCount,
        Result: filteredArr,
      };

      try {
        const card = await prisma.Card.create({ data: data });

        return res.status(200).send({ data: card });
      } catch (e) {
        if (e) {
          // The .code property can be accessed in a type-safe manner
        }
        throw e;
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default handler;
