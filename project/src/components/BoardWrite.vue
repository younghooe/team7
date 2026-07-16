<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])
const title = ref('')
const content = ref('')
const password = ref('')

const submit = () => {
  if (!title.value.trim() || !content.value.trim() || !password.value.trim()) {
    return
  }

  emit('submit', {
    title: title.value.trim(),
    content: content.value.trim(),
    password: password.value.trim(),
  })

  title.value = ''
  content.value = ''
  password.value = ''
}
</script>

<template>
  <form class="board-form" @submit.prevent="submit">
    <input v-model="title" placeholder="제목" />
    <textarea v-model="content" placeholder="여행 이야기를 들려주세요" />
    <input v-model="password" type="password" placeholder="삭제 비밀번호" />
    <button type="submit">게시글 작성</button>
  </form>
</template>

<style scoped>
.board-form { display: grid; gap: 0.7rem; margin-top: 1rem; }
input, textarea, button {
  border-radius: 12px;
  border: 1px solid #ead8c4;
  padding: 0.75rem 0.9rem;
  font: inherit;
}
textarea { min-height: 90px; resize: vertical; }
button { background: #d98d66; color: white; cursor: pointer; }
</style>
