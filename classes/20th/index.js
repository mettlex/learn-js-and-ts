require("dotenv").config();
const { REST, Routes, Client, GatewayIntentBits } = require("discord.js");

const commands = [
  {
    name: "test",
    description: "Replies with Pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async function() {
  try {
    console.log("Started refreshing application (/) commands.");
  
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
  
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})() // IIFE

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "test") {
    await interaction.reply("Hi Dad!");
  }
});

client.login(process.env.TOKEN);
