<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: Object,
  trend: String,
  colorClass: {
    type: String,
    default: 'text-primary',
  },
  border: String,
});
</script>

<template>
  <div
    class="bg-surface p-6 rounded-lg overflow-hidden hover:border-bs-0 hover:shadow-[0_0_8px_3px_rgba(0,0,0,0.05)] hover:scale-105 transition-shadow after:content-[''] after:block after:w-full after:h-1 after:absolute relative after:bottom-0 after:left-0 after-bg-[--after-bg]"
    :style="{ '--after-bg': border }"
  >
    <div class="flex items-center justify-between mb-4">
      <div :class="['p-3 rounded-xl bg-opacity-10']">
        <component :is="icon" :class="colorClass" :size="24" />
      </div>
      <span
        v-if="trend"
        class="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full"
      >
        {{ trend }}
      </span>
    </div>
    <div>
      <p class="text-text-muted text-sm font-medium">{{ title }}</p>
      <h3 class="text-text-main text-2xl font-bold mt-1">{{ value }}</h3>
    </div>
  </div>
</template>
