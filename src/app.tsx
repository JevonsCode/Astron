import Taro, { Component, Config } from "@tarojs/taro";
import { Provider } from "@tarojs/mobx";
import Index from "./pages/index";

// import counterStore from "./store/counter";
import whichNews from "./store/news";

import "./assets/styles/app.scss";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
    whichNews
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
            "pages/show-news/index",
            "pages/user/index",
            "pages/stars/index",
            // other pages
            "pages/show-news-item/index"
        ],
        window: {
            backgroundTextStyle: "light",
            navigationBarBackgroundColor: "#fff",
            navigationBarTitleText: "WeChat",
            navigationBarTextStyle: "black",
            enablePullDownRefresh: true,
            onReachBottomDistance:50
        },
        tabBar: {
            color: "#666",
            selectedColor: "#000",
            backgroundColor: "#fff",
            list: [
                {
                    pagePath: "pages/index/index",
                    iconPath: "assets/icon/like.png",
                    selectedIconPath: "assets/icon/like.png",
                    text: "首页"
                },
                {
                    pagePath: "pages/show-news/index",
                    iconPath: "assets/icon/like.png",
                    selectedIconPath: "assets/icon/like.png",
                    text: "show"
                },
                {
                    pagePath: "pages/user/index",
                    iconPath: "assets/icon/like.png",
                    selectedIconPath: "assets/icon/like.png",
                    text: "3333"
                },
                {
                    pagePath: "pages/stars/index",
                    iconPath: "assets/icon/like.png",
                    selectedIconPath: "assets/icon/like.png",
                    text: "stars"
                }
            ]
        }
    };

    componentDidMount () {}

    componentDidShow () {}

    componentDidHide () {}

    componentDidCatchError () {}

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render () {
        return (
        <Provider store={store}>
            <Index />
        </Provider>
        );
    }
}

Taro.render(<App />, document.getElementById("app"));
