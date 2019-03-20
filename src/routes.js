import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from './pages/Main';
import SignIn from './pages/SignIn';

export default function createNavigator(isLoggedIn = false) {
  return createAppContainer(
    createSwitchNavigator(
      {
        Main,
        SignIn,
      },
      {
        initialRouteName: isLoggedIn ? 'Main' : 'SignIn',
      },
    ),
  );
}
