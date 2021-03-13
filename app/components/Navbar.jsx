import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME as theme } from './../theme';

const Navbar = ({ title }) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>{title}</Text>
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
