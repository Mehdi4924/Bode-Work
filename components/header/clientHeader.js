import React, {Component} from 'react';
import {View, Text, FlatList, StatusBar, ScrollView, Image, TouchableOpacity} from 'react-native';
import { height, totalSize, width } from "react-native-dimension";
import { MediumTitle, SmallText, SmallTitle } from "../text";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, sizes } from '../../themes';
import { routes } from '../../services';
import Entypo from 'react-native-vector-icons/Entypo';

const ClientHeader = (props) => {
    return (
        <View style={[{flexDirection:'row',paddingVertical:totalSize(1.5),paddingHorizontal:totalSize(2),backgroundColor:colors.appColor1,alignItems:'center'},props.headerStyle]}>
            {props.backButton &&
                <TouchableOpacity 
                    activeOpacity={.8}
                    onPress={props.goBack}
                    style={{justifyContent:'center'}}>
                     <Ionicons
                name='chevron-back'
                size={totalSize(2.8)}
                color={colors.appColor1} 
              />
                </TouchableOpacity>
            }
            <View style={{flex:1,justifyContent:'center',marginLeft:width(1),marginBottom:height(0.5)}}>
                <MediumTitle style={[{color:"#FFF",textAlign:"left",textTransform:"capitalize"},props.headingStyle]}>{props.heading}</MediumTitle>
            </View>
            {props.notification &&
                <TouchableOpacity 
                    activeOpacity={.8}
                    onPress={props.iconLeftOnPress}
                    style={{justifyContent:'center',position:'relative',marginRight:width(1)}}>
                    <Ionicons 
                        name='notifications'
                        size={totalSize(3)}
                        color="#FFF"
                    />
                </TouchableOpacity>
            }
        </View>
    )
}

export default ClientHeader;