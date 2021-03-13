import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { THEME } from '../theme';

export default function TodoScreen({ goBack, todo }) {
  return (
    <View>
      <Text>{todo.title}</Text>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Назад" onPress={goBack} color={THEME.GREY_COLOR} />
        </View>
        {/* ----- */}
        <View style={styles.button}>
          <Button
            title="Удалить"
            onPress={() => console.log('Remove')}
            color={THEME.DANGER_COLOR}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '40%',
  },
});
