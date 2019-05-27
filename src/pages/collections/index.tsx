import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import "./main.scss";

interface Collections {
    state: {

    };

    props: {

    };
}

@inject("userInfo")
@observer
class Collections extends Component {
    constructor(preps) {
        super(preps);
    }

    config = {
        navigationBarTitleText: "ASTRON"
    };

    componentWillMount() {

    }

    render() {
        // console.log("this.props.userInfo.info.avatarUrl", this.props.userInfo.info.avatarUrl);
        return(
            <View className="collections-style">
               213Collections
            </View>
        );
    }
}

export default Collections;
