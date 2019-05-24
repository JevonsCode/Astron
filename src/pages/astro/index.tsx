import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
// import SearchBar from "../../components/search-bar/index";

class Astro extends Component {
    config = {
        navigationBarTitleText: "ASTRON"
    };

    // async componentWillMount() {
    // }

    render() {
        return(
            <View>
                <View>头部</View>
                <View>内容</View>
            </View>
        );
    }
}

export default Astro;
