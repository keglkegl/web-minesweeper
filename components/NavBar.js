import React, { Component } from 'react';
import { Menu, Icon, Input } from 'semantic-ui-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import qs from 'qs';
import { url } from './variables.js';

const IP_ADRESS = url.ip;

var csrftoken = Cookies.get('csrftoken');
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export class NavBar extends Component {
	constructor(props, context){
    	super(props);
    	this.state = { 
    	  activeItem: this.props.location.pathname,
    	};
    	this.handleItemClick = this.handleItemClick.bind(this);
      this.handleLogoutItemClick = this.handleLogoutItemClick.bind(this);
  }

 	async handleItemClick(e, { name }){
    await this.setState({activeItem: name})
    return this.props.history.push(this.state.activeItem);
  }

  async handleLogoutItemClick(e, { name }){
    await axios.get(IP_ADRESS + 'api/logout/')
    .then(function (response) {
      console.log("Logout response is ok!");
      console.log(response.data);
      }).catch(function (error) {
      console.log(error);
    });
    await this.props.cleanData();
    return this.props.history.push('/');
  }

  render() {
    return (
      <Menu pointing>

        <Menu.Item
          name='/'
          active={this.state.activeItem === '/'}
          onClick={this.handleItemClick}
        >
          <Icon name='home'/>
        </Menu.Item>

                
        <Menu.Item
          name='/allGames'
          active={this.state.activeItem === '/allGames'}
          onClick={this.handleItemClick}
        >
          All Games
        </Menu.Item>
               

        <Menu.Item
          name='/openGames'
          active={this.state.activeItem === '/openGames'}
          onClick={this.handleItemClick}
        >
          Open Games
        </Menu.Item>


        <Menu.Item
          name='/activeGames'
          active={this.state.activeItem === '/activeGames'}
          onClick={this.handleItemClick}
        >
          Active Games
        </Menu.Item>


        <Menu.Item
          name='/wonGames'
          active={this.state.activeItem === '/wonGames'}
          onClick={this.handleItemClick}
        >
          Won Games
        </Menu.Item>


        <Menu.Item
          name='/createGame'
          active={this.state.activeItem === '/createGame'}
          onClick={this.handleItemClick}
        >
          Create Game
        </Menu.Item>


        <Menu.Menu position='right' text>
          <Menu.Item>
              <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          

          <Menu.Item 
            name='/wonGames'
            onClick={this.handleLogoutItemClick}
          >
            Logout
          </Menu.Item>
        </Menu.Menu>

      </Menu>
    );
  }
}

export default NavBar;