import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import { obtainHistory } from "@/api";
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
        historyData: [IHistory]
    };
}

class Astro extends Component {
    constructor(p) {
        super(p);
        this.state = {
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
            { title: "详情" },
            { title: "参数特征" }
        ];
        return(
            <View className="history-style">
                <View className="history-header-box">
                    历史事件
                </View>
                <View>

                    <AtTabs
                        swipeable={true}
                        animated={true}
                        current={this.state.current}
                        onClick={this.handleClick}
                        tabList={tabList}>
                        <AtTabsPane current={this.state.current} index={0}>
                        qweqwe
                        </AtTabsPane>
                        <AtTabsPane current={this.state.current} index={1}>
                            112345346
                        </AtTabsPane>
                    </AtTabs>

                </View>

            </View>
        );
    }
}

export default Astro;
