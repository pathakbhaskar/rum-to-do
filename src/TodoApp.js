import React from "react";
import "./TodoApp.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//Instrumenting Appliation for CW RUM
import { AwsRum } from 'aws-rum-web';

let awsRum = null;

try {
  const config = {
    sessionSampleRate: 1,
    guestRoleArn: "arn:aws:iam::873666629966:role/RUM-Monitor-us-east-1-873666629966-3365752510861-Unauth",
    identityPoolId: "us-east-1:487e6673-5d04-422d-8a53-677baad3e6d3",
    endpoint: "https://dataplane.rum.us-east-1.amazonaws.com",
    telemetries: ["performance","errors","http"],
    allowCookies: true,
    enableXRay: false,

    //Sending custom sessino attributes
    sessionAttributes: {
      "applicatinoVErsion" : "1.1.0"
    }
  };

  const APPLICATION_ID = 'a7bb4c58-4b0d-4dc6-adbc-135710a05079';
  const APPLICATION_VERSION = '1.0.0';
  const APPLICATION_REGION = 'us-east-1';

  awsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
}

//Sending custom page attributes and custom events
function sendCustomRUMData(pageID, pageAttributes){
  awsRum.recordPageView({  
    pageId: pageID,  
    pageAttributes: {
      template: pageAttributes,
      customval: "test"
    }
  });
}

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div
      className="todo"
      
    >
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Add Todo</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
    </Form.Group>
    <Button variant="primary mb-3" type="submit">
      Submit
    </Button>
  </Form>
  );
}

function TodoApp() {
  const [todos, setTodos] = React.useState([
    {
      text: "Welcome to CloudWatch RUM",
      isDone: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);

  //Send custom events
  awsRum.recordEvent('task-added', {
    todo_text: text,
    status: "ToDo Added"
  });

  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);

    //Send custom events
    awsRum.recordEvent('task-completed', {
      todo_text: newTodos[index],
      status: "ToDo Completed"
    });

  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);

    //Send custom events
    awsRum.recordEvent('task-removed', {   
    todo_text: newTodos[index],
    status: "ToDo Removed"
    });
    
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List App</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoApp;