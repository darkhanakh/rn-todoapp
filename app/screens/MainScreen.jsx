import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

import AddTodo from '../components/AddTodo';
import Todo from '../components/Todo';
import { THEME } from '../theme';

export default function MainScreen({ addTodo, deleteTodo, todos, openTodo }) {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2,
  );

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

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {todos.length ? (
        <View style={{ width: deviceWidth }}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <Todo todo={item} deleteTodo={deleteTodo} onOpen={openTodo} />
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
});
