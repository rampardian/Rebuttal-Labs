require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Rebuttal Labs server is running' });
});

app.post('/api/debate', async (req, res) => {
  const { motion, userArgument, isOpening, rebuttalMode } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });

    const lengthInstruction = 
      rebuttalMode === "blitz" ? "Respond in 5-10 sentences." :
      rebuttalMode === "clash" ? "Respond in 11-20 sentences." :
      rebuttalMode === "grandslam" ? "Respond in 21-25 sentences." : "";
      "Respond in 5-10 sentences.";

    const prompt = isOpening
      ? `You are a debate opponent. The motion is: "${motion}". Deliver a strong, structured opening argument in favor of your side in 5-10 sentences. One clear point per rebuttal. Use evidence-based reasoning. ${lengthInstruction}`
      : `You are a debate opponent. The motion is: "${motion}". The user argues: "${userArgument}". Provide a structured rebuttal with evidence-based reasoning in 5-10 sentences. Minimize to two counter-arguments depending on the length of the user's argument. ${lengthInstruction}`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ rebuttal: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate rebuttal' });
  }
});

app.post('/api/summary', async (req, res) => {
  const { motion, stance, exchanges } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });
    
    const transcript = exchanges.map((e) => 
      `${e.role === 'user' ? 'USER' : 'OPPONENT'}: ${e.text}`
    ).join('\n\n');

    const prompt = `You are a debate judge. Analyze this debate and return ONLY a JSON object with no markdown, no backticks, no explanation.
    Motion: "${motion}"
    User Stance: "${stance}"
    Transcript:
    ${transcript}

    Return this exact JSON structure:
    {
      "userScore": <number from 0-100>,
      "aiScore": <number from 0-100, must equal 100 minus userScore>,
      "feedback": ["feedback point 1", "feedback point 2", "feedback point 3"]
      "nodes":[
      {"id": 1, "label": "<short 5-7 word summary of argument>", "role": "user"},
      {"id": 2, "label": "<short 5-7 word summary of argument>", "role": "ai"}
      ],
      "edges":[
        {"from": 2, "to": 1, "label": "Rebuts"}
      ]
    }
      
    Each exchange in the transcript should become a node. Edges should connect arguments that directly respond to each other, labeled either "Rebuts" or "Supports".

    `;

    

    const result = await model.generateContent(prompt);
    const raw = result.response.text();
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    res.json(parsed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});