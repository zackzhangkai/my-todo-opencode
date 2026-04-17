import { computed, type Ref } from 'vue'
import type { Todo } from '../types/todo'

export function useStats(todos: Ref<Todo[]>) {
  const total = computed(() => todos.value.length)
  const completed = computed(() => todos.value.filter(t => t.completed).length)
  const active = computed(() => total.value - completed.value)

  return { total, active, completed }
}
