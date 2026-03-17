<script setup>
import { RouterLink } from 'vue-router';
import { LayoutDashboard, Users, LogOut, X } from 'lucide-vue-next';

defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['close']);

const menuItems = [
  { name: 'Tableau de bord', routeName: 'dashboard', icon: LayoutDashboard },
  { name: 'Candidats', routeName: 'candidates', icon: Users },
  // { name: 'Paramètres', routeName: 'settings', icon: Settings },
];
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-text-main/50 backdrop-blur-sm z-40 lg:hidden"
    @click="emit('close')"
  ></div>

  <aside
    class="fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border-light flex flex-col transition-transform duration-300 ease-in-out transform lg:translate-x-0 lg:static lg:inset-0"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="p-6 flex items-center justify-between">
      <h2 class="text-xl font-bold text-primary flex items-center gap-3">
        <div class="p-2 bg-primary rounded-lg text-white">
          <LayoutDashboard :size="20" />
        </div>
        Recrut'App
      </h2>
      <button
        @click="emit('close')"
        class="p-2 lg:hidden text-text-muted hover:bg-bg-main rounded-lg"
      >
        <X :size="24" />
      </button>
    </div>

    <nav class="flex-1 p-4 space-y-1">
      <RouterLink
        v-for="item in menuItems"
        :key="item.name"
        :to="{ name: item.routeName }"
        @click="emit('close')"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
        active-class="bg-primary/10 text-primary font-bold"
        inactive-class="text-text-muted hover:bg-bg-main hover:text-text-main"
      >
        <component :is="item.icon" :size="20" stroke-width="2" />
        <span class="font-medium">{{ item.name }}</span>
      </RouterLink>
    </nav>

    <div class="p-4 mt-auto border-t border-border-light">
      <button
        class="flex items-center gap-3 px-4 py-2 w-full text-text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
      >
        <LogOut :size="18" />
        <span class="text-sm font-medium">Déconnexion</span>
      </button>
    </div>
  </aside>
</template>
