import { defineStore } from 'pinia';
import { candidate as candidateService } from '../api/candidate';

export const useCandidateStore = defineStore('candidate', {
  state: () => ({
    candidates: [],
    currentCandidate: null,
    statuses: [],
    loading: false,
    error: null,
    filters: {
      search: '',
      statusId: '',
      maxSalary: null,
    },
    currentPage: 1,
    itemsPerPage: 10,
  }),

  getters: {
    allFilteredResults: (state) => {
      let result = state.candidates;
      if (state.filters.search) {
        const s = state.filters.search.toLowerCase();
        result = result.filter(
          (c) =>
            c.nom.toLowerCase().includes(s) ||
            c.email.toLowerCase().includes(s) ||
            c.poste.toLowerCase().includes(s)
        );
      }
      if (state.filters.statusId) {
        result = result.filter((c) => c.statut === state.filters.statusId);
      }
      if (state.filters.maxSalary && state.filters.maxSalary > 0) {
        result = result.filter((c) => Number(c.salaireSouhaite) <= state.filters.maxSalary);
      }
      return result;
    },

    filteredCandidates: (getters) => {
      const start = (getters.currentPage - 1) * getters.itemsPerPage;
      const end = start + getters.itemsPerPage;
      return getters.allFilteredResults.slice(start, end);
    },

    totalPages: (getters) => {
      return Math.ceil(getters.allFilteredResults.length / getters.itemsPerPage) || 1;
    },

    totalCount: (state) => state.candidates.length,

    countByStatus: (state) => (statusName) => {
      return state.candidates.filter((c) => c.statut === statusName).length;
    },

    hiringRate: (state) => {
      if (state.candidates.length === 0) return 0;
      const hired = state.candidates.filter((c) => c.statut === 'Accepté').length;
      return Math.round((hired / state.candidates.length) * 100);
    },
  },

  actions: {
    async fetchCandidates() {
      this.loading = true;
      try {
        const response = await candidateService.getCandidates();
        this.candidates = response.data || [];
      } catch (err) {
        this.error = 'Erreur lors du chargement des candidats';
      } finally {
        this.loading = false;
      }
    },

    async fetchCandidateById(id) {
      this.loading = true;
      this.currentCandidate = null;
      try {
        const response = await candidateService.getCandidateById(id);
        this.currentCandidate = response.data;
      } catch (err) {
        this.error = 'Candidat introuvable.';
      } finally {
        this.loading = false;
      }
    },

    async fetchStatuses() {
      try {
        const response = await candidateService.getStatuses();
        this.statuses = response.data;
      } catch (err) {
        console.error('Erreur statuts', err);
      }
    },

    async updateCandidateStatus(candidateId, newStatusName) {
      try {
        await candidateService.updateCandidate(candidateId, { statut: newStatusName });
        if (this.currentCandidate && this.currentCandidate.id === candidateId) {
          this.currentCandidate.statut = newStatusName;
        }
        const index = this.candidates.findIndex((c) => c.id === candidateId);
        if (index !== -1) this.candidates[index].statut = newStatusName;
      } catch (err) {
        console.error('Erreur update status', err);
        throw err;
      }
    },

    async addComment(candidateId, commentText) {
      try {
        const newComment = {
          id: Date.now(),
          auteur: 'Recruteur',
          date: new Date().toISOString(),
          contenu: commentText,
        };
        const updatedComments = [...(this.currentCandidate.commentaires || []), newComment];
        await candidateService.updateCandidate(candidateId, { commentaires: updatedComments });
        if (this.currentCandidate) {
          this.currentCandidate.commentaires = updatedComments;
        }
      } catch (err) {
        console.error("Erreur lors de l'ajout du commentaire", err);
        throw err;
      }
    },

    setPage(page) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    resetFilters() {
      this.filters.search = '';
      this.filters.statusId = '';
      this.filters.maxSalary = null;
      this.currentPage = 1;
    },
  },
});
