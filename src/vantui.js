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
    Sku,
    SwipeCell,
    Card,
    Checkbox,
    CheckboxGroup,
    SubmitBar,
    Stepper,
    Empty,
    AddressEdit,
    Form,
    Field,
    Icon,
    Cell,
    AddressList,
    Tab,
    Tabs,
    Popup,
    Step,
    Steps,
    DropdownMenu,
    DropdownItem,
} from 'vant';


Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Popup);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(AddressList);
Vue.use(Cell);
Vue.use(Icon);
Vue.use(Form);
Vue.use(Field);
Vue.use(AddressEdit);
Vue.use(Empty);
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
Vue.use(Sku);
Vue.use(SwipeCell);
Vue.use(Card);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(SubmitBar);
Vue.use(Stepper);
