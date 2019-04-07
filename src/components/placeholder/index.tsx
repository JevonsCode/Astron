import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import classNames from "classnames"; // 这是一个包

interface Placeholder {
    props: {
        isShow: boolean,
        quantity: string,
        className: string
    };
}

class Placeholder extends Component {
    constructor(props) {
        super(props);
    }

    static options = {
        addGlobalClass: true
    };

    // [Taro warn] 请给组件提供一个 `defaultProps` 以提高初次渲染性能！
    static defaultProps = {
        className: "",
        quantity: 2,
        isShow: false
    };

    render() {
        const classValue = classNames(
            "ui placeholder",
            this.props.className
        );

        const quantity = parseInt(this.props.quantity);
        const placeholderItems = [...Array(quantity).keys()];

        const { isShow } = this.props;

        return(
            <View>
                {
                    isShow &&
                    placeholderItems.map(i =>
                        <View key={i} className={classValue}>
                            <View className="image rectangular"/>
                            <View className="line"/>
                            <View className="very short line"/>
                        </View>
                    )
                }
            </View>
        );
    }
}

export default Placeholder;
