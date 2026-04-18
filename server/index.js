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
  const { motion, userArgument } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `You are a debate opponent. The motion is: "${motion}". The user argues: "${userArgument}". Provide a structured rebuttal with evidence-based reasoning.`;
    
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ rebuttal: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate rebuttal' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




