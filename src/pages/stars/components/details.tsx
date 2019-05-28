import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import "../main.scss";

interface Details {
    props: {
        content: string
    };
    state: {
        artArr: []
    };
}

class Details extends Component {
    constructor (props) {
        super(props);
        this.state = {
            artArr: []
        };
    }

    componentWillMount() {
        this.articleFormat(this.props.content);
    }

    /**
     * 把文章按 #B# 分开 放 `this.state.artArr` 但是好像有bug啊 怎么每次点都刷新
     * @param art 文章
     */
    articleFormat(art) {
        // this.state.artArr = art.split("#B#");
        this.setState({
            artArr: art.split("#B#")
        });
    }

    // if(item.substring(0, 3) === "#I#") {

    // }

    render () {
        return (
            <View className="details-box at-article">
                {
                    this.state.artArr.map((item:string, index) => {
                        return (
                            item.substring(0, 3) !== "#I#" ?
                            (
                                item.substring(0, 3) !== "#C#" ?
                                <View key={Math.random()} className="at-article at-article__p details-article">
                                    {item}
                                </View>
                                :
                                <View key={Math.random()} className="at-article at-article__p details-article details-article-C">
                                    {item.substring(3)}
                                </View>
                            ) :
                            (
                                <Image
                                    className="at-article__img"
                                    src={item.substring(3)}
                                    lazyLoad={true}
                                    mode="widthFix" />
                            )
                        );
                    })
                }
            </View>
        );
    }
}

export default Details;
