import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

function AddTodo(props) {
    const [todoText, setTodoText] = useState('');
    const { onAddNewItem, loading } = props;

    return (
        <React.Fragment>
            {/* Search input */}
            <Col sm={11} style={{ paddingRight: 0 }}>
                <input
                    type="text"
                    name="search"
                    style={styles.searchContainer}
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                    autoComplete="off"
                    placeholder='Add todo item here'
                />
            </Col>
            {/* Search button */}
            <Col sm={1} style={{ padding: 0 }}>
                <Button
                    variant="info"
                    style={styles.searchBtn}
                    onClick={() => {
                        onAddNewItem(todoText)
                        setTodoText('')
                    }}
                    disabled={loading}
                >
                    <img
                        style={styles.image}
                        src='https://cdn-icons-png.flaticon.com/512/2989/2989907.png'
                        alt='search-icon'
                    />
                </Button>
            </Col>

        </React.Fragment>
    )
}

// Styles for this component
const styles = {
    searchContainer: {
        width: '100%',
        height: '100%',
        paddingLeft: 15
    },
    image: {
        width: 20,
    },
    searchBtn: {
        border: '1px solid black',
        marginLeft: 2,
    }
}

export default AddTodo;