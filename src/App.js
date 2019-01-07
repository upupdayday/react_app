import React, { Component } from 'react';
import 'normalize.css';
import './reset.css';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

let id = 0

function idMaker(){
    id += 1
    return id
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTodo: '',
            todoList: [
                {id:1, title:'第一个待办'},
                {id:2, title:'第二个待办'},
                {id:3, title:'第三个待办'},
            ],
        };
        this.addTodo = this.addTodo.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
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
    render() {
        let todos = this.state.todoList.map((item,index)=>{
            return (
                <li key={index}>
                    <TodoItem todo={item}/>
                </li>
            );
        })
        return (
          <div className="App">
              <h1>我的待办</h1>
              <div className="inputWrapper">
                  <TodoInput content={this.state.newTodo}
                             onChange={this.changeTitle}
                             onSubmit={this.addTodo}/>
              </div>
              <ol>
                  {todos}
              </ol>
          </div>
        );
    }
}

export default App;
