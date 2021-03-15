import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import AppCard from '../components/common/AppCard';
import EditModal from '../components/EditModal';
import { THEME } from '../theme';
import AppTextBold from './../components/common/AppTextBold';
import AppButton from './../components/common/AppButton';

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
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onClick={() => setModalVisibility(true)}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton onClick={goBack} color={THEME.GREY_COLOR}>
            <AntDesign name="back" size={20} color="white" />
          </AppButton>
        </View>
        {/* ----- */}
        <View style={styles.button}>
          <AppButton onClick={() => deleteTodo(todo.id)} color={THEME.DANGER_COLOR}>
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
