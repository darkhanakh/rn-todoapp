import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Modal, Alert } from 'react-native';
import { THEME } from '../theme';
import AppButton from './common/AppButton';

export default function EditModal({ visible, onCancel, onSave, value }) {
  const [title, setTitle] = useState(value);

  const saveTitle = () => {
    if (title.trim().length < 3) {
      Alert.alert(
        'Ошибка',
        `Минимальная длина названия 3 символа. Сейчас ${title.trim().length} символов.`,
      );
    } else {
      onSave(title);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          placeholder="Введите название"
          autoCapitalize="sentences"
          autoCorrect={false}
          maxLength={64}
        />
        <View style={styles.buttons}>
          <AppButton onPress={onCancel} color={THEME.DANGER_COLOR}>
            Отменить
          </AppButton>
          <AppButton onPress={saveTitle}>Сохранить</AppButton>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%',
  },
  buttons: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
