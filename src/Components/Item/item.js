import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './item.scss';
import { useDispatch } from 'react-redux';
import {
  removeTodo,
  addTodo
} from '../../Reducers/todoSlice';

function Item(props) {
  const removeItem = (e) => {
    e.preventDefault();
      dispatch(removeTodo(props.name));
    }
    const addItem = (e) => {
      e.preventDefault();
      dispatch(addTodo({'name': props.name, 'description':props.description, 'dueDate':props.dueDate}));
    }
  const dispatch = useDispatch();
  return (
    <Card >
      <Card.Body>
        <Card.Title >{props.name}</Card.Title>
        <Card.Text className="fw-bold">
          Description
        </Card.Text>
        <Card.Text>
          {props.description}
        </Card.Text>
        <Card.Text className="fw-bold">
          Due Date
        </Card.Text>
        <Card.Text>
            {props.dueDate}
        </Card.Text>
      </Card.Body>
      <Card.Body>
      <Button variant="info">Editar</Button>
      <Button variant="info" onClick={removeItem}>Eliminar</Button>
      </Card.Body>
    </Card>
  );
}

export default Item;