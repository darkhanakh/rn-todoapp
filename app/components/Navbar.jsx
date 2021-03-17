import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { THEME as theme } from './../theme';
import AppTextBold from './common/AppTextBold';

const Navbar = ({ title }) => {
  return (
    <View
      style={{
        ...styles.navbar,
        ...Platform.select({
          ios: styles.navbarIos,
          android: styles.navbarAndroid,
        }),
      }}>
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
    paddingBottom: 10,
  },
  navbarAndroid: {
    backgroundColor: theme.MAIN_COLOR,
  },
  navbarIos: {
    borderBottomColor: theme.MAIN_COLOR,
    borderBottomWidth: 1,
  },
  title: {
    color: Platform.OS === 'android' ? 'white' : theme.MAIN_COLOR,
    fontSize: 20,
  },
});
