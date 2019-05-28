import { observable, action } from "mobx";
import Taro from "@tarojs/taro";
import { weChat_login, collections_find } from "@/api";
// const userInfo = observable({
//     info: {},
//     _id: "",
//     collections: []
// });

class userInfo {
    @observable collections = [];
    @observable info = {};
    @observable _id = "";
    @observable whichColls = []; // 对应的文章

    @action.bound getStorageInfo() {
        Taro.getStorage({ key: "userInfo" }).then((res) => {
            console.log("getStorage userInfo 是否有名字 ==> ",res.data.nickName);
            // 如果有名字信息
            if(res.data.nickName.length>0) {
                this.info = res.data;
                console.log("有名字信息 取这个值",res.data);
                console.log("有名字信息 给mobx了：",this.info);
            } else {
                console.log("没有有名字信息");
            }
        }).catch(() => {
            console.log("storage 中 没有有名字信息");
        });
    }

    @action.bound getStorageID() {
        Taro.getStorage({ key: "userId" }).then((res) => {
            console.log("getStorage userId 是否有ID ==> ",res.data);
            // 如果有ID信息
            if(res.data.length>1) {
                this._id = res.data;
                console.log("id信息有的 是：",res.data);
                console.log("有ID信息 给mobx了：",this._id);

                // 进入首页就查看一下他的收藏列表
                const this_ = this;
                console.log("1-", Array.isArray(this_.collections.slice()));
                collections_find({ _id: res.data }).then((colls) => {
                    console.log("收藏", colls.data.msg.collections, Array.isArray(colls.data.msg.collections));
                    if(colls.data.code === "1000") {
                        if(typeof(colls.data.msg.collections)==="string") {
                            colls.data.msg.collections = JSON.parse(colls.data.msg.collections);
                        }
                        console.log("收藏2", colls.data.msg.collections, Array.isArray(colls.data.msg.collections));
                        this_.collections = colls.data.msg.collections; // mobx 中有收藏列表了
                        console.log("收藏的内容mobx & 请求",this_.collections,"=",colls.data.msg.collections);

                        // 根据收藏列表把文章详情请求回来
                    } else {
                        console.log("返回不是1000，记着写个提示");
                    }
                });
            } else {
                console.log("id信息长度不够");
            }
        }).catch(() => {
            console.log("id信息没有");
        });
    }


    @action.bound onLoginByWeapp() {
        const this_ = this;
        Taro.login({
            success(res) {
                if (res.code) {
                    const req = { code: res.code };
                    weChat_login(req).then((r) => {
                        console.log("weChat_login接口获取到的_id====>",r.data.msg._id);
                        console.log("weChat_login接口获取到的collections====>",r.data.msg.collections);
                        if(r.data.code>-1) {
                            Taro.setStorage({ key:"userId", data: r.data.msg._id }).then((rrr:any) => {  //将用户信息存入缓存中
                                if (rrr.errMsg!=="setStorage:ok") {
                                    return false;
                                }
                            });

                            // 把值给 mobx
                            this_._id = r.data.msg._id;
                            this_.collections = r.data.msg.collections;

                            console.log("存入MOBX ID",this_._id);
                            if(r.data.code==="1001") {
                                console.log("老用户");
                            }
                            if(r.data.code==="1002") {
                                console.log("新用户");
                            }
                        }
                    });
                } else {
                    console.log("登录失败！" + res);
                }
            },
            fail(e) {
                console.log("eee", e);
            }
        });
    }


    @action.bound isGetUserInfo(userInfo) {
        this.onLoginByWeapp();
        this.info = userInfo; //将用户信息存入mobx
        console.log("存入mobx userinfo了",this.info);
        Taro.setStorage({ key:"userInfo",data:userInfo }).then((rrr:any) => {  //将用户信息存入缓存中
            // taro 这个接口返回的信息是 {errMsg: "setStorage:ok"} ??? 如果他们改了我就改 (╥﹏╥)
            if (rrr.errMsg!=="setStorage:ok") {
                return false;
            }
        });
    }
}

export default new userInfo();
