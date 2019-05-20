import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";


export default class TabsPane extends Taro.Component {
    constructor () {
        super(...arguments);
        this.state = {
            current: 0,
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick (value) {
        this.setState({
            current: value
        });
    }
    render () {
        const tabList=[
            { title: "111", iconType: "../../assets/icon/like.png" },
            { title: "标签页2", icon: "../../assets/icon/like.png" },
            { title: "标签页3" },
            { title: "标签页4", iconType: "camera" },
            { title: "标签页5" },
            { title: "标签页6" }
        ];
        return (
            <AtTabs
                swipeable={true}
                animated={true}
                current={this.state.current}
                scroll={true}
                tabList={tabList}
                onClick={this.handleClick}>
                <AtTabsPane current={this.state.current} index={0} className={[]}>
                    <View style="font-size:18px;text-align:center;height:100px;"><Image mode="center" src="../../assets/icon/like.png" /></View>
                </AtTabsPane>
                <AtTabsPane current={this.state.current} index={1}>
                    <View style="font-size:18px;text-align:center;height:100px;">标签页二的内容</View>
                </AtTabsPane>
                <AtTabsPane current={this.state.current} index={2}>
                    <View style="font-size:18px;text-align:center;height:100px;">标签页三的内容</View>
                </AtTabsPane>
                <AtTabsPane current={this.state.current} index={3}>
                    <View style="font-size:18px;text-align:center;height:100px;">标签页四的内容</View>
                </AtTabsPane>
                <AtTabsPane current={this.state.current} index={4}>
                    <View style="font-size:18px;text-align:center;height:100px;">标签页五的内容</View>
                </AtTabsPane>
                <AtTabsPane current={this.state.current} index={5}>
                    <View style="font-size:18px;text-align:center;height:100px;">标签页六的内容</View>
                </AtTabsPane>
            </AtTabs>
        );
    }
}
