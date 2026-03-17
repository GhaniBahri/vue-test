<script setup>
import { RouterLink } from 'vue-router';
import { Home, AlertCircle, ArrowLeft } from 'lucide-vue-next';
</script>

<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
    <div class="relative mb-8">
      <div class="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
      <div class="relative bg-surface border border-border-light p-8 rounded-full shadow-2xl">
        <AlertCircle :size="80" class="text-primary animate-pulse" />
      </div>
    </div>

    <h1 class="text-4xl md:text-6xl font-black text-text-main mb-4 tracking-tight">
      Page introuvable
    </h1>

    <div class="flex flex-col sm:flex-row gap-4">
      <button
        @click="$router.back()"
        class="flex items-center justify-center gap-2 px-8 py-4 bg-surface border border-border-light text-text-main font-bold rounded-2xl hover:bg-bg-main transition-all active:scale-95"
      >
        <ArrowLeft :size="20" />
        Retour
      </button>

      <RouterLink
        to="/"
        class="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:translate-y-0"
      >
        <Home :size="20" />
        Tableau de bord
      </RouterLink>
    </div>
  </div>
</template>
