<script setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { Mail, MapPin, Phone, CircleDollarSign, Briefcase, ArrowRight } from 'lucide-vue-next';

import { useCandidateStore } from '../../store/candidate';
defineProps({
  candidate: Object,
  grid: {
    type: Boolean,
    default: false,
  },
});
const candidateStore = useCandidateStore();
const { statuses } = storeToRefs(candidateStore);

onMounted(async () => {
  await Promise.all([candidateStore.fetchStatuses()]);
});

const getStatus = (statutName) => {
  return candidateStore.statuses.find((s) => s.nom === statutName);
};
</script>

<template>
  <div v-if="grid" class="group relative h-80 w-64 perspective-[1000px]">
    <div
      class="relative w-full h-full duration-700 transform-3d group-hover:[transform:rotateY(180deg)] shadow-sm"
    >
      <div
        class="absolute inset-0 bg-surface rounded-xl border border-border-light p-6 flex flex-col [backface-visibility:hidden]"
      >
        <div
          class="w-12 h-12 rounded-xl mb-4 flex items-center justify-center font-black"
          :style="{
            backgroundColor: (getStatus(candidate.statut)?.couleur || '#94a3b8') + '15',
            color: getStatus(candidate.statut)?.couleur || '#94a3b8',
          }"
        >
          {{ candidate.nom.charAt(0) }}
        </div>

        <h3 class="text-xl font-black text-text-main leading-tight">{{ candidate.nom }}</h3>
        <p class="text-xs font-bold text-primary mb-6">{{ candidate.poste }}</p>

        <div class="space-y-3">
          <p class="text-xs flex items-center gap-2 text-text-muted">
            <MapPin :size="14" /> {{ candidate.localisation }}
          </p>
          <p class="text-xs flex items-center gap-2 text-text-muted">
            <CircleDollarSign :size="14" /> {{ candidate.salaireSouhaite?.toLocaleString() }} DA
          </p>
        </div>

        <div
          class="mt-auto h-1.5 w-full rounded-full overflow-hidden bg-bg-main border border-border-light/50"
        >
          <div
            class="h-full transition-all duration-1000"
            :style="{ width: '100%', backgroundColor: getStatus(candidate.statut)?.couleur }"
          ></div>
        </div>
      </div>

      <div
        class="absolute inset-0 bg-surface rounded-xl border-2 border-primary/20 p-6 flex flex-col items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]"
      >
        <div class="mb-4">
          <span
            class="px-3 py-1 rounded-full text-[10px] font-black uppercase border"
            :style="{
              backgroundColor: (getStatus(candidate.statut)?.couleur || '#94a3b8') + '15',
              color: getStatus(candidate.statut)?.couleur || '#94a3b8',
              borderColor: (getStatus(candidate.statut)?.couleur || '#94a3b8') + '40',
            }"
          >
            {{ candidate.statut }}
          </span>
        </div>

        <p class="text-xs text-text-muted mb-1">Contact direct :</p>
        <p class="text-sm font-bold text-text-main mb-4 truncate w-full">{{ candidate.email }}</p>
        <p class="text-sm font-bold text-text-main mb-4 truncate w-full">
          {{ candidate.telephone }}
        </p>

        <div class="mt-auto w-full">
          <RouterLink
            :to="{ name: 'candidateDetail', params: { id: candidate.id } }"
            class="block w-full py-3 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
          >
            Voir le profil
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else
    class="group rounded-xl bg-surface p-4 border border-border-light hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex items-center gap-6"
  >
    <div
      class="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-black shrink-0 transition-transform group-hover:scale-105 shadow-sm"
      :style="{
        backgroundColor: (getStatus(candidate.statut)?.couleur || '#94a3b8') + '15',
        color: getStatus(candidate.statut)?.couleur || '#94a3b8',
      }"
    >
      {{ candidate.nom.charAt(0) }}
    </div>

    <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div>
        <h3 class="font-bold text-text-main group-hover:text-primary transition-colors">
          {{ candidate.nom }}
        </h3>
        <p class="text-xs text-text-muted flex items-center gap-1">
          <Briefcase :size="12" /> {{ candidate.poste }}
        </p>
      </div>

      <div class="space-y-1">
        <p class="text-sm text-text-muted flex items-center gap-2">
          <Mail :size="14" /> {{ candidate.email }}
        </p>
        <p class="text-sm font-black text-text-main">
          {{ candidate.salaireSouhaite?.toLocaleString() }} DA
        </p>
      </div>

      <div class="flex justify-start md:justify-center">
        <span
          class="px-3 py-1 rounded-full text-[10px] font-black uppercase border tracking-wider shadow-sm"
          :style="{
            backgroundColor: (getStatus(candidate.statut)?.couleur || '#94a3b8') + '15',
            color: getStatus(candidate.statut)?.couleur || '#94a3b8',
            borderColor: (getStatus(candidate.statut)?.couleur || '#94a3b8') + '40',
          }"
        >
          {{ candidate.statut }}
        </span>
      </div>
    </div>

    <RouterLink
      :to="{ name: 'candidateDetail', params: { id: candidate.id } }"
      class="p-3 bg-bg-main text-text-muted hover:bg-primary hover:text-white border border-border-light rounded-xl transition-all shadow-sm"
    >
      <ArrowRight :size="20" />
    </RouterLink>
  </div>
</template>
