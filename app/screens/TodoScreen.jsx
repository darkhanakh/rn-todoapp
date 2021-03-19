import React, { useContext, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import AppCard from '../components/common/AppCard';
import EditModal from '../components/EditModal';
import { THEME } from '../theme';
import AppTextBold from './../components/common/AppTextBold';
import AppButton from './../components/common/AppButton';
import TodoContext from './../context/todo/todoContext';
import ScreenContext from './../context/screen/screenContext';

export default function TodoScreen() {
  const { todoId, changeScreen } = useContext(ScreenContext);
  const { todos, updateTodo, removeTodo } = useContext(TodoContext);
  const [modalVisibility, setModalVisibility] = useState(false);

  const todo = todos.find(t => t.id === todoId);

  const cancelModal = () => setModalVisibility(false);

  const saveHandler = async title => {
    await updateTodo(todo.id, title);
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
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setModalVisibility(true)}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton onPress={() => changeScreen(null)} color={THEME.GREY_COLOR}>
            <AntDesign name="back" size={20} color="white" />
          </AppButton>
        </View>
        {/* ----- */}
        <View style={styles.button}>
          <AppButton onPress={() => removeTodo(todo.id)} color={THEME.DANGER_COLOR}>
            <FontAwesome name="remove" size={20} color="white" />
          </AppButton>
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
    width: Dimensions.get('window').width / 2.8,
  },
  title: {
    fontSize: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
});
