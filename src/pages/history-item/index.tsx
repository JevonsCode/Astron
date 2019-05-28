import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { collections_add } from "@/api";
import "./main.scss";

// 用的taro富文本的插件
import "../../components/wxParse/wxParse.wxss";
import WxParse from "../../components/wxParse/wxParse.js";

interface IProps {
    whichHis: {
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

    userInfo: {
        info: {
            nickName: string,
            avatarUrl: string
        },
        _id: string,
        collections: any, // TODO 数组
        getStorageInfo: Function,
        isGetUserInfo: Function,
        getStorageID: Function
        whichColls: []
    };

}

@inject("whichHis", "userInfo")
@observer
class Article extends Component<IProps, IState> {
    constructor() {
        super();
    }

    config = {
        navigationBarTitleText: "HISTORY"
    };

    componentDidMount () {
        const article = this.props.whichHis.params.content;
        WxParse.wxParse("article", "html", article, this.$scope, 5);
    }

    render () {
        const { whichHis } = this.props;
        const historyItem = whichHis.params;
        return (
            <View className="news-item">
                {
                    historyItem.imgCover &&
                    <View className="imgCover">
                        <Image
                        className="imgCover-img"
                        lazyLoad={true}
                        src={historyItem.imgCover}
                        mode="widthFix" />
                        <View className="placeholder" />
                    </View>
                }

                <View className="at-article">
                    <View className="news-header">
                        <Text className="title">{historyItem.title}</Text>
                        <View className="info">
                            <Text className="at-article__info info-item">
                                {
                                    historyItem.date &&
                                    historyItem.date.includes(" ")
                                    ?
                                    historyItem.date.split(" ")[0]
                                    :
                                    historyItem.date
                                }
                            </Text>
                            {
                                historyItem.author&&
                                <Text className="at-article__info info-item">
                                    {historyItem.author}
                                </Text>
                            }
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
}

export default Article;
