import prisma from'.'

export async function getComments(keyword, occurances, id) {
    try {
      const messageArrays = await prisma.Video.findUnique({
        where: {
          id: id
        },
        select: {
          comments: true,
        }
      })
      return { messageArrays }
    } catch(error){
        return{ error }
    }
}