import React, { Component, Children } from 'react'
import { Provider as ReduxProvider, connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createStore } from './store'

import { initWeb3Request } from './constants/actionCreators'

class StateSauce extends Component {
  static propTypes () {
    options: PropTypes.object
  }

  constructor (props) {
    super(props)

    if (props.provider) {
      props.onInitSauce(props.provider)
    } else if (window.web3 && window.web3.currentProvider) {
      props.onInitSauce(window.web3.currentProvider)
    } else {
      throw new Error('Web3 Provider not injected or provided')
    }
  }

  render () {
    return Children.only(this.props.children)
  }
}

const mapDispatchToProps = dispatch => ({
  onInitSauce (provider) {
    dispatch(initWeb3Request(provider))
  }
})

const EnhancedStateSauce = connect(state => state, mapDispatchToProps)(
  StateSauce
)

class Provider extends Component {
  constructor (props, context) {
    super(props, context)

    // Redux store not available
    if (!context.store) {
      this.store = createStore()
    }
  }

  render () {
    if (this.store) {
      return (
        <ReduxProvider store={this.store}>
          <EnhancedStateSauce {...this.props}>
            {this.props.children}
          </EnhancedStateSauce>
        </ReduxProvider>
      )
    } else {
      return (
        <EnhancedStateSauce {...this.props}>
          {this.props.children}
        </EnhancedStateSauce>
      )
    }
  }
}

Provider.contextTypes = {
  store: PropTypes.object
}

export default Provider
