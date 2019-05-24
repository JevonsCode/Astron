import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Swiper, SwiperItem, Video, ScrollView } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import "./main.scss";
import { randomBytes } from "crypto";

interface SliderBanner {
    props: {
        whichNews: {
            params: {}
        }
    };
}

type ISBanner = {
    _id: string,
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
class SliderBanner extends Component {
    constructor(props) {
        super(props);
    }

    // 样式用全局要加这个
    static options = {
        addGlobalClass: true
    };

    render() {
        const mockData = [
            {
                title: "这个是一个小新闻啊",
                _id: "123",
                tip: "Astronauts",
                imgCover: "https://qiniu.jevons.xyz/mock/mock.jpg",
                content: "在Button上加上属性open-type=share,点击Button按钮，即可给好友分享。不加onShareAppMessage函数，分享的地址，连接都是默认生成的。如是要自定义分享给好友的地址，连接等就要自己写onShareAppMessage函数",
                author: "who",
                desc: "在Button上加上属性open-type=sh",
                date: "2019-5-20 20:14:07"
            },
            {
                title: "这个是一个小新闻123123123132123123123123",
                _id: "123",
                tip: "Astronauts",
                imgCover: "https://qiniu.jevons.xyz/mock/mock.jpg",
                content: "在Button上加上属性open-type=share,点击Button按钮，即可给好友分享。不加onShareAppMessage函数，分享的地址，连接都是默认生成的。如是要自定义分享给好友的地址，连接等就要自己写onShareAppMessage函数",
                author: "who",
                desc: "在Button上加上属性open-type=sh",
                date: "2019-5-20 20:14:07"
            },
            {
                title: "这个是一个小新闻",
                _id: "123",
                tip: "TIP",
                imgCover: "https://qiniu.jevons.xyz/mock/mock.jpg",
                content: "在Button上加上属性open-type=share,点击Button按钮，即可给好友分享。不加onShareAppMessage函数，分享的地址，连接都是默认生成的。如是要自定义分享给好友的地址，连接等就要自己写onShareAppMessage函数",
                author: "who",
                desc: "在Button上加上属性open-type=sh",
                date: "2019-5-20 20:14:07"
            }
        ];
        return(
            <View className="slider-style">
                <View
                    className="slider-scroll">
                    {
                        mockData.map((item) => (
                            <View
                                className="item-slider"
                                key={item._id}
                                onClick={this.toPage.bind(this, item)}>
                                <Image
                                    className="img"
                                    src={item.imgCover}
                                    mode="aspectFill"
                                />
                                <View className="text-box">
                                    <Text className="tip">{item.tip}</Text>
                                    <Text className="title">{item.title}</Text>
                                </View>
                            </View>
                        ))
                    }
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
            url: "/pages/article-item/index"
        });
    }
}

export default SliderBanner;
