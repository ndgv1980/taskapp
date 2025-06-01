import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './formulario.scss';
import { addTodo } from '../../Reducers/todoSlice';
import { addGoal } from '../../Reducers/goalsSlice';
import { changeOption } from '../../Reducers/optionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';

function Formulario() {
  const dispatch = useDispatch();

  const inputRefName = useRef();
  const inputRefDescription = useRef();
  const inputRefDueDate = useRef();
  const option = useSelector((state) => state.option.value);

  const addItem = (e) => {
    e.preventDefault();

    if (inputRefName.current.value && inputRefDescription.current.value && inputRefDueDate.current.value) {
      if (option === 'tasks') {
        dispatch(addTodo({
          'name': inputRefName.current.value,
          'description': inputRefDescription.current.value,
          'dueDate': inputRefDueDate.current.value,
        }));
      }
      else {
        dispatch(addGoal({
          'name': inputRefName.current.value,
          'description': inputRefDescription.current.value,
          'dueDate': inputRefDueDate.current.value,
        }));
      }
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" ref={inputRefName}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Enter description" ref={inputRefDescription}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Due Date</Form.Label>
        <Form.Control type="date" placeholder="Due Time" ref={inputRefDueDate}/>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={addItem}>
        {option === 'tasks' ? 'Add Task' : 'Add Goal'}
      </Button>
    </Form>
  );
}

export default Formulario;