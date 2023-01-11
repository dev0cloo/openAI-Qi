import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log(process.env.OPENAI_API_KEY);
// calls a new instance of openai
const openai = new OpenAIApi(configuration);

//initialize the express app
const app = express();

app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({ message: "Hello from Nansi!" });
});

app.post("/", async (req, res) => {
  try {
    console.log(req.body.prompt);

    const prompt = req.body.prompt;

    console.log(prompt);

    const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: `${prompt}`,
      temperature: 0.5,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
});

app.listen(5000, () =>
  console.log("AI Server is running on port http://localhost:5000")
);
