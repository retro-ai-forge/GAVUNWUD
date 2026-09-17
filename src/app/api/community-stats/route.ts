import { NextResponse } from "next/server";

// Type for community stats response
type CommunityStats = {
  discord: {
    memberCount: number;
    error?: string;
  };
  telegram: {
    memberCount: number;
    error?: string;
  };
};

export async function GET(request: Request) {
  const stats: CommunityStats = {
    discord: {
      memberCount: 0,
    },
    telegram: {
      memberCount: 0,
    }
  };

  // Get environment variables
  const discordApplicationId = process.env.DISCORD_APPLICATION_ID;
  const discordApiToken = process.env.DISCORD_API_TOKEN;
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  
  // Discord guild ID - you'll need to add this to your environment variables
  const discordGuildId = process.env.DISCORD_GUILD_ID;
  
  // Telegram chat ID - you'll need to add this to your environment variables
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  // Check if required environment variables are set
  if (!discordApplicationId || !discordApiToken || !discordGuildId) {
    stats.discord.error = "Discord credentials not properly configured";
  }

  if (!telegramBotToken || !telegramChatId) {
    stats.telegram.error = "Telegram credentials not properly configured";
  }

  try {
    // Fetch Discord member count if credentials are available
    if (!stats.discord.error) {
      const discordResponse = await fetch(
        `https://discord.com/api/v10/guilds/${discordGuildId}?with_counts=true`,
        {
          headers: {
            Authorization: `Bot ${discordApiToken}`,
          },
        }
      );

      if (!discordResponse.ok) {
        stats.discord.error = `Discord API error: ${discordResponse.status}`;
        console.error("Discord API error:", await discordResponse.text());
      } else {
        const discordData = await discordResponse.json();
        stats.discord.memberCount = discordData.approximate_member_count || 0;
      }
    }

    // Fetch Telegram member count if credentials are available
    if (!stats.telegram.error) {
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${telegramBotToken}/getChatMemberCount?chat_id=${telegramChatId}`
      );

      if (!telegramResponse.ok) {
        stats.telegram.error = `Telegram API error: ${telegramResponse.status}`;
        console.error("Telegram API error:", await telegramResponse.text());
      } else {
        const telegramData = await telegramResponse.json();
        if (telegramData.ok) {
          stats.telegram.memberCount = telegramData.result || 0;
        } else {
          stats.telegram.error = telegramData.description || "Unknown Telegram API error";
        }
      }
    }

    return NextResponse.json(stats);
  } catch (error: unknown) {
    console.error("Error fetching community stats:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Failed to fetch community stats",
        stats 
      },
      { status: 500 }
    );
  }
} 