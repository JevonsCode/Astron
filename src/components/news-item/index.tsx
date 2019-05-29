import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Button } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import "./main.scss";

interface NewsItem {
    props: {
        data: newsItem,
        whichNews: {
            params: {}
        }
    };
    state: {
        isClick: boolean
    };
}

type newsItem = {
    _id: number,
    title: string,
    author: string,
    content: string,
    desc: string,
    date: string,
    imgCover?: string,
    tip?: string
};

@inject("whichNews")
@observer
class NewsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClick: false
        };
    }

    // 样式用全局要加这个
    static options = {
        addGlobalClass: true
    };

    render() {
        const { data: newsItem } = this.props;

        return(
            <View className="card-style mt-3 pb-3" onClick={this.toPage.bind(this, newsItem)}>
                <View className="newsItem-box">
                    {
                        newsItem.imgCover &&
                        <Image
                            className="img"
                            src={newsItem.imgCover}
                            mode="widthFix"
                            lazyLoad={true}
                        />
                    }

                    {
                        newsItem.imgCover &&
                        <Text className="tip">{newsItem.tip ? newsItem.tip : "COMMUNITY"}</Text>
                    }

                    <View className="title">
                        <Text>{newsItem.title}</Text>
                        <Button
                            className="at-icon at-icon-share share-icon"
                            onClick={this.share}
                            dataset={newsItem.title}
                            openType="share" />
                    </View>

                    {
                        !newsItem.imgCover &&
                        <Text className="tip">{newsItem.tip ? newsItem.tip : "COMMUNITY"}</Text>
                    }

                    <View className="desc">
                        <Text>{newsItem.desc}</Text>
                    </View>

                </View>
            </View>
        );
    }

    /**
     * @desc 跳转带值 这个传值现在靠mobx 不知道怎么直接给。。。 这个taro文档。。。
     * @param {object} newsItem newsItem
     */
    toPage(newsItem) {
        if(this.state.isClick === true) return;

        const { whichNews } = this.props;
        whichNews.params = newsItem;
        Taro.navigateTo({
            url: "/pages/article-item/index"
        });
    }

    /**
     * @desc 分享
     */
    share() {
        const that = this;
        // 防止重复 click
        // this.setState({
        this.state.isClick = true;
        // });
        setTimeout(() => {
            this.state.isClick = false;
        }, 300);
    }
    onShareAppMessage (res) {
        console.log("!!!");
        if (res.from === "button") {
          // 来自页面内转发按钮
            console.log(res.target);
        }
        return {
            title: "自定义转发标题",
            path: "/page/user?id=123"
        };
    }
}

export default NewsItem;
