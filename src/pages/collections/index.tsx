import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { collections_add, collections_which } from "@/api";
import "./mian-colls.scss";


interface Collections {
    state: {
        whichColls: [],
        btnDis: boolean,
        isClick: boolean
    };

    props: {
        userInfo: {
            whichColls: [{any}], // 数组
            collections: [string]
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

@inject("userInfo", "whichNews")
@observer
class Collections extends Component {
    constructor(preps) {
        super(preps);
        this.state = {
            whichColls: [],
            btnDis: false,
            isClick: false
        };
        this.toPage = this.toPage.bind(this);
    }

    config = {
        navigationBarTitleText: "ASTRON"
    };

    // 这个页还是有坑  数据存在 state 就不能动态刷新
    componentWillMount() {
        this.setState({
            whichColls: this.props.userInfo.whichColls.slice()
        });
    }

    render() {
        console.log("进来收藏列表页 mobx取值：", this.props.userInfo.whichColls.slice());
        let whichColls_ = this.props.userInfo.whichColls.slice();
        if(typeof(whichColls_)==="string") {
            whichColls_ = JSON.parse(whichColls_);
        }
        console.log("遍历这个值",whichColls_.length,whichColls_);
        return(
            <View className="collections-style">

            {
                whichColls_.length === 0 ?
                <View className="nothing-box">
                    <Text
                        onClick={this.toPage}>
                        什么都没有！去看看有什么有意思的 →
                    </Text>
                </View> :
                <View className="list-box">
                    {
                        whichColls_.map((item:newsItem) => {
                            return (
                                item
                                ?
                                <View key={item._id} className="list-item" onClick={this.toPageArt.bind(this, item)}>
                                    <Button disabled={this.state.btnDis} onClick={this.deleteBtnFun.bind(this, item._id)} className="at-icon at-icon-close list-item-delete" />
                                    <View className="list-item-img-box">
                                        <Image className="list-item-img" mode="aspectFill" lazyLoad={true} src={item.imgCover ? item.imgCover : "https://qiniu.jevons.xyz/mock/starMock.gif"} />
                                    </View>
                                    <View className="list-item-info">
                                        <View className="list-item-info-title">{item.title}</View>
                                        <View className="list-item-info-date">{item.date.substr(0,10)}</View>
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
        if(this.state.isClick === true) {
            return;
        }
        // this.setState({
        //     isClick: true
        // });
        this.state.isClick = true; // 不这样就会穿透点击！
        setTimeout(() => {
            this.setState({
                isClick: false
            });
        }, 300);

        //让这个按钮不能重复点击
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
        console.log("colArr是string吗",typeof(colArr), colArr);
        if(typeof(colArr)==="string") {
            colArr = JSON.parse(colArr);
        }

        // 处理null 如果id是null
        if(!id) {
            const C:[string] = this.props.userInfo.whichColls.slice();
            const W:number = C.indexOf(id);
            console.log(1, W);
            colArr.splice(W,1);
            // colArr.splice()
        } else {
            console.log(1112,colArr);
            colArr.splice(colArr.indexOf(id),1); // 删除这个后的数组发给服务器
            console.log(1113,colArr);
        }

        // 投机处理 如果只有一个还取消了 直接给空
        if(this.props.userInfo.whichColls.slice().length<2) {
            colArr = [];
            this_.setState({
                whichColls: []
            });
            this.props.userInfo.whichColls = [];
            // 这里只是界面效果看起来快了 不等返回了 正常逻辑不变
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
                // 检查是哪个文章 然后删了 这些东西以后都扔后端！ 可恶
                // TODO 前端处理太繁琐了！还不是请求好几次，不如直接把结果拿过来！
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
                    title: "取消失败1.1~",
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
     * 请求 `collections_find` 接口，把数据存在 mobx 中
     * 我真是个鬼才想到这种方法。。。以后放后端直接返回！
     * 通过 `collections_which` 把 _id 换文章
     */
    clickCollections() {
        const this_ = this;

        // 收藏的文章ID数组
        const collectionsS = this.props.userInfo.collections.slice();

        console.log(Array.isArray(collectionsS));
        console.log("-->",(collectionsS));
        /**
         *  2019-5-29 02:41:26 我找到了困扰我半小时的BUG, 这个 `collectionsS` 我原本是为了
         *  把变量名字区分, 就一次性改了这里的  4 个 `collections` 一次性加了 `S` 可是我这个
         *  接口是 `({ collections })` 写成了 `({ collectionsS })` !!! 以后不能眼这么瞎了 !!!
         */
        collections_which({ collections: collectionsS }).then((r:any) => {
            console.log("clickCollections==>",r.data);
            if(r.data.code > 0 || r.data.code==="1000") {
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
                title: "请求超时003.1~",
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

    /**
     * @desc 跳转文章页
     */
    toPageArt(item) {
        console.log("跳转前",this.state.isClick);
        if(this.state.isClick === true) {
            return;
        }
        const { whichNews } = this.props;
        whichNews.params = item;
        Taro.navigateTo({
            url: "/pages/article-item/index"
        });
    }
}

export default Collections;
