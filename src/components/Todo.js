import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function Todo(props) {
    const { item, handleDeleteTodoItem, handleUpdateTodoItem, toggleTodoItem, index } = props;
    const [itemText, setItemText] = useState(item.title);
    const [editMode, setEditMode] = useState(false);

    function enableEditMode() {
        setEditMode(true);
    }

    function disableEditMode() {
        setEditMode(false);
    }

    return (
        <Row style={styles.todoItem}>
            <Col sm={1}>
                <Button
                    variant="light"
                    onClick={() => toggleTodoItem(index, item.id, item.completed)}
                >
                    <img
                        style={styles.image}
                        src={item.completed ? 'https://cdn-icons-png.flaticon.com/512/190/190411.png' : 'https://cdn-icons-png.flaticon.com/512/446/446163.png'}
                        alt="item-status-icon"
                    />
                </Button>
            </Col>
            <Col sm={9}>
                {editMode ?
                    <input
                        type="text"
                        value={itemText}
                        onChange={(e) => setItemText(e.target.value)}
                        style={styles.editBox}
                    />
                    :
                    <p>{item.title}</p>
                }
            </Col>
            <Col sm={1}>
                <Button
                    variant="link"
                    onClick={editMode ? () => {
                        handleUpdateTodoItem(index, item.id, itemText);
                        disableEditMode();
                    }
                        :
                        enableEditMode}
                >
                    {
                        editMode ?
                            <img
                                style={styles.image}
                                src='https://cdn-icons-png.flaticon.com/512/190/190411.png'
                                alt='save-icon'
                            />
                            :
                            <img
                                style={styles.image}
                                src='https://cdn-icons-png.flaticon.com/512/1159/1159633.png'
                                alt='edit-icon'
                            />
                    }
                </Button>
            </Col>
            <Col sm={1}>
                <Button
                    variant="link"
                    onClick={() => handleDeleteTodoItem(index, item.id)}
                >
                    <img
                        style={styles.image}
                        src='https://cdn-icons-png.flaticon.com/512/3096/3096673.png'
                        alt='delete-icon'
                    />
                </Button>
            </Col>
        </Row>
    )
}

const styles = {
    image: {
        width: 20
    },
    todoItem: {
        borderRadius: 10,
        border: '1px solid black',
        marginBottom: '5px',
        backgroundColor: '#E2d8c1',
    },
    editBox: {
        width: '100%'
    }
};

export default Todo;