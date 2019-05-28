import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { hot_news } from "@/api";
import "./main.scss";

type ISBanner = {
    _id: string,
    title: string,
    author: string,
    content: string,
    desc: string,
    date: string,
    imgCover: string,
    tip: [string]
};

interface SliderBanner {
    props: {
        whichNews: {
            news: [ISBanner]
        }
        data: ISBanner[]
    };

    // state: {
    //     newDataArr: [ISBanner]
    // };
}

@inject("whichNews")
@observer
class SliderBanner extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     newDataArr: []
        // };
    }

    componentWillMount() {
        // hot_news().then((r) => {
        //     if(r.data.code==="1000") {
        //         this.setState({
        //             newDataArr: r.data.msg
        //         });
        //     }
        // });
    }

    /**
     * 数组去重
     * @param array 数组
     */
    // arrUniq(array){
    //     const temp:any = [];
    //     const index:any = [];
    //     const l = array.length;
    //     for(let i = 0; i < l; i++) {
    //         for(let j = i + 1; j < l; j++){
    //             if (array[i] === array[j]){
    //                 i++;
    //                 j = i;
    //             }
    //         }
    //         temp.push(array[i]);
    //         index.push(i);
    //     }
    //     return temp;
    // }

    // 样式用全局要加这个
    static options = {
        addGlobalClass: true
    };

    render() {
        const newsItem = this.props.data;

        return(
            <View className="slider-style">
                <View
                    className="slider-scroll">
                    {
                        newsItem.map(item => (
                            <View
                                className="item-slider"
                                key={item._id}
                                onClick={this.toPage.bind(this, item)}>
                                <Image
                                    className="img"
                                    lazyLoad={true}
                                    src={item.imgCover ? item.imgCover : "https://qiniu.jevons.xyz/mock/starMock.gif"}
                                    mode="aspectFill"
                                />
                                <View className="text-box">
                                    <Text className="tip">{item.tip ? item.tip : "HOT"}</Text>
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
