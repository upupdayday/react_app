import React, { Component } from 'react';
import 'normalize.css';
import './reset.css';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import UserDialog from './UserDialog';
import {getCurrentUser, signOut, TodoModel} from './leanCloud'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:getCurrentUser() || {},
            newTodo: '',
            todoList: []
        };

        console.log('2222222')
        this.addTodo = this.addTodo.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.toggle = this.toggle.bind(this);
        this.delete = this.delete.bind(this);
        this.onSignUporSignIn = this.onSignUporSignIn.bind(this);
        this.onSignOut = this.onSignOut.bind(this);

        let user = getCurrentUser()
        if (user) {
            TodoModel.getByUser(user, (todos) => {
                let stateCopy = JSON.parse(JSON.stringify(this.state))
                stateCopy.todoList = todos
                this.setState(stateCopy)
                console.log('~~~~~~~~~')
            })
        }
    }

    componentDidUpdate(){

    }

    onSignUporSignIn(user) {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = user
        this.setState(stateCopy)
        console.log('1111111111111111')
    }

    onSignOut(){
        signOut();
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = {}
        this.setState(stateCopy)
    }

    addTodo(event){
        let newTodo = {
            title: event.target.value,
            status: null,
            deleted: false
        }
        TodoModel.create(newTodo,
                (id)=>{
                    newTodo.id = id;
                    this.state.todoList.push(newTodo);
                    this.setState({
                        newTodo: '',
                        todoList: this.state.todoList})
                },
                (error) => {console.log(error)}
        )
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
        TodoModel.destroy(todo.id, ()=>{
            todo.deleted = true;
            this.setState(this.state);
        })
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
              <h1>{this.state.user.username||'我'}的待办
                  {this.state.user.id ? <button onClick={this.onSignOut}>登出</button> : null}
              </h1>
              <div className="inputWrapper">
                  <TodoInput content={this.state.newTodo}
                             onChange={this.changeTitle}
                             onSubmit={this.addTodo}/>
              </div>
              <ol className="todoList">
                  {todos}
              </ol>
              {this.state.user.id ? null
                  : <UserDialog
                      onSignUp={this.onSignUporSignIn}
                      onSignIn={this.onSignUporSignIn}/>}
          </div>
        );
    }
}

export default App;
