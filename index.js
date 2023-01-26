//  a express server , which will handle api request coming in and response back with a json object , it will use body parser and cors
const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;

const configuration = new Configuration({
  organization: "org-KA73dq6BHKM4HmqBD03ACd9j",
  apiKey:
    process.env.API_KEY ||
    "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 1,
  });
  console.log(response.data);
  if (response.data.choices[0].text) {
    res.json({
      message: response.data.choices[0].text,
    });
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
