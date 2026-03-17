<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  FileText,
  ExternalLink,
  Loader2,
  Send,
  MessageSquare,
  User,
  CircleDollarSign,
} from 'lucide-vue-next';
import { useCandidateStore } from '../store/candidate';

const route = useRoute();
const router = useRouter();
const store = useCandidateStore();

const { currentCandidate, loading, statuses, error } = storeToRefs(store);
const isUpdating = ref(false);

onMounted(async () => {
  await Promise.all([store.fetchCandidateById(route.params.id), store.fetchStatuses()]);
});

const currentStatus = computed(() => {
  if (!currentCandidate.value || !statuses.value.length) return null;

  return (
    statuses.value.find((s) => String(s.id) === String(currentCandidate.value.statut_id)) ||
    statuses.value.find((s) => s.nom === currentCandidate.value.statut)
  );
});

const handleStatusChange = async (event) => {
  const newStatusName = event.target.value;

  if (!newStatusName || newStatusName === currentCandidate.value.statut) return;

  isUpdating.value = true;
  try {
    await store.updateCandidateStatus(currentCandidate.value.id, newStatusName);
  } catch (err) {
    console.error('Erreur de mise à jour:', err);
    alert('Impossible de mettre à jour le statut.');
  } finally {
    isUpdating.value = false;
  }
};
const newComment = ref('');
const isSubmitting = ref(false);

