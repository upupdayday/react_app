import React, { Component } from 'react';
import './TodoItem.css'

class TodoItem extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.delete = this.delete.bind(this);
    }


    toggle(e){
        this.props.onToggle(e, this.props.todo)
    }
    delete(e){
        this.props.onDelete(e, this.props.todo)
    }
    render(){
        return (
            <div className="TodoItem"v>
                <input type="checkbox" checked={this.props.todo.status==='completed'}
                onChange={this.toggle}/>
                <span className="title">{this.props.todo.title}</span>
                <button onClick={this.delete}>删除</button>
            </div>

        );
    }
}

export default TodoItem;