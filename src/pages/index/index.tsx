import { ComponentType } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import "@tarojs/async-await";
import NewsItem from "../../components/news-item";
import Placeholder from "../../components/placeholder";

// import { AtButton, AtList, AtListItem, AtCurtain } from "taro-ui";

import "./index.scss";
import { values } from "mobx";

type StateProps = {
    news:newsItem[];
    placeholder: boolean;
};
type newsItem = {
    id: number,
    title: string,
    content: string,
    picture: string[]
};

interface Index {
    state: StateProps;
}

@inject("counterStore")
@observer
class Index extends Component {
/**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
    config: Config = {
        navigationBarTitleText: "首页"
    };

    state:StateProps = {
        news: [],
        placeholder: true
    };

    async componentWillMount () {
        const response = await Taro.request({
            url: `${ API_WS }`
        });

        // 如果是开发环境就等2s
        if (process.env.NODE_ENV === "development") {
            console.log(response,"response! 开发模式ing");
            setTimeout(() => {
                this.setState({
                    news: response.data.news,
                    placeholder: false
                });
            }, 2000);
        } else {
            this.setState({
                news: response.data.news,
                placeholder: false
            });
        }
    }

    componentWillReact () {
    }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    render () {
        const { news, placeholder } = this.state;
        return (
        <View className="index">

            <Placeholder className="m-3" quantity="10" isShow={placeholder} />

            <View>
                {
                    news.map(newsItem =>
                        <NewsItem data={newsItem} key={newsItem.id} />
                    )
                }
            </View>
        </View>
        );
    }
}

export default Index as ComponentType;
