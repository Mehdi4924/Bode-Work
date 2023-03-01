import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Signin,
  Signup,
  ResetPassword,
  AuthHome,
  // SignInUp,
  
  Services,
  PriceList,
  WorkLicense,
  Terms,
  CreateService,
} from '../../../screens/authFlow';
import {colors} from '../../../themes';
import {header, routes} from '../../constants';
import pricenewList from '../../../screens/authFlow/pricenewList';
import PricenewList from '../../../screens/authFlow/pricenewList';
import IdentityProof from '../../../screens/authFlow/identityProof';
import StylistProfileDetail from '../../../screens/authFlow/stylistprofileDetails';
import ChangeLocation from '../../../screens/authFlow/changeLocation';
import SignInUp from '../../../screens/authFlow/signInUp'
const HeaderTintColor = colors.appTextColor4;
const AuthStack = createStackNavigator();
const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={header.screenOptions}
      // initialRouteName={routes.services}
    >
      <AuthStack.Screen
        name={routes.authHome}
        component={AuthHome}
        options={{
          headerShown: false,
          //title: 'Auth'
        }}
      />
      <AuthStack.Screen
        name={routes.signInUp}
        component={SignInUp}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name={routes.signin}
        component={Signin}
        options={{
          //headerShown: false,
          title: 'Login',
        }}
      />
      <AuthStack.Screen
        name={routes.signup}
        component={Signup}
        options={{
          //headerShown: false,
          title: 'Register',
        }}
      />
      <AuthStack.Screen
        name={routes.resetPassword}
        component={ResetPassword}
        options={{
          // headerShown: true,
          title: 'Reset Password',
        }}
      />
      <AuthStack.Screen
        name={routes.identityproof}
        component={IdentityProof}
        options={{
          headerShown: false,
          // title: 'Valid Photo ID',
        }}
      />
      <AuthStack.Screen
        name={routes.services}
        component={Services}
        options={{
          // headerShown: true,
          title: 'Services',
        }}
      />
      <AuthStack.Screen
        name={routes.priceList}
        component={PriceList}
        options={{
          // headerShown: true,
          title: 'Price List',
        }}
      />
      <AuthStack.Screen
        name={routes.pricenewList}
        component={PricenewList}
        options={{
          headerShown: false,
          // title: 'Price List',
        }}
      />
      <AuthStack.Screen
        name={routes.workLicense}
        component={WorkLicense}
        options={{
          headerShown: false,
          // title: 'License',
        }}
      />
      <AuthStack.Screen
        name={routes.terms}
        component={Terms}
        options={{
          // headerShown: true,
          title: 'Accept Terms & Conditions',
        }}
      />
      <AuthStack.Screen
        name={routes.createService}
        component={CreateService}
        options={{
          headerShown:false,
          // title: 'Create Service',
        }}
      />
      <AuthStack.Screen
        name={routes.stylistdetails}
        component={StylistProfileDetail}
        options={{
          headerShown:false,
          // title: 'Create Service',
        }}
      />
      <AuthStack.Screen
        name={routes.changelocation}
        component={ChangeLocation}
        options={{
          headerShown:false,
          // title: 'Create Service',
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
