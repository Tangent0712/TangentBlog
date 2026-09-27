import Home from './pages/Home.vue'
import Post from './pages/Post.vue'
import About from './pages/About.vue'
import Links from './pages/Links.vue'
import Archives from './pages/Archives.vue'
import Categories from './pages/Categories.vue'
import NotFound from './pages/NotFound.vue'

export default [
  { path: '/', name: 'home', component: Home },
  { path: '/post/:slug', name: 'post', component: Post, props: true },
  { path: '/about', name: 'about', component: About },
  { path: '/links', name: 'links', component: Links },
  { path: '/archives', name: 'archives', component: Archives },
  { path: '/categories', name: 'categories', component: Categories },
  { path: '/categories/:name', name: 'category', component: Categories, props: true },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
]
