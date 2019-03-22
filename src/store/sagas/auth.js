import { call, put, select } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import api from '../../services/api';
import NavigationService from '../../services/navigation';

import AuthActions from '../ducks/auth';

export function* init() {
  const token = yield call([AsyncStorage, 'getItem'], '@Omni:token');

  if (token) {
    yield put(AuthActions.signInSuccess(token));
  }
  yield put(AuthActions.initCheckSuccess());
}

export function* signIn({ email, password }) {
  try {
    const response = yield call(api.post, 'sessions', { email, password });

    yield call([AsyncStorage, 'setItem'], '@Omni:token', response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));
    NavigationService.navigate('Main');
  } catch (err) {
    console.log(err);
  }
}

export function* signOut() {
  yield call([AsyncStorage, 'clear']);

  // yield put(push('/signin'));
}

// export function* signUp({ name, email, password }) {
//   try {
//     const response = yield call(api.post, 'users', { name, email, password });

//     yield call([AsyncStorage, 'setItem'], '@Omni:token', response.data.token);

//     yield put(AuthActions.signInSuccess(response.data.token));
//     // yield put(push('/'));
//   } catch (err) {
//     console.log(err);
//   }
// }

export function* getPermissions() {
  const team = yield select(state => state.teams.active);
  const signedIn = yield select(state => state.auth.signedIn);

  if (!signedIn || !team) {
    return;
  }

  const response = yield call(api.get, 'permissions');

  const { roles, permissions } = response.data;

  yield put(AuthActions.getPermissionsSuccess(roles, permissions));
}
