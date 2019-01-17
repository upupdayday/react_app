import React, { Component } from 'react';
import './UserDialog.css'
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInOrSignUp from './SignInOrSignUp'

class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedTab: 'signInOrSignUp', // 'forgotPassword'
            formData:{
                email:'',
                username:'',
                password:''
            }
        }
        this.changeFormData = this.changeFormData.bind(this);
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
        this.showForgotPassword = this.showForgotPassword.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.returnToSignIn = this.returnToSignIn.bind(this);
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
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab === 'signInOrSignUp' ?
                        <SignInOrSignUp formData={this.state.formData}
                                        onSignIn={this.signIn}
                                        onSignUp={this.signUp}
                                        onChange={this.changeFormData}
                                        onForgotPassword={this.showForgotPassword}/>
                        : <ForgotPasswordForm formData={this.state.formData}
                                    onSubmit={this.resetPassword}
                                    onChange={this.changeFormData}
                                    onReturnToSignIn={this.returnToSignIn}/>}
                </div>
            </div>
        );
    }
}

export default UserDialog;