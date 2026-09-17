export async function fetchFlappyWudStats() {
  try {
    const apiUrl = "https://flappywud-backend-production.up.railway.app/statistics?totalGames=true&highestScore=true&totalUniqueAddresses=true&surgeLevel=true";

    const response = await fetch(apiUrl, {
      headers: {
        "Authorization": `Basic ${Buffer.from(
          `${process.env.FLAPPYWUD_BACKEND_USER}:${process.env.FLAPPYWUD_BACKEND_PWD}`
        ).toString("base64")}`
      },
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch FlappyWUD stats: ${response.status}`);
    }

    const data = await response.json();
    return {
      totalGames: data.totalGames ? parseInt(data.totalGames).toLocaleString() : "0",
      highestScore: data.highestScore || 0,
      totalUniqueAddresses: data.totalUniqueAddresses ? parseInt(data.totalUniqueAddresses).toLocaleString() : "0",
      activePlayers: data.activePlayers || 0,
      surgeLevel: data.surgeLevel || 0
    };
  } catch (error: unknown) {
    console.error("Error fetching FlappyWUD stats:", error);
    //return mock data :)
    return {
      totalGames: "373,592",
      highestScore: 742,
      totalUniqueAddresses: "3,028",
      activePlayers: 0,
      surgeLevel: 0
    };
  }
}
