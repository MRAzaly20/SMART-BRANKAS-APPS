import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    ScrollView,
    TextInput
} from 'react-native';
import {
    ref,
    onValue,
    push,
    update,
    remove
} from 'firebase/database';
import Checkbox from 'expo-checkbox';

import { db } from '../src/config';

export function DataBase() {
    const [todos, setTodos] = useState({});
    const [presentTodo, setPresentTodo] = useState('');
    const todosKeys = Object.keys(todos);

    useEffect(() => {
        return onValue(ref(db, 'ESP32/todos_data'), querySnapShot => {
            let data = querySnapShot.val() || {};
            let todoItems = { ...data };
            setTodos(todoItems);
        });
    }, []);

    function addNewTodo() {
        push(ref(db, 'ESP32/todos_data'), {
            done: false,
            title: presentTodo,
        });
        setPresentTodo('');
    }

    function clearTodos() {
        remove(ref(db, 'ESP32/todos_data'));
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}>

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

                <View style={{ marginTop: 20, marginBottom: 20}}>
                    <Button
                        title="Clear the todo list"
                        onPress={clearTodos}
                        color="red"
                        style={{ marginTop: 20}}
                    />
                </View>
            </View> */}
            <View>
                {todosKeys.length > 0 ? (
                    todosKeys.map(key => (
                        <ToDoItem
                            key={key}
                            id={key}
                            todoItem={todos[key]}
                        />
                    ))
                ) : (
                    <Text>No data face</Text>
                )}
            </View>
        </ScrollView>
    );
}

const ToDoItem = ({ todoItem: { title, done }, id }) => {
    const [doneState, setDone] = useState(done);

    const onCheck = (isChecked) => {
        setDone(isChecked);
        update(ref(db, 'ESP32/todos_data'), {
            [id]: {
                title,
                done: !doneState,
            },
        });
    };
    const deleteTodo = () => {
        // Mendapatkan referensi database

        // Menghapus todo dari database dengan metode remove
        remove(ref(db, 'ESP32/todos_data/' + id));
        console.log(id);
    };
    return (
        <View style={styles.todoItem}>
            <Checkbox
                onValueChange={onCheck}
                value={doneState}
            />
            <Text style={[styles.todoText, { opacity: doneState ? 0.2 : 1 }]}>
                {title}
            </Text>
            <Button
                title="delete"
                onPress={deleteTodo}
                color="red"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 12
    },
    contentContainerStyle: {
        padding: 24
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#afafaf',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 20,
        fontSize: 20,
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginTop: 10,
        backgroundColor: "rgba(0,0,0,0.1)",
        borderRadius: 5,
        
    },
    todoText: {
        paddingHorizontal: 5,
        fontSize: 16
    },
});