import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import SearchBar from "../../components/search-bar/index";

class ShowNews extends Component {
    config = {
        navigationBarTitleText: "我是一个页面"
    };

    render() {
        return(
            <View>
                <SearchBar />
                <View className="page-demo">
                    333
                </View>
            </View>
        );
    }
}

export default ShowNews;
