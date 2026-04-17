<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { Todo } from '../types/todo'

const props = defineProps<{
  todo: Todo
  deleting?: boolean
}>()

const emit = defineEmits<{
  toggle: [id: number]
  delete: [id: number]
  update: [id: number, text: string]
}>()

const isEditing = ref(false)
const editText = ref('')
const editInput = ref<HTMLInputElement | null>(null)

function startEdit() {
  if (props.todo.completed) return
  isEditing.value = true
  editText.value = props.todo.text
  nextTick(() => {
    editInput.value?.focus()
    editInput.value?.select()
  })
}

function saveEdit() {
  if (!isEditing.value) return
  if (editText.value.trim()) {
    emit('update', props.todo.id, editText.value.trim())
  }
  isEditing.value = false
}
</script>

<template>
  <li
    class="todo-item"
    :class="{ completed: todo.completed, editing: isEditing, deleting: deleting }"
    :data-id="todo.id"
  >
    <div class="checkbox" @click="emit('toggle', todo.id)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <span class="todo-text" @dblclick="startEdit">{{ todo.text }}</span>
    <input
      ref="editInput"
      type="text"
      class="edit-input"
      v-model="editText"
      @blur="saveEdit"
      @keydown.enter="saveEdit"
    >
    <div class="actions">
      <button class="action-btn edit" title="编辑" @click="startEdit">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      </button>
      <button class="action-btn delete" title="删除" @click="emit('delete', todo.id)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
        </svg>
      </button>
    </div>
  </li>
</template>

<style scoped>
.todo-item {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 2px 12px var(--shadow-soft);
  transition: all 0.3s var(--transition-smooth);
  animation: slideIn 0.4s var(--transition-smooth);
}

.todo-item:hover {
  box-shadow: 0 4px 20px var(--shadow-medium);
  transform: translateY(-2px);
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: var(--text-secondary);
}

.todo-item.completed .checkbox {
  background: var(--accent-sage);
  border-color: var(--accent-sage);
}

.todo-item.editing .todo-text {
  display: none;
}

.todo-item.editing .edit-input {
  display: block;
}

.checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid var(--accent-warm);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s var(--transition-smooth);
  flex-shrink: 0;
}

.checkbox:hover {
  border-color: var(--accent-deep);
  transform: scale(1.1);
}

.checkbox svg {
  width: 14px;
  height: 14px;
  color: white;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.2s var(--transition-smooth);
}

.todo-item.completed .checkbox svg {
  opacity: 1;
  transform: scale(1);
}

.todo-text {
  flex: 1;
  font-size: 1rem;
  line-height: 1.5;
  cursor: pointer;
  transition: color 0.3s var(--transition-smooth);
}

.edit-input {
  flex: 1;
  display: none;
  padding: 10px 14px;
  border: 2px solid var(--accent-warm);
  border-radius: 10px;
  background: white;
  font-size: 1rem;
  font-family: inherit;
  color: var(--text-primary);
}

.edit-input:focus {
  outline: none;
}

.actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s var(--transition-smooth);
}

.todo-item:hover .actions {
  opacity: 1;
}

.action-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s var(--transition-smooth);
}

.action-btn:hover {
  background: var(--bg-primary);
}

.action-btn svg {
  width: 18px;
  height: 18px;
  color: var(--text-secondary);
  transition: color 0.2s var(--transition-smooth);
}

.action-btn.edit:hover svg {
  color: var(--accent-warm);
}

.action-btn.delete:hover svg {
  color: var(--accent-coral);
}

.todo-item.deleting {
  animation: slideOut 0.3s var(--transition-smooth) forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOut {
  to {
    opacity: 0;
    transform: translateX(20px);
    height: 0;
    padding: 0;
    margin: 0;
  }
}

@media (max-width: 480px) {
  .actions {
    opacity: 1;
  }
}
</style>
