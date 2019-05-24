import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, Swiper, SwiperItem, Video } from "@tarojs/components";
import "./main.scss";

type IBlockTitle = {
    title: string
};

class BlockTitle extends Component <IBlockTitle> {
    constructor(props:IBlockTitle) {
        super(props);
    }

    // 样式用全局要加这个
    static options = {
        addGlobalClass: true
    };

    render() {
        const titleName:string = this.props.title || "☆";
        return(
            <View className="title-style my-3" onClick={this.toPage.bind(this, "newsItem")}>

                <Text className="title-style-text">{titleName}</Text>

            </View>
        );
    }

    /**
     * @desc 跳转带值 这个传值现在靠mobx 不知道怎么直接给。。。 这个taro文档。。。
     * @param {object} newsItem newsItem
     */
    toPage(newsItem) {
        // const { whichNews } = this.props;
        // whichNews.params = newsItem;
        // Taro.navigateTo({
        //     url: "/pages/article-item/index"
        // });
    }
}

export default BlockTitle;
