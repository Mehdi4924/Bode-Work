import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import {
   
    Wrapper,
    Spacer,
    
  } from '../../components';
import {
    appImages,
    appStyles,
    colors,
    fontFamily,
    fontSize,
    sizes,
  } from '../../themes';

export const Primary = ({ value, iconSize, iconStyle, onPressIcon, emptyIconName, fillIconName, emptyIconColor, fillIconColor, iconType, disabled }) => {
    const ratings = [1, 2, 3, 4, 5]
    return (
        <>
            <View style={{flexDirection:"row",}}>
                {
                    ratings.map((item, index) => {
                        const defaultIconName = item <= value ? fillIconName ? fillIconName : 'star' : emptyIconName ? emptyIconName : 'star'
                        const defaultIconColor = item <= value ? fillIconColor ? fillIconColor : colors.rating : emptyIconColor || colors.rating
                        const defaultIconSize=iconSize ? iconSize : totalSize(2)
                        return (
                            <Icon
                                name={defaultIconName}
                                color={defaultIconColor}
                                size={defaultIconSize}
                                containerStyle={[{marginHorizontal:defaultIconSize/6},iconStyle]}
                                onPress={() => {
                                    !disabled && onPressIcon && onPressIcon(item)
                                }}
                                type={iconType ? iconType : 'font-awesome'}
                                disabled={!onPressIcon}
                                disabledStyle={{ backgroundColor: colors.transparent }}
                            />

                        )
                    })
                }
            </View>
        </>
    )
}
