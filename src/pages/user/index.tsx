import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import SearchBar from "../../components/search-bar/index";

class ShowNews extends Component {
    config = {
        navigationBarTitleText: "我也是一个页面"
    };

    switchTab() {
        Taro.switchTab({
            url: "../showNews/index"
        });
    }

    render() {
        return(
            <View>
                <View className="page-demo">
                    <Text className="mx-1" onClick={this.switchTab.bind(this)}>gogogo</Text>
                </View>
            </View>
        );
    }
}

export default ShowNews;
