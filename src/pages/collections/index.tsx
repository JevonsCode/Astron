import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { collections_add, collections_which } from "@/api";
import "./mian-colls.scss";


interface Collections {
    state: {
        whichColls: [],
        btnDis: boolean
    };

    props: {
        userInfo: {
            whichColls: any // 数组
        }
    };
}

type newsItem = {
    _id: number,
    title: string,
    author: string,
    content: string,
    desc: string,
    date: string,
    imgCover?: string,
    tip?: string
};

@inject("userInfo")
@observer
class Collections extends Component {
    constructor(preps) {
        super(preps);
        this.state = {
            whichColls: [],
            btnDis: false
        };
        this.toPage = this.toPage.bind(this);
    }

    config = {
        navigationBarTitleText: "ASTRON"
    };

    componentWillMount() {
        this.setState({
            whichColls: this.props.userInfo.whichColls.slice()
        });
    }

    render() {
        console.log("进来收藏列表页 mobx取值：", this.props.userInfo.whichColls.slice());
        let whichColls = this.state.whichColls;
        if(typeof(whichColls)==="string") {
            whichColls = JSON.parse(whichColls);
        }
        console.log("遍历这个值",whichColls.length,whichColls);
        return(
            <View className="collections-style">

            {
                whichColls.length === 0 ?
                <View className="nothing-box">
                    <Text
                        onClick={this.toPage}>
                        什么都没有！去看看有什么有意思的 →
                    </Text>
                </View> :
                <View className="list-box">
                    {
                        whichColls.map((item:newsItem) => {
                            return (
                                item
                                ?
                                <View key={item._id} className="list-item">
                                    <Button disabled={this.state.btnDis} onClick={this.deleteBtnFun.bind(this, item._id)} className="at-icon at-icon-close list-item-delete" />
                                    <Image className="list-item-img" mode="aspectFill" lazyLoad={true} src={item.imgCover ? item.imgCover : "https://qiniu.jevons.xyz/mock/starMock.gif"} />
                                    <View className="list-item-info">
                                        <View className="list-item-info-title">{item.title}</View>
                                        <View className="list-item-info-date">{item.date.substr(0,8)}</View>
                                        <View className="list-item-info-desc">{item.desc}</View>
                                    </View>
                                </View>
                                :
                                <View key={Math.random()} className="list-item">
                                    <Button onClick={this.deleteBtnFun.bind(this, item)} className="at-icon at-icon-close list-item-delete" />
                                    <View className="list-item-nothing">
                                        <Text>这条没有了 o(╥﹏╥)o </Text>
                                    </View>
                                </View>
                            );
                        })
                    }
                </View>
            }

            </View>
        );
    }

    /**
     * 取消 star
     * @param id 取的是文章的id
     */
    deleteBtnFun(id:string) {
        this.setState({
            btnDis: true
        });
        // 是否有id
        const _id = this.props.userInfo._id;
        const this_ = this;
        // 取消基本没有用吧
        if(!_id) {
            // 获取不到 _id 一定是没有登录 我不承认我代码问题！
            this.setState({
                btnDis: false
            });
            Taro.showToast({
                title: "BUG 001.2 请反馈",
                icon: "none",
                mask: true,
                duration: 1200
            });
            return false;
        }

        // 确保登录了 继续
        let colArr = this.props.userInfo.collections.slice(); // 转化正常的数组
        if(typeof(colArr)==="string") {
            colArr = JSON.parse(colArr);
        }
        if(!id) {
            const C:[string] = this.props.userInfo.whichColls.slice();
            const W:number = C.indexOf(id);
            console.log(1, W);
            colArr.splice(W,1);
            // colArr.splice()
        } else {
            console.log(1111,colArr);
            colArr.splice(colArr.indexOf(id),1); // 删除这个后的数组发给服务器
            console.log(1111,colArr);
        }

        if(this.props.userInfo.whichColls.slice().length<2) {
            colArr = [];
            this_.setState({
                whichColls: []
            });
            this.props.userInfo.whichColls = [];
        }
        // colArr 现在是删除后的
        const req = {
            _id,
            collections: colArr
        };
        collections_add(req).then((e) => {
            console.log("取消收藏返回的结果",e.data.code);

            if(e.data.code > -1) {
                // 从 mobx 中删除
                this.props.userInfo.collections = colArr;
                this.clickCollections();
                Taro.showToast({
                    title: "取消成功~",
                    icon: "none",
                    mask: true,
                    duration: 1200
                });
            } else {
                this.setState({
                    btnDis: false
                });
                Taro.showToast({
                    title: "取消失败1~",
                    icon: "none",
                    mask: true,
                    duration: 1200
                });
            }
        }).catch((e) => {
            this.setState({
                btnDis: false
            });
            // TODO 埋点 e
            Taro.showToast({
                title: "取消失败2~",
                icon: "none",
                mask: true,
                duration: 1200
            });
        });
    }

    /**
     * 点击收藏跳转的时候就请求 `collections_find` 接口，把数据存在 mobx 中
     * 通过 `collections_which` 把 _id 换文章
     */
    clickCollections() {
        const this_ = this;
        const collections = this.props.userInfo.collections.slice();

        console.log(Array.isArray(collections));
        collections_which({ collections }).then((r:any) => {
            if(r.data.code > 0) {
                console.log(r.data.msg);
                // 把这些文章存入 mobx
                this.props.userInfo.whichColls = r.data.msg;

                this_.setState({
                    whichColls: r.data.msg,
                    btnDis: false
                });

                return true;
            }
            Taro.showToast({
                title: "请求失败002.1~",
                icon: "none",
                mask: true,
                duration: 1200
            });
            this.setState({
                btnDis: false
            });
        }).catch((e) => {
            // TODO 埋点 e
            console.log("跳转的catch", e);
            this.setState({
                btnDis: false
            });
            Taro.showToast({
                title: "请求失败003.1~",
                icon: "none",
                mask: true,
                duration: 1200
            });
        });
    }

    /**
     * @desc 跳转
     */
    toPage() {
        Taro.switchTab({
            url: "/pages/index/index"
        });
    }
}

export default Collections;
