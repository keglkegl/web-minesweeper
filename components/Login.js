import React, { Component } from 'react';
import { Form, Button, Input} from 'semantic-ui-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import qs from 'qs';
import { url } from './variables.js';

const IP_ADRESS = url.ip;

var csrftoken = Cookies.get('csrftoken');
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export class Login extends Component {
  constructor(props){
    super(props);
    this.state = { 
      username: '', 
      password: '',
      access_token: null
    }
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeUsername (e, { username, value }){
    return this.setState({ username : value });
  }

  handleChangePassword (e, { password, value }){
    return this.setState({ password : value });
  }

  async handleSubmit(){
    await this.props.changeUsername(this.state.username);
    return this.requestTokens();
  }

  async checkAuthorization(){
    var tempToken, tempUsername;
    await axios.get(IP_ADRESS + 'api/checkAuthorization/')
    .then(function (response) {
        console.log("Authorization is ok!");
        console.log(response.data);
        tempUsername = response.data.username;
        tempToken = response.data.token;
      }).catch(function (error) {
        console.log(error);
    });
    await this.props.saveAccessToken(tempToken);
    return this.props.changeUsername(tempUsername);
  }

  async requestTokens(){
    var tempToken;
    await axios.post(IP_ADRESS + 'api/login/', qs.stringify({
    username: this.state.username,
    password: this.state.password,
    })).then(function (response) {
      console.log("RequestTokens and Login reponse is ok!");
      console.log(response.data);
      tempToken = response.data.token;
    }).catch(function (error) {
      console.log(error);
    });
    await this.props.saveAccessToken(tempToken);
    return this.props.changeUsername(this.state.username);
  }

  async handleRegister(){
    await this.props.history.push('/register');
    return this.props.handleRegister();
  }

  componentDidMount(){
    if(!this.state.access_token){
      this.checkAuthorization()
    }
  }

  render() {
    return (
      <div>
        <h1>LOGIN FORM</h1><br/>
        <Form onSubmit={() => this.handleSubmit()}>
          <label>Enter username: </label><br/>
          <Input placeholder='Username' name='username' value={this.state.username} onChange={this.handleChangeUsername} /><br/><br/>
          
          <label>Enter password: </label><br/>
          <Input type='password' placeholder='Password' name='password' value={this.state.password} onChange={this.handleChangePassword} /><br/><br/>
        </Form>
        <Button.Group>
          <Button onClick={() => this.handleSubmit()}>Login</Button>
          <Button.Or text='or' />
          <Button positive onClick={() => this.handleRegister()}>Register</Button>
        </Button.Group>
        <br/>
      </div>
    )
  }
}