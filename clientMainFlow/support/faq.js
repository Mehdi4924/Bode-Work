import React, { Component, useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { MainWrapper, RegularText, SmallText, SmallTitle, Wrapper } from '../../../components';
import { appStyles, colors, sizes } from '../../../themes';
import Header from '../../../components/header/header';
import { height, width } from 'react-native-dimension';

const Faq = (props) => {
  return (
    <MainWrapper>
      <StatusBar backgroundColor={"#FFF"} barStyle={"dark-content"} />
      <Header 
        goBack={() => props.navigation.goBack()}
        heading={"Frequently Asked Questions"} 
        color={colors.appColor1} 
    />
      <Wrapper
      // animation="fadeInDown"
       style={{marginHorizontal:width(6),marginTop:height(2)}}>
        <SmallTitle>Question Lorem Ipsum</SmallTitle>
        <RegularText style={{marginTop:height(1),marginBottom:height(3)}}>
          Aliquam in bibendum mauris. Sed vitae erat vel velit blandit pharetra vitae nec ante. Cras at est augue. Cras ut interdum elit.
        </RegularText>
        <SmallTitle>Question Lorem Ipsum</SmallTitle>
        <RegularText style={{marginTop:height(1),marginBottom:height(3)}}>
          Aliquam in bibendum mauris. Sed vitae erat vel velit blandit pharetra vitae nec ante. Cras at est augue. Cras ut interdum elit.
        </RegularText>
        <SmallTitle>Question Lorem Ipsum</SmallTitle>
        <RegularText style={{marginTop:height(1),marginBottom:height(3)}}>
          Aliquam in bibendum mauris. Sed vitae erat vel velit blandit pharetra vitae nec ante. Cras at est augue. Cras ut interdum elit.
        </RegularText>
        <SmallTitle>Question Lorem Ipsum</SmallTitle>
        <RegularText style={{marginTop:height(1),marginBottom:height(3)}}>
          Aliquam in bibendum mauris. Sed vitae erat vel velit blandit pharetra vitae nec ante. Cras at est augue. Cras ut interdum elit.
        </RegularText>
        <SmallTitle>Question Lorem Ipsum</SmallTitle>
        <RegularText style={{marginTop:height(1),marginBottom:height(3)}}>
          Aliquam in bibendum mauris. Sed vitae erat vel velit blandit pharetra vitae nec ante. Cras at est augue. Cras ut interdum elit.
        </RegularText>
        <SmallTitle>Question Lorem Ipsum</SmallTitle>
        <RegularText style={{marginTop:height(1),marginBottom:height(3)}}>
          Aliquam in bibendum mauris. Sed vitae erat vel velit blandit pharetra vitae nec ante. Cras at est augue. Cras ut interdum elit.
        </RegularText>
      </Wrapper>
    </MainWrapper>
  );
}

export default Faq;
