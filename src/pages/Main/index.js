import React from 'react';

import { View, TouchableOpacity, Text } from 'react-native';

import Icon from 'react-native-vector-icons';

import styles from './styles';

const Main = () => (
  <View style={styles.backgroundWrapper}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.teamTitle}>Rocketseat</Text>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="group" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default Main;
