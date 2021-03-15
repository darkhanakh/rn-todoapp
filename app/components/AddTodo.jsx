import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { THEME } from '../theme';
import { AntDesign } from '@expo/vector-icons';

export default function AddTodo({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const pressHandler = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue('');
    } else {
      Alert.alert('Название todo не может быть пустым!');
    }
  };

  return (
    <View style={styles.todoForm}>
      <TextInput
        style={styles.input}
        onChangeText={setInputValue}
        value={inputValue}
        placeholder="Введите название"
        autoCorrect={false}
        autoCapitalize="sentences"
      />
      <AntDesign.Button onPress={pressHandler} name="pluscircleo">
        Добавить
      </AntDesign.Button>
      {/* <Button title="Добавить" onPress={pressHandler} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  todoForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    width: '60%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
  },
});
