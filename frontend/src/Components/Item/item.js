import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './item.scss';
import { CardBody } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeTodo } from '../../Reducers/todoSlice';
import { removeGoal } from '../../Reducers/goalsSlice';
import { useSelector } from 'react-redux';

function Item(props) {
  const dispatch = useDispatch();
  const option = useSelector((state) => state.option.value);

  const removeItem = (e) => {
    e.preventDefault();
    if (option === 'tasks') {
      dispatch(removeTodo({name: props.name, key: props.key}));
    }
    else {
      dispatch(removeGoal({name: props.name, key: props.key}));
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text className='fw-bold'>
          Descripción
        </Card.Text>
        <Card.Text>
          {props.description}
        </Card.Text>
        <Card.Text className='fw-bold'>
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