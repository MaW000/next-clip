const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const interval = 5;
      console.log(id)
      const messageArrays = await prisma.Video.findUnique({
        where: {
          videoId: +id,
        },
        select: {
          comments: true,
        },
      });
     
      console.log(messageArrays)
      const { comments } = messageArrays
      let currTime = 0
      let counter = 0
      for(let i = 0; i < comments.length; i++) {
        for(let j = 0; j < comments[i].messages.length; j++) {
          
          console.log(currTime, counter, comments[i].messages[j].contentOffsetSeconds)
          if(counter === 0){
            currTime = comments[i].messages[j].contentOffsetSeconds
          }
          counter += 1
          if(counter === 15) counter = 0;
        }
      }
      console.log(messageArrays);
      return res.status(200).send({ data: video });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default handler;
