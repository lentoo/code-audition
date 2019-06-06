import Taro from '@tarojs/taro';
import { View, Text, Canvas, Image } from '@tarojs/components';
import { AtLoadMore, AtInput } from 'taro-ui';
import './index.scss'
import Towxml from '../../components/towxml/main'

const render = new Towxml()
export default class Demo extends Taro.Component {
  constructor(params) {
    super(params)
    this.state = {
      data: null,
      fail: false,
      tempPath: '',
      array: [
        {
          id: 1,
          name: 'id1'
        },
        {
          id: 2,
          name: 'id2'
        },
        {
          id: 3,
          name: 'id3'
        },
        {
          id: 4,
          name: 'id4'
        },
        {
          id: 5,
          name: 'id5'
        }
      ]
    }
    this.initCanvas = this.initCanvas.bind(this)
    
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.parseLocalData()
    // }, 1000)
    this.initCanvas()
  }
  previewImage(url) {
    Taro.previewImage({
      urls: [url]
    })
  }
  initCanvas() {
    const { value } = this.state
    if (!value) {
      return
    }
    const context = Taro.createCanvasContext('firstCanvas')
    context.setFillStyle('#007fff')
    context.arc(30, 30, 30, 2 * Math.PI)
    context.fill()

    context.lineTo(30, 30);
    context.setStrokeStyle('#fff')
    context.setFontSize(26)
    context.setTextAlign('center')
    context.setFillStyle('#fff')
    context.setTextBaseline('middle')
    context.fillText(value.substr(0, 1), 30, 30, 200)
    context.draw(false, () => {
      console.log('draw');
      Taro.canvasToTempFilePath({
        canvasId: 'firstCanvas',
        success: (res) => {
          console.log('success', res);
          this.setState({
            tempPath: res.tempFilePath
          })
        }
      })
    })
  }
  parseLocalData() {
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
  initData(data) {
    const result = render.initData(data, {
      app: this.$scope
    })
    return result
  }
  removeItem (remove) {
    this.setState({
      array: this.state.array.filter(item => item.id !== remove.id)
    })
    console.log('this.state.array.filter(item => item !== remove.id)', this.state.array.filter(item => item.id !== remove.id));
  }
  parse() {
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
    return (
      <View>
        <Text> Demo </Text>
        {
          this.renderCanvas()
        }
        {
          this.state.array.map((item, index) => {
            return (
              <View key={index}>
                <Text onClick={this.removeItem.bind(this, item)}>{item.name}</Text>
              </View>
            )
          })
        }
      </View>
    );
  }
  renderCanvas() {
    const { tempPath, value } = this.state
    return (
      <View>
        <AtInput value={value} onChange={val => {
          this.setState({
            value: val
          }, () => {
            this.initCanvas()
          })
        }}
        ></AtInput>
        <Canvas style='width: 60px; height: 60px;' canvasId='firstCanvas'></Canvas>
        {
          tempPath && (
            <View>
              <Text>下面那个是图片</Text>
              <View>
                <Image
                  src={tempPath}
                  style={
                    {
                      width: '100px',
                      height: '100px'
                    }
                  }
                ></Image>
              </View>
            </View>


          )
        }


      </View>
    )
  }
  renderWxml() {
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
    )
  }
}
