import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import AddTodo from '../components/AddTodo';
import Todo from '../components/Todo';

export default function MainScreen({ addTodo, deleteTodo, todos, openTodo }) {
  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {todos.length ? (
        <FlatList
          data={todos}
          renderItem={({ item }) => <Todo todo={item} deleteTodo={deleteTodo} onOpen={openTodo} />}
          keyExtractor={item => item.id.toString()}
        />
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
