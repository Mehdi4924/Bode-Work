import React, { Component, useState } from 'react';
import { View, Text, StatusBar,TouchableOpacity ,StyleSheet} from 'react-native';
import {totalSize, width} from 'react-native-dimension';
import { MainWrapper, ComponentWrapper, CheckBoxPrimary, Spacer, SmallText, RegularText } from '../../../components';
import Header from '../../../components/header/header';
import { sizes, appStyles, colors } from '../../../themes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const LocationSetting = (props) => {
  const [stayLoggedin, setstayLoggedin] = useState(false);
  const [checked, setchecked] = useState(true);

  return (
    <MainWrapper>
      <StatusBar 
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
      />
      <Header 
        goBack={() => props.navigation.goBack()}
        heading={"Location"}
        color={colors.appColor1} 
      />
      <ComponentWrapper>
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
            Allow location services
          </SmallText>
            </View>
          </TouchableOpacity>
        <Spacer height={sizes.smallMargin} />
        <RegularText style={[appStyles.textGray]}>
          Location is required to match you with local Stylist and provide accurate pricing
        </RegularText>
      </ComponentWrapper>
    </MainWrapper>
  );
}

export default LocationSetting;
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