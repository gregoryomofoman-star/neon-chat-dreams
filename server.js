import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Telegraf } from "telegraf";

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome to Z Desires!"));
bot.help((ctx) => ctx.reply("Z Desires Bot — commands coming soon."));

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Z Desires server running" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

bot.launch().then(() => {
  console.log("Telegram bot launched");
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
