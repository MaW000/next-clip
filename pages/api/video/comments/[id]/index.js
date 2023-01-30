const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      
        const { id } = req.query;
        const { keyword, num } = req.body
        const interval = 5;
        console.log(keyword, num)
        //fetch comments using videoId
        const messageArrays = await prisma.Video.findUnique({
          where: {
            videoId: +id,
          },
          select: {
            comments: true,
          },
        });
      
        const { comments } = messageArrays;
        //build a object that has the intervals of the video as keys and comments typed within that interval as values
        let results = {};
        for (let i = 0; i < comments.length; i++) {
          for (let j = 0; j < comments[i].messages.length; j++) {
            function timeCalc(sec) {
              const minutes = Math.floor(sec / 60);
              const extraSec = sec % 60;
              const extraMinutes = minutes % 60;
              const hours = Math.floor(minutes / 60);
              return `${hours}h:${extraMinutes}m:${extraSec}s`;
            }
            const text = comments[i].messages[j].msg.toLowerCase();
            const x = Math.floor(comments[i].messages[j].contentOffsetSeconds / 5);
            const begin = x * interval
            const end = (x + 1) * interval
            const currTimea = timeCalc(begin) + " : " + timeCalc(end);
            if (!results[currTimea]) {
              results[currTimea] = [];
            }
  
            if (text.includes(keyword)) {
              results[currTimea].push(comments[i].messages[j]);
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
          console.log(filtered)
         
      
      return res.status(200).send({ data: filtered });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default handler;
