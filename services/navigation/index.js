import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigation from './authNavigation';
import ClientAppNavigation from './clientAppNavigation';
import ProviderAppNavigation from './providerAppNavigation';
import {routes} from '../../services';

const MainStack = createStackNavigator();

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer>
        <MainStack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={routes.auth}>
          <MainStack.Screen 
            name={routes.auth} 
            component={AuthNavigation} 
          />
          <MainStack.Screen
            name={routes.clientApp}
            component={ClientAppNavigation}
          />
          <MainStack.Screen
            name={routes.providerApp}
            component={ProviderAppNavigation}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigation;
