export default class Index extends Component {

config = {

navigationBarTitleText: '首页'

}

constructor() {

super(...arguments)

this.state = {

loading:true,

list:[]

}
}

    componentDidMount () {
// 获取远程数据

        this.updateList()
    }

    updateList() {
        Taro.showLoading({title: '加载中'})

        Taro.request({

            url: 'https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed'

        }).then(res => {
            Taro.hideLoading()

            if (res.data.success) {

                this.setState({

    loading:false,

    list:res.data.data

})
            }

        })
    }

    appendNextPageList() {

        Taro.showLoading({ title: '加载中' })

        Taro.request({

            url: "https://easy-mock.com/mock/5b21d97f6b88957fa8a502f2/example/feed"

        }).then(res => {
            Taro.hideLoading();

            if (res.data.success) {
                this.setState({

                    list: this.state.list.concat(res.data.data)

                });
            }
        });
    }

    render () {
        return (<ScrollView className="container" scrollY={true} scrollWithAnimation={true} scrollTop="0" lowerThreshold="10"
  upperThreshold="10" onScrolltoupper={this.updateList} onScrolltolower={this.appendNextPageList}>

  <View className="search flex-wrp">

    <View className="search-left flex-item">

      <View className="flex-wrp">

        <View className="flex1">
          <Image src={searchPng}/>
        </View>

        <View className="flex6"><Input type="text" placeholder="搜索话题, 问题或人" placeholderClass="search-placeholder" />
        </View>

      </View>

    </View>

    <View className="search-right flex-item">

      <Image src={lightingPng}/>

    </View>

  </View>

  {

  this.state.loading

  ? <View className="txcenter"><Text>加载中</Text></View>

  : this.state.list.map((item,index) => {
      return;
      <Feed key={item} />;})

  }

</ScrollView>

        );
    }
}
