import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import "./index.scss";

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
    imgCover?: string
};

@inject("whichNews")
@observer
class NewsItem extends Component {
    constructor(props) {
        super(props);
    }

    // 样式用全局要加这个
    static options = {
        addGlobalClass: true
    };

    render() {
        const { data: newsItem } = this.props;

        return(
            <View className="card-style my-3" onClick={this.toPage.bind(this, newsItem)}>
                <View>
                    {
                        newsItem.imgCover &&
                        <Image
                            className="img"
                            src={newsItem.imgCover}
                            mode="widthFix"
                        />
                    }
                    <View className="title my-1 mx-2">
                        <Text>{newsItem.title}</Text>
                    </View>
                    <View className="desc my-1 mx-2">
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
        const { whichNews } = this.props;
        whichNews.params = newsItem;
        Taro.navigateTo({
            url: "/pages/show-news-item/index"
        });
    }
}

export default NewsItem;
