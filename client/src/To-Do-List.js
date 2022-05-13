import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Form, Input, Icon, Button, Modal, Dropdown,Grid } from "semantic-ui-react";
// import Modalcustom from './components/Modalcustom'
let endpoint = "http://localhost:8080";
const countryOptions = [
  { key: 'todo', value: 'A faire', text: 'A faire' },
  { key: 'pending', value: 'En cours', text: 'En cours' },
  { key: 'done', value: 'Fait', text: 'Fait' },
  { key: 'late', value: 'En retard', text: 'En retard' },
]
class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      items: [],
      modaladd:false,
      modalmodify:false,
      selectitem:null,
      status:""
    };
  }
  componentDidMount() {
    this.getTask();
  }
  handleOnChange = (e, data) => {
    this.setState({status: data.value})
 }
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = () => {
    this.setState({modaladd: false})
    this.setState({modalmodify: false})
    let { task } = this.state;
    // console.log("pRINTING task", this.state.task);
    if (task) {
      axios
        .post(
          endpoint + "/api/task",
          {
            task,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          this.getTask();
          this.setState({
            task: "",
          });
          // console.log(res);
          console.log('response de getAll',res);
        });
    }
  };
  ModifyTaskreturn = () => {
    return(
      <>
      <Button onClick={() => this.setState({modaladd:true})} style={{background:'#fff'}}><Icon name="plus"></Icon>Ajouter tâche</Button>
      {/* <Button onClick={() => this.setState({modaladd:true})}>Open first Modal</Button> */}

      <Modal
        onClose={() => this.setState({modaladd:false})}
        onOpen={() => this.setState({modaladd:true})}
        open={this.state.modaladd}
      >
        <Header>Nouvelle tâche</Header>
              <Form onSubmit={this.onSubmit}>
                  <Input
                  type="text"
                  name="task"
                  onChange={this.onChange}
                  value={this.state.task}
                  fluid
                  placeholder="Créer une tâche"
                  />
                  {/* <Button >Create Task</Button> */}
              </Form>
        <Modal.Actions>
          <Button color='black' onClick={() => this.setState({modaladd: false})}>
            Fermer
          </Button>
          <Button
            content="Ajouter"
            labelPosition='right'
            icon='checkmark'
            onClick={() => this.onSubmit()}
            positive
          />
        </Modal.Actions>
      </Modal>
      <Modal
          onClose={() => this.setState({modalmodify:false})}
          open={this.state.modalmodify}
          size='small'
        >
          <Modal.Header>Modifier une tâche</Modal.Header>
          <Modal.Content>
          <Dropdown
            placeholder='Status'
            fluid
            selection
            options={countryOptions}
            onChange={this.handleOnChange}
          />
          {/* <Select onChange={(e) =>this.change(e)} value={countryOptions.value} style={{width:'100%'}} placeholder='Select your country' options={countryOptions} /> */}
          </Modal.Content>
          <Modal.Actions>
            {/* <Button
              icon='check'
              content='All Done'
              onClick={() => this.setState({modalmodify:false})}
            /> */}
            <Button color='black' onClick={() => this.setState({modalmodify: false})}>
            Fermer
          </Button>
          {this.state.selectitem !=null &&(
          <Button
            content="Modifier"
            labelPosition='right'
            icon='checkmark'
            onClick={() => {this.undoTask(this.state.selectitem._id);this.setState({modalmodify:false})}}
            positive
          />
          )}
          </Modal.Actions>
        </Modal>
    </>
    )
  }
  AddTaskreturn = (type) => {
    return(
      <Modal
        onClose={() => this.setState({modaladd: false})}
        onOpen={() => this.setState({modaladd: true})}
        open={this.state.modaladd}
        // trigger={<Button style={{background:'#fff'}}><Icon name="plus"></Icon>Ajouter tâche</Button>}
      >
        <Modal.Content>
          <Modal.Description>
            <Header>Nouvelle tâche</Header>
              <Form onSubmit={this.onSubmit}>
                  <Input
                  type="text"
                  name="task"
                  onChange={this.onChange}
                  value={this.state.task}
                  fluid
                  placeholder="Créer une tâche"
                  />
                  {/* <Button >Create Task</Button> */}
              </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => this.setState({modaladd: false})}>
            Fermer
          </Button>
          <Button
            content="Ajouter"
            labelPosition='right'
            icon='checkmark'
            onClick={() => this.onSubmit()}
            positive
          />
        </Modal.Actions>
      </Modal>
      
    )
  }
  getTaskFilter = () => {
    console.log('my result task',this.state.task);
    if (this.state.task ===""){
      this.getTask();
    } else {

    axios.get(endpoint + "/api/task/"+this.state.task).then((res) => {
      if (res.data) {
        console.log('my result',res.data);
        this.setState({
          items: res.data.map((item) => {
            let color = "yellow";
            let style = {
              wordWrap: "break-word",
            };
            console.log(item.status);
            if (item.status=="Fait") {
              color = "green";
            }
            if (item.status=="A faire") {
              color = "yellow";
            }
            if (item.status=="En retard") {
              color = "red";
            }

            return (
              <Card key={item._id} color={color} fluid>
                <Card.Content>
                  <Card.Header textAlign="left">
                    <div style={style}>{item.task}</div>
                  </Card.Header>

                  <Card.Meta textAlign="right">
                    
                    <Icon
                      name="check circle"
                      color="green"
                      onClick={() => this.updateTask(item._id)}
                    />
                    <span style={{ paddingRight: 10 }}>{item.status}</span>
                    {/* <Button onClick={() => this.setState({modalmodify:true})}>Open second Modal</Button> */}
                    <Button onClick={() => this.SelectItem(item)}>
                    <Icon
                      name="undo"
                      color="yellow"
                      
                      // onClick={() => this.undoTask(item._id)}
                    />
                    <span style={{ paddingRight: 10 }}>Modifier</span>
                    </Button>
                    
                    {/* {this.AddTaskreturn("modify")} */}
                    <Icon
                      name="delete"
                      color="red"
                      onClick={() => this.deleteTask(item._id)}
                    />
                    <span style={{ paddingRight: 10 }}>Delete</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            );
          }),
        });
      } else {
        this.setState({
          items: [],
        });
      }
    });
  }

  };
  getTask = () => {
    axios.get(endpoint + "/api/task").then((res) => {
      if (res.data) {
        this.setState({
          items: res.data.map((item) => {
            let color = "yellow";
            let style = {
              wordWrap: "break-word",
            };
            console.log(item.status);
            if (item.status=="En cours") {
              color = "yellow";
            }
            if (item.status=="Fait") {
              color = "green";
            }
            if (item.status=="A faire") {
              color = "blue";
            }
            if (item.status=="En retard") {
              color = "red";
            }

            return (
              <Card key={item._id} color={color} fluid>
                <Card.Content>
                <Grid columns='equal'>
                  <Grid.Column mobile={4} tablet={4} computer={4}>
                      <Card.Header textAlign="left">
                        <h4 style={{textAlign:'center'}}>{item.task}</h4>
                      </Card.Header>
                  </Grid.Column>
                  <Grid.Column mobile={4} tablet={4} computer={6}>
                    <div style={{display:"block",margin:'auto',textAlign:'center'}}>
                        <Icon
                          name="check circle"
                          color={color}
                          onClick={() => this.updateTask(item._id)}
                        />
                        <span style={{textAlign:'center' }}>{item.status}</span>
                      </div>
                  </Grid.Column>
                  <Grid.Column mobile={8} tablet={8} computer={6}>
                      <Grid>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Button onClick={() => this.SelectItem(item)}>
                          <Icon
                            name="edit"
                            color="yellow"
                          />
                          <span style={{ paddingRight: 10 }}>Modifier</span>
                        </Button>
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Button onClick={() => this.deleteTask(item._id)}>
                          <Icon
                            name="delete"
                            color="red"
                          />
                          <span style={{ paddingRight: 10 }}>Delete</span>
                        </Button>
                        </Grid.Column>
                      </Grid>
                  </Grid.Column>
                </Grid>
                  

                  <Card.Meta textAlign="center">
                      
                  </Card.Meta>
                </Card.Content>
              </Card>
            );
          }),
        });
      } else {
        this.setState({
          items: [],
        });
      }
    });
  };
  SelectItem =(item) => {
    this.setState({selectitem:item})
    this.setState({modalmodify:true,selectitem:item})
  }
  updateTask = (id) => {
    axios
      .put(endpoint + "/api/task/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res);
        this.getTask();
      });
  };

  undoTask = (id) => {
    axios
      .put(endpoint + "/api/undoTask/" + id+"/" +this.state.status, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res);
        this.getTask();
      });
  };

  deleteTask = (id) => {
    axios
      .delete(endpoint + "/api/deleteTask/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res);
        this.getTask();
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
          <Form onSubmit={this.getTaskFilter}>
            <Input
              type="text"
              name="task"
              onChange={this.onChange}
              value={this.state.task}
              fluid
              placeholder="Chercher une tâche"
            />
            {/* <Button >Create Task</Button> */}
          </Form>
        </div>
        <div className="row" style={{background:'#fff',paddingLeft:10,paddingRight:10, paddingBottom:10, borderRadius:8}}>
          {/* <h3 style={{textAlign:'center'}}>Mes tâches</h3> */}
          <Grid>
            <Grid.Column mobile={4} tablet={4} computer={4}>
              <h3 style={{textAlign:'center'}}>Tâche</h3>
            </Grid.Column>
            <Grid.Column mobile={4} tablet={4} computer={6}>
            <h3 style={{textAlign:'center'}}>Etat</h3>
            </Grid.Column>
            <Grid.Column mobile={8} tablet={8} computer={6}>
            </Grid.Column>
          </Grid>
          <Card.Group>{this.state.items}</Card.Group>
          <br></br>
          {this.ModifyTaskreturn()}
          {/* {this.AddTaskreturn("add")} */}
          {/* {this.AddTaskreturn("modify")} */}
          {/* <Button onClick={()=>this.setState({modaladd: true})} style={{background:'#fff'}}><Icon name="plus"></Icon>Ajouter tâche</Button> */}
        </div>
        <div>

          {/* <Modal></Modal>
          <Button>Ajouter tâche
          </Button> */}
          

        </div>
      </div>
    );
  }
}

export default ToDoList;
