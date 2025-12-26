import { Client, GatewayIntentBits, ActivityType, PermissionsBitField } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// 🔥 Release date (UTC)
const RELEASE_DATE = new Date(Date.UTC(2026, 0, 22, 0, 0, 0));

let lastCountdown = "";
let lastDays = null;

// -----------------------------
// Countdown helper
// -----------------------------
function getCountdownData() {
  const now = new Date();
  const distance = Math.floor((RELEASE_DATE - now) / 1000);

  if (distance <= 0) {
    return { days: 0, text: "0d 0h 0m" };
  }

  const days = Math.floor(distance / (60 * 60 * 24));
  const hours = Math.floor((distance / (60 * 60)) % 24);
  const minutes = Math.floor((distance / 60) % 60);

  return {
    days,
    text: `${days}d ${hours}h ${minutes}m`
  };
}

// -----------------------------
// Channel selection (FIXED)
// -----------------------------
function canSend(channel) {
  return (
    channel.isTextBased() &&
    channel.permissionsFor(channel.guild.client.user.id)
      ?.has(PermissionsBitField.Flags.SendMessages)
  );
}

function findAnnouncementChannel(guild) {
  // 1️⃣ Prefer #general
  const general = guild.channels.cache.find(
    ch => ch.name === "general" && canSend(ch)
  );
  if (general) return general;

  // 2️⃣ Fallback
  return guild.channels.cache.find(canSend);
}

// -----------------------------
// Ready event
// -----------------------------
client.once("clientReady", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const announcementChannels = new Map();

  for (const guild of client.guilds.cache.values()) {
    const channel = findAnnouncementChannel(guild);

    if (!channel) {
      console.warn(`No writable channel in ${guild.name}`);
      continue;
    }

    announcementChannels.set(guild.id, channel);

    // 🧪 Test message
    await channel.send("Hello World");
    console.log(`Using #${channel.name} in ${guild.name}`);
  }

  const updateCountdown = async () => {
    const { days, text } = getCountdownData();

    if (text !== lastCountdown) {
      client.user.setActivity(text, { type: ActivityType.Watching });
      lastCountdown = text;
    }

    if (lastDays !== null && days !== lastDays) {
      for (const channel of announcementChannels.values()) {
        try {
          await channel.send(
            `Only ${days} days remaining until release.`
          );
        } catch (err) {
          console.error("Send failed:", err.message);
        }
      }
    }

    lastDays = days;
  };

  await updateCountdown();
  setInterval(updateCountdown, 60 * 1000);
});

// -----------------------------
// New guild join
// -----------------------------
client.on("guildCreate", guild => {
  const channel = findAnnouncementChannel(guild);
  if (channel) {
    channel.send("Hello World");
  }
});

client.login(process.env.DISCORD_TOKEN);
