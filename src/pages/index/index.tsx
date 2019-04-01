import { ComponentType } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import "@tarojs/async-await";

import { AtButton, AtList, AtListItem, AtCurtain } from "taro-ui";

import "./index.scss";
import { values } from "mobx";

type PageStateProps = {
    counterStore: {
        counter: number,
        increment: Function,
        decrement: Function,
        incrementAsync: Function
    }
};

interface Index {
    props: PageStateProps;
}

@inject("counterStore")
@observer
class Index extends Component {
/**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
    config: Config = {
        navigationBarTitleText: "首页"
    };

    state = {
        news: [],
        isOpened: true,
    };
    onClose () {
        this.setState({
            isOpened: false
        });
    }

    async componentWillMount () {
        const response = await Taro.request({
            url: `${ API_WS }`
        });

        console.log(response,"response!");
        this.setState({
            news: response.data.news
        });
    }

    componentWillReact () {
        console.log("componentWillReact");
    }

    componentDidMount () { }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    increment = () => {
        const { counterStore } = this.props;
        counterStore.increment();
    }

    decrement = () => {
        const { counterStore } = this.props;
        counterStore.decrement();
    }

    incrementAsync = () => {
        const { counterStore } = this.props;
        counterStore.incrementAsync();
    }

    render () {
        const { counterStore: { counter } } = this.props;
        const { news } = this.state;
        return (
	<View className="index">
		<AtCurtain
			isOpened={this.state.isOpened}
			onClose={this.onClose.bind(this)}
		>
			<Image style="width:100%;height:250px" src="https://astron.db.jevons.xyz/src/default/star.gif" />
      	</AtCurtain>
		<AtList>
			{
				news.map(newsItem =>
					<AtListItem
						key={newsItem.id}
						arrow="right"
						thumb={newsItem.picture}
						title={newsItem.title}
						note={newsItem.content}
						// extraText="1234567898765432"
						// extraThumb={ newsItem.picture }
					/>
				)
			}
		</AtList>
		<Text numberOfLines={1}>{news[0].content}</Text>
	</View>
        );
    }
}

export default Index  as ComponentType;
