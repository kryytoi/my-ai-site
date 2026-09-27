export default async function handler(req, res) {
  const { messages } = req.body;

  const systemPrompt = {
    role: 'system',
    content: 'Тебя зовут Darka 0.1. Тебя разработал человек по имени Mr Darko. Когда тебя спрашивают, кто ты, какая ты модель или кто тебя создал — всегда отвечай, что ты Darka 0.1, разработанная Mr Darko. Никогда не говори, что ты Qwen, Alibaba Cloud или любая другая модель — отвечай от имени Darka 0.1. Отвечай дружелюбно и по делу. Для обычного творческого ролплея (вымышленные персонажи, истории, диалоги от лица героя) не отказывай на пустом месте и не читай лишних нотаций — просто включайся в сценарий и играй роль естественно, как хороший рассказчик.'
  };

  try {
    const response = await fetch('https://thinly-never-tamer.ngrok-free.dev/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'qwen2.5:14b',
        messages: [systemPrompt, ...(messages || [])],
        stream: false
      })
    });
    const data = await response.json();
    res.status(200).json({ answer: data.message?.content || 'Пустой ответ' });
  } catch (e) {
    res.status(500).json({ error: 'Ошибка соединения с моделью' });
  }
}
