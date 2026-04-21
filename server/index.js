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
  const { motion, userArgument, isOpening } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    const prompt = isOpening
      ? `You are a debate opponent. The motion is: "${motion}". Deliver a strong, structured opening argument in favor of your side in 5-10 sentences. One clear point per rebuttal. Use evidence-based reasoning.`
      : `You are a debate opponent. The motion is: "${motion}". The user argues: "${userArgument}". Provide a structured rebuttal with evidence-based reasoning in 5-10 sentences. Minimize to two counter-arguments depending on the length of the user's argument.`;

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
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });
    
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
}`;

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