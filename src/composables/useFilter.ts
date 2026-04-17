import { ref } from 'vue'
import type { Todo } from '../types/todo'

export type FilterType = 'all' | 'active' | 'completed'

export function useFilter() {
  const currentFilter = ref<FilterType>('all')

  function setFilter(filter: FilterType) {
    currentFilter.value = filter
  }

  function filterTodos(todos: Todo[]): Todo[] {
    if (currentFilter.value === 'active') return todos.filter(t => !t.completed)
    if (currentFilter.value === 'completed') return todos.filter(t => t.completed)
    return todos
  }

  return { currentFilter, setFilter, filterTodos }
}
