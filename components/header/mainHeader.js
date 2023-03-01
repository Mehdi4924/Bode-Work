import React, {Component} from 'react';
import {View, Text, FlatList, StatusBar, ScrollView, Image, TouchableOpacity} from 'react-native';
import { height, totalSize } from "react-native-dimension";
import { MediumTitle, SmallText, SmallTitle } from "../text";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../themes';
import { routes } from '../../services';

const MianHeader = (props) => {
    return (
        <View style={{flexDirection:'row',padding:totalSize(3),backgroundColor:colors.appColor1}}>
            <TouchableOpacity 
                activeOpacity={.8}
                onPress={props.iconLeftOnPress}
                style={{justifyContent:'center',position:'relative'}}>
                <Ionicons 
                    name='notifications'
                    size={totalSize(3)}
                    color="#FFF"
                />
                {/* <View style={{backgroundColor:"#FF0200",position:'absolute',top:0,right:0,borderRadius:100,height:height(2),width:height(2),alignItems:'center',justifyContent:'center'}}>
                    <SmallText style={{color:"#FFF",fontSize:8,textAlign:"center"}}>99</SmallText>
                </View> */}
            </TouchableOpacity>
            <View style={{flex:1,justifyContent:'center'}}>
                <MediumTitle style={{color:"#FFF",textAlign:"center",textTransform:"capitalize"}}>{props.heading}</MediumTitle>
            </View>
            <TouchableOpacity style={{justifyContent:'center',position:'relative'}}
             onPress={props.iconRightOnPress}
            >
                <Ionicons 
                    name='chatbubbles'
                    size={totalSize(3)}
                    color="#FFF"
                />
                {/* <View style={{backgroundColor:"#FF0200",position:'absolute',top:0,borderRadius:100,height:height(2),width:height(2),alignItems:'center',justifyContent:'center'}}>
                    <SmallText style={{color:"#FFF",fontSize:8,textAlign:"center"}}>99</SmallText>
                </View> */}
            </TouchableOpacity>
        </View>
    )
}

export default MianHeader;