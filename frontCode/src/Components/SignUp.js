import React, { Component } from 'react';
import { Link,Redirect } from "react-router-dom";
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {myConfig} from '../config';

class SignUp extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                phone: '',
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

    handleSubmit(event) {
        event.preventDefault();

        var data = JSON.stringify(this.state.user);
        const fd = new FormData();
        fd.append('name',this.state.user.name);
        fd.append('email',this.state.user.email);
        fd.append('password',this.state.user.password);
        fd.append('phone',this.state.user.phone);
        // if (user.name && user.email && user.phone && user.password) {
            axios.post(this.state.baseUrl+'registration',fd,{crossDomain: true})
			  .then(function (response) {
			    console.log(response.data.status);
			    	let msg=response.data.message;

			    if(response.data.status=='error'){
                    NotificationManager.error(msg, 'Error!',3000);

			    }else{
                    NotificationManager.success('User registred successfully', 'Success!',3000);

			    }
			  }) 
			  .catch(function (error) {
			    console.log(error);
                NotificationManager.error('Something went wrong', 'Error!',3000);

			  });
        // }
    }

  render() {
    console.log("gg",this.state.user)
    return (
        <div className="login-wrapper columns is-gapless" data-switcher-visible>
        {/* Form section */}
      <NotificationContainer/>

        <div className="column is-4">
          <div className="hero is-fullheight">
            {/* Header */}
            <div className="hero-heading">
              <div className="auth-logo">
                <a href="/"><img className="top-logo switcher-logo" src="./assets/images/logo/logo.png" alt="" /></a>
              </div>
            </div>
            {/* Body */}
            <div className="hero-body">
              <div className="container">
                <div className="columns">
                  <div className="column is-12">
                    <div className="auth-content">
                      <h2>Hi There.</h2>
                      <a href="/login">Have an account? Sign In </a>
                    </div>
                    <div className="auth-form-wrapper">
                      {/* Sign up form */}
                      <form onSubmit={this.handleSubmit}>
                        <div id="signup-form" className="login-form animated preFadeInLeft fadeInLeft">
                          <div className="field pb-10">
                            <div className="control has-icons-right">
                              <input className="input is-medium" type="text" placeholder="Enter Your  Name " name="name" id="name" required
                              onChange={this.handleChange}  value={this.state.user.name} />
                              <span className="icon is-medium is-right">
                                <i className="sl sl-icon-user" />
                              </span>
                            </div>
                          </div>
                          <div className="field pb-10">
                            <div className="control has-icons-right">
                              <input className="input is-medium" type="text" placeholder="Enter Your Phone Number" name="phone" id="phone" required
                              onChange={this.handleChange}  value={this.state.user.phone} />
                              <span className="icon is-medium is-right">
                                <i className="sl sl-icon-user" />
                              </span>
                            </div>
                          </div>
                          <div className="field pb-10">
                            <div className="control has-icons-right">
                              <input className="input is-medium" type="email" placeholder="Enter Your Email " id="email" name="email" required 
                               onChange={this.handleChange}  value={this.state.user.email}  />
                              <span className="icon is-medium is-right">
                                <i className="sl sl-icon-envelope-open" />
                              </span>
                            </div>
                          </div>
                          <div className="field pb-10">
                            <div className="control has-icons-right">
                              <input className="input is-medium" type="password" placeholder="Enter Your Password " id="password" name="password" required
                              onChange={this.handleChange}  value={this.state.user.password} />
                              <span className="icon is-medium is-right">
                                <i className="sl sl-icon-globe" />
                              </span>
                            </div>
                          </div>
                          <p className="control login">
                            <input className="button button-cta primary-btn btn-align-lg is-bold is-fullwidth rounded raised no-lh" type="submit" name="signupSubmit" defaultValue="CREATE ACCOUNT" />
                          </p>
                        </div>
                      </form>
                      
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Image section (hidden on mobile) */}
        <div className="column login-column is-8 is-hidden-mobile hero-banner">
          <div className="hero signup-hero is-fullheight is-app-grey">
            <div className="hero-body">
              <div className="columns">
                <div className="column is-10 is-offset-1">
                  <img className="has-light-shadow" src="./assets/frontend/img/new_img/6.png" data-base-url="./assets/frontend/img/graphics/apps/app-1" data-extension=".png" alt="" />
                </div>
              </div>
            </div>
            <div className="hero-footer">
              <p className="has-text-centered" />
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default SignUp;
