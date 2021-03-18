import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import AppText from './common/AppText';

export default function Todo({ todo: { title, id }, onRemove, onOpen }) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onOpen(id)}
      onLongPress={() => onRemove(id)}>
      <View style={styles.todo}>
        <AppText>{title}</AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
  },
});
