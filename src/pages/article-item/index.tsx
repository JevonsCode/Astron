import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { collections_add } from "@/api";
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
    };

}

type IState = {
    isStar: boolean,
    toastText: string,
    isOpened: boolean
};

@inject("whichNews", "userInfo")
@observer
class Article extends Component<IProps, IState> {
    constructor() {
        super();

        this.state = {
            isStar: false,
            toastText: "",
            isOpened: false
        };
    }

    config = {
        navigationBarTitleText: "Article"
    };

    componentDidMount () {
        const article = this.props.whichNews.params.content;
        WxParse.wxParse("article", "html", article, this.$scope, 5);
    }

    render () {
        const _id = this.props.userInfo._id;
        const { whichNews } = this.props;
        const news = whichNews.params;
        const collections = this.props.userInfo.collections;
        console.log("whichNews:", news);
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
                        {
                            _id
                            ?
                            // TODO 后期优化
                            collections.indexOf(news._id) > -1 ?
                            <Button loading={this.state.isStar} disabled={this.state.isStar} className="at-icon at-icon-star-2 collect collect-btn" onClick={this.notCollect.bind(this, news._id)} /> :
                            <Button loading={this.state.isStar} disabled={this.state.isStar} className="at-icon at-icon-star collect collect-btn" onClick={this.collect.bind(this, news._id)} />
                            :
                            <Button
                            loading={this.state.isStar}
                            disabled={this.state.isStar}
                            className="at-icon at-icon-star collect collect-btn"
                            open-type="getUserInfo"
                            onGetUserInfo={this.getUserInfo}
                            onClick={this.collect.bind(this, news._id)} />
                        }
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

    /**
     *
     * @param id 这是文章的 `_id` ！！！
     */
    collect(id) {
        this.setState({
            isStar: true
        });
        // 是否有id
        const _id = this.props.userInfo._id;
        if(!_id) {
            // 获取不到 _id 一定是没有登录 我不承认我代码问题！
            this.setState({
                isStar: false
            });
            Taro.showToast({
                title: "没有登录~",
                icon: "none",
                mask: true,
                duration: 1200
            });
            // this.getUserInfo();
            return false;
        }

        // 确保登录了 继续
        const colArr = this.props.userInfo.collections.slice(); // 转化正常的数组
        colArr.push(id);
        const req = {
            _id,
            collections: colArr
        };
        collections_add(req).then((e) => {
            console.log("添加收藏返回的结果",e);

            if(e.data.code==="1000" || e.data.code==="0000") {
                this.setState({
                    isStar: false
                });
                // 添加到 mobx
                this.props.userInfo.collections.push(id);
                Taro.showToast({
                    title: "收藏成功~",
                    icon: "none",
                    mask: true,
                    duration: 1200
                });
            } else {
                this.setState({
                    isStar: false
                });
                Taro.showToast({
                    title: "收藏失败~",
                    icon: "none",
                    mask: true,
                    duration: 1200
                });
            }
        }).catch((e) => {
            this.setState({
                isStar: false
            });
            // TODO 埋点 e
            Taro.showToast({
                title: "收藏失败~",
                icon: "none",
                mask: true,
                duration: 1200
            });
        });
    }

    /**
     * 取消收藏 为了扩展 写成俩 (暂时?)
     * @param id 这是文章的 `_id` ！！！
     */
    notCollect(id) {
        this.setState({
            isStar: true
        });
        // 是否有id
        const _id = this.props.userInfo._id;
        // 取消基本没有用吧
        if(!_id) {
            // 获取不到 _id 一定是没有登录 我不承认我代码问题！
            this.setState({
                isStar: false
            });
            Taro.showToast({
                title: "BUG 001 请反馈",
                icon: "none",
                mask: true,
                duration: 1200
            });
            return false;
        }

        // 确保登录了 继续
        const colArr = this.props.userInfo.collections.slice(); // 转化正常的数组

        console.log(111, this.props.userInfo.collections, colArr);
        console.log(222, this.props.userInfo.collections.slice());
        colArr.splice(colArr.indexOf(id),1); // 删除这个后的数组发给服务器
        // colArr 现在是删除后的
        const req = {
            _id,
            collections: colArr
        };
        collections_add(req).then((e) => {
            console.log("添加收藏返回的结果",e);

            if(e.data.code==="1000") {
                this.setState({
                    isStar: false
                });
                // 从 mobx 中删除
                this.props.userInfo.collections.remove(id);
                Taro.showToast({
                    title: "取消成功~",
                    icon: "none",
                    mask: true,
                    duration: 1200
                });
            } else {
                this.setState({
                    isStar: false
                });
                Taro.showToast({
                    title: "取消失败~",
                    icon: "none",
                    mask: true,
                    duration: 1200
                });
            }
        }).catch((e) => {
            this.setState({
                isStar: false
            });
            // TODO 埋点 e
            Taro.showToast({
                title: "取消失败~",
                icon: "none",
                mask: true,
                duration: 1200
            });
        });
    }

    // 原生方法拿信息
    getUserInfo = (userInfo) => {
        if(userInfo.detail&&userInfo.detail.userInfo){ //同意
            console.log("userInfo.detail",userInfo.detail);
            this.props.userInfo.isGetUserInfo(userInfo.detail.userInfo);
        } else { //拒绝,保持当前页面，直到同意
        }
    }
}

export default Article;
