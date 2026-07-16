// src/services/chatService.js (교체 또는 참고)
export const getChatReply = async (message) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) {
      const err = await res.json().catch(()=>({ error: 'unknown' }));
      throw new Error(err?.error || `Server ${res.status}`);
    }
    const { reply } = await res.json();
    return reply;
  } catch (e) {
    clearTimeout(timeout);
    throw e;
  }
};