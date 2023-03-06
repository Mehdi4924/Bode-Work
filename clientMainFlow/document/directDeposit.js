import React, { Component } from 'react';
import { View, Text, TextInput, StatusBar } from 'react-native';
import { MainWrapper, Spacer, ComponentWrapper, LineHorizontal, RowWrapperBasic, SmallTitle, RegularText, ButtonColoredSmall, ButtonColored, AbsoluteWrapper, Wrapper, TextInputBordered } from '../../../components';
import { sizes, colors } from '../../../themes';
import { height, totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import Header from '../../../components/header/header';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DirectDeposit = (props) => {
  return (
    <MainWrapper>
      <StatusBar 
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
      />
      <Header 
        goBack={() => props.navigation.goBack()}
        heading={"Direct Deposit"}
        color={colors.appColor1} 
      />
      <Spacer height={sizes.smallMargin} />
      <Wrapper>
        <TextInputBordered 
          title={"Bank Account Number"}
          placeholder={"Bank Account Number"}
          value={"###########"}
          containerStyle={{marginBottom:height(3)}}
        />
        <TextInputBordered 
          title={"Confirm Bank Account Number"}
          placeholder={"Confirm Bank Account Number"}
          value={"###########"}
          containerStyle={{marginBottom:height(3)}}
        />
        <TextInputBordered 
          title={"Bank Routing Number"}
          placeholder={"Bank Routing Number"}
          value={"###########"}
          containerStyle={{marginBottom:height(3)}}
        />
        <TextInputBordered 
          title={"Confirm Bank Routing Number"}
          placeholder={"Confirm Bank Routing Number"}
          value={"###########"}
          containerStyle={{marginBottom:height(3)}}
        />
      </Wrapper>
      <AbsoluteWrapper style={{bottom:30,left:0,right:0}}>
        <ButtonColored 
          text={"Save"}
        />
      </AbsoluteWrapper>
    </MainWrapper>
  );
}

export default DirectDeposit;
