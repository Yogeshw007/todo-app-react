import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import AddTodo from './AddTodo';
import Todo from './Todo';
import Row from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap';

function Todos() {
    const [todoItems, setToDoItems] = useState([]);
    const [todoItemAddLoading, setTodoItemAddLoading] = useState(false);

    // Function to add a todo item
    async function addNewItemTodoList(todoText) {
        const payload = {
            title: todoText,
            body: todoText,
            userId: 1,
            completed: false
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };
        setTodoItemAddLoading(true);

        let data;
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', options);
            data = await response.json();
        } catch (error) {
            console.log('Error in adding todo item', error);
        }
        setToDoItems([...todoItems, data]);
        setTodoItemAddLoading(false);
    }

    // Function to update the text of a todo item
    async function handleUpdateTodoItem(index, itemId, todoText) {
        const itemToBeUpdated = todoItems.filter((item) => {
            return item.id === itemId;
        })[0];

        const updatedTodosList = [...todoItems];

        updatedTodosList[index]['title'] = todoText;
        updatedTodosList[index]['body'] = todoText;

        const payload = {
            title: todoText,
            body: todoText,
            userId: itemToBeUpdated.userId,
            id: itemId,
            completed: itemToBeUpdated.completed
        }

        const options = {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };


        let updatedItem;
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${itemId}`, options);
            updatedItem = await response.json();
        } catch (error) {
            console.log('Error in updating a todo item', error);
        }

        setToDoItems(updatedTodosList);
    }

    // Function to delete a todo item
    async function handleDeleteTodoItem(id, itemId) {
        const updatedTodos = [...todoItems];

        updatedTodos.splice(id, 1)

        const options = {
            method: 'DELETE',
        };

        try {
            await fetch(`https://jsonplaceholder.typicode.com/posts/${itemId}`, options);
        } catch (error) {
            console.log('Error in deleting todo item', error);
        }

        setToDoItems(updatedTodos);
    }

    // Function to update the status of a todo item
    async function toggleTodoItem(index, itemId = 30, status) {
        const updatedTodosList = [...todoItems];

        updatedTodosList[index].completed = !status;

        const itemToBeUpdated = todoItems.filter((item) => {
            return item.id === itemId;
        })[0];

        const payload = {
            title: itemToBeUpdated.title,
            body: itemToBeUpdated.body,
            userId: itemToBeUpdated.userId,
            id: itemId,
            completed: !status
        }

        const options = {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };

        let updatedItem;
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${itemId}`, options);
            updatedItem = await response.json();
        } catch (error) {
            console.log('Error in updating the status of todo item', error);
        }

        setToDoItems(updatedTodosList);
    }

    // Fetching the todo items (12 items) from the API and updating the state
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(data => {
                const listOfTodos = data.splice(0, 12);

                setToDoItems(listOfTodos);
            })
            .catch((e) => {
                console.log('Error in fetching the todos : ', e);
            })
    }, []);

    return (
        <Container style={styles.container}>
            <Row>
                <Col>
                    <h1 style={{ textAlign: 'center' }}>
                        {`<Todo/>`}
                    </h1>
                </Col>
            </Row>
            <Row style={styles.searchContainer}>
                <AddTodo onAddNewItem={addNewItemTodoList} loading={todoItemAddLoading} />
            </Row>
            {todoItems.map((item, index) => {
                return (
                    <Todo
                        item={item}
                        key={item.id}
                        index={index}
                        handleUpdateTodoItem={handleUpdateTodoItem}
                        handleDeleteTodoItem={handleDeleteTodoItem}
                        toggleTodoItem={toggleTodoItem}
                    />
                )
            })}
        </Container>
    )
}

// Styles for this component
const styles = {
    container: {
        width: '35vw',
        backgroundColor: '#E2d8c1',
        padding: 40,
        borderRadius: 10,
        marginTop: 20,
        maxHeight: '95vh',
        overflowY: 'auto'
    },
    searchContainer: {
        marginBottom: 30
    }
}

export default Todos;