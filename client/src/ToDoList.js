import React, { Component } from "react";
import axios from "axios";
import { Button, Card, Header, Form, Input } from "semantic-ui-react";

let endpoint = "http://localhost:8080";

class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      task: "",
      id: 1,
      items: []
    };
  }

  componentDidMount() {
    axios.get(endpoint + "/api/task").then(res => {
      console.log(res);
      this.setState({
        list: res.data.map(task => ({
          id: task.id,
          task: task.task
        })),
        id: res.data.length,
        items: res.data.map(item => {
          let card = {
            header: item.task,
            fluid: true
          };
          return card;
        })
      });
    });
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = () => {
    let { task, id } = this.state;
    if (task) {
      axios
        .post(endpoint + "/api/createTask", {
          id,
          task
        })
        .then(res => {
          id += 1;
          this.setState({ id }, () => {
            this.getTask();
          });
          console.log(res);
        });
    }
  };

  getTask = () => {
    axios.get(endpoint + "/api/task").then(res => {
      this.setState({
        items: res.data.map(item => {
          let card = {
            header: item.task,
            fluid: true
          };
          return card;
        })
      });
    });
  };

  render() {
    return (
      <div>
        <div className="row">
          <Header className="header" as="h2">
            TO DO LIST
          </Header>
        </div>
        <div className="row">
          <Form>
            <Input
              type="text"
              name="task"
              onChange={this.onChange}
              value={this.state.task}
              fluid
              placeholder="Create Task"
            />
            <Button onClick={this.onSubmit}>Create Task</Button>
          </Form>
        </div>
        <div className="row">
          <Card.Group items={this.state.items} />
        </div>
      </div>
    );
  }
}

export default ToDoList;
