import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "../main.scss";

interface Parameter {
    props: {
        content: string
    };
    state: {
        paramsArr: []
    };
}

class Parameter extends Component {
    constructor (props) {
        super(props);
        this.state = {
            paramsArr: []
        };
    }

    componentWillMount() {
        this.parameterFormat(this.props.content);
    }

    /**
     * 把字符串分成数组  奇怪的是 react 不是要setstate吗 TODO
     * @param arr 参数字符串
     */
    parameterFormat(arr) {
        // this.state.paramsArr = arr.split("#F#");
        this.setState({
            paramsArr: arr.split("#F#")
        });
    }

    render () {
        // console.log(this.state.paramsArr);
        const listKey = [
            "到地球的平均距离",
            "半径",
            "体积",
            "质量",
            "密度",
            "表面面积",
            "地心引力",
            "日照长度",
            "年长",
            "轨道速度",
            "表面温度",
            "大气成分"
        ];
        return (
            <View className="parameter-box">
                {
                    listKey.map((param, index) => {
                        return (
                            <View key={param} className="parameter-line">
                                <View className="key">{param}</View>
                                <View className="value">{this.state.paramsArr[index]}</View>
                            </View>
                        );
                    })
                }

            </View>
        );
    }
}
export default Parameter;
