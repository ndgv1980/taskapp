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

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.value);
  const arr = [
    {
      'name':'caminar al perro 1',
      'description':'paseando a Pulgoso',
      'dueDate':'2024-02-04'
    },
    {
      'name':'caminar al perro 2',
      'description':'paseando a mi perro Dinamita',
      'dueDate':'2020-01-12'
    }
  ]
  useEffect(() => {
    arr.map((item) => {
      dispatch(initAddTodo(item))
    })
    console.log('refresh');
  }, []);
  return (
    <div className="App">
      <Menu></Menu>
      <Container>
        <Row>
          <Col>
          <Formulario>
            </Formulario></Col>
          <Col>
          <div className='scrolling'>
              {
                todos.map((todo, index) => {
                  return (
                    <Item key={index} name={todo.name} description={todo.description} dueDate={todo.dueDate}/>
                  )
                }
                )
              }
          </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
