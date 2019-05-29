import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import { obtainHistory, obtainSortHistory } from "@/api";
import ImgBox from "./components/img-box";
import InfoIndex from "./components/info-index";
// import SearchBar from "../../components/search-bar/index";
import "./mian.scss";

type IHistory = {
    _id: number,
    title: string,
    author: string,
    content: string,
    desc: string,
    date: string,
    imgCover: string
};

interface Astro {
    state: {
        current: number,
        historyData: IHistory[],
        historySortData: IHistory[]
    };
}

class Astro extends Component {
    constructor(p) {
        super(p);
        this.state = {
            current: 0,
            historyData: [],
            historySortData: []
        };
    }

    config: Config = {
        navigationBarTitleText: "ASTRON",
        // 下拉刷新
        enablePullDownRefresh: true
    };

    onPullDownRefresh() {
        Taro.showNavigationBarLoading();
        obtainHistory().then((r) => {
            Taro.stopPullDownRefresh();
            Taro.hideNavigationBarLoading();
            this.setState({
                historyData: r.data
            });
        }).catch((e) => {
            Taro.stopPullDownRefresh();
            Taro.hideNavigationBarLoading();
            Taro.showToast({
                title: "历史资料请求超时0.1 QAQ",
                icon: "none",
                mask: true,
                duration: 1200
            });
        });

        obtainSortHistory().then((r) => {
            this.setState({
                historySortData: r.data
            });
            Taro.showToast({
                title: "刷新成功 : )",
                icon: "none",
                mask: true,
                duration: 1200
            });
        }).catch((e) => {
            Taro.stopPullDownRefresh();
            Taro.hideNavigationBarLoading();
            Taro.showToast({
                title: "历史资料请求超时0.2 QAQ",
                icon: "none",
                mask: true,
                duration: 1200
            });
        });
    }

    onShareAppMessage() {
        return {
            title: "ASTRON - 点燃你探索宇宙的心",
            path: "/pages/history/index",
            // imageUrl: "/assets/img/Astron.png",
            success (res) {
                console.log(res);
                console.log("转发成功:" + JSON.stringify(res));
            },
            fail (res) {
              // 转发失败
                console.log("转发失败:" + JSON.stringify(res));
            }
        };
    }

    componentWillMount() {
        obtainHistory().then((r) => {
            this.setState({
                historyData: r.data
            });
        }).catch((e) => {
            Taro.showToast({
                title: "历史资料请求超时 QAQ",
                icon: "none",
                mask: true,
                duration: 1200
            });
        });
        obtainSortHistory().then((r) => {
            this.setState({
                historySortData: r.data
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

    handleClick (value) {
        this.setState({
            current: value
        });
    }

    render() {
        const tabList=[
            { title: "全部" },
            { title: "时间线" }
        ];
        return(
            <View className="history-style">
                <View className="history-header-box">
                    航空历史
                </View>
                <View>
                    <AtTabs
                        swipeable={true}
                        animated={true}
                        current={this.state.current}
                        onClick={this.handleClick}
                        tabList={tabList}>
                        <AtTabsPane current={this.state.current} index={0}>
                            <ImgBox data={this.state.historyData} />
                        </AtTabsPane>
                        <AtTabsPane current={this.state.current} index={1}>
                            <InfoIndex data={this.state.historySortData} />
                        </AtTabsPane>
                    </AtTabs>

                </View>

            </View>
        );
    }
}

export default Astro;
