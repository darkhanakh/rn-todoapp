import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Navbar from './app/components/Navbar';
import MainScreen from './app/screens/MainScreen';
import TodoScreen from './app/screens/TodoScreen';

export default function App() {
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([]);

  const addTodo = title =>
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: Date.now().toString(),
        title,
      },
    ]);

  const deleteTodo = id => setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));

  let content = <MainScreen addTodo={addTodo} deleteTodo={deleteTodo} todos={todos} />;

  if (todoId) {
    content = <TodoScreen />;
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
