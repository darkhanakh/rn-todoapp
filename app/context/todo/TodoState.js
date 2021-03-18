import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';

import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types';
import TodoContext from './todoContext';
import todoReducer from './todoReducer';
import ScreenContext from './../screen/screenContext';

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
  };

  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = title => dispatch({ type: ADD_TODO, title });

  const removeTodo = id => {
    const selectedTodoTitle = state.todos.find(t => t.id === id).title;
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
            changeScreen(null);
            dispatch({ type: REMOVE_TODO, id: id });
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo,
      }}>
      {children}
    </TodoContext.Provider>
  );
};
