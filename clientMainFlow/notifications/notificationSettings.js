import React, { Component, useState } from 'react';
import { View, Text, StatusBar,TouchableOpacity,StyleSheet } from 'react-native';
import { MainWrapper, RegularText, ComponentWrapper, Spacer, TinyTitle, CheckBoxPrimary, MediumText,SmallText } from '../../../components';
import Header from '../../../components/header/header';
import { colors, sizes } from '../../../themes';
import {totalSize, width} from 'react-native-dimension';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationSettings = (props) => {
  const {navigate, goBack} = props.navigation;
  const [checked, setChecked] = useState(true);
  const [stayLoggedin, setstayLoggedin] = useState(false);
  const [stayLoggedin1, setstayLoggedin1] = useState(false);
  const [stayLoggedin2, setstayLoggedin2] = useState(false);
  const [stayLoggedin3, setstayLoggedin3] = useState(false);
  return (
    <MainWrapper>
      <StatusBar 
        barStyle={"dark-content"}
        backgroundColor={"#FFF"}
      />
      <Header   
        goBack={() => goBack()}
        color={colors.appColor1}
        heading={"Notifications"}
      />
      <Spacer height={sizes.baseMargin} />
      <ComponentWrapper>
        <MediumText>You’ll always receive push notification updates for your account activity.</MediumText>
      </ComponentWrapper>
      <Spacer height={sizes.doubleBaseMargin} />
      <ComponentWrapper>
        <TinyTitle>Push Notifications</TinyTitle>
        <Spacer height={sizes.smallMargin} />
        <TouchableOpacity 
            activeOpacity={.7}
            onPress={() => setstayLoggedin(!stayLoggedin)}
            style={{flexDirection:'row'}}>
            <View style={{justifyContent:'center'}}>
            <View style={[styles.checkboxViewstyle, {backgroundColor:stayLoggedin ? colors.appColor1:"#fff"}]}>
                {stayLoggedin && 
                  <MaterialCommunityIcons
                    name={'check'}
                    size={totalSize(2)}
                    color={colors.snow}
                  />
                }
              </View>
            </View>
            <View style={{justifyContent:'center',marginLeft:totalSize(1)}}>
            <SmallText >
            Style recommendations and offers
          </SmallText>
            </View>
          </TouchableOpacity>
     
      </ComponentWrapper>
      <Spacer height={sizes.doubleBaseMargin} />
      <ComponentWrapper>
        <TinyTitle>Text Messages</TinyTitle>
        <Spacer height={sizes.smallMargin} />
        <TouchableOpacity 
            activeOpacity={.7}
            onPress={() => setstayLoggedin1(!stayLoggedin1)}
            style={{flexDirection:'row'}}>
            <View style={{justifyContent:'center'}}>
            <View style={[styles.checkboxViewstyle, {backgroundColor:stayLoggedin1 ? colors.appColor1:"#fff"}]}>
                {stayLoggedin1 && 
                  <MaterialCommunityIcons
                    name={'check'}
                    size={totalSize(2)}
                    color={colors.snow}
                  />
                }
              </View>
            </View>
            <View style={{justifyContent:'center',marginLeft:totalSize(1)}}>
            <SmallText >
            Style updates from us and your stylist
          </SmallText>
            </View>
          </TouchableOpacity>
      
        <Spacer height={sizes.smallMargin} />
        <TouchableOpacity 
            activeOpacity={.7}
            onPress={() => setstayLoggedin2(!stayLoggedin2)}
            style={{flexDirection:'row'}}>
            <View style={{justifyContent:'center'}}>
            <View style={[styles.checkboxViewstyle, {backgroundColor:stayLoggedin2 ? colors.appColor1:"#fff"}]}>
                {stayLoggedin2 && 
                  <MaterialCommunityIcons
                    name={'check'}
                    size={totalSize(2)}
                    color={colors.snow}
                  />
                }
              </View>
            </View>
            <View style={{justifyContent:'center',marginLeft:totalSize(1)}}>
            <SmallText >
            Style recommendations and offers
          </SmallText>
            </View>
          </TouchableOpacity>
      
      </ComponentWrapper>
      <Spacer height={sizes.doubleBaseMargin} />
      <ComponentWrapper>
        <TinyTitle>Email Notifications</TinyTitle>
        <Spacer height={sizes.smallMargin} />
        <TouchableOpacity 
            activeOpacity={.7}
            onPress={() => setstayLoggedin3(!stayLoggedin3)}
            style={{flexDirection:'row'}}>
            <View style={{justifyContent:'center'}}>
            <View style={[styles.checkboxViewstyle, {backgroundColor:stayLoggedin3 ? colors.appColor1:"#fff"}]}>
                {stayLoggedin3 && 
                  <MaterialCommunityIcons
                    name={'check'}
                    size={totalSize(2)}
                    color={colors.snow}
                  />
                }
              </View>
            </View>
            <View style={{justifyContent:'center',marginLeft:totalSize(1)}}>
            <SmallText >
            Style recommendations and offers
          </SmallText>
            </View>
          </TouchableOpacity>
     
      </ComponentWrapper>
    </MainWrapper>
  );
}

export default NotificationSettings;
const styles = StyleSheet.create({
  checkboxViewstyle:{
  
      borderColor:colors.appColor1,
      borderWidth:1,
      borderRadius:8,
      height:22,
      width:22,
      alignItems:'center',
      justifyContent:'center',
     
      
  }
  })