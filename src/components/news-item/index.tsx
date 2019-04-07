import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";

interface NewsItem {
    props: {
        data: newsItem
    };
}

type newsItem = {
    id: number,
    title: string,
    content: string,
    picture: string[]
};

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
            <View>
                <Image
                    src={Array.isArray(newsItem.picture) ? newsItem.picture[0] : newsItem.picture}
                    mode="aspectFit"
                />
                <View>
                    <View>{newsItem.title}</View>
                </View>
            </View>
        );
    }
}

export default NewsItem;
