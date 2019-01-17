import React, { Component } from 'react'
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

class SignInOrSignUp extends Component{
    constructor(props){
        super(props)
        this.state = {
            selected: 'signUp',
        }
        this.switch = this.switch.bind(this)
    }

    switch(e) {
        this.setState({
            selected: e.target.value
        })
    }

    render(){
        return(
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
                        <SignUpForm formData={this.props.formData}
                                    onSubmit={this.props.onSignUp}
                                    onChange={this.props.onChange}/>
                        : null}
                    {this.state.selected === 'signIn' ?
                        <SignInForm formData={this.props.formData}
                                    onSubmit={this.props.onSignIn}
                                    onChange={this.props.onChange}
                                    onForgotPassword={this.props.onForgotPassword}/>
                        : null}
                </div>
            </div>
        );
    }
}

export default SignInOrSignUp;