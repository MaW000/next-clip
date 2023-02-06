import prisma from "@/lib/prisma/index";

const handler = async (req, res) => {
  try {
    //fetch comments using videoId
    const messageArrays = await prisma.Video.findMany({
      select: {
        title: true,
        streamer: true,
        views: true,
        thumbnail: true,
        language: true,
        videoId: true,
      },
    });

    return res.status(200).send({ data: messageArrays });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default handler;
