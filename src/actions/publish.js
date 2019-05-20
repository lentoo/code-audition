import {
  PUBLISH_ITEM
} from '../constants/publish'

export const dispatchPublishItem = (payload) => {
  return {

    type: PUBLISH_ITEM,
    payload
  }
}

export const placeholder = 'placeholder'
