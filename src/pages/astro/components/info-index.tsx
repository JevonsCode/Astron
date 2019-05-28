import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { obtainSortHistory } from "@/api";
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

interface InfoIndex {
    props: {
        whichHis: {
            params: IHistory
        }
    };
    state: {
        sortHistoryData: [IHistory]
    };
}

@inject("whichHis")
@observer
class InfoIndex extends Component {
    constructor(p) {
        super(p);

        this.state = {
            sortHistoryData: []
        };
    }

    componentWillMount() {
        obtainSortHistory().then((r) => {
            this.setState({
                sortHistoryData: r.data
            });
        }).catch((e) => {
            Taro.showToast({
                title: "历史资料请求超时0.2 QAQ",
                icon: "none",
                mask: true,
                duration: 1200
            });
        });
    }

    render() {
        const sortHistoryData = this.state.sortHistoryData;
        return(
            <View className="img-box">
                {
                    sortHistoryData.map((item) => {
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

export default InfoIndex;
