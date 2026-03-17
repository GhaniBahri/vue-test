<script setup>
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useCandidateStore } from '../store/candidate';
import CandidateCard from '../components/elements/CandidateCard.vue';
import {
    Search,
    Filter,
    LayoutGrid,
    List,
    Euro,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Loader2,
} from 'lucide-vue-next';

const store = useCandidateStore();

const { filteredCandidates, loading, filters, statuses, currentPage, totalPages } =
    storeToRefs(store);

onMounted(async () => {
    await Promise.all([store.fetchCandidates(), store.fetchStatuses()]);
});

watch(
    filters,
    () => {
        store.currentPage = 1;
    },
    { deep: true }
);

const grid = ref(true);
</script>

<template>
    <div class="space-y-8">
        <div
            class="bg-surface p-2 rounded-2xl border border-border-light shadow-sm flex flex-col md:flex-row items-center gap-3"
        >
            <div class="relative flex-1 w-full group">
                <Search
                    :size="18"
                    class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors"
                />
                <input
                    v-model="filters.search"
                    type="text"
                    placeholder="Rechercher par nom, email ou poste..."
                    class="w-full pl-12 pr-4 py-3 bg-bg-main border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
            </div>

            <div class="relative w-full md:w-56 group">
                <Filter
                    :size="16"
                    class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                />
                <select
                    v-model="filters.statusId"
                    class="w-full pl-10 pr-10 py-3 bg-bg-main border-none rounded-xl text-sm font-bold appearance-none outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                >
                    <option value="">Tous les statuts</option>
                    <option v-for="s in statuses" :key="s.id" :value="s.nom">
                        {{ s.nom }}
                    </option>
                </select>
                <ChevronDown
                    :size="16"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                />
            </div>

            <div class="relative w-full md:w-48 group">
                <Euro :size="16" class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                    v-model.number="filters.maxSalary"
                    type="number"
                    placeholder="Budget Max (DA)"
                    class="w-full pl-10 pr-4 py-3 bg-bg-main border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
            </div>

            <div class="hidden md:block w-px h-8 bg-border-light mx-2"></div>

            <div class="flex bg-bg-main p-1 rounded-xl w-full md:w-auto">
                <button
                    @click="grid = false"
                    :class="[!grid ? 'bg-white shadow-sm text-primary' : 'text-text-muted']"
                    class="flex-1 md:flex-none flex items-center justify-center px-4 py-2 rounded-lg transition-all"
                >
                    <List :size="18" />
                </button>
                <button
                    @click="grid = true"
                    :class="[grid ? 'bg-white shadow-sm text-primary' : 'text-text-muted']"
                    class="flex-1 md:flex-none flex items-center justify-center px-4 py-2 rounded-lg transition-all"
                >
                    <LayoutGrid :size="18" />
                </button>
            </div>
        </div>

        <div v-if="loading" class="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 :size="40" class="animate-spin text-primary" />
            <p class="text-text-muted font-bold animate-pulse">Chargement......</p>
        </div>

        <div
            v-else-if="filteredCandidates.length === 0"
            class="text-center py-20 bg-surface rounded-3xl border border-dashed border-border-light"
        >
            <div class="text-4xl mb-4">🔍</div>
            <h3 class="text-xl font-bold text-text-main">Aucun candidat ne correspond</h3>
            <button
                @click="store.resetFilters()"
                class="px-6 py-2 bg-primary/10 text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all"
            >
                Réinitialiser tout
            </button>
        </div>

        <div v-else>
            <div
                :class="
                    grid
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
                        : 'flex flex-col gap-4 max-w-4xl mx-auto'
                "
            >
                <CandidateCard v-for="c in filteredCandidates" :key="c.id" :candidate="c" :grid="grid" />
            </div>

            <div v-if="totalPages > 1" class="flex items-center justify-center gap-3 mt-12 pb-10">
                <button
                    @click="store.setPage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="p-3 rounded-xl bg-surface border border-border-light disabled:opacity-30 hover:bg-white hover:shadow-md transition-all"
                >
                    <ChevronLeft :size="20" />
                </button>

                <div class="flex items-center gap-2">
                    <button
                        v-for="page in totalPages"
                        :key="page"
                        @click="store.setPage(page)"
                        :class="[
                            currentPage === page
                                ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/20'
                                : 'bg-surface text-text-muted hover:bg-white',
                        ]"
                        class="w-10 h-10 rounded-xl font-bold text-sm transition-all"
                    >
                        {{ page }}
                    </button>
                </div>

                <button
                    @click="store.setPage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="p-3 rounded-xl bg-surface border border-border-light disabled:opacity-30 hover:bg-white hover:shadow-md transition-all"
                >
                    <ChevronRight :size="20" />
                </button>
            </div>
        </div>
    </div>
</template>
