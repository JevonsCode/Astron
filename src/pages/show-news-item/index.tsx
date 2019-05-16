import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import "./index.scss";

// 用的taro富文本的插件
import "../../components/wxParse/wxParse.wxss";
import WxParse from "../../components/wxParse/wxParse.js";

interface IProps {
    whichNews: {
        params: {
            _id: number,
            title: string,
            author: string,
            content: string,
            desc: string,
            date: string,
            imgCover?: string
        }
    };
}

@inject("whichNews")
@observer
class Article extends Component<IProps> {
    constructor() {
        super();
    }

    config = {
        navigationBarTitleText: "Article"
    };

    componentWillReact () {

    }

    componentDidMount () {
        const article = this.props.whichNews.params.content;
        WxParse.wxParse("article", "html", article, this.$scope, 5);
    }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    render () {
        const { whichNews } = this.props;
        const news = whichNews.params;
        console.log(news);
        return (
            <View className="news-item">
                <View className="news-header">
                    <Text className="news-title">{news.title}</Text>
                    <Text className="news-auther">{news.author}</Text>
                    <Text className="news-date">{news.date}</Text>
                </View>

                <View className="news-content">
                    <import src="../../components/wxParse/wxParse.wxml" />
                    <template is="wxParse" data="{{wxParseData:article.nodes}}"/>
                </View>
            </View>
        );
    }
}

export default Article;
