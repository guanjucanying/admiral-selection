import { createRouter,createWebHashHistory } from "vue-router";
// import  token  from "../hooks/useToken"

const router = createRouter({
    history: createWebHashHistory(),

    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            name: "home",
            path: "/home",
            component: () => import("@/views/home/home.vue"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/favor",
            component: () => import("@/views/favor/favor.vue"),
            meta: {
                requiresAuth: true
            }
        },
        {
            name: "order",
            path: "/order",
            component: () => import("@/views/order/order.vue"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/mine",
            component: () => import("@/views/mine/mine.vue"),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/city",
            component: () => import("@/views/city/city.vue"),
            meta: {
                // hideTabBar: true
                requiresAuth: true
            }
        },
        {
            path: "/search",
            component: () => import("@/views/search/search.vue"),
            meta: {
                hideTabBar: true,
                requiresAuth: true
            }
        },
        {
            path: "/detail/:id",
            component: () => import("@/views/detail/detail.vue"),
            meta: {
                requiresAuth: true
            }
        },
        {
            name: "login",
            path: "/login",
            component: () => import("@/views/login/login.vue"),
            meta: {
                hideTabBar: true
            }
        },
        {
            name: "register",
            path: "/register",
            component: () => import("@/views/register/register.vue"),
            meta: {
                hideTabBar: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const access_token = localStorage.getItem('access_token')
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(access_token) {
            next();
        } else {
            next('/login');
        }
    } else {
        next()
    }
})

export default router;