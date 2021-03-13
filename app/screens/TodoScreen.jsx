import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import AppCard from '../components/common/AppCard';
import { THEME } from '../theme';

export default function TodoScreen({ goBack, todo, deleteTodo }) {
  return (
    <View>
      <AppCard customStyle={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>
        <Button title="Ред."></Button>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Назад" onPress={goBack} color={THEME.GREY_COLOR} />
        </View>
        {/* ----- */}
        <View style={styles.button}>
          <Button title="Удалить" onPress={() => deleteTodo(todo.id)} color={THEME.DANGER_COLOR} />
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
  title: {
    fontSize: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
});
