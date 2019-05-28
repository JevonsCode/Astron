import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import { obtainHistory } from "@/api";
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
        historyData: IHistory[]
    };
}

class Astro extends Component {
    constructor(p) {
        super(p);
        this.state = {
            current: 0,
            historyData: []
        };
    }

    config = {
        navigationBarTitleText: "ASTRON"
    };

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
                            <InfoIndex />
                        </AtTabsPane>
                    </AtTabs>

                </View>

            </View>
        );
    }
}

export default Astro;
