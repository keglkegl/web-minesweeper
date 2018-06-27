import React, { Component } from 'react';
import { Form, Input, Button, Label } from 'semantic-ui-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import qs from 'qs';
import { url } from './variables.js';

const IP_ADRESS = url.ip;

var csrftoken = Cookies.get('csrftoken');
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export class Register extends Component {
	constructor(props){
    	super(props);
    	this.state = { 
      		username: '', 
      		password: '',
      		password2: '',
      		access_token: null,
      		registrationFailed: false,
          registrationErrors : null,
    	}
    	this.handleChangeUsername = this.handleChangeUsername.bind(this);
    	this.handleChangePassword = this.handleChangePassword.bind(this);
    	this.handleChangePassword2 = this.handleChangePassword2.bind(this);
  }

	handleChangeUsername (e, { username, value }){
    return this.setState({ username : value });
  }

  handleChangePassword (e, { password, value }){
    return this.setState({ password : value });
  }

  handleChangePassword2 (e, { password2, value }){
    return this.setState({ password2 : value });
  }

  async handleSubmit(){
    var tempToken;
    if(this.state.password === this.state.password2){
    	var validation = false;
      var errors;
    	await axios.post(IP_ADRESS + 'api/registration/', qs.stringify({
      	username: this.state.username,
      	password1: this.state.password,
      	password2: this.state.password2,
      })).then(function (response) {
        	console.log("Registration is ok!");
          console.log(response.data);
          if (response.data.token){
            validation = true;
            tempToken = response.data.token;
          }
          else{
            errors = response.data;
          }
      }).catch(function (error) {
       	console.log(error);
      });
      if(validation === true){
        await this.props.history.push('/');
    		return this.props.saveAccessToken(tempToken);
      }
      else{
      	return this.setState({registrationErrors : errors});
      }
    }
    else{
      return this.setState({registrationFailed : true});
    }
  }

  async requestTokens(){
    var tempToken;
    await axios.post(IP_ADRESS + 'api/token/', qs.stringify({
    username: this.state.username,
    password: this.state.password,
    })).then(function (response) {
      console.log("RequestTokens reponse is ok!");
      tempToken = response.data.token;
    }).catch(function (error) {
      console.log(error);
    });
    await this.props.history.push('/');
    return this.props.saveAccessToken(tempToken);
  }

  handleRegisterBack(){
  	this.props.history.push('/');
  	return this.props.handleRegister();
  }

  displayErrors(){
    if(this.state.registrationErrors === null){
      return;
    }
    var tempList = []
    if(this.state.registrationErrors.username){
      tempList.push(<Label basic color='red' pointing>{this.state.registrationErrors.username[0]}</Label>)
    }
    if(this.state.registrationErrors.password1){
      tempList.push(<Label basic color='red' pointing>{this.state.registrationErrors.password1[0]}</Label>)
    }
    if(this.state.registrationErrors.password2){
      tempList.push(<Label basic color='red' pointing>{this.state.registrationErrors.password2[0]}</Label>)
    }
    return (tempList);
  }

  render() {
  	if(!this.state.registrationFailed){
	   	return (
	     	<div>
	     		<h1>REGISTER FORM</h1><br/>
	      		<Form>
	      			<label>Enter username: </label><br/>
	         			<Input placeholder='Username' name='username' value={this.state.username} onChange={this.handleChangeUsername} /><br/><br/>
	          

	  				<label>Enter password: </label><br/>
	          		<Input type='password' placeholder='Password' name='password' value={this.state.password} onChange={this.handleChangePassword} /><br/><br/>

	  				<label>Please repeat password: </label><br/>
	          		<Input type='password' placeholder='Password2' name='password2' value={this.state.password2} onChange={this.handleChangePassword2} /><br/><br/>
	      			
	          	    <Button.Group>
	          			<Button onClick={() => this.handleSubmit()}>Submit</Button>
	          			<Button.Or text='or' />
	          			<Button positive onClick={() => this.handleRegisterBack()}>Back</Button>
	        		</Button.Group>

	      		</Form>
            {this.displayErrors()}
	     		</div>
	   	);
   	}
   	else{
   		return (<div>REGISTRATION FAILED!</div>);
   	}
  }
}
