
import './App.css';
import { useQuery, gql } from '@apollo/client';
import Table from 'react-bootstrap/Table';

const  query = gql`
  query getTodos {
    getTodos {
      id
      title
      completed
      user {
        name
        email
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

    console.log(data.getTodos);
  return (
    <div className="App">
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Completed</th>
            <th>User</th>
          </tr>
          {data.getTodos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.completed ? 'Completed' : 'Not Completed'}</td>
              <td>{todo.user.name} ({todo.user.email})</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
