import { ComponentType } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import "@tarojs/async-await";
import Banner from "../../components/banner";
import SliderBanner from "../../components/slider-banner";
import BlockTitle from "../../components/block-title";
import NewsItem from "../../components/news-item";
import Placeholder from "@/components/placeholder";
import { obtainNews, hot_news } from "@/api";

// import { values } from "mobx";

type StateProps = {
    news:newsItem[],
    placeholder: boolean,
    newDataArr: newsItem[]
};

type newsItem = {
    _id: number,
    id: number,
    title: string,
    author:string,
    desc: string,
    date: string,
    content: string,
    imgCover?: string
};

interface Index {
    state: StateProps;
    props: {
        userInfo: {
            info: {
                nickName: string,
                avatarUrl: string
            },
            _id: string,
            collections: any, // TODO 数组
            getStorageInfo: Function,
            getStorageID: Function,
            onLoginByWeapp: Function,
            isGetUserInfo: Function
        },
        whichNews: {}
    };
}

@inject("userInfo", "whichNews")
@observer
class Index extends Component {
    constructor(props) {
        super(props);

        this.loadMore = this.loadMore.bind(this);
    }

    config: Config = {
        navigationBarTitleText: "ASTRON",
        // 下拉刷新
        enablePullDownRefresh: true
    };

    state:StateProps = {
        news: [],
        placeholder: true,
        newDataArr: []
    };

    /**
     * 下拉刷新
     */
    onPullDownRefresh() {
        Taro.showNavigationBarLoading();

        obtainNews().then((res) => {
            const response = res.data;
            this.props.whichNews = response;
            this.setState({
                news: response
            });
            Taro.showToast({
                title: "刷新成功 : )",
                icon: "none",
                mask: true,
                duration: 1200
            });
        }).catch((e) => {
            Taro.stopPullDownRefresh();
            Taro.hideNavigationBarLoading();
            Taro.showToast({
                title: "请求超时0000 : (",
                icon: "none",
                mask: true,
                duration: 1200
            });
        });

        hot_news().then((r) => {
            if(r.data.code==="1000") {
                Taro.stopPullDownRefresh();
                Taro.hideNavigationBarLoading();
                this.setState({
                    newDataArr: r.data.msg
                });
            }
        }).catch((e) => {
            Taro.stopPullDownRefresh();
            Taro.hideNavigationBarLoading();
            Taro.showToast({
                title: "请求超时0001 : (",
                icon: "none",
                mask: true,
                duration: 1200
            });
        });
    }

    async componentWillMount () {
        obtainNews().then((res) => {
            const response = res.data;

            this.props.whichNews = response;

            // 如果是开发环境就等2s
            if (process.env.NODE_ENV === "development") {
                console.log(response,"response! 开发模式ing");
                setTimeout(() => {
                    this.setState({
                        news: response,
                        placeholder: false
                    });
                }, 0);
            } else {
                this.setState({
                    news: response,
                    placeholder: false
                });
            }
        });

        hot_news().then((r) => {
            if(r.data.code==="1000") {
                this.setState({
                    newDataArr: r.data.msg
                });
            }
        });

        console.log("首页是否有信息呢","avatarUrl" in this.props.userInfo.info);
        console.log("首页是否有id信息呢",!!this.props.userInfo._id);

        // 首页获取登录态信息等
        !("avatarUrl" in this.props.userInfo.info) &&
        this.props.userInfo.getStorageInfo();

        !this.props.userInfo._id &&
        this.props.userInfo.getStorageID();
    }

    render () {
        const { news, placeholder } = this.state;
        return (
        <View className="page-index">

            <Placeholder className="m-3" quantity="10" isShow={placeholder} />

            <Banner />

            <BlockTitle title="Hot News" />

            <SliderBanner data={this.state.newDataArr} />

            <ScrollView
            enable-back-to-top={true}
            onScrollToLower={this.loadMore}
            className="scroll-view-style m-3">
                {
                    news.map(newsItem =>
                        <NewsItem data={newsItem} key={newsItem.id} />
                    )
                }
            </ScrollView>
        </View>
        );
    }

    /**
     * 上拉加载更多
     */
    loadMore() {
        // obtainNews().then((res) => {
        //     const response = res.data;
        //     this.props.whichNews = response;
        //     this.setState({
        //         news: response
        //     });
        //     Taro.showToast({
        //         title: "加载成功 : )",
        //         icon: "none",
        //         mask: true,
        //         duration: 1200
        //     });
        // }).catch((e) => {
        //     Taro.showToast({
        //         title: "请求超时0003 : (",
        //         icon: "none",
        //         mask: true,
        //         duration: 1200
        //     });
        // });
        console.log("---");
    }
}

export default Index as ComponentType;
