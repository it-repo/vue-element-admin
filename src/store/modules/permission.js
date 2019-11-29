import { /* asyncRoutes, */ constantRoutes, componentMap } from '@/router'
import { getRoutes } from '@/api/role'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
}

function loadComponent(routes) {
  return routes.map(({
    path,
    component,
    redirect,
    name,
    hidden,
    children,
    alwaysShow,
    ...meta
  }) => {
    const route = {
      path,
      component,
      redirect,
      name,
      hidden,
      children,
      alwaysShow,
      meta,
    }
    if (route.component) {
      const component = `${route.component}`
      console.log(component)
      route.component = componentMap[component]
    }
    if (route.children) {
      route.children = loadComponent(route.children)
    }
    return route
  })
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      getRoutes().then(res => {
        const accessedRoutes = loadComponent(res.data)
        console.log(accessedRoutes)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
