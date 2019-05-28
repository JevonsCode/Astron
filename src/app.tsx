import Taro, { Component, Config } from "@tarojs/taro";
import { Provider } from "@tarojs/mobx";
import Index from "./pages/index";

// import counterStore from "./store/counter";
import whichNews from "./store/news";
import userInfo from "./store/userInfo";

import "./assets/styles/app.scss";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
    whichNews,
    userInfo
};

class App extends Component {
/**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
    config: Config = {
        pages: [

            "pages/index/index",
            "pages/stars/index",
            "pages/astro/index",
            "pages/user/index",
            // other pages
            "pages/article-item/index",
            "pages/universe-css/index",
            "pages/collections/index"
        ],
        window: {
            backgroundTextStyle: "light",
            navigationBarBackgroundColor: "#fff",
            navigationBarTitleText: "ASTRON",
            navigationBarTextStyle: "black",
            // 下拉刷新
            // enablePullDownRefresh: true,
            // onReachBottomDistance:50
        },
        tabBar: {
            color: "#666",
            selectedColor: "#000",
            backgroundColor: "#fff",
            list: [
                {
                    pagePath: "pages/index/index",
                    iconPath: "assets/icon/a1.png",
                    selectedIconPath: "assets/icon/a2.png",
                    text: "首页"
                },
                {
                    pagePath: "pages/stars/index",
                    iconPath: "assets/icon/b1.png",
                    selectedIconPath: "assets/icon/b2.png",
                    text: "行星"
                },
                {
                    pagePath: "pages/astro/index",
                    iconPath: "assets/icon/c1.png",
                    selectedIconPath: "assets/icon/c2.png",
                    text: "航空"
                },
                {
                    pagePath: "pages/user/index",
                    iconPath: "assets/icon/d1.png",
                    selectedIconPath: "assets/icon/d2.png",
                    text: "我的"
                }
            ]
        }
    };

    render () {
        return (
        <Provider store={store}>
            <Index />
        </Provider>
        );
    }
}

Taro.render(<App />, document.getElementById("app"));
