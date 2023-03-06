import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { MainWrapper, CustomIcon, ComponentWrapper, RegularText, ButtonColored, Spacer } from '../../../components';
import { appImages, appStyles, sizes, fontSize, colors, fontFamily } from '../../../themes';
import { totalSize } from 'react-native-dimension';
import Header from '../../../components/header/header';

const BecomeStylist = (props) => {
  const {navigate, goBack} = props.navigation;
 
  return (
    <MainWrapper>
      <StatusBar 
        barStyle={"dark-content"}
        backgroundColor={"#FFF"}
      />
      <Header 
        goBack={() => goBack()}
        heading={"Become a Stylish"}
        color={colors.appColor1} 
      />
      <MainWrapper style={[{ justifyContent: 'space-evenly', }]}>
        <ComponentWrapper style={[appStyles.center]}>
          <CustomIcon
            icon={appImages.moneyArtwork}
            size={totalSize(35)}
            // animation="fadeInDown"
          />
        </ComponentWrapper>
        <ComponentWrapper>
          <RegularText style={[appStyles.textPrimaryColor,appStyles.textCenter,{fontSize:totalSize(3),fontFamily:fontFamily.appTextRegular}]}>Make Money By{'\n'}Providing Services</RegularText>
          <Spacer height={sizes.baseMargin}/>
          <RegularText style={[{lineHeight:sizes.baseMargin}]}>Duis porta, ligula rhoncus euismod pretium, nisi tellus eleifend odio, 
          luctus viverra sem dolor id sem. Maecenas a venenatis enim, quis porttitor magna. Etiam nec rhoncus neque. Sed quis 
          ultrices eros. Curabitur sit amet eros eu arcu consectetur pulvinar. Aliquam sodales, turpis eget tristique tempor,
           sapien lacus facilisis diam, molestie efficitur sapien velit nec magna. Maecenas interdum efficitur tempor</RegularText>
        </ComponentWrapper>
      </MainWrapper>
      <ButtonColored
        text="Create a Stylist Profile"
        buttonStyle={[{marginVertical:sizes.marginVertical}]}
      />
    </MainWrapper>

  );
}

export default BecomeStylist;
