<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Menu, Sun, Moon } from 'lucide-vue-next';
import SideBar from './SideBar.vue';
import FooterRecruit from './FooterRecruit.vue';

const route = useRoute();
const isSidebarOpen = ref(false);
const isDark = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const pageTitle = computed(() => {
  const titles = {
    dashboard: 'Tableau de bord',
    candidates: 'Liste des Candidats',
    candidateDetail: 'Détail du Candidat',
    notFound: 'Erreur 404',
  };
  return titles[route.name] || route.meta.title || 'Application';
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
};

onMounted(() => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  } else {
    isDark.value = false;
    document.documentElement.classList.remove('dark');
  }
});
</script>

<template>
  <div class="flex min-h-screen bg-bg-main text-text-main transition-colors duration-300">
    <SideBar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="flex-1 flex flex-col min-w-0">
      <header
        class="h-16 bg-surface/80 backdrop-blur-md border-b border-border-light flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30"
      >
        <div class="flex items-center gap-4">
          <button
            @click="toggleSidebar"
            class="p-2 rounded-lg hover:bg-bg-main lg:hidden text-text-muted transition-colors"
          >
            <Menu :size="24" />
          </button>

          <h1 class="text-sm hidden sm:block text-text-main font-semibold transition-all">
            {{ pageTitle }}
          </h1>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="toggleTheme"
            class="p-2.5 rounded-xl bg-bg-main border border-border-light text-text-main hover:border-primary/50 transition-all shadow-sm group"
            aria-label="Toggle dark mode"
          >
            <Sun
              v-if="isDark"
              :size="20"
              class="text-amber-400 group-hover:rotate-45 transition-transform"
            />
            <Moon
              v-else
              :size="20"
              class="text-slate-600 group-hover:-rotate-12 transition-transform"
            />
          </button>
        </div>
      </header>

      <main class="p-4 lg:p-8 flex-1">
        <router-view />
      </main>

      <FooterRecruit />
    </div>
  </div>
</template>
