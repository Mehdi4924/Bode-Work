import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { MainWrapper, ComponentWrapper, RegularText, ButtonColored, Spacer, CustomIcon, TinyTitle, SmallTitle, ButtonBordered, LargeText } from '../../../components';
import { sizes, appImages, appStyles, fontSize, colors } from '../../../themes';
import { totalSize } from 'react-native-dimension';
import Header from '../../../components/header/header';

const Promo = (props) => {
  return (
    <MainWrapper>
      <StatusBar 
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
      />
      <Header 
        goBack={() => props.navigation.goBack()}
        heading={"Promo"}
        color={colors.appColor1} 
      />
      <MainWrapper style={[{ justifyContent: 'space-evenly' }]}>
        <ComponentWrapper style={[appStyles.center]}>
          <CustomIcon 
            icon={appImages.promoArtwork}
            size={totalSize(25)}
            // animation="fadeInDown"
          />
        </ComponentWrapper>
        <ComponentWrapper style={[appStyles.center]}>
          <LargeText style={[appStyles.textCenter, appStyles.textPrimaryColor, { fontSize: fontSize.h4 }]}>Help Your Friends</LargeText>
          <Spacer height={sizes.baseMargin} />
          <RegularText style={[appStyles.textCenter, appStyles.textPrimaryColor, { fontSize: fontSize.h3 }]}>Get $20 when{'\n'}you refer a friend</RegularText>
          <Spacer height={sizes.baseMargin} />
          <SmallTitle style={[]}>##############</SmallTitle>
        </ComponentWrapper>
      </MainWrapper>
      <Spacer height={sizes.baseMargin} />
      <ButtonBordered
        text="Copy Profile URL"
      />
      <Spacer height={sizes.baseMargin} />
      <ButtonColored
        text="Invite Friends"
      />
      <Spacer height={sizes.doubleBaseMargin} />
    </MainWrapper>
  );
}

export default Promo;
