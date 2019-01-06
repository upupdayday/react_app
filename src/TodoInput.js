import React, { Component } from 'react';

class TodoInput extends Component{
    submit(e){
        if (e.key === 'Enter') {
            this.props.onSubmit.call()
        }
    }
    render(){
        return <input type="text" defaultValue={this.props.content}
        onKeyPress={this.submit.bind(this)}/>
    }


}

export default TodoInput;