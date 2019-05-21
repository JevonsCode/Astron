import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import UniverseCss from "../../components/universe-css";
import TabsPane from "@/components/tabs-pane/index";
import "./index.scss";

class Stars extends Component {
    constructor(preps) {
        super(preps);
    }

    config = {
        navigationBarTitleText: "ASTRON",
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#000",
        navigationBarTextStyle: "white"
    };

    render() {
        return(
            <View className="">
                {/* <UniverseCss /> */}
                <TabsPane />
            </View>
        );
    }
}

export default Stars;
