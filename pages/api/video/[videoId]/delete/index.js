import prisma from "@/lib/prisma/index";

const handler = async (req, res) => {
  try {
    const { videoId } = req.query;

    const messageArrays = await prisma.Comments.deleteMany({
      where: {
        videoId: +videoId,
      },
    });
    const video = await prisma.Video.deleteMany({
      where: {
        videoId: +videoId,
      },
    });
    return res.status(200).send({ data: "deleted comments" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
