import React from 'react';
import { View, StyleSheet } from 'react-native';
import { THEME as theme } from './../theme';
import AppTextBold from './common/AppTextBold';

const Navbar = ({ title }) => {
  return (
    <View style={styles.navbar}>
      <AppTextBold style={styles.title}>{title}</AppTextBold>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: theme.MAIN_COLOR,
    paddingBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
});
