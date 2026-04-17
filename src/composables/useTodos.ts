import { ref, watch } from 'vue'
import type { Todo } from '../types/todo'

export function useTodos() {
  const todos = ref<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'))

  watch(todos, (val) => {
    localStorage.setItem('todos', JSON.stringify(val))
  }, { deep: true })

  function addTodo(text: string) {
    if (!text.trim()) return
    todos.value.unshift({
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    })
  }

  function toggleTodo(id: number) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) todo.completed = !todo.completed
  }

  function deleteTodo(id: number) {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  function updateTodo(id: number, text: string) {
    const todo = todos.value.find(t => t.id === id)
    if (todo && text.trim()) todo.text = text.trim()
  }

  function clearCompleted() {
    todos.value = todos.value.filter(t => !t.completed)
  }

  return { todos, addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted }
}
