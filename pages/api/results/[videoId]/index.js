import prisma from "@/lib/prisma/index";

const handler = async (req, res) => {
  try {
    const { videoId } = req.query;
 
    const messageArrays = await prisma.Card.findMany({
      where: {
        videoId: +videoId,
      },
    });
   
    return res.status(200).send({ data: messageArrays });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