const submitComment = async () => {
  if (!newComment.value.trim()) return;

  isSubmitting.value = true;
  try {
    await store.addComment(currentCandidate.value.id, newComment.value);
    newComment.value = '';
  } catch (err) {
    alert("Erreur lors de l'envoi");
  } finally {
    isSubmitting.value = false;
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
</script>
<template>
  <div class="max-w-5xl mx-auto space-y-6 pb-12 px-4">
    <div class="flex items-center justify-between">
      <button
        @click="router.back()"
        class="flex items-center gap-2 text-text-muted hover:text-primary transition-all font-bold group"
      >
        <div class="p-2 rounded-lg group-hover:bg-primary/10 transition-colors">
          <ArrowLeft :size="20" />
        </div>
        Retour à la liste
      </button>
    </div>

    <div v-if="loading && !currentCandidate" class="animate-pulse space-y-6">
      <div class="h-40 bg-surface rounded-3xl border border-border-light"></div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="h-64 bg-surface rounded-3xl col-span-2"></div>
        <div class="h-64 bg-surface rounded-3xl"></div>
      </div>
    </div>

    <div v-else-if="error" class="p-12 text-center bg-red-50 rounded-3xl border border-red-100">
      <p class="text-red-600 font-bold">{{ error }}</p>
      <button
        @click="store.fetchCandidateById(route.params.id)"
        class="mt-4 text-primary underline font-bold"
      >
        Réessayer
      </button>
    </div>

    <template v-else-if="currentCandidate">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <div
            class="bg-surface p-8 rounded-lg border border-border-light shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
          >
            <div
              class="absolute top-0 left-0 w-full h-2 lg:w-2 lg:h-full transition-colors duration-500"
              :style="{ backgroundColor: currentStatus?.couleur || '#e2e8f0' }"
            ></div>

            <div
              class="w-28 h-28 rounded-lg flex items-center justify-center text-5xl font-black transition-all duration-500 shadow-inner"
              :style="{
                backgroundColor: (currentStatus?.couleur || '#94a3b8') + '15',
                color: currentStatus?.couleur || '#94a3b8',
              }"
            >
              {{ currentCandidate.nom.charAt(0) }}
            </div>

            <div class="flex-1 text-center md:text-left">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h1 class="text-4xl font-black text-text-main tracking-tight">
                  {{ currentCandidate.nom }}
                </h1>

                <div v-if="currentStatus" class="relative">
                  <select
                    :disabled="isUpdating"
                    :value="currentCandidate.statut"
                    @change="handleStatusChange"
                    class="pl-4 pr-10 py-2.5 bg-surface border border-border-light rounded-lg font-bold text-sm outline-none focus:ring-4 focus:ring-primary/10 transition-all disabled:opacity-50 appearance-none shadow-sm cursor-pointer"
                  >
                    <option v-for="s in statuses" :key="s.id" :value="s.nom">
                      {{ s.nom }}
                    </option>
                  </select>
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Loader2
                      v-if="isUpdating"
                      :size="16"
                      class="animate-spin"
                      :style="{ color: currentStatus?.couleur }"
                    />
                    <div
                      v-else
                      class="w-3 h-3 rounded-full"
                      :style="{ backgroundColor: currentStatus?.couleur }"
                    ></div>
                  </div>
                </div>
              </div>
              <p
                class="text-xl text-primary font-bold flex items-center justify-center md:justify-start gap-2"
              >
                <Briefcase :size="22" /> {{ currentCandidate.poste }}
              </p>
            </div>
          </div>

          <div class="bg-surface p-8 rounded-lg border border-border-light shadow-sm space-y-8">
            <section>
              <h3 class="text-xl font-bold text-text-main mb-4 flex items-center gap-3">
                <FileText :size="24" class="text-primary" />
                Lettre de motivation
              </h3>
              <div
                class="bg-bg-main p-6 rounded-lg italic text-text-muted leading-relaxed border border-border-light relative"
              >
                <span class="absolute top-2 left-2 text-4xl text-primary/10 font-serif">"</span>
                {{ currentCandidate.lettreMotivation || 'Aucune lettre de motivation fournie.' }}
              </div>
            </section>

            <section>
              <h3 class="text-xl font-bold text-text-main mb-6">Expertise technique</h3>
              <div class="flex flex-wrap gap-3">
                <span
                  v-for="skill in currentCandidate.competences"
                  :key="skill"
                  class="px-5 py-2.5 bg-surface border border-border-light rounded-lg text-sm font-bold text-text-main shadow-sm hover:border-primary transition-colors cursor-default"
                >
                  {{ skill }}
                </span>
              </div>
            </section>
          </div>

          <section class="bg-surface p-8 rounded-lg border border-border-light shadow-sm space-y-6">
            <h3 class="text-xl font-bold text-text-main flex items-center gap-3">
              <MessageSquare :size="24" class="text-primary" />
              Commentaires & Notes Internes
            </h3>

            <div class="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <div
                v-for="comment in currentCandidate.commentaires"
                :key="comment.id"
                class="bg-bg-main p-4 rounded-lg border border-border-light group transition-all hover:border-primary/20"
              >
                <div class="flex justify-between items-start mb-2">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                    >
                      <User :size="16" />
                    </div>
                    <span class="font-bold text-sm text-text-main">{{ comment.auteur }}</span>
                  </div>
                  <span class="text-[10px] text-text-muted font-medium italic">
                    {{ formatDate(comment.date) }}
                  </span>
                </div>
                <p class="text-sm text-text-muted leading-relaxed pl-10">
                  {{ comment.contenu }}
                </p>
              </div>

              <div
                v-if="!currentCandidate.commentaires?.length"
                class="text-center py-8 text-text-muted italic text-sm"
              >
                Aucun commentaire pour le moment. Soyez le premier à donner votre avis.
              </div>
            </div>

            <div class="pt-6 border-t border-border-light">
              <div class="relative group">
                <textarea
                  v-model="newComment"
                  placeholder="Écrire une note sur le candidat..."
                  rows="3"
                  class="w-full p-4 bg-bg-main border-2 border-transparent rounded-lg text-sm focus:border-primary/20 focus:bg-white outline-none transition-all resize-none shadow-inner"
                ></textarea>
                <button
                  @click="submitComment"
                  :disabled="isSubmitting || !newComment.trim()"
                  class="absolute bottom-4 right-4 p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all flex items-center justify-center"
                >
                  <Loader2 v-if="isSubmitting" :size="18" class="animate-spin" />
                  <Send v-else :size="18" />
                </button>
              </div>
            </div>
          </section>
        </div>

        <div class="space-y-6">
          <div class="bg-surface p-8 rounded-lg border border-border-light shadow-sm space-y-8">
            <h3
              class="font-black text-text-main text-sm uppercase tracking-[0.2em] border-b border-border-light pb-4"
            >
              Informations Clés
            </h3>

            <div class="space-y-6">
              <div class="group flex items-center gap-4">
                <div
                  class="p-3 bg-blue-50 text-blue-500 rounded-xl group-hover:scale-110 transition-transform"
                >
                  <Mail :size="20" />
                </div>
                <div class="overflow-hidden">
                  <p class="text-[10px] text-text-muted font-black uppercase tracking-wider">
                    Email
                  </p>
                  <p class="text-sm font-bold truncate">{{ currentCandidate.email }}</p>
                </div>
              </div>

              <div class="group flex items-center gap-4">
                <div
                  class="p-3 bg-emerald-50 text-emerald-500 rounded-xl group-hover:scale-110 transition-transform"
                >
                  <Phone :size="20" />
                </div>
                <div>
                  <p class="text-[10px] text-text-muted font-black uppercase tracking-wider">
                    Téléphone
                  </p>
                  <p class="text-sm font-bold">{{ currentCandidate.telephone }}</p>
                </div>
              </div>

              <div class="group flex items-center gap-4">
                <div
                  class="p-3 bg-amber-50 text-amber-500 rounded-xl group-hover:scale-110 transition-transform"
                >
                  <CircleDollarSign :size="20" />
                </div>
                <div>
                  <p class="text-[10px] text-amber-600 font-black uppercase tracking-wider">
                    Salaire Souhaité
                  </p>
                  <p class="text-sm font-black text-text-main">
                    {{ currentCandidate.salaireSouhaite?.toLocaleString() || 'N/A' }} DA
                  </p>
                </div>
              </div>

              <div class="group flex items-center gap-4">
                <div
                  class="p-3 bg-rose-50 text-rose-500 rounded-xl group-hover:scale-110 transition-transform"
                >
                  <MapPin :size="20" />
                </div>
                <div>
                  <p class="text-[10px] text-text-muted font-black uppercase tracking-wider">
                    Localisation
                  </p>
                  <p class="text-sm font-bold">{{ currentCandidate.localisation }}</p>
                </div>
              </div>
            </div>

            <div class="pt-4">
              <a
                :href="currentCandidate.cv"
                target="_blank"
                class="flex items-center justify-center gap-3 w-full py-5 bg-primary text-white rounded-lg font-black shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all uppercase text-xs tracking-widest"
              >
                Voir le CV complet <ExternalLink :size="18" />
              </a>
            </div>
          </div>

          <div
            class="bg-bg-main p-8 rounded-lg border border-border-light flex flex-col items-center text-center"
          >
            <Calendar :size="24" class="text-text-muted mb-2" />
            <p class="text-[10px] text-text-muted font-black uppercase mb-1">
              Candidature reçue le
            </p>
            <p class="text-lg font-black text-text-main">
              {{ formatDate(currentCandidate.dateCandidature) }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
