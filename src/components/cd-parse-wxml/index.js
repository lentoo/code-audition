import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import PropTypes from 'prop-types'
import { AtLoadMore } from 'taro-ui';
import './indec.scss'
import Towxml from '../towxml/main'

const render = new Towxml()
export default class CdParseWxml extends Taro.Component {
  static propTypes = {
    template: PropTypes.string,
    mode:PropTypes.string
  }
  static defaultProps = {
    template: null,
    mode: 'html'
  }
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      fail: false
    }
  }
  componentWillReceiveProps() {
    this.setState({
      data: null
    }, () => {
      setTimeout(() => {
        this.parseTemplate()
      }, 500)
    })
  }
  componentDidMount() {
    setTimeout(() => {
      this.parseTemplate()
    }, 500)
  }
  addTapImageEvent() {
    this.$scope['event_bind_tap'] = (event) => {
      console.log('event', event);
      const el = event.target.dataset._el
      if (el.tag.toLocaleUpperCase() === 'IMAGE') {
        Taro.previewImage({
          urls: [el.attr.src]
        })
      }
    }
  }
  parseTemplate () {
    const { template, mode } = this.props
    const jsonData = render.toJson(template, mode);
    this.addTapImageEvent()
    const data = render.initData(jsonData, {
      app: this.$scope
    })
    this.setState({
      data
    })
  }
  render() {
    const {data, fail} = this.state
    if (fail) {
      return (
        <View className='fail' onClick={this.parseTemplate.bind(this)}>
          <Text className='text'>load failed, try it again?</Text>
        </View>
      )
    }
    return (
      <View className='cd-parse-wxml' key={data}>
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
    );
  }
}
