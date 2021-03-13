import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';

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
        autoCapitalize="none"
      />
      <Button title="Добавить" onPress={pressHandler} />
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
    width: '70%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#3949ab',
  },
});
