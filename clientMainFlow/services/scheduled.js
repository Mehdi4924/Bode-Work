import React, { Component } from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import { MainWrapper, CustomIcon, ComponentWrapper, RegularText, ButtonColored, Spacer, SmallTitle, MediumTitle, MediumText, LargeText, SmallText } from '../../../components';
import { appImages, appStyles, sizes, fontSize, colors } from '../../../themes';
import { totalSize } from 'react-native-dimension';
import Header from '../../../components/header/header';
import Entypo from 'react-native-vector-icons/Entypo';

const Scheduled = (props) => {
 
  return (
    <MainWrapper>
      <StatusBar 
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
      />
      <Header 
        goBack={() => props.navigation.goBack()}
        heading={"Service Scheduled"}
        color={colors.appColor1} 
      />
      <MainWrapper style={[{ justifyContent: 'space-evenly', }]}>
        <ComponentWrapper>
          <Image 
            source={appImages.imageOne}
            style={{alignSelf:'center',height:totalSize(12),width:totalSize(12),resizeMode:'cover',borderRadius:100}}
          />
          <MediumTitle style={{textAlign:"center",marginTop:totalSize(2)}}>John Doe</MediumTitle>
          <MediumText style={{textAlign:"center",marginTop:totalSize(1.5)}}>Hair Stylish</MediumText>
          <Spacer height={sizes.baseMargin*1.5}/>
          <View style={{borderColor:colors.appColor1,borderWidth:1,borderRadius:18,width:"60%",alignSelf:'center'}}>
            <MediumText style={{color:colors.appColor1,textAlign:"center",paddingVertical:totalSize(1.5)}}>July 25th, 2020</MediumText>
          </View>
          <View style={{borderColor:colors.appColor1,borderWidth:1,borderRadius:18,width:"60%",alignSelf:'center',marginTop:sizes.smallMargin*1.5}}>
            <MediumText style={{color:colors.appColor1,textAlign:"center",paddingVertical:totalSize(1.5)}}>12:00 - 14:00</MediumText>
          </View>
          <Spacer height={sizes.baseMargin*3}/>
          <SmallTitle>Start a conversation with your stylish</SmallTitle>
          <View style={{flexDirection:'row',marginTop:sizes.smallMargin*3.5}}>
            <View style={{justifyContent:'center'}}>
              <Image 
                source={appImages.imageOne}
                style={{alignSelf:'center',height:totalSize(6),width:totalSize(6),resizeMode:'cover',borderRadius:100}}
              />
            </View>
            <View style={{flex:1,justifyContent:'center',paddingLeft:sizes.smallMargin}}>
              <SmallTitle>John Doe</SmallTitle>
              <SmallText style={{opacity:.5}}>Replies within 5 minutes</SmallText>
            </View>
            <View style={{justifyContent:'center',paddingRight:sizes.smallMargin-6}}>
              <Entypo 
                name='chat'
                size={totalSize(2.5)}
                color={colors.appColor1}
              />
            </View>
          </View>
        </ComponentWrapper>
      </MainWrapper>
      <ButtonColored
        text="Continue"
        buttonStyle={[{marginVertical:sizes.marginVertical}]}
      />
    </MainWrapper>

  );
}

export default Scheduled;
