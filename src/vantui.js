import Vue from 'vue'
import 'vant/lib/index.css';

import {
    Button,
    Tabbar,
    TabbarItem,
    NavBar,
    Search,
    Swipe,
    SwipeItem,
    Grid,
    GridItem,
    Divider,
    Lazyload,
    Sticky,
} from 'vant';

Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Divider);
Vue.use(Lazyload, {
  lazyComponent: true,
});
Vue.use(Sticky);