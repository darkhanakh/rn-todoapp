import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AppTextBold = props => (
  <Text style={{ ...styles.default, ...props.style }}>{props.children}</Text>
);

export default AppTextBold;

const styles = StyleSheet.create({
  default: {
    fontFamily: 'roboto-bold',
  },
});
