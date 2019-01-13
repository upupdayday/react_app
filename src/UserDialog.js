import React, { Component } from 'react';
import './UserDialog.css'

class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state = {
            selected: 'signUp'
        }
        this.switch = this.switch.bind(this);
    }

    switch(e) {
        this.setState({
            selected: e.target.value
        })
    }

    render(){
        let signUpForm = (
            <form className="signUp"> {/* 注册*/}
                <div className="row">
                    <label>用户名</label>
                    <input type="text"/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password"/>
                </div>
                <div className="row actions">
                    <button type="submit">注册</button>
                </div>
            </form>
        );

        let signInForm = (
            <form className="signIn"> {/* 登录*/}
                <div className="row">
                    <label>用户名</label>
                    <input type="text"/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password"/>
                </div>
                <div className="row actions">
                    <button type="submit">登录</button>
                </div>
            </form>
        );
        
        const formSelected = this.state.selected;

        let renderForm;
        renderForm = ('signUp' === formSelected) ? signUpForm : signInForm;

        return(
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    <nav onChange={this.switch}>
                        <label><input type="radio" value="signUp" checked={this.state.selected === 'signUp'}/>注册</label>
                        <label><input type="radio" value="signIn" checked={this.state.selected === 'signIn'}/>登录</label>
                    </nav>
                    <div className="panes">
                        {renderForm}
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDialog;