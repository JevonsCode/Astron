import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
// import SearchBar from "../../components/search-bar/index";
import TabsPane from "@/components/tabs-pane/index";

class ShowNews extends Component {
    config = {
        navigationBarTitleText: "我是一个页面"
    };

    async componentWillMount() {
    }

    render() {
        return(
            <View>
                <TabsPane />
                <View className="page-temp">
                    333
                </View>
            </View>
        );
    }
}

export default ShowNews;
