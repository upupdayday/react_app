import React, { Component } from 'react';
import 'normalize.css';
import './reset.css';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog';
import {getCurrentUser} from './leanCloud'

let id = 0

function idMaker(){
    id += 1
    return id
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:getCurrentUser() || {},
            newTodo: '',
            todoList: []
        };
        this.addTodo = this.addTodo.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.toggle = this.toggle.bind(this);
        this.delete = this.delete.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
    }

    componentDidUpdate(){

    }

    onSignUp(user) {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = user
        this.setState(stateCopy)
    }

    addTodo(event){
        this.state.todoList.push({
            id: idMaker(),
            title: event.target.value,
            status: null,
            deleted: false
        })
        this.setState({
            newTodo: '',
            todoList: this.state.todoList
        })
    }

    changeTitle(event){
        this.setState({
            newTodo: event.target.value,
            todoList: this.state.todoList
        })
    }

    toggle(e, todo){
        todo.status = todo.status==='completed' ? '' : 'completed';
        this.setState(this.state);
   }

    delete(e, todo){
        todo.deleted = true;
        this.setState(this.state);
    }

    render() {
        let todos = this.state.todoList.filter((item)=> !item.deleted)
            .map((item,index)=>{
                return (
                    <li key={index}>
                        <TodoItem todo={item} onToggle={this.toggle}
                        onDelete={this.delete}/>
                    </li>
                );
            })
        return (
          <div className="App">
              <h1>{this.state.user.username||'我'}的待办</h1>
              <div className="inputWrapper">
                  <TodoInput content={this.state.newTodo}
                             onChange={this.changeTitle}
                             onSubmit={this.addTodo}/>
              </div>
              <ol className="todoList">
                  {todos}
              </ol>
              {this.state.user.id ? null : <UserDialog onSignUp={this.onSignUp}/>}
          </div>
        );
    }
}

export default App;
