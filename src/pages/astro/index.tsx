import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
// import SearchBar from "../../components/search-bar/index";

class Astro extends Component {
    constructor(p) {
        super(p);
        this.state = {
            current: 0
        };
    }

    config = {
        navigationBarTitleText: "ASTRON"
    };

    // async componentWillMount() {
    // }

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
            <View>
                <View>头部</View>
                <View>内容</View>
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
        );
    }
}

export default Astro;
