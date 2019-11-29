import Layout from '@/layout'

const boxRouter = {
  path: '/box',
  component: Layout,
  redirect: 'noRedirect',
  name: 'box',
  meta: {
    title: 'box',
    icon: 'component',
  },
  children: [
    {
      path: 'admin',
      component: () => import('@/views/box/admin'),
      name: 'admin-page',
      meta: { title: 'admin page', noCache: true },
    },
    {
      path: 'editor',
      component: () => import('@/views/box/editor'),
      name: 'editor-page',
      meta: { title: 'editor page', noCache: true },
    },
    {
      path: 'visitor',
      component: () => import('@/views/box/visitor'),
      name: 'visitor-page',
      meta: { title: 'visitor page', noCache: true },
    },
    {
      path: 'free',
      component: () => import('@/views/box/free'),
      name: 'free-page',
      meta: { title: 'free page', noCache: true },
    },
  ],
}

export default boxRouter
