// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Task from './components/Task.vue'; 
import AddTask from './components/AddTask.vue';
import UpdateTask from './components/UpdateTask.vue'; 
import Home from './components/Home.vue'; 
import SignUp from "./components/SignUp.vue"; 
import SignIn from "./components/SignIn.vue"; 
import NotFound from "./components/NotFound.vue"; 

const routes = [
    {
        name: 'Task', // Name of the route
        path:'/task',     // Path to match
        component: Task, // Component to render
        meta: { requiresAuth: true }
    },
    {
        name: 'AddTask', // Name of the route
        path:'/create-task',     // Path to match
        component: AddTask, // Component to render
        meta: { requiresAuth: true }
    },
    {
        name: 'UpdateTask', // Name of the route
        path:'/update-task/:id',     // Path to match
        component: UpdateTask, // Component to render
        meta: { requiresAuth: true }
    },
    {
        name: 'Home', // Name of the route
        path:'/home',     // Path to match
        component: Home, // Component to render
        meta: { requiresAuth: true }
    },
    {
        name: 'SignUp',
        path:'/sign-up',
        component: SignUp,
        meta: { requiresAuth: false }
    },
    {
        name: 'SignIn',
        path:'/',
        component: SignIn,
        meta: { requiresAuth: false }
    },
    {
        // Catch-all route for any other path
        path: '/:pathMatch(.*)*', 
        component: NotFound, // Render the NotFound component
      },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('user-info');
  
    if (to.meta.requiresAuth && !isAuthenticated) {
      // If the route requires authentication and the user is not authenticated,
      // redirect to the sign-up page
      next('/');
    } else if (!to.meta.requiresAuth && isAuthenticated) {
      // If the route doesn't require authentication and the user is authenticated,
      // redirect to the dashboard
      next('/home');
    } else {
      next(); // Continue to the requested route
    }
  });

export default router
