import dotenv from 'dotenv';
dotenv.config();
console.log('OPENAI_KEY loaded:', !!process.env.OPENAI_API_KEY, 'len=', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0);
import express from 'express';
import fetch from 'node-fetch';
const app = express();
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    console.log('사용자가 보낸 메시지:', message);

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-5-mini',
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        reasoning_effort: 'low',
        max_completion_tokens: 2000,
      }),
    });

    console.log('OpenAI 상태:', resp.status, resp.statusText);

    const raw = await resp.text();

    console.log('OpenAI 원본 응답:');
    console.log(raw);

    let data;

    try {
      data = JSON.parse(raw);
    } catch (error) {
      console.error('JSON 변환 실패:', error.message);

      return res.status(500).json({
        error: 'OpenAI 응답을 JSON으로 변환하지 못했습니다.',
      });
    }

    console.log('OpenAI 분석된 응답:');
    console.dir(data, { depth: null });

    if (!resp.ok) {
      return res.status(resp.status).json({
        error: data?.error?.message ?? 'OpenAI API 요청 실패',
      });
    }

    const reply = data?.choices?.[0]?.message?.content;

    console.log('추출한 답변:', reply);

    if (!reply) {
      return res.status(500).json({
        error: 'OpenAI 응답은 왔지만 답변 내용이 비어 있습니다.',
        debug: data,
      });
    }

    return res.json({ reply });
  } catch (err) {
    console.error('서버 내부 오류:', err);

    return res.status(500).json({
      error: '서버 오류',
      detail: err.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy API running on http://localhost:${PORT}`));