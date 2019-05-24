import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./main.scss";

class ShowNews1 extends Component {
    constructor(preps) {
        super(preps);

        this.switchTab = this.switchTab.bind(this);
    }

    config = {
        navigationBarTitleText: "ASTRON"
    };

    componentWillMount() {
        this.onLoginByWeapp("");
    }

    onLoginByWeapp = (e) => {
        // e.stopPropagation();
        Taro.login({
            success(res) {
                console.log("login----->",res);
                if (res.code) {
                //用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 api，使用 code 换取 openid 和 session_key 等信息
                } else {
                    console.log("登录失败！" + res.errMsg);
                }
            }
        });
    }

    switchTab() {
        Taro.switchTab({
            url: "../stars/index"
        });
    }

    render() {
        return(
            <View>
                <View className="page-demo">
                    <Text className="mx-1 test" onClick={this.switchTab}>gogogaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaao</Text>
                </View>
            </View>
        );
    }
}

export default ShowNews1;
