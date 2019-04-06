import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./stars.scss";

class ShowNews extends Component {
    constructor(preps) {
        super(preps);
    }

    config = {
        navigationBarTitleText: "I'm a page ~"
    };

    render() {
        return(
                <View className="wwww">
                    <View className="bodyw">
                        <View className="solar-syst">
                            <View className="sun"/>
                            <View className="mercury"/>
                            <View className="venus"/>
                            <View className="earth"/>
                            <View className="mars"/>
                            <View className="jupiter"/>
                            <View className="saturn"/>
                            <View className="uranus"/>
                            <View className="neptune"/>
                            <View className="pluto"/>
                            <View className="asteroids-belt"/>
                        </View>
                    </View>
                </View>
        );
    }
}

export default ShowNews;
