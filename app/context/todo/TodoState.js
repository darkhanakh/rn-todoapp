import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';

import {
  ADD_TODO,
  REMOVE_TODO,
  SHOW_LOADER,
  UPDATE_TODO,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODOS,
} from '../actions';
import TodoContext from './todoContext';
import todoReducer from './todoReducer';
import ScreenContext from './../screen/screenContext';
import { API_URL } from './../../../constants';

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };

  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async title => {
    const { data } = await axios.post(API_URL, {
      title,
    });

    dispatch({ type: ADD_TODO, title, id: data.name });
  };

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
          async onPress() {
            changeScreen(null);
            await axios.delete(
              `https://rn-todo-app-a7f30-default-rtdb.firebaseio.com/todos/${id}.json`,
            );
            dispatch({ type: REMOVE_TODO, id: id });
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  const updateTodo = async (id, title) => {
    clearError();
    try {
      await axios.patch(`https://rn-todo-app-a7f30-default-rtdb.firebaseio.com/todos/${id}.json`, {
        title,
      });
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (e) {
      showError('Что-то пошло не так...');
      console.log(e);
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = error => dispatch({ type: SHOW_ERROR, error });

  const clearError = () => dispatch({ type: CLEAR_ERROR });

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const { data } = await axios.get(API_URL);
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch (e) {
      showError('Что-то пошло не так...');
      console.log(e);
    } finally {
      hideLoader();
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}>
      {children}
    </TodoContext.Provider>
  );
};
