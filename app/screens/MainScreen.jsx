import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

import AddTodo from '../components/AddTodo';
import Todo from '../components/Todo';
import { THEME } from '../theme';
import TodoContext from './../context/todo/todoContext';
import ScreenContext from './../context/screen/screenContext';
import AppLoader from '../components/common/AppLoader';
import AppText from './../components/common/AppText';
import AppButton from './../components/common/AppButton';

export default function MainScreen() {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2,
  );

  const { addTodo, todos, removeTodo, fetchTodos, loading, error } = useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext);
  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const updateScreen = () => {
      const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width);
    };

    Dimensions.addEventListener('change', updateScreen);
    return () => {
      Dimensions.removeEventListener('change', updateScreen);
    };
  }, []);

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadTodos}>Повторить</AppButton>
      </View>
    );
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {todos.length ? (
        <View style={{ width: deviceWidth }}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      ) : (
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={require('./../../assets/images/no-items.png')}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
    textAlign: 'center',
  },
});
