import { ComponentType } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, ScrollView } from "@tarojs/components";
// import { observer, inject } from "@tarojs/mobx";
import "@tarojs/async-await";
import Banner from "../../components/banner";
import SliderBanner from "../../components/slider-banner";
import BlockTitle from "../../components/block-title";
import NewsItem from "../../components/news-item";
import Placeholder from "@/components/placeholder";
import { obtainNews } from "@/api";

// import { values } from "mobx";

type StateProps = {
    news:newsItem[];
    placeholder: boolean;
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
}

// @inject("whichNews")
// @observer
class Index extends Component {
    config: Config = {
        navigationBarTitleText: "ASTRON",
        // 下拉刷新
        enablePullDownRefresh: true
    };

    state:StateProps = {
        news: [],
        placeholder: true
    };

    async componentWillMount () {
        obtainNews().then((res) => {
            const response = res.data;
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
        <View className="page-index">

            <Placeholder className="m-3" quantity="10" isShow={placeholder} />

            <Banner />

            <BlockTitle title="Hot News" />

            <SliderBanner />

            <ScrollView className="scroll-view-style m-3">
                {
                    news.map(newsItem =>
                        <NewsItem data={newsItem} key={newsItem.id} />
                    )
                }
            </ScrollView>
        </View>
        );
    }
}

export default Index as ComponentType;
