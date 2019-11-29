import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: 'noRedirect',
  name: 'system-log',
  children: [
    {
      path: 'log',
      component: () => import('@/views/system/info'),
      name: 'system-log',
    },
    {
      path: 'log',
      component: () => import('@/views/system/log'),
      name: 'system-log',
    },
  ],
}

export default systemRouter
