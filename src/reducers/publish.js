import { PUBLISH_ITEM } from '../constants/publish'

const INITIAL_STATE = {
  publishItem: {}
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case PUBLISH_ITEM:
      return {
        ...state,
        publishItem: action.payload
      }
     default:
       return state
  }
}
