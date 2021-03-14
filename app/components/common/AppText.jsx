import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AppText = props => (
  <Text style={{ ...styles.default, ...props.customStyles }}>{props.children}</Text>
);

export default AppText;

const styles = StyleSheet.create({
  default: {
    fontFamily: 'roboto-regular',
  },
});
