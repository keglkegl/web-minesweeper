import React, { Component } from 'react';
import { AllGames } from './AllGames.js';
import { HomePage } from './HomePage.js';
import { OpenGames } from './OpenGames.js';
import { WonGames } from './WonGames.js';
import { NavBar } from './NavBar.js';
import { Logout } from './Logout.js';
import { PlayGame } from './PlayGame.js';
import { JoinGame } from './JoinGame.js';
import { Login } from './Login.js';
import { Register } from './Register.js';
import { CreateGame } from './CreateGame.js';
import { ActiveGames } from './ActiveGames.js';
import { BrowserRouter, Route} from 'react-router-dom';

export class Layout extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      access_token: null,
      register: false,
    }
    this.changeUsername = this.changeUsername.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  changeUsername(username){
    return this.setState({ username : username });
  }

  cleanData(){
    this.setState({username : ''})
    return this.setState({access_token : null});
  }

  saveAccessToken(token){
    this.setState({register : false});
    return this.setState({ access_token : token });
  }

  handleRegister(){
    if(this.state.register){
      return this.setState({register : false});
    }
    else{
      return this.setState({register : true});
    }
  }

  render(){
    if(this.state.access_token){
      return(
        <div>
          <BrowserRouter>
            <div>
              <header>
                <Route path='/' render={props => <NavBar
                  cleanData={() => this.cleanData()} 
                  location={window.location.pathname} 
                  {...props}/>} />
              </header>

              <body>
                <Route path='/' exact render={props => 
                  <HomePage 
                    username={this.state.username}
                    access_token={this.state.access_token} 
                    {...props}
                  />} 
                />
                <Route path='/allGames' exact render={props => 
                  <AllGames 
                    username={this.state.username}
                    access_token={this.state.access_token} 
                    {...props}
                  />} 
                />

                <Route path='/openGames' exact render={props => 
                  <OpenGames 
                    username={this.state.username}
                    access_token={this.state.access_token} 
                    {...props}
                  />} 
                />

                <Route path='/activeGames' exact render={props => 
                  <ActiveGames 
                    username={this.state.username}
                    access_token={this.state.access_token} 
                    {...props}
                  />}
                />

                <Route path='/wonGames' exact render={props => 
                  <WonGames 
                    username={this.state.username}
                    access_token={this.state.access_token} 
                    {...props}
                  />}
                />
                <Route path='/logout' exact component={Logout} />

                <Route path='/game/:id' exact render={props => <PlayGame 
                  access_token={this.state.access_token}
                  username={this.state.username}
                  {...props}/>} 
                />

                <Route path='/join/:id' exact render={props => <JoinGame 
                  access_token={this.state.access_token}
                  username={this.state.username}
                  {...props}/>}
                />

                <Route path='/createGame' exact render={props => 
                  <CreateGame 
                    username={this.state.username}
                    access_token={this.state.access_token} 
                    {...props}
                  />}
                />
              </body>
            </div>
          </BrowserRouter>
        </div>
      );
    }
    else if(this.state.register){
      return(
        <div>
          <BrowserRouter>
            <div>
              <Route path='/register' render={props => <Register
                handleRegister={() => this.handleRegister()}
                saveAccessToken={(token) => this.saveAccessToken(token)}
                {...props}/>}/>
            </div>
          </BrowserRouter>
        </div>
      );
    }
    else{
      return(
        <div>
          <BrowserRouter>
            <div>
              <Route path='/' render={props => <Login 
                saveAccessToken={(token) => this.saveAccessToken(token)} 
                changeUsername={(username) => this.changeUsername(username)} 
                handleRegister={() => this.handleRegister()}
                username={this.state.username} {...props}/>}
              />
            </div>
          </BrowserRouter>
        </div>
      );
    }
  }
}

export default Layout;