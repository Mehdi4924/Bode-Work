import React, { Component, useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { MainWrapper, RegularText, SmallText, SmallTitle, Wrapper } from '../../../components';
import { appStyles, colors, sizes } from '../../../themes';
import Header from '../../../components/header/header';
import { height, width } from 'react-native-dimension';

const Almostthere = (props) => {
  return (
    <MainWrapper>
      <StatusBar backgroundColor={"#FFF"} barStyle={"dark-content"} />
      <Header 
        goBack={() => props.navigation.goBack()}
        heading={"Frequently Asked Questions"} 
        color={colors.appColor1} 
    />
    
    </MainWrapper>
  );
}

export default Almostthere;
