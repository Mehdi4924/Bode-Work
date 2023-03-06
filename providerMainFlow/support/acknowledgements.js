import React, { Component, useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { MainWrapper, MediumText, RegularText, SmallText, SmallTitle, Wrapper } from '../../../components';
import { appStyles, colors, sizes } from '../../../themes';
import Header from '../../../components/header/header';
import { height, width } from 'react-native-dimension';

const Acknowledgements = (props) => {
  const space = sizes.baseMargin * 1.5;
  return (
    <MainWrapper>
      <StatusBar backgroundColor={"transparent"} barStyle={"dark-content"} />
      <Header 
        goBack={() => props.navigation.goBack()}
        heading={"Acknowledgements"} 
        color={colors.appColor1} 
    />
      <Wrapper
      //  animation="fadeInDown" 
       style={{marginHorizontal:width(6),marginTop:height(2)}}>
        <SmallTitle>Acknowledgements</SmallTitle>
        <MediumText style={{marginTop:height(2),lineHeight:22}}>
          Etiam convallis elementum sapien, a aliquam turpis aliquam vitae. Praesent sollicitudin felis vel mi facilisis posuere. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur dignissim massa nec libero scelerisque rutrum. Curabitur ac purus id elit hendrerit lacinia. Nullam sit amet sem efficitur, porta diam in, convallis tortor. Etiam convallis elementum sapien, a aliquam turpis aliquam vitae. Praesent sollicitudin felis vel mi facilisis posuere. Nulla ultrices facilisis justo, non varius nisl semper vel. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus at ante mattis, condimentum velit et, dignissim nunc. Integer quis tincidunt purus. Duis dignissim mauris vel elit commodo, eu hendrerit leo ultrices. Nulla vehicula vestibulum purus at rutrum.
        </MediumText>
      </Wrapper>
    </MainWrapper>
  );
}

export default Acknowledgements;
