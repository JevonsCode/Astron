import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import "./main.scss";

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
            imgCover: string
        }
    };
}

type IState = {
    collectSrc: string
};

@inject("whichNews")
@observer
class Article extends Component<IProps, IState> {
    constructor() {
        super();
        this.collect = this.collect.bind(this);

        this.state = {
            collectSrc: "../../assets/icon/heart.png"
        };
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

                {
                    news.imgCover &&
                    <View className="imgCover">
                        <Image
                        className="imgCover-img"
                        src={news.imgCover}
                        mode="widthFix" />
                        <View className="placeholder" />
                    </View>
                }

                <View className="at-article">
                    <View className="news-header">
                        <Text className="title">{news.title}</Text>
                        <Image
                        className="collect"
                        src={this.state.collectSrc}
                        onClick={this.collect} />
                        <View className="info">
                            <Text className="at-article__info info-item">
                                {
                                    news.date &&
                                    news.date.includes(" ")
                                    ?
                                    news.date.split(" ")[0]
                                    :
                                    news.date
                                }
                            </Text>
                            <Text className="at-article__info info-item">
                                {news.author}
                            </Text>
                        </View>
                    </View>

                    <Text className="details">详情</Text>

                    <View className="at-article__content content">
                        <import src="../../components/wxParse/wxParse.wxml" />
                        <template is="wxParse" data="{{wxParseData:article.nodes}}"/>
                    </View>
                </View>
            </View>
        );
    }

    collect() {
        if(this.state.collectSrc === "../../assets/icon/heart.png") {
            this.setState({
                collectSrc: "../../assets/icon/hearting.png"
            });
        } else {
            this.setState({
                collectSrc: "../../assets/icon/heart.png"
            });
        }
    }
}

export default Article;
