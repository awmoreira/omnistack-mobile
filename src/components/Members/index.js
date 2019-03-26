import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, FlatList, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MembersActions from '../../store/ducks/members';

import InviteMember from '../InviteMember';
import RoleUpdater from '../RoleUpdater';
import Can from '../Can';

import styles from './styles';

class Members extends Component {
  static propTypes = {
    getMembersRequest: PropTypes.func.isRequired,
    members: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
        }),
      ),
    }).isRequired,
  };

  state = {
    isInviteModalOpen: false,
    isRoleModalOpen: false,
    editMember: null,
  };

  componentDidMount() {
    const { getMembersRequest } = this.props;

    getMembersRequest();
  }

  toggleInviteModalOpen = () => {
    this.setState({ isInviteModalOpen: true });
  };

  toggleInviteModalClose = () => {
    this.setState({ isInviteModalOpen: false });
  };

  toggleRoleModalOpen = (member) => {
    this.setState({ isRoleModalOpen: true, editMember: member });
  };

  toggleRoleModalClose = () => {
    this.setState({ isRoleModalOpen: false, editMember: null });
  };

  render() {
    const { members } = this.props;
    const { isInviteModalOpen, isRoleModalOpen, editMember } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>MEMBROS</Text>

        <FlatList
          style={styles.memberList}
          data={members.data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.memberContainer}>
              <Text style={styles.memberName}>{item.user.name}</Text>

              <Can checkRole="administrator">
                <TouchableOpacity
                  hitSlop={{
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5,
                  }}
                  onPress={() => this.toggleRoleModalOpen(item)}
                >
                  <Icon name="settings" size={20} color="#b0b0b0" />
                </TouchableOpacity>
              </Can>
            </View>
          )}
          ListFooterComponent={() => (
            <Can checkPermission="invites_create">
              <TouchableOpacity style={styles.button} onPress={this.toggleInviteModalOpen}>
                <Text style={styles.buttonText}>Convidar</Text>
              </TouchableOpacity>
            </Can>
          )}
        />

        {editMember && (
          <RoleUpdater
            visible={isRoleModalOpen}
            onRequestClose={this.toggleRoleModalClose}
            member={editMember}
          />
        )}

        <Can checkPermission="invites_create">
          <InviteMember visible={isInviteModalOpen} onRequestClose={this.toggleInviteModalClose} />
        </Can>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  members: state.members,
});

const mapDispatchToProps = dispatch => bindActionCreators(MembersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Members);
