import React, { Component } from 'react';
import './Todoinput.css'

class TodoInput extends Component{
    constructor(props){
        super(props);
        this.submit = this.submit.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
    }
    submit(e){
        if (e.key === 'Enter') {
            this.props.onSubmit(e)
        }
    }
    changeTitle(e){
        this.props.onChange(e)
    }

    render(){
        return <input type="text" value={this.props.content}
                      className= "TodoInput"
                      onChange={this.changeTitle}
                      onKeyPress={this.submit}/>
    }
}

export default TodoInput;