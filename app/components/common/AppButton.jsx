import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import AppTextBold from './AppTextBold';
import { THEME } from './../../theme';

const AppButton = ({ children, onClick, color = THEME.MAIN_COLOR }) => {
  return (
    <TouchableOpacity onPress={onClick} activeOpacity={0.7}>
      <View style={{ ...styles.button, backgroundColor: color }}>
        <AppTextBold style={styles.text}>{children}</AppTextBold>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});
