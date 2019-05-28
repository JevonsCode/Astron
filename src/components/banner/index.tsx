import Taro, { Component } from "@tarojs/taro";
import { View, Text, Video } from "@tarojs/components";
import { banner_url } from "@/api";
import "./main.scss";

interface Banner {
    state: {
        bannerInfo: {
            url: string,
            title: string,
            desc: string,
            muted: boolean
        }
        showDesc: boolean
    };
}

class Banner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bannerInfo: {
                url: "https://qiniu.jevons.xyz/video.mp4",
                title: "",
                desc: "",
                muted: false
            },
            showDesc: true
        };

        this.handleVideoT = this.handleVideoT.bind(this);
        this.handleVideoF = this.handleVideoF.bind(this);
    }

    componentWillMount() {
        banner_url().then((r:any) => {
            console.log("urlBanner", r.data);
            if(r.data.code==="1000") {
                this.setState({
                    bannerInfo: r.data.msg
                });
            }
        });
    }

    // 样式用全局要加这个
    static options = {
        addGlobalClass: true
    };

    render() {
        console.log("banner info--->", this.state.bannerInfo);
        return(
            <View className="banner-style my-3" onClick={this.toPage.bind(this, "newsItem")}>

                <Video
                    className="video"
                    src={this.state.bannerInfo.url}
                    controls={true}
                    autoplay={true}
                    show-mute-btn={true}
                    auto-pause-if-navigate={true}
                    muted={this.state.bannerInfo.muted}
                    objectFit="cover"
                    onPlay={this.handleVideoF}
                    onPause={this.handleVideoT}
                    onEnded={this.handleVideoT}
                />

                {
                    this.state.showDesc &&
                    <View className="text-view">
                        <Text className="title">{this.state.bannerInfo.title}</Text>
                        <Text className="date">{this.state.bannerInfo.desc}</Text>
                    </View>
                }

            </View>
        );
    }

    handleVideoF() {
        this.setState({
            showDesc: false
        });
    }
    handleVideoT() {
        this.setState({
            showDesc: true
        });
    }

    /**
     * @desc 跳转带值 这个传值现在靠mobx 不知道怎么直接给。。。 这个taro文档。。。
     * @param {object} newsItem newsItem
     */
    toPage(newsItem) {
        // const { whichNews } = this.props;
        // whichNews.params = newsItem;
        // Taro.navigateTo({
        //     url: "/pages/article-item/index"
        // });
    }
}

export default Banner;
