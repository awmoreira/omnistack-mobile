import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import createNavigator from './routes';
import NavigationService from './services/navigation';

class App extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      authCheked: PropTypes.bool,
      signedIn: PropTypes.bool,
    }).isRequired,
  };

  componentDidMount() {
    AsyncStorage.clear();
  }

  registerService = (ref) => {
    NavigationService.setTopLevelNavigator(ref);
  };

  render() {
    const { auth } = this.props;

    if (auth.authCheked) return null;

    const Routes = createNavigator(auth.signedIn);

    return <Routes ref={this.registerService} />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
