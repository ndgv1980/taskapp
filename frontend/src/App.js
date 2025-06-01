//import { Todos } from './Components/todos';
//import { Goals } from './Components/goals';
//import logo from './logo.svg';
import './App.scss';
import Item from './Components/Item/item';
import Menu from './Components/Menu/menu';
import Formulario from './Components/Formulario/formulario';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import{
  addTodo,
  initAddTodo
} from './Reducers/todoSlice'
import { selectTodos } from './Reducers/todoSlice';
import { selectGoals } from './Reducers/goalsSlice';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const goals = useSelector(selectGoals);
  const option = useSelector((state) => state.option.value);

  return (
    <div className="App">
      <Menu></Menu>
      <Container>
        <Row>
          <Col xs={0} md={0} className='d-none d-sm-none d-md-block'>
            <Formulario/>
          </Col>
          <Col xs={0} sm={0}>
            <Row>
              <div className='scrolling'>
                {
                  option === 'goals' ?
                  goals.map((goal, index) => {
                    return (
                      <Item key={index} name={goal.name} description={goal.description} dueDate={goal.dueDate} />
                    )
                  }) :
                  todos.map((todo, index) => {
                    return (
                      <Item key={index} name={todo.name} description={todo.description} dueDate={todo.dueDate} />
                    )
                  })
                }
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;