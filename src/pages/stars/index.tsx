import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import "./index.scss";

type ITabs = {};

type IState = {
    current: number,
    currentTab: number,
    whichTab: number
};
class Stars extends Component<ITabs, IState> {
    constructor (props) {
        super(props);
        this.state = {
            current: 0,
            currentTab: 0,
            whichTab: 0
        };
        // star 的切换
        this.handleClick = this.handleClick.bind(this);
        // 标签内容切换
        this.handleClickTab = this.handleClickTab.bind(this);
    }

    config:object = {
        navigationBarTitleText: "ASTRON",
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#000",
        navigationBarTextStyle: "white"
    };

    handleClick (value) {
        this.setState({
            current: value
        });
    }

    handleClickTab (value) {
        this.setState({
            currentTab: value
        });
    }

    render () {
        const tabList=[
            { title: "月亮" },
            { title: "地球" },
            { title: "火星" },
            { title: "水星" },
            { title: "土星" },
            { title: "木星" }
        ];
        const tabList2=[
            { title: "详情" },
            { title: "参数特征" }
        ];
        return (
            <View className="scroll-view-style">
                <AtTabs
                    className=""
                    swipeable={true}
                    animated={true}
                    current={this.state.current}
                    scroll={true}
                    tabList={tabList}
                    onClick={this.handleClick}>
                    <AtTabsPane current={this.state.current} index={0}>
                        <View className="tab-item-box">
                            {/* 头部 */}
                            <View className="tab-header-box">

                                <View className="stars-bulingbuling" />

                                {/* 文字定位 */}
                                <View className="text-box">
                                    <View className="name">MOON</View>
                                    <View className="desc">地球唯一的天然卫星</View>
                                </View>

                                {/* 星球图 */}
                                <View className="star-box">
                                    <Image
                                        className="star-img"
                                        mode="aspectFit"
                                        src="https://qiniu.jevons.xyz/hp/31_earth_moon%E6%9C%88%E4%BA%AE.png" />
                                </View>

                                <View className="desc-box">
                                    <View className="desc-item">
                                        <View className="desc">385,464KM</View>
                                        <View className="name">距离地球</View>
                                    </View>
                                    <View className="desc-item">
                                        <View className="desc">24</View>
                                        <View className="name">人类造访次数</View>
                                    </View>
                                    <View className="desc-item">
                                        <View className="desc">100+</View>
                                        <View className="name">探测器登陆</View>
                                    </View>
                                </View>
                            </View>

                            {/* 内容 */}
                            <View className="tab-content-box">
                                <View className="tab-content-header">
                                    <View className="tab-content-header-item">
                                        详情
                                        <View className="tab-item-underline tab-underline" />
                                    </View>
                                    <View className="tab-content-header-item">
                                        参数特征
                                        <View className="tab-item-underline" />
                                    </View>
                                </View>

                                {
                                    this.state.whichTab===0 ?
                                    <View className="tab-content-details">
                                        1
                                    </View>
                                    :
                                    <View className="tab-content-parameter">
                                        2
                                    </View>
                                }

                            </View>
                        </View>
                    </AtTabsPane>
                </AtTabs>
            </View>
        );
    }
}

export default Stars;
