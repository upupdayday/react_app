import React, { Component } from 'react';
import 'normalize.css';
import './reset.css';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import * as localStore from './localStorage';

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
            todoList: localStore.load('todoList') || []
        };
        this.addTodo = this.addTodo.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.toggle = this.toggle.bind(this);
        this.delete = this.delete.bind(this);
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
        localStore.save('todoList', this.state.todoList);
    }

    changeTitle(event){
        this.setState({
            newTodo: event.target.value,
            todoList: this.state.todoList
        })
        localStore.save('todoList', this.state.todoList);
    }

    toggle(e, todo){
        todo.status = todo.status==='completed' ? '' : 'completed';
        this.setState(this.state);
        localStore.save('todoList', this.state.todoList);
    }

    delete(e, todo){
        todo.deleted = true;
        this.setState(this.state);
        localStore.save('todoList', this.state.todoList);
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
              <h1>我的待办</h1>
              <div className="inputWrapper">
                  <TodoInput content={this.state.newTodo}
                             onChange={this.changeTitle}
                             onSubmit={this.addTodo}/>
              </div>
              <ol className="todoList">
                  {todos}
              </ol>
          </div>
        );
    }
}

export default App;
