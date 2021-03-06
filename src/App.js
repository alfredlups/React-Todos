import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/layout/header'
import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import About from './components/pages/About'
//import {v4 as uuid} from 'uuid'
import axios from 'axios'
import './App.css';

class App extends Component{

  state = {
     todos: []
  }

  componentDidMount(){
    axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
         .then(res => this.setState({ todos: res.data }))
  }

  //Mark Complete
  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
        if( todo.id == id){
          todo.completed = !todo.completed
        }
        return todo
     })
    })
  }

  deleteTodo = (id) => {

    axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
         .then(res => 
            this.setState({
              todos: [...this.state.todos.filter(todo => todo.id !== id)]
            })
         )
  }

  addTodo = (title) => {
    axios.post('http://jsonplaceholder.typicode.com/todos', {
      title: title,
      completed: false
    }).then(res => this.setState({todos: [...this.state.todos, res.data] }))
  }

  render(){
    return(
      <Router>
        <div className="App">
          <Header />
          <Route
            exact 
            path="/" 
            render={(props) =>(
              <React.Fragment>
                <div className="container">
                  <AddTodo addTodo={this.addTodo} />
                  <Todos todos={this.state.todos} markComplete={this.markComplete} deleteTodo={this.deleteTodo} />
                </div>
              </React.Fragment>
            )} 
          />
          <Route path="/about" component={About} />
        </div>
      </Router>
    )
  }
}

export default App;
