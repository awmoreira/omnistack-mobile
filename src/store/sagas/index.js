import { all, fork, takeLatest } from 'redux-saga/effects';

import {
  signIn, signOut, init, signUp, getPermissions,
} from './auth';
import { AuthTypes } from '../ducks/auth';

import { getTeams, addTeam, setActiveTeam } from './teams';
import { TeamsTypes } from '../ducks/teams';

// import { getProjects, addProject } from './projects';
// import { ProjectsTypes } from '../ducks/projects';

// import { getMembers, updateMember, inviteMember } from './members';
// import { MembersTypes } from '../ducks/members';

export default function* rootSaga() {
  return yield all([
    init(),
    // fork(getPermissions),

    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_OUT, signOut),
    // takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),

    takeLatest(TeamsTypes.GET_TEAMS_REQUEST, getTeams),
    takeLatest(TeamsTypes.ADD_TEAM_REQUEST, addTeam),
    takeLatest(TeamsTypes.SELECT_TEAM, setActiveTeam),

    // takeLatest(TeamsTypes.SELECT_TEAM, getProjects),
    // takeLatest(TeamsTypes.SELECT_TEAM, getPermissions),

    // takeLatest(ProjectsTypes.GET_PROJECTS_REQUEST, getProjects),
    // takeLatest(ProjectsTypes.ADD_PROJECT_REQUEST, addProject),

    // takeLatest(MembersTypes.GET_MEMBERS_REQUEST, getMembers),
    // takeLatest(MembersTypes.UPDATE_MEMBER_REQUEST, updateMember),
    // takeLatest(MembersTypes.INVITE_MEMBER_REQUEST, inviteMember),
  ]);
}
