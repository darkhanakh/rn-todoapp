import React, { useState, useContext } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { THEME } from '../theme';

import MainScreen from './../screens/MainScreen';
import TodoScreen from './../screens/TodoScreen';

import Navbar from './../components/Navbar';
import TodoContext from '../context/todo/todoContext';

export default function MainLayout() {
  const { todos, addTodo, removeTodo, updateTodo } = useContext(TodoContext);
  const [todoId, setTodoId] = useState(null);
  // const [todos, setTodos] = useState([]);

  /* const addTodo = title =>
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
  }; */

  let content = (
    <MainScreen
      addTodo={addTodo}
      deleteTodo={removeTodo}
      todos={todos}
      openTodo={setTodoId}></MainScreen>
  );

  if (todoId) {
    const selectedTodo = todos.find(item => item.id === todoId);
    content = (
      <TodoScreen
        goBack={() => setTodoId(null)}
        todo={selectedTodo}
        deleteTodo={removeTodo}
        updateTodoTitle={updateTodo}
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
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
});
