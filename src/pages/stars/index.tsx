import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import "@tarojs/async-await";
import { obtainStars } from "@/api";
import Details from "./components/details";
import Parameter from "./components/parameter";
import "./main.scss";

type ITabs = {};

type IStar = {
    _id: string,
    title?: string,
    name: string,
    engName: string,
    desc: string,
    imgLink: string,
    data01: string,
    data02: string,
    data11: string,
    data12: string,
    data21: string,
    data22: string,
    details: string,
    params: string
};

type IState = {
    current: number,
    whichTab: number,
    stars: []
};
class Stars extends Component<ITabs, IState> {
    constructor (props) {
        super(props);
        this.state = {
            current: 0,
            whichTab: 0,
            stars: []
        };
        // star 的切换
        this.handleClick = this.handleClick.bind(this);
    }

    config:object = {
        navigationBarTitleText: "ASTRON",
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#040b1b",
        navigationBarTextStyle: "white"
    };

    async componentWillMount () {
        obtainStars().then((res) => {
            const response = res.data;
            this.setState({
                stars: response
            });
        });
    }

    // taro 组件的点击 要重写 TODO
    handleClick (value) {
        this.setState({
            current: value
        });
    }

    // 详情与参数的切换
    handleClickTab (value) {
        this.setState({
            whichTab: value
        });
    }

    /**
     * @desc 跳转 universe-css
     */
    toPage() {
        Taro.navigateTo({
            url: "/pages/universe-css/index"
        });
    }

    /**
     * 排序
     * @param property 按照的值
     */
    compare(property:string|number){
        return function(a,b){
            const value1 = a[property];
            const value2 = b[property];
            return value1 - value2;
        };
    }

    render () {
        const tabList=this.state.stars.sort(this.compare("sort"));

        console.log("tabList",tabList);
        tabList.forEach((star:IStar) => {
            star.title = star.name;
        });
        const tabList2=[
            { title: "详情" },
            { title: "参数特征" }
        ];
        return (
            <View className="scroll-view-style">
                <AtTabs
                    className=""
                    swipeable={true}
                    animated={false}
                    current={this.state.current}
                    scroll={true}
                    tabList={tabList}
                    onClick={this.handleClick}>

                    {
                        this.state.stars&&this.state.stars!==[]&&this.state.stars.map((star:IStar) =>
                            <AtTabsPane key={star._id} current={this.state.current} index={tabList.indexOf(star)}>
                                <View className="tab-item-box">
                                    {/* 头部 */}
                                    <View className="tab-header-box">

                                        <View className="stars-bulingbuling" />

                                        {/* 文字定位 */}
                                        <View className="text-box">
                                            <View className="name">{star.engName.toLocaleUpperCase()}</View>
                                            <View className="desc">{star.desc}</View>
                                        </View>

                                        <View onClick={this.toPage} className="universe-box" />

                                        {/* 星球图 */}
                                        <View className="star-box">
                                            <Image
                                                className="star-img"
                                                mode="aspectFit"
                                                src={star.imgLink} />
                                        </View>

                                        <View className="desc-box">
                                            <View className="desc-item">
                                                <View className="desc">{star.data02}</View>
                                                <View className="name">{star.data01}</View>
                                            </View>
                                            <View className="desc-item">
                                                <View className="desc">{star.data12}</View>
                                                <View className="name">{star.data11}</View>
                                            </View>
                                            <View className="desc-item">
                                                <View className="desc">{star.data22}</View>
                                                <View className="name">{star.data21}</View>
                                            </View>
                                        </View>
                                    </View>

                                    {/* 内容 */}
                                    <View className="tab-content-box">
                                        <View className="tab-content-header">
                                            <View onClick={this.handleClickTab.bind(this, 0)} className="tab-content-header-item">
                                                {tabList2[0].title}
                                                <View className={this.state.whichTab===0?"tab-item-underline tab-underline":"tab-item-underline"} />
                                            </View>
                                            <View onClick={this.handleClickTab.bind(this, 1)} className="tab-content-header-item">
                                                {tabList2[1].title}
                                                <View className={this.state.whichTab===1?"tab-item-underline tab-underline":"tab-item-underline"} />
                                            </View>
                                        </View>

                                        {
                                            this.state.whichTab===0 ?
                                            <View className="tab-content-details">
                                                <View className="at-article__h3 article-title">THE {star.engName.toLocaleUpperCase()}</View>
                                                <Details content={star.details} />
                                            </View>
                                            :
                                            <View className="tab-content-parameter">
                                                <Parameter content={star.params} />
                                            </View>
                                        }

                                    </View>
                                </View>
                            </AtTabsPane>
                        )
                    }

                </AtTabs>
            </View>
        );
    }
}

export default Stars;
