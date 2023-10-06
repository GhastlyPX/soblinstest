import prisma from "../../prisma/prisma";

export default async function GetRecentPlays() {
  const recentPlays = await prisma.games.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return recentPlays;
}
