import { call, put } from 'redux-saga/effects';
import { ToastActionsCreators } from 'react-native-redux-toast';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import TeamsActions from '../ducks/teams';

export function* getTeams() {
  const response = yield call(api.get, 'teams');

  yield put(TeamsActions.getTeamsSuccess(response.data));
}

export function* addTeam({ name }) {
  try {
    const response = yield call(api.post, 'teams', { name });

    yield put(TeamsActions.addTeamSuccess(response.data));
    yield put(ToastActionsCreators.displayInfo('Time criado com sucesso.'));
  } catch (err) {
    yield put(ToastActionsCreators.displayError('Ops... Tivemos um problema.'));
  }
}

export function* setActiveTeam({ team }) {
  yield call(AsyncStorage.setItem, '@Omni:team', JSON.stringify(team));
}
