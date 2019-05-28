import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtIndexes } from "taro-ui";
// import { obtainHistory } from "@/api";
import "../mian.scss";

type IHistory = {
    _id: number,
    title: string,
    author: string,
    content: string,
    desc: string,
    date: string,
    imgCover: string
};

interface InfoIndex {
    state: {
        current: number,
        historyData: [IHistory]
    };
}

class InfoIndex extends Component {
    constructor(p) {
        super(p);
        this.state = {
            current: 0,
            historyData: []
        };
    }

    handleClick (value) {
        this.setState({
            current: value
        });
    }

    render() {
        return(
            <View className="info-index">
                {/* <AtIndexes /> */}
index
            </View>
        );
    }
}

export default InfoIndex;
