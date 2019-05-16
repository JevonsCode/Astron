import { ComponentType } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
// import { observer, inject } from "@tarojs/mobx";
import "@tarojs/async-await";
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
        navigationBarTitleText: "首页"
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
