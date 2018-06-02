import { fromJS } from 'immutable'
import { initialState } from '../initialState'
import { types } from '../constants'

const defaultState = fromJS(initialState.contract)

const ContractReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case types.CONTRACT.INIT_REQUEST:
      return state
    case types.CONTRACT.INIT_SUCCESS:
      return payload
    case types.CONTRACT.INIT_FAILURE:
      return payload
    default:
      return state
  }
}

export default ContractReducer
