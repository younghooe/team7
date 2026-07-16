<script setup>
import { ref } from 'vue'
import { getChatReply } from '../services/chatService'

const isOpen = ref(false)
const messages = ref([
  { from: 'bot', text: '서울 관광 챗봇입니다. 어떤 여행 정보를 원하시나요?' },
])
const input = ref('')

const toggleChat = () => {
  isOpen.value = !isOpen.value
}

const sendMessage = async () => {
  if (!input.value.trim()) return
  const userMessage = input.value
  messages.value.push({ from: 'user', text: userMessage })
  const reply = await getChatReply(userMessage)
  messages.value.push({ from: 'bot', text: reply })
  input.value = ''
}
</script>

<template>
  <div class="chat-wrap">
    <button class="fab" @click="toggleChat">💬</button>

    <div v-if="isOpen" class="chat-window">
      <div class="chat-header">서울 관광 챗봇</div>
      <div class="chat-body">
        <div v-for="(msg, index) in messages" :key="index" :class="['bubble', msg.from]">
          {{ msg.text }}
        </div>
      </div>
      <div class="chat-footer">
        <input v-model="input" placeholder="메시지를 입력하세요" @keyup.enter="sendMessage" />
        <button @click="sendMessage">전송</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-wrap { position: fixed; right: 1rem; bottom: 1rem; z-index: 100; }
.fab { width: 58px; height: 58px; border-radius: 50%; border: none; background: linear-gradient(135deg, #d88c6b, #a8643e); color: white; font-size: 1.5rem; box-shadow: 0 10px 24px rgba(0,0,0,0.2); cursor: pointer; }
.chat-window { width: 300px; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 12px 35px rgba(0,0,0,0.18); margin-bottom: 0.8rem; }
.chat-header { background: #7b4f2f; color: white; padding: 0.8rem 1rem; font-weight: 600; }
.chat-body { padding: 0.8rem; display: grid; gap: 0.6rem; max-height: 260px; overflow: auto; }
.bubble { padding: 0.6rem 0.8rem; border-radius: 14px; max-width: 85%; }
.bubble.user { background: #f7e2d2; margin-left: auto; }
.bubble.bot { background: #f4efe9; }
.chat-footer { display: flex; gap: 0.4rem; padding: 0.7rem; border-top: 1px solid #f0e6dc; }
.chat-footer input { flex: 1; border: 1px solid #e7d6c5; border-radius: 10px; padding: 0.55rem 0.7rem; }
.chat-footer button { border: none; background: #d88c6b; color: white; border-radius: 10px; padding: 0.55rem 0.7rem; cursor: pointer; }
@media (max-width: 640px) { .chat-window { width: min(92vw, 300px); } }
</style>
