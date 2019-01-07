import React, { Component } from 'react';

class TodoItem extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle(e){
        this.props.onToggle(e, this.props.todo)
    }
    render(){
        return (
            <div>
                <input type="checkbox" checked={this.props.todo.status==='completed'}
                onChange={this.toggle}/>
                {this.props.todo.title}
            </div>

        );
    }
}

export default TodoItem;