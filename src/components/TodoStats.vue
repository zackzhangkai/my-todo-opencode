<script setup lang="ts">
defineProps<{
  total: number
  active: number
  completed: number
}>()
</script>

<template>
  <div class="stats">
    <div class="stat-item">
      <span class="stat-number">{{ total }}</span>
      <span class="stat-label">总计</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">{{ active }}</span>
      <span class="stat-label">待办</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">{{ completed }}</span>
      <span class="stat-label">已完成</span>
    </div>
  </div>
</template>

<style scoped>
.stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
  padding: 16px 24px;
  background: var(--bg-secondary);
  border-radius: 16px;
  box-shadow: 0 2px 12px var(--shadow-soft);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--accent-deep);
  display: block;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 4px;
}
</style>
