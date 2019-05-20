const cloud = require('wx-server-sdk')

const Towxml = require('towxml')

const towxml = new Towxml()

cloud.init()

exports.main = async (event, context) => {
  const { func, type, content } = event
  let res
  if (func === 'parse') {
    if (type === 'markdown') {
      res = await towxml.toJson(content || '', 'markdown');
    } else {
      res = await towxml.toJson(content || '', 'html');
    }
  }
  return {
    data: res
  }
}
