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
                            open-type="share" />
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
        // 防止重复 click
        // this.setState({
        this.state.isClick = true;
        // });
        setTimeout(() => {
            this.state.isClick = false;
        }, 300);

        // console.log("123123", this.state.isClick);
    }

    // onShareAppMessage() {
    //     return {
    //         title: "弹出分享时显示的分享标题",
    //         desc: "分享页面的内容",
    //         // path: "/page/user?id=123" // 路径，传递参数到指定页面。
    //     };
    // }
}

export default NewsItem;
