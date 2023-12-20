import Vue from 'vue'
import { Button, Tabbar, TabbarItem, Empty, Toast, ContactCard, Tabs, Tab, Skeleton, NavBar, Overlay, List } from 'vant'
Vue.component(Button.name, Button)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabbarItem.name, TabbarItem)
Vue.component(Empty.name, Empty)
Vue.component(ContactCard.name, ContactCard)
Vue.component(Tabs.name, Tabs)
Vue.component(Tab.name, Tab)
Vue.component(Skeleton.name, Skeleton)
Vue.component(NavBar.name, NavBar)
Vue.component(Overlay.name, Overlay)
Vue.component(List.name, List)

Vue.use(Toast)
Vue.prototype.$Toast = Toast
