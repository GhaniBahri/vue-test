<script setup>
import { Heart } from 'lucide-vue-next';

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="mt-auto py-6 px-8 border-t border-gray-200 bg-white/50">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="text-sm text-gray-500">
        &copy; {{ currentYear }} <span class="font-semibold text-indigo-600">Recrut'App</span>. Tous
        droits réservés.
      </div>

      <div class="flex items-center gap-1 text-sm text-gray-400">
        Développé par
        <span class="font-medium text-gray-600"
          ><a href="https://github.com/abdelghani-bahri" target="_blank" rel="noopener noreferrer"
            >Abdelghani Bahri</a
          ></span
        >
        <Heart :size="14" class="text-red-400 fill-current" />
      </div>

      <nav class="flex gap-6">
        <a
          href="#"
          class="text-xs font-medium text-gray-400 hover:text-indigo-600 transition-colors"
          >Support</a
        >
        <a
          href="#"
          class="text-xs font-medium text-gray-400 hover:text-indigo-600 transition-colors"
          >Documentation</a
        >
        <a
          href="#"
          class="text-xs font-medium text-gray-400 hover:text-indigo-600 transition-colors"
          >Confidentialité</a
        >
      </nav>
    </div>
  </footer>
</template>
