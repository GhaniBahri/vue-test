import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { title: 'Tableau de bord' },
  },
  {
    path: '/candidates',
    name: 'candidates',
    component: () => import('../views/CandidatesList.vue'),
  },
  {
    path: '/candidates/:id',
    name: 'candidateDetail',
    component: () => import('../views/CandidateDetail.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
