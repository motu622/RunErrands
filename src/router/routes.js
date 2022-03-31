

export default [
    {
        path: '/',
        name: '/',
        redirect: '/LoginAndRegister/login'
    },
    {
        path: '/Home',
        name: 'Home',
        component: () => import('../components/Home'),
    },
    {
        path: '/Awarding',
        name: 'Awarding',
        component: () => import('../components/Awarding'),
    },
    {
        path: '/RecruitManage',
        name: 'RecruitManage',
        component: () => import('../components/RecruitManage'),
    },
    {
        path: '/OrderInfo',
        name: 'OrderInfo',
        component: () => import('../components/OrderInfo'),
    },
    {
        path: '/PersonInfo',
        name: 'PersonInfo',
        component: () => import('../components/PersonInfo'),
    },
    {
        path: '/AccountManage',
        name: 'AccountManage',
        component: () => import('../components/AccountManage'),
    },
    {
        path: '/MyOrder',
        name: 'MyOrder',
        component: () => import('../components/MyOrder'),
    },
    {
        path: '/LoginAndRegister',
        name: 'LoginAndRegister',
        component: () => import('../components/LoginAndRegister'),
        children: [
            {
                path: 'Login',
                name: 'Login',
                component: () => import('../components/LoginAndRegister/Login'),
            },
            {
                path: 'Register',
                name: 'Register',
                component: () => import('../components/LoginAndRegister/Register'),
            }
        ],
    },


]
