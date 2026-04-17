<script setup lang="ts">
import type { FilterType } from '../composables/useFilter'

defineProps<{
  currentFilter: FilterType
}>()

const emit = defineEmits<{
  setFilter: [filter: FilterType]
}>()
</script>

<template>
  <div class="filters">
    <button
      class="filter-btn"
      :class="{ active: currentFilter === 'all' }"
      @click="emit('setFilter', 'all')"
    >全部</button>
    <button
      class="filter-btn"
      :class="{ active: currentFilter === 'active' }"
      @click="emit('setFilter', 'active')"
    >待办</button>
    <button
      class="filter-btn"
      :class="{ active: currentFilter === 'completed' }"
      @click="emit('setFilter', 'completed')"
    >已完成</button>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  justify-content: center;
}

.filter-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 24px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s var(--transition-smooth);
}

.filter-btn:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.filter-btn.active {
  background: var(--text-primary);
  color: var(--bg-primary);
}
</style>
