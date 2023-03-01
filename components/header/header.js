import React, {Component} from 'react';
import {View, Text, FlatList, StatusBar, ScrollView, Image, TouchableOpacity} from 'react-native';
import { height, totalSize, width } from "react-native-dimension";
import { MediumTitle, SmallText, SmallTitle } from "../text";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors, sizes } from '../../themes';

const Header = (props) => {
    return (
        <View style={{flexDirection:'row',paddingVertical:height(2),paddingHorizontal:width(5),justifyContent:'center'}}>
            <TouchableOpacity 
                onPress={props.goBack}
                style={{justifyContent:'center'}}>
                <Ionicons
                name='chevron-back'
                size={totalSize(3)}
                color={props.color} 
              />
            </TouchableOpacity>
            <View style={{flex:1,justifyContent:'center',marginLeft:width(8),marginBottom:height(0.5)}}>
                <MediumTitle style={{color:props.color}}>{props.heading}</MediumTitle>
            </View>
        </View>
    )
}

export default Header;