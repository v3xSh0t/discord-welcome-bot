require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

/* =======================
   ✅ BOT READY
======================= */
client.once("ready", async () => {
  console.log(`✅ Bot đã online: ${client.user.tag}`);
});

/* =======================
   👋 WELCOME
======================= */
client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL);
  if (!channel) return;

  const text = process.env.WELCOME_MESSAGE.replace(
    "{user}",
    `<@${member.id}>`
  );

  const embed = new EmbedBuilder()
    .setColor("#00ffcc")
    .setDescription(text)
    .setTimestamp();

  await channel.send({ embeds: [embed] });
});

/* =======================
   👋 GOODBYE
======================= */
client.on("guildMemberRemove", async (member) => {
  const channel = member.guild.channels.cache.get(process.env.GOODBYE_CHANNEL);
  if (!channel) return;

  const text = process.env.GOODBYE_MESSAGE.replace(
    "{user}",
    member.user.tag
  );

  const embed = new EmbedBuilder()
    .setColor("#ff4d4d")
    .setDescription(text)
    .setTimestamp();

  await channel.send({ embeds: [embed] });
});

client.login(process.env.TOKEN);
