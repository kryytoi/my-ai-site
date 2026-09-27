export default async function handler(req, res) {
  const { question } = req.body;
  try {
    const response = await fetch('https://thinly-never-tamer.ngrok-free.dev/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'qwen2.5:14b', prompt: question, stream: false })
    });
    const data = await response.json();
    res.status(200).json({ answer: data.response });
  } catch (e) {
    res.status(500).json({ error: 'Ошибка соединения с моделью' });
  }
}