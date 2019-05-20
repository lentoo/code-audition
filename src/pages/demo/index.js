import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtLoadMore } from 'taro-ui';
import './index.scss'
import Towxml from '../../components/towxml/main'

const render = new Towxml()
export default class Demo extends Taro.Component {
  constructor (params) {
    super(params)
    this.state = {
      data: null,
      fail: false
    }
  }

  componentDidMount() {
    setTimeout( () => {
      this.parseLocalData()
    }, 1000)
  }
  previewImage (url) {
    Taro.previewImage({
      urls: [url]
    })
  }
  parseLocalData () {
    //将markdown内容转换为towxml数据，交将当前页面对象传入以创建默认事件对象
    let articleData = render.toJson('<div  name="button" id="button1">测试一个可点击的元素<img src="https://nervjs.github.io/taro/img/logo-taro.png"/></div>', 'html');

    //自定义事件，格式为`event_`+`绑定类型`+`_`+`事件类型`
    //例如`bind:touchstart`则为：
    this.$scope['event_bind_tap'] = (event) => {
      console.log(event.target);     // 打印出元素信息
      // this.previewImage(event.target.dataset._el.attr.src)
    };
    const result = this.initData(articleData, {
      app: this.$scope
    })
    this.setState({
      data: result,
      fail: false
    })
  }
  initData (data) {
    const result = render.initData(data, {
      app: this.$scope
    })
    return result
  }
  parse () {
    Taro.cloud.callFunction({
      name: 'parse',
      data: {
        func: 'parse',
        type: 'html',
        content: '<p>asdasd 这是一个p</p>'
      }
    }).then(res => {
      console.log('res', res);
      let data = res.result.data
      data = render.initData(data, {
        app: this.$scope
      })
      this.setState({
        data: data,
        fail: false
      })
      console.log('data', data);
    }).catch(err => {
      console.log('cloud', err);
      this.setState({
        fail: true
      })
    })
  }
  render() {
    const { data, fail } = this.state
    if (fail) {
      return (
        <View className='fail' onClick={this.parseReadme.bind(this)}>
          <Text className='text'>load failed, try it again?</Text>
        </View>
      )
    }
    return (
      <View>
        <Text> Demo </Text>
        <View className='box'>

        </View>
        <View>
          {
            data ? (
              <View>
                <import src='../../components/towxml/entry.wxml' />
                <template is='entry' data='{{...data}}' />
              </View>
            ) : (
              <View>
                <AtLoadMore status='loading' loadingText='正在加载中'></AtLoadMore>
              </View>
            )
          }
        </View>
      </View>
    );
  }
}
