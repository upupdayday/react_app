import React, { Component } from 'react';
import './UserDialog.css'

class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state = {
            selected: 'signUp',
            formData:{
                username:'',
                password:''
            }
        }
        this.switch = this.switch.bind(this)
        this.changeFormData = this.changeFormData.bind(this);
    }

    switch(e) {
        this.setState({
            selected: e.target.value
        })
    }
    signUp(e){}
    signIn(e){}

    changeFormData(key,e){
        console.log(this.state)
        let stateCopy = JSON.parse(JSON.stringify(this.state))  // 用 JSON 深拷贝
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
        console.log(this.state)
    }

    render(){
        let signUpForm = (
            <form className="signUp" onSubmit={this.signUp}> {/* 注册*/}
                <div className="row">
                    <label>用户名</label>
                    <input type="text" value={this.state.formData.username}
                    onChange={this.changeFormData.bind(this, 'username')}/>
                    {/* bind 不仅可以绑定 this，还可以绑定第一个参数 */}
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.state.formData.password}
                    onChange={this.changeFormData.bind(this, 'password')}/>
                </div>
                <div className="row actions">
                    <button type="submit">注册</button>
                </div>
            </form>
        );

        let signInForm = (
            <form className="signIn" onSubmit={this.signIn}> {/* 登录*/}
                <div className="row">
                    <label>用户名</label>
                    <input type="text" value={this.state.formData.username}
                    onChange={this.changeFormData.bind(this, 'username')}/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.state.formData.password}
                    onChange={this.changeFormData.bind(this, 'password')}/>
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
                    {/*<nav onChange={this.switch}>*/
                    /*上面那样写会有warning,底下的input没有onchange*/}
                    <nav>
                        <label><input type="radio" value="signUp" onChange={this.switch}
                                      checked={this.state.selected === 'signUp'}/>注册</label>
                        <label><input type="radio" value="signIn" onChange={this.switch}
                                      checked={this.state.selected === 'signIn'}/>登录</label>
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