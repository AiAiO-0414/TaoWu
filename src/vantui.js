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
    Tag,
    PullRefresh,
    List,
    Image as VanImage,
    GoodsAction,
    GoodsActionButton,
    GoodsActionIcon,
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
Vue.use(Tag);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(VanImage);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);