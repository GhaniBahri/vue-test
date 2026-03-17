import apiClient from './api';

export const candidate = {
  async getCandidates(params = {}) {
    return apiClient.get('/candidatures', { params });
  },

  async getCandidateById(id) {
    return apiClient.get(`/candidatures/${id}`);
  },

  async updateCandidate(id, data) {
    return apiClient.patch(`/candidatures/${id}`, data);
  },

  async getStatuses() {
    return apiClient.get('/statuts');
  },
};
