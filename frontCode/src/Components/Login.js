import React, { Component } from 'react';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {myConfig} from '../config';
import { Link,Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
        super(props);
	 this.state = {
            user: {
                email: '',
                password: ''
            },
          baseUrl:myConfig.baseUrl
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            },
        });
    }
   handleSubmit(){
        event.preventDefault();
        var data = JSON.stringify(this.state.user);
        const fd = new FormData();
        fd.append('email',this.state.user.email);
        fd.append('password',this.state.user.password);
        // if (user.name && user.email && user.phone && user.password) {
        axios.post(this.state.baseUrl+'login',fd,{crossDomain: true})
        .then(function (response) {
           console.log(response.data.status);
           let msg=response.data.message;

          if(response.data.status=='error'){
                    NotificationManager.error(msg, 'Error!',3000);
          }else{
            let data=response.data.message
            console.log(data.id)
            localStorage.setItem('userdata',data.id)
            console.log(localStorage.getItem('userdata'))

            window.location.href="/product"
            NotificationManager.success('User Login successfully', 'Success!',3000);
 
          }
        }) 
        .catch(function (error) {
          console.log(error);
                NotificationManager.error('Something went wrong', 'Error!',3000);

        });
   }

  render() {
    console.log("gg")
    return (
        <div className="login-wrapper columns is-gapless" data-switcher-visible>
        {/* Image section (hidden on mobile) */}
        <NotificationContainer/>
        <div className="column login-column is-8 is-hidden-mobile hero-banner">
          <div className="hero login-hero is-fullheight is-app-grey">
            <div className="hero-body">
              <div className="columns">
                <div className="column is-10 is-offset-1">
                  <img className="has-light-shadow" src="./assets/frontend/img/new_img/1.png" data-base-url="./assets/frontend/img/new_img/1" data-extension=".png" alt="" />
                </div>
              </div>
            </div>
            <div className="hero-footer">
              <p className="has-text-centered" />
            </div>
          </div>
        </div>
        {/* Form section */}
        <div className="column is-4">
          <div className="hero is-fullheight">
            <div className="hero-heading">
              <div className="auth-logo">
                <a href="/"><img className="top-logo switcher-logo" src="./assets/admin/img/logo.png" alt="" /></a>
              </div>
            </div>
            <div className="hero-body">
              <div className="container">
                <div className="columns">
                  <div className="column is-12">
                    <div className="auth-content">
                      
                      <h2>Welcome Back.</h2>
                      <p>Please sign in to your account</p>
                      <a href="sign-up">I do not have an account yet </a> 
                    </div>
                    <div className="auth-form-wrapper">
                      {/* Login Form */}
                      <form onSubmit={this.handleSubmit}>
                        <div id="signin-form" className="login-form animated preFadeInLeft fadeInLeft">
                          {/* Input */}
                          <div className="field pb-10">
                            <div className="control has-icons-right">
                              <input className="input is-medium has-shadow" type="text" placeholder="Enter Your Email " id="email" name="email" required
                              onChange={this.handleChange}  value={this.state.user.email} />
                              
                              <span className="icon is-medium is-right">
                                <i className="sl sl-icon-user" />
                              </span>
                            </div>
                          </div>
                          {/* Input */}
                          <div className="field pb-10">
                            <div className="control has-icons-right">
                              <input className="input is-medium has-shadow" type="password" placeholder="Enter Your Password" id="password" name="password" required 
                              onChange={this.handleChange}  value={this.state.user.password}/>
                              
                              <span className="icon is-medium is-right">
                                <i className="sl sl-icon-lock" />
                              </span>
                            </div>
                          </div>
                          {/* Submit */}
                          <p className="control login">
                            <input className="button button-cta primary-btn btn-align-lg is-bold is-fullwidth rounded raised no-lh" type="submit" name="loginSubmit" defaultValue="Sign In" />
                          </p>
                        </div>
                      </form>
                      {/* Reset Form */}
                      <form>
                        <div id="recover-form" className="login-form animated preFadeInLeft fadeInLeft is-hidden">
                          {/* Input */}
                          <div className="field">
                            <div className="control has-icons-right">
                              <input className="input is-medium" type="text" placeholder="Email address" />
                              <span className="icon is-medium is-right">
                                <i className="sl sl-icon-paper-plane" />
                              </span>
                            </div>
                          </div>
                          {/* Submit */}
                          <p className="control login">
                            <button className="button button-cta primary-btn btn-align-lg is-bold is-fullwidth rounded raised no-lh">Reset
                              password</button>
                          </p>
                        </div>
                      </form>
                      {/* Toggles */}
                      <div id="recover" className="pt-10 pb-10 forgot-password animated preFadeInLeft fadeInLeft">
                        <p className="has-text-centered">
                          <a href="forgot-password">Forgot password ?</a>
                        </p>
                      </div>
                      <div id="back-to-login" className="pt-10 pb-10 forgot-password animated preFadeInLeft fadeInLeft is-hidden">
                        <p className="has-text-centered">
                          <a href="#">Back to Sign in</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
