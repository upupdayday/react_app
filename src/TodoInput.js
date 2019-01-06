import React, { Component } from 'react';

class TodoInput extends Component{
    submit(e) {
        if (e.key === 'Enter') {
            console.log('用户按回车了');
        }
    }
    
    render(){
        return <input type="text" defaultValue={this.props.content}
        onKeyPress={this.submit(e)}/>
    }


}

export default TodoInput;