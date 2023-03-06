import React, { Component } from 'react';
import { View, Text, TextInput, StatusBar } from 'react-native';
import { MainWrapper, Spacer, ComponentWrapper, LineHorizontal, RowWrapperBasic, SmallTitle, RegularText, ButtonColoredSmall, ButtonColored, AbsoluteWrapper } from '../../../components';
import { sizes, colors } from '../../../themes';
import { height, totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import Header from '../../../components/header/header';
import AntDesign from 'react-native-vector-icons/AntDesign';

const UploadDocument = () => {
  return (
    <MainWrapper>
      <StatusBar 
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
      />
      <Header 
        goBack={() => props.navigation.goBack()}
        heading={"Identity Proof Documents"}
        color={colors.appColor1} 
      />
      <Spacer height={sizes.smallMargin} />
      <ComponentWrapper 
        animation="fadeInUp" 
        style={[{ height: height(30), alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.appColor1, padding: sizes.baseMargin, borderRadius: sizes.inputRadius }]}>
        <AntDesign 
            name='upload'
            size={totalSize(4)}
            color={colors.appColor1}
        />
        <RegularText style={{color:colors.appColor1,marginTop:height(2)}}>Upload Documents</RegularText>
      </ComponentWrapper>
      <AbsoluteWrapper style={{bottom:30,left:0,right:0}}>
        <ButtonColored 
            text={"Next"}
        />
      </AbsoluteWrapper>
    </MainWrapper>
  );
}

export default UploadDocument;
