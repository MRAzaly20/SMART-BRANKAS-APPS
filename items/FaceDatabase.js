import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  Dimensions,
  StatusBar,
  ImageBackground,
} from "react-native";
import { ref, onValue, push, update, remove, set } from "firebase/database";
import * as LocalAuthentication from "expo-local-authentication";

import { db } from "../src/config";
import { TabView, SceneMap } from "react-native-tab-view";

const image = {
  uri: "https://i2.wp.com/allpicts.in/wp-content/uploads/2016/11/Diagonal-Squares-2-for-Samsung-Galaxy-S7-and-Edge-Wallpaper.jpg?resize=768%2C1365",
};
const image2 = {
  uri: "https://i.pinimg.com/originals/9d/b7/f0/9db7f006a7f0963f6cd4444a7f0c2f58.jpg",
};

export const FirstRoute = () => {
  const [todos, setTodos] = useState({});
  const [presentTodo, setPresentTodo] = useState("");
  const todosKeys = Object.keys(todos);

  useEffect(() => {
    return onValue(ref(db, "ESP32/todos_data"), (querySnapShot) => {
      let data = querySnapShot.val() || {};
      let todoItems = { ...data };
      setTodos(todoItems);
    });
  }, []);

  function addNewTodo() {
    push(ref(db, "ESP32/todos_data"), {
      done: false,
      title: presentTodo,
    });
    setPresentTodo("");
  }

  function clearTodos() {
    remove(ref(db, "ESP32/todos_data"));
  }
  return (
    <ImageBackground source={image2} style={{ flex: 1, opacity: 0.6 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {/* <TextInput
                placeholder="New todo"
                value={presentTodo}
                style={styles.textInput}
                onChangeText={text => {
                    setPresentTodo(text);
                }}
                onSubmitEditing={addNewTodo}
            />

            <View>
                <View style={{ marginTop: 20 }}>
                    <Button
                        title="Add new todo"
                        onPress={addNewTodo}
                        color="green"
                        disabled={presentTodo == ''}
                    />
                </View>

                <View style={{ marginTop: 20, marginBottom: 20 }}>
                    <Button
                        title="Clear the todo list"
                        onPress={clearTodos}
                        color="red"
                        style={{ marginTop: 20 }}
                    />
                </View>
            </View> */}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {todosKeys.length > 0 ? (
            todosKeys.map((key) => (
              <ToDoItemFace key={key} id={key} todoItem={todos[key]} />
            ))
          ) : (
            <View
              style={{
                width: 100,
                height: 30,
                backgroundColor: "rgba(16, 191, 255, 0.5)",
                elevation: 20,
                borderWidth: 1.5,
                borderRadius: 5,
                borderColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>No data in here</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export const SecondRoute = () => {
  const [todos, setTodos] = useState({});
  const [presentTodo, setPresentTodo] = useState("");
  const [presentTodo2, setPresentTodo2] = useState("");
  const todosKeys = Object.keys(todos);

  useEffect(() => {
    return onValue(ref(db, "ESP32/todos_fingerName"), (querySnapShot) => {
      let data = querySnapShot.val() || {};
      let todoItems = { ...data };
      setTodos(todoItems);
    });
  }, []);

  function addNewTodo() {
    push(ref(db, "ESP32/todos_fingerName"), {
      done: presentTodo2,
      title: presentTodo,
    });
    const integerNumber = parseInt(presentTodo2);
    set(ref(db, "ESP32/" + "ADD_FIN"), presentTodo2);
    setPresentTodo("");
    setPresentTodo2("");
  }
  function addNewTodo2() {
    push(ref(db, "ESP32/todos_fingerID"), {
      done: false,
      title: presentTodo2,
    });
    setPresentTodo2("");
  }

  // function clearTodos() {
  //     remove(ref(db, 'ESP32/todos_finger'));
  // }
  return (
    <ImageBackground
      source={image}
      style={{ flex: 1, zIndex: 100, height: 770, opacity: 0.9 }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <TextInput
          placeholder="Enter name in here"
          value={presentTodo}
          style={styles.textInput}
          onChangeText={(text) => {
            setPresentTodo(text);
          }}
          onSubmitEditing={addNewTodo}
        />
        <TextInput
          placeholder="Enter ID (1-27)"
          value={presentTodo2}
          style={styles.textInput}
          onChangeText={(text) => {
            setPresentTodo2(text);
          }}
          onSubmitEditing={addNewTodo2}
        />

        <View>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Button
              title="Add new User"
              onPress={addNewTodo}
              color="green"
              disabled={presentTodo == ""}
            />
          </View>

          {/* <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <Button
                            title="Clear the todo list"
                            onPress={clearTodos}
                            color="red"
                            style={{ marginTop: 20 }}
                        />
                    </View> */}
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {todosKeys.length > 0 ? (
            todosKeys.map((key) => (
              <ToDoItemFinger key={key} id={key} todoItem={todos[key]} />
            ))
          ) : (
            <View
              style={{
                width: "36%",
                height: 30,
                backgroundColor: "rgba(16, 191, 255, 0.5)",
                elevation: 20,
                borderWidth: 1.5,
                borderRadius: 5,
                borderColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>No data in here</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const ToDoItemFace = ({ todoItem: { title, done }, id }) => {
  const [doneState, setDone] = useState(done);

  const onCheck = (isChecked) => {
    setDone(isChecked);
    update(ref(db, "ESP32/todos_data"), {
      [id]: {
        title,
        done: !doneState,
      },
    });
  };
  const deleteTodo = () => {
    // Mendapatkan referensi database

    // Menghapus todo dari database dengan metode remove
    remove(ref(db, "ESP32/todos_data/" + id));
    set(ref(db, "ESP32/" + "sendData"), `remove:${title}`);
    console.log(id);
  };
  return (
    <View style={styles.todoItem}>
      {/* <Checkbox
                onValueChange={onCheck}
                value={doneState}
            /> */}
      <Text
        style={[
          styles.todoText,
          { opacity: doneState ? 0.2 : 1, fontWeight: "bold" },
        ]}
      >
        {title}
      </Text>
      <Button title="delete" onPress={deleteTodo} color="red" />
    </View>
  );
};

const ToDoItemFinger = ({ todoItem: { title, done }, id }) => {
  const [doneState, setDone] = useState(done);

  const onCheck = (isChecked) => {
    setDone(isChecked);
    update(ref(db, "ESP32/todos_fingerName"), {
      [id]: {
        title,
        done: !doneState,
      },
    });
  };
  const deleteTodo = async () => {
    // Menghapus todo dari database dengan metode remove
    const integerNumber2 = parseInt(done);
    await set(ref(db, "ESP32/" + "DEL_FIN"), done)
      .then(() => {
        remove(ref(db, "ESP32/todos_fingerName/" + id));
      })
      .catch((error) => {
        // Tangani kesalahan jika ada
        console.error(error);
      });

    console.log(id);
  };
  return (
    <View style={styles.todoItem}>
      {/* <Checkbox
                onValueChange={onCheck}
                value={doneState}
            /> */}
      <Text style={[styles.todoText, { opacity: 1 }]}>{title}</Text>
      <Button title="delete" onPress={deleteTodo} color="red" />
    </View>
  );
};

export function DataBase() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Face" },
    { key: "second", title: "Fingerprint" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      })}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get("window").width }}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    width: "100%",
  },
  scene: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#afafaf",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    fontSize: 20,
    backgroundColor: "#f1f1f1",
    marginTop: 5,
    fontSize: 17,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginTop: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 5,
    width: "100%",
  },
  todoText: {
    paddingHorizontal: 5,
    fontSize: 16,
  },
});
