import React, {Component, useState} from 'react';
import {View, Text, FlatList, StatusBar, ScrollView, Image, TextInput} from 'react-native';
import {
  ServiceIconCard,
  MainWrapperMatrial,
  Wrapper,
  TextInputBordered,
  Spacer,
  ComponentWrapper,
  TinyTitle,
  FeaturedServiceCard,
  SmallText,
  RegularText,
  ModalColored,
  ServiceIconCardNew,
  SmallTitle,
  LargeTitle,
  MediumTitle,
  ButtonColored,
  MediumText,
  LargeText,
} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors, appStyles, sizes, appImages, appIcons} from '../../../themes';
import {width, height, totalSize} from 'react-native-dimension';

const DATA = [1, 2, 3, 4, 5];

const AvailableSlots = () => {
    return (
        <MainWrapperMatrial style={{backgroundColor:"#FFF"}}>
            <StatusBar backgroundColor={"#FFF"} barStyle={'dark-content'} />
            <View style={{flex:1,backgroundColor:colors.appColor1,borderTopLeftRadius:45,borderTopRightRadius:45}}>
                <View style={{flexDirection:'row',paddingVertical:height(2),paddingHorizontal:width(8)}}>
                    <View style={{justifyContent:'center'}}>
                        <FontAwesome
                            name='angle-left'
                            size={totalSize(4)}
                            color="#FFF"
                        />
                    </View>
                    <View style={{flex:1,justifyContent:'center',marginLeft:width(8)}}>
                        <MediumTitle style={{color:"#FFF"}}>29th July, 2020</MediumTitle>
                    </View>
                </View>
                <KeyboardAwareScrollView style={{marginTop:height(2)}} showsVerticalScrollIndicator={false}>
                    {DATA.map((val, key) => {
                        return (
                            <Wrapper
                                key={key}
                                animation="fadeInDown" 
                                style={{
                                    backgroundColor:"#FFF",
                                    marginHorizontal: totalSize(3),
                                    marginBottom: totalSize(3),
                                    borderRadius: 20,
                                    padding: totalSize(2),
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 6,
                                    },
                                    shadowOpacity: 0.37,
                                    shadowRadius: 7.49,
                                    elevation: 12,
                                }}>
                                <View style={{flexDirection:'row',borderBottomColor:"#00000029",borderBottomWidth:1,paddingBottom:totalSize(1)}}>
                                    <View>
                                        <Image 
                                            source={appImages.imageOne} 
                                            style={{height:totalSize(8),width:totalSize(8),resizeMode:'cover',borderRadius:100}}  
                                        />
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',marginLeft:totalSize(1)}}>
                                        <SmallTitle style={{color:"#000"}}>Jane Doe</SmallTitle>
                                        <Text>
                                            <Ionicons 
                                                name='star'
                                                size={totalSize(1.5)}
                                                color="#C9A858"
                                            />
                                            <SmallText style={{color:"#000000"}}> (4.9)</SmallText>
                                        </Text>
                                    </View>
                                    <View style={{justifyContent:'flex-start',marginLeft:totalSize(3)}}>
                                        <ButtonColored 
                                            text="Hair Cut"
                                            buttonStyle={{marginHorizontal:0,paddingHorizontal:width(5),borderRadius:100,height: height(5)}}
                                            // onPress={() => }
                                        />
                                        <MediumTitle style={{color:"#000000",marginTop:height(2),textAlign:"right"}}>$40</MediumTitle>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                        <MediumText style={{color:"#7F7F7F"}}>Time Slot</MediumText>
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                        <MediumText style={{color:"#000000"}}>12:00 pm - 02:00 pm</MediumText>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                        <MediumText style={{color:"#7F7F7F"}}>Date</MediumText>
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                        <MediumText style={{color:"#000000"}}>29th July, 2020</MediumText>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                        <MediumText style={{color:"#7F7F7F"}}>Location</MediumText>
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                        <MediumText style={{color:"#000000"}}>17 Johnson Ave, NYC</MediumText>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                        <MediumText style={{color:"#7F7F7F"}}>Distance</MediumText>
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                        <MediumText style={{color:"#000000"}}>6 miles away</MediumText>
                                    </View>
                                </View>
                            </Wrapper>
                        )
                    })}
                </KeyboardAwareScrollView>
            </View>
        </MainWrapperMatrial>
    )
}

export default AvailableSlots;
