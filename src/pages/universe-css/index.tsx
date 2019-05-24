import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./stars.scss";

class UniverseCss extends Component {
    constructor(preps) {
        super(preps);
    }

    config:object = {
        navigationBarTitleText: "ASTRON",
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#0c1016",
        navigationBarTextStyle: "white"
    };

    render() {
        return(
                <View className="universe-box">
                    <View className="universe-bg">
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

export default UniverseCss;
