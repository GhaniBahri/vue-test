<script setup>
import { onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { Users, UserCheck, Clock, FileText } from 'lucide-vue-next';
import Widget from '../components/elements/Widget.vue';
import { useCandidateStore } from '../store/candidate';

const store = useCandidateStore();

const { totalCount, hiringRate, loading, candidates } = storeToRefs(store);

onMounted(async () => {
  await Promise.all([store.fetchCandidates(), store.fetchStatuses()]);
});
console.log('candidates', totalCount);
const dynamicStats = computed(() => [
  {
    title: 'Total Candidats',
    value: totalCount.value,
    icon: Users,
    trend: 'Base totale',
    color: 'primary',
  },
  {
    title: 'Nouveaux',
    value: store.countByStatus('En attente'),
    icon: FileText,
    trend: 'À traiter',
    color: '#10b981',
  },
  {
    title: 'En entretien',
    value: store.countByStatus('Entretien RH'),
    icon: Clock,
    trend: 'En cours',
    color: '#fe9a00',
  },
  {
    title: 'Recrutés',
    value: store.countByStatus('Accepté'),
    icon: UserCheck,
    trend: `${hiringRate.value}% taux`,
    color: 'accent',
  },
]);
</script>

<template>
  <div class="space-y-8">
    <header>
      <h2 class="text-2xl font-bold text-text-main">Tableau de bord</h2>
      <p class="text-text-muted">Données synchronisées en temps réel.</p>
    </header>

    <div
      v-if="loading && !candidates.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="i in 4"
        :key="i"
        class="h-32 bg-surface animate-pulse rounded-2xl border-b-4 border-gray-100"
      ></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Widget
        v-for="stat in dynamicStats"
        :key="stat.title"
        :title="stat.title"
        :value="stat.value"
        :icon="stat.icon"
        :trend="stat.trend"
        :color="stat.color"
      />
    </div>
  </div>
</template>
