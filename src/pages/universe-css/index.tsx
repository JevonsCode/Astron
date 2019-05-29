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

    onShareAppMessage() {
        return {
            title: "ASTRON - 点燃你探索宇宙的心",
            path: "/pages/universe-css/index",
            // imageUrl: "/assets/img/Astron.png",
            success (res) {
                console.log(res);
                console.log("转发成功:" + JSON.stringify(res));
            },
            fail (res) {
              // 转发失败
                console.log("转发失败:" + JSON.stringify(res));
            }
        };
    }

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
                    <View className="universe-desc-box">
                        <View className="universe-desc-item">Solar System orbit animation true time scaled</View>
                        <View className="universe-desc-item">Made with by Malik Dellidj</View>
                    </View>
                </View>
        );
    }
}

export default UniverseCss;
