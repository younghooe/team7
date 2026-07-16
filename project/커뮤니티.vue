<script setup>
import { ref, onMounted } from 'vue'
import { addPost, deletePost, getAllPosts, updatePost } from './src/services/indexedDBService'

const posts = ref([])
const deleteTargetId = ref('')
const deletePassword = ref('')
const feedback = ref('')
const commentInputs = ref({})

const loadPosts = async () => {
  const allPosts = await getAllPosts()
  posts.value = allPosts.sort((a, b) => (b.id || 0) - (a.id || 0))
}

const handleSubmit = async ({ title, content, password }) => {
  if (!title.trim() || !content.trim() || !password.trim()) {
    feedback.value = '제목, 내용, 비밀번호를 모두 입력해 주세요.'
    return
  }

  const newPost = {
    title,
    content,
    deletePassword: password,
    views: 0,
    likes: 0,
    comments: [],
  }

  await addPost(newPost)
  feedback.value = '게시글이 등록되었습니다.'
  await loadPosts()
}

const handleDelete = async () => {
  if (!deleteTargetId.value || !deletePassword.value) {
    feedback.value = '삭제할 글 번호와 비밀번호를 입력해 주세요.'
    return
  }

  const result = await deletePost(Number(deleteTargetId.value), deletePassword.value)
  if (result.success) {
    feedback.value = '게시글이 삭제되었습니다.'
    deleteTargetId.value = ''
    deletePassword.value = ''
    await loadPosts()
  } else {
    feedback.value = result.message
  }
}

const toggleLike = async (post) => {
  const updatedPost = { ...post, likes: (post.likes || 0) + 1 }
  await updatePost(updatedPost)
  await loadPosts()
}

const viewPost = async (post) => {
  const updatedPost = { ...post, views: (post.views || 0) + 1 }
  await updatePost(updatedPost)
  await loadPosts()
}

const addComment = async (post) => {
  const commentText = commentInputs.value[post.id]?.trim()
  if (!commentText) {
    return
  }

  const updatedPost = {
    ...post,
    comments: [
      ...(post.comments || []),
      { id: Date.now(), content: commentText, createdAt: new Date().toISOString() },
    ],
  }

  await updatePost(updatedPost)
  commentInputs.value[post.id] = ''
  await loadPosts()
}

onMounted(loadPosts)
</script>

<template>
  <section class="board-card">
    <div class="board-header">
      <h2>서울 여행 이야기</h2>
      <p>데이트 코스, 숨은 명소, 감성 가득한 추천을 남겨보세요.</p>
    </div>

    <form class="board-form" @submit.prevent="handleSubmit">
      <input v-model="title" placeholder="제목" />
      <textarea v-model="content" placeholder="여행 이야기를 들려주세요" />
      <input v-model="password" type="password" placeholder="삭제 비밀번호" />
      <button type="submit">게시글 작성</button>
    </form>

    <div class="board-actions">
      <input v-model="deleteTargetId" type="number" placeholder="삭제할 글 번호" />
      <input v-model="deletePassword" type="password" placeholder="삭제 비밀번호" />
      <button class="secondary" @click="handleDelete">삭제</button>
    </div>

    <p v-if="feedback" class="feedback">{{ feedback }}</p>

    <div class="posts">
      <article v-for="post in posts" :key="post.id" class="post-item">
        <div class="post-top">
          <h3>{{ post.title }}</h3>
          <span>#{{ post.id }}</span>
        </div>
        <p>{{ post.content }}</p>
        <div class="post-meta">
          <span>조회 {{ post.views || 0 }}</span>
          <span>좋아요 {{ post.likes || 0 }}</span>
          <button @click="viewPost(post)">열기</button>
          <button @click="toggleLike(post)">좋아요</button>
        </div>

        <div class="comments">
          <h4>댓글</h4>
          <div v-if="post.comments?.length" class="comment-list">
            <div v-for="comment in post.comments" :key="comment.id" class="comment-item">
              {{ comment.content }}
            </div>
          </div>
          <div v-else class="comment-empty">첫 댓글을 남겨보세요.</div>
          <div class="comment-form">
            <input v-model="commentInputs[post.id]" placeholder="댓글을 입력해 주세요" />
            <button @click="addComment(post)">등록</button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.board-card {
  background: #fffaf6;
  border-radius: 24px;
  padding: 1.2rem;
  box-shadow: 0 14px 40px rgba(120, 88, 61, 0.12);
}
.board-header h2 { margin: 0 0 0.3rem; color: #7b4f2f; }
.board-header p { color: #79674f; }
.board-actions { display: grid; gap: 0.7rem; margin-top: 1rem; }
input, textarea, button {
  border-radius: 12px;
  border: 1px solid #ead8c4;
  padding: 0.75rem 0.9rem;
  font: inherit;
}
textarea { min-height: 90px; resize: vertical; }
button { background: #d98d66; color: white; cursor: pointer; }
button.secondary { background: #b57d53; }
.feedback { margin-top: 0.7rem; color: #8a5c3c; }
.posts { display: grid; gap: 0.8rem; margin-top: 1rem; }
.post-item { background: white; border-radius: 16px; padding: 0.9rem; border: 1px solid #f1e2d3; }
.post-top { display: flex; justify-content: space-between; align-items: center; }
.post-meta { display: flex; gap: 0.7rem; flex-wrap: wrap; margin-top: 0.7rem; }
.comments { margin-top: 0.8rem; padding-top: 0.8rem; border-top: 1px solid #f0e2d3; }
.comment-list { display: grid; gap: 0.4rem; margin: 0.5rem 0; }
.comment-item { background: #fdf4ea; padding: 0.5rem 0.7rem; border-radius: 10px; }
.comment-form { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
.comment-form input { flex: 1; }
.comment-empty { color: #8c6e57; font-size: 0.95rem; margin-top: 0.3rem; }
.board-form { display: grid; gap: 0.7rem; margin-top: 1rem; }
</style>
