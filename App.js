import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Navbar from './app/components/Navbar';
import MainScreen from './app/screens/MainScreen';
import TodoScreen from './app/screens/TodoScreen';

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([]);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={error => console.log(error)}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  const addTodo = title =>
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: Date.now().toString(),
        title,
      },
    ]);

  const deleteTodo = id => {
    const selectedTodoTitle = todos.find(item => item.id === id).title;
    Alert.alert(
      'Удаление элемента',
      `Вы уверены, что хотите удалить "${selectedTodoTitle}"`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress() {
            setTodoId(null);
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  const updateTodoTitle = (id, title) => {
    setTodos(oldState =>
      oldState.map(todo => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      }),
    );
  };

  let content = (
    <MainScreen addTodo={addTodo} deleteTodo={deleteTodo} todos={todos} openTodo={setTodoId} />
  );

  if (todoId) {
    const selectedTodo = todos.find(item => item.id === todoId);
    content = (
      <TodoScreen
        goBack={() => setTodoId(null)}
        todo={selectedTodo}
        deleteTodo={deleteTodo}
        updateTodoTitle={updateTodoTitle}
      />
    );
  }

  return (
    <View>
      <Navbar title="Todo App" />
      <View style={styles.container}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
