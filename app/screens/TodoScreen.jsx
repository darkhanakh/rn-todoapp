import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import AppCard from '../components/common/AppCard';
import EditModal from '../components/EditModal';
import { THEME } from '../theme';

export default function TodoScreen({ goBack, todo, deleteTodo, updateTodoTitle }) {
  const [modalVisibility, setModalVisibility] = useState(false);

  const cancelModal = () => setModalVisibility(false);

  const saveHandler = title => {
    updateTodoTitle(todo.id, title);
    setModalVisibility(false);
  };

  return (
    <View>
      <EditModal
        visible={modalVisibility}
        onCancel={cancelModal}
        onSave={saveHandler}
        value={todo.title}
      />

      <AppCard customStyle={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>
        <Button title="Ред." onPress={() => setModalVisibility(true)} />
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
