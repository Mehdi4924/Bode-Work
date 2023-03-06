import React, {Component, useEffect, useState} from 'react';
import {View, Text, ImageBackground, StatusBar} from 'react-native';
import {
  RegularText,
  AbsoluteWrapper,
  MainWrapper,
  ComponentWrapper,
  RowWrapper,
  LogoMain,
  LargeText,
  ButtonColored,
  Spacer,
  TinyTitle,
  SmallTitle,
  ClientMainlog,
} from '../../../components';
import {appStyles, appImages, colors, sizes} from '../../../themes';
import {totalSize} from 'react-native-dimension';
import {routes, stores} from '../../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInUp = (props) => {
  const {navigation, route} = props;
  const {navigate} = navigation;
  const [userType, setUserType] = useState("");

  useEffect(() => {
    getUserType();
  }, []);
  const getUserType = async () => {
    const userType = await AsyncStorage.getItem("type");
    setUserType(userType);
  };

  return (
    <MainWrapper>
      <StatusBar 
        backgroundColor={"#FFF"}
        barStyle={'dark-content'}
      />
      <MainWrapper style={[appStyles.center]}>
      {userType === 'provider' ? (
        <ComponentWrapper style={[appStyles.center]}>
          <LogoMain size={totalSize(25)} />
        </ComponentWrapper>
         ) :  (<ComponentWrapper style={[appStyles.center]}>
         <ClientMainlog size={totalSize(25)} />
       </ComponentWrapper>)}
        {userType === 'provider' ? (
          <SmallTitle style={[appStyles.textPrimaryColor]}>
            Service Provider App
          </SmallTitle>
        ) : null}
      </MainWrapper>
      <Spacer height={sizes.doubleBaseMargin} />
      <ButtonColored
      buttonStyle={{ elevation: 0}}
      text="Login" onPress={() => navigate(routes.signin)} />
      <Spacer height={sizes.baseMargin} />
      <ButtonColored
       buttonStyle={{ elevation: 0}}
      text="Sign Up" onPress={() => navigate(routes.signup)} />
      <Spacer height={sizes.doubleBaseMargin} />
    </MainWrapper>
  );
}

export default SignInUp;
