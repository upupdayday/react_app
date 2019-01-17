import React, { Component } from 'react';
import './UserDialog.css'
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud'
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state = {
            selected: 'signUp',
            selectedTab: 'signInOrSignUp', // 'forgotPassword'
            formData:{
                email:'',
                username:'',
                password:''
            }
        }
        this.switch = this.switch.bind(this)
        this.changeFormData = this.changeFormData.bind(this);
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
        this.showForgotPassword = this.showForgotPassword.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.returnToSignIn = this.returnToSignIn.bind(this);
    }

    switch(e) {
        this.setState({
            selected: e.target.value
        })
    }

    signUp(e){
        e.preventDefault();
        let {email, username, password} = this.state.formData;
        let success = (user)=>{
            this.props.onSignUp.call(null, user)
        }
        let error = (error)=>{
            switch(error.code){
                case 200:
                    alert('用户名为空')
                    break
                case 201:
                    alert('密码为空')
                    break
                case 202:
                    alert('用户名已被占用')
                    break
                default:
                    alert(error)
                    break
            }
        }
        signUp(email, username, password, success, error)
    }

    signIn(e){
        e.preventDefault();
        let {username, password} = this.state.formData;
        let success = (user)=>{
            this.props.onSignIn.call(null, user)
        }
        let error = (error)=>{
            switch(error.code){
                case 210:
                    alert('用户名与密码不匹配')
                    break
                case 211:
                    alert('找不到用户')
                    break
                default:
                    alert(error)
                    break
            }
        }
        signIn(username, password, success, error)
    }

    changeFormData(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state))  // 用 JSON 深拷贝
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }

    showForgotPassword(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }
    resetPassword(e){
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email)
    }

    returnToSignIn(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }

    render(){
        let signInOrSignUp = (
            <div className="signInOrSignUp">
                {/*<nav onChange={this.switch}>*/
                    /*上面那样写会有warning,底下的input没有onchange*/}
                <nav>
                    <label><input type="radio" value="signUp" onChange={this.switch}
                                  checked={this.state.selected === 'signUp'}/>注册</label>
                    <label><input type="radio" value="signIn" onChange={this.switch}
                                  checked={this.state.selected === 'signIn'}/>登录</label>
                </nav>
                <div className="panes">
                    {this.state.selected === 'signUp' ?
                        <SignUpForm formData={this.state.formData}
                                    onSubmit={this.signUp}
                                    onChange={this.changeFormData}/>
                        : null}
                    {this.state.selected === 'signIn' ?
                        <SignInForm formData={this.state.formData}
                                    onSubmit={this.signIn}
                                    onChange={this.changeFormData}
                                    onForgotPassword={this.showForgotPassword}/>
                        : null}
                </div>
            </div>
        )

        let forgotPassword = (
            <div className="forgotPassword">
                <h3>
                    重置密码
                </h3>
                <form className="forgotPassword" onSubmit={this.resetPassword}> {/* 登录*/}
                    <div className="row">
                        <label>邮箱</label>
                        <input type="text" value={this.state.formData.email}
                               onChange={this.changeFormData.bind(this, 'email')}/>
                    </div>
                    <div className="row actions">
                        <button type="submit">发送重置邮件</button>
                        <a href="#" onClick={this.returnToSignIn}>返回登录</a>
                    </div>
                </form>
            </div>
        )

        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab === 'signInOrSignUp' ? signInOrSignUp : forgotPassword}
                </div>
            </div>
        );
    }
}

export default UserDialog;