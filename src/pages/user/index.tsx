import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import { weChat_login } from "@/api";
import { observer, inject } from "@tarojs/mobx";
import "./main.scss";

interface Mine {
    state: {
        knownU: boolean
    };

    props: {
        userInfo: {
            info: any
        }
    };
}

@inject("userInfo")
@observer
class Mine extends Component {
    constructor(preps) {
        super(preps);

        this.state = {
            knownU: false
        };

        this.switchTab = this.switchTab.bind(this);
    }

    config = {
        navigationBarTitleText: "ASTRON"
    };

    componentWillMount() {
        // this.onLoginByWeapp();
    }

    /**
     * 用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 api，使用 code 换取 openid 和 session_key 等信息
     */
    // onLoginByWeapp = () => {
    //     // e.stopPropagation();
    //     Taro.login({
    //         success(res) {
    //             if (res.code) {
    //                 const req = { code: res.code };
    //                 console.log("login----->",req);

    //                 weChat_login(req).then((r) => {
    //                     console.log("======>",r);
    //                 });
    //             } else {
    //                 console.log("登录失败！" + res.errMsg);
    //             }
    //         }
    //     });
    // }


    getUserInfo = (userInfo) => {
        if(userInfo.detail&&userInfo.detail.userInfo){ //同意
            this.props.userInfo.info = userInfo.detail.userInfo; //将用户信息存入mobx
            // console.log("userinfo",this.props.userInfo.info);
            Taro.setStorage({ key:"userInfo",data:userInfo.detail.userInfo }).then((rrr:any) => {  //将用户信息存入缓存中
                console.log("rrrrrr", rrr);
                this.setState({
                    knownU: true
                });
                Taro.navigateBack();
            });
        } else { //拒绝,保持当前页面，直到同意
        }
    }

    switchTab() {
        Taro.switchTab({
            url: "../stars/index"
        });
    }

    render() {
        return(
            <View>
                {
                    !this.state.knownU ? (
                        <View>
                            <Text>申请获取你的公开信息（昵称、头像等）</Text>
                            <Button
                                open-type="getUserInfo"
                                onGetUserInfo={this.getUserInfo}>
                                微信授权
                            </Button>
                        </View>
                    ) : (
                        <View>
                            <View className="info-box">
                                <Image src={this.props.userInfo.info.avatarUrl} />
                                <Text>{this.props.userInfo.info.nickName}</Text>
                            </View>

                        </View>
                    )
                }
            </View>
        );
    }
}

export default Mine;
