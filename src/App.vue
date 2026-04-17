<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodos } from './composables/useTodos'
import { useFilter } from './composables/useFilter'
import { useStats } from './composables/useStats'
import TodoItem from './components/TodoItem.vue'
import TodoStats from './components/TodoStats.vue'
import TodoFilters from './components/TodoFilters.vue'

const { todos, addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted } = useTodos()
const { currentFilter, setFilter, filterTodos } = useFilter()
const { total, active, completed } = useStats(todos)

const newTodoText = ref('')
const deletingIds = ref<Set<number>>(new Set())

const filteredTodos = computed(() => filterTodos(todos.value))
const showEmpty = computed(() => filteredTodos.value.length === 0)
const showClearCompleted = computed(() => completed.value > 0)

function handleAddTodo() {
  addTodo(newTodoText.value)
  newTodoText.value = ''
}

function handleDelete(id: number) {
  deletingIds.value.add(id)
  setTimeout(() => {
    deleteTodo(id)
    deletingIds.value.delete(id)
  }, 300)
}

function handleClearCompleted() {
  const completedIds = todos.value.filter(t => t.completed).map(t => t.id)
  completedIds.forEach(id => deletingIds.value.add(id))
  setTimeout(() => {
    clearCompleted()
    completedIds.forEach(id => deletingIds.value.delete(id))
  }, 300)
}

function isDeleting(id: number) {
  return deletingIds.value.has(id)
}
</script>

<template>
  <div class="container">
    <header class="header">
      <h1>待办清单</h1>
      <p class="subtitle">记录生活，完成每一个小目标</p>
    </header>

    <TodoStats :total="total" :active="active" :completed="completed" />

    <div class="input-section">
      <div class="input-wrapper">
        <input
          type="text"
          class="todo-input"
          placeholder="添加一个新的待办事项..."
          autocomplete="off"
          v-model="newTodoText"
          @keydown.enter="handleAddTodo"
        >
        <button class="add-btn" @click="handleAddTodo">添加</button>
      </div>
    </div>

    <TodoFilters :currentFilter="currentFilter" @setFilter="setFilter" />

    <ul class="todo-list">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        :deleting="isDeleting(todo.id)"
        @toggle="toggleTodo"
        @delete="handleDelete"
        @update="updateTodo"
      />
    </ul>

    <div class="empty-state" v-if="showEmpty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      </svg>
      <p>暂无待办事项，添加一个吧！</p>
    </div>

    <div class="clear-completed" v-if="showClearCompleted">
      <button class="clear-btn" @click="handleClearCompleted">清除已完成</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 520px;
  animation: fadeInUp 0.6s var(--transition-smooth);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-family: 'Noto Serif SC', serif;
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.header .subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary);
  font-weight: 300;
}

.input-section {
  background: var(--bg-secondary);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 24px var(--shadow-soft);
  margin-bottom: 24px;
}

.input-wrapper {
  display: flex;
  gap: 12px;
  align-items: center;
}

.todo-input {
  flex: 1;
  padding: 16px 20px;
  border: 2px solid transparent;
  border-radius: 14px;
  background: var(--bg-primary);
  font-size: 1rem;
  font-family: inherit;
  color: var(--text-primary);
  transition: all 0.3s var(--transition-smooth);
}

.todo-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}

.todo-input:focus {
  outline: none;
  border-color: var(--accent-warm);
  background: white;
  box-shadow: 0 0 0 4px rgba(212, 165, 116, 0.15);
}

.add-btn {
  padding: 16px 24px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--accent-warm) 0%, var(--accent-deep) 100%);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s var(--transition-smooth);
  white-space: nowrap;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(212, 165, 116, 0.4);
}

.add-btn:active {
  transform: translateY(0);
}

.todo-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
}

.empty-state svg {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  opacity: 0.4;
}

.empty-state p {
  font-size: 1.1rem;
  font-weight: 300;
}

.clear-completed {
  text-align: center;
  margin-top: 24px;
}

.clear-btn {
  padding: 12px 24px;
  border: 1px solid var(--accent-warm);
  border-radius: 24px;
  background: transparent;
  color: var(--accent-deep);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s var(--transition-smooth);
}

.clear-btn:hover {
  background: var(--accent-warm);
  color: white;
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 2.2rem;
  }

  .input-wrapper {
    flex-direction: column;
  }

  .add-btn {
    width: 100%;
  }
}
</style>
