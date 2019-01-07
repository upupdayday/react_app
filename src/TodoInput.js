import React, { Component } from 'react';

class TodoInput extends Component{
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
                      onChange={this.changeTitle.bind(this)}
                      onKeyPress={this.submit.bind(this)}/>
    }


}

export default TodoInput;