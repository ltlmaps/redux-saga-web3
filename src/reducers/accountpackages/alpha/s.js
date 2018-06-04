import initialState from '../initialState'
import { types } from '../constants'

const accountsReducer = (state = initialState.accounts, { type, payload }) => {
  switch (type) {
    case types.ACCOUNTS.GET_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case types.ACCOUNTS.GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: payload,
        default: payload[0],
        error: null
      }
    case types.ACCOUNTS.GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload
      }
    default:
      return state
  }
}

export default accountsReducer
