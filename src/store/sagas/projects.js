import { call, put } from 'redux-saga/effects';
import { ToastActionsCreators } from 'react-native-redux-toast';
import api from '../../services/api';

import ProjectsActions from '../ducks/projects';

export function* getProjects() {
  const response = yield call(api.get, 'projects');

  yield put(ProjectsActions.getProjectsSuccess(response.data));
}

export function* addProject({ title }) {
  try {
    const response = yield call(api.post, 'projects', { title });

    yield put(ProjectsActions.addProjectSuccess(response.data));
    yield put(ToastActionsCreators.displayInfo('Projeto criado com sucesso.'));
  } catch (err) {
    yield put(ToastActionsCreators.displayError('Ops... Tivemos um problema.'));
  }
}
