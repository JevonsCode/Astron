import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import "../mian.scss";

type IHistory = {
    _id: number,
    title: string,
    author?: string,
    content: string,
    desc: string,
    date: string,
    imgCover: string
};

interface ImgBox {
    props: {
        whichHis: {
            params: IHistory
        },
        data: IHistory[]
    };
}

@inject("whichHis")
@observer
class ImgBox extends Component {
    constructor(p) {
        super(p);
    }

    render() {
        const { data:historyData } = this.props;
        // console.log("this.props.historyData", historyData);
        return(
            <View className="img-box">
                {
                    historyData.map((item) => {
                        return (
                            <View onClick={this.clickItem.bind(this, item)} className="img-item" key={item._id}>
                                <Image
                                    lazyLoad={true}
                                    className="item-img"
                                    mode="aspectFill"
                                    src={item.imgCover ? item.imgCover : "https://qiniu.jevons.xyz/mock/starMock.gif"} />
                                <View className="item-info">
                                    <Text className="item-title">{item.title}</Text>
                                    <Text className="item-desc">{item.desc}</Text>
                                </View>
                            </View>
                        );
                    })
                }
            </View>
        );
    }

    /**
     * 跳转
     * @param item 历史 item
     */
    clickItem(item) {
        // if(this.state.isClick === true) return;

        const { whichHis } = this.props;
        whichHis.params = item;
        Taro.navigateTo({
            url: "/pages/history-item/index"
        });
    }
}

export default ImgBox;
