require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder
} = require("discord.js");

const config = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers // ⚠️ BẮT BUỘC cho welcome/goodbye
  ]
});

/* =======================
   ✅ BOT READY
======================= */
client.once("ready", async () => {
  console.log(`✅ Bot đã online: ${client.user.tag}`);

  // 🔤 ĐỔI TÊN HIỂN THỊ BOT (KHÔNG CẦN ID SERVER)
  for (const guild of client.guilds.cache.values()) {
    try {
      const me = guild.members.me;
      if (!me) continue;

      await me.setNickname("Kei-chan");
      console.log(`🔤 Đã đổi nickname bot tại server: ${guild.name}`);
    } catch {
      console.log(
        `⚠️ Không thể đổi nickname tại server: ${guild.name} (thiếu quyền hoặc role thấp)`
      );
    }
  }
});

/* =======================
   👋 WELCOME
======================= */
client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.get(config.welcomeChannel);
  if (!channel) return;

  const text = config.welcomeMessage.replace(
    "{user}",
    `<@${member.id}>`
  );

  const embed = new EmbedBuilder()
    .setColor("#00ffcc")
    .setDescription(text)
    .setImage(
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2I0dzg0NmNxcGdwa3N5OHZ0Zzc0bWJzNHl1MGRhNTN2aG5nc2lnYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XJ11efZaP3FFkcrAqB/giphy.gif"
    )
    .setFooter({ text: `Member joined • ${member.guild.name}` })
    .setTimestamp();

  await channel.send({ embeds: [embed] });
});

/* =======================
   👋 GOODBYE
======================= */
client.on("guildMemberRemove", async (member) => {
  const channel = member.guild.channels.cache.get(config.goodbyeChannel);
  if (!channel) return;

  const text = config.goodbyeMessage.replace(
    "{user}",
    `**${member.user.tag}**`
  );

  const embed = new EmbedBuilder()
    .setColor("#ff4d4d")
    .setDescription(text)
    .setImage(
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGVmOHdtYXNsZjUwMjN6NXZtaTF1dXBlZzBybGsyNzc4YmY2M3duaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IGZA3zlSOdhRGrx2Uz/giphy.gif"
    )
    .setFooter({ text: `Member left • ${member.guild.name}` })
    .setTimestamp();

  await channel.send({ embeds: [embed] });
});

client.login(process.env.TOKEN);
