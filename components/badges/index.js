import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { Wrapper } from '../wrappers';
import { appStyles, colors } from '../../themes';
import { SmallText } from '../text';

export const BadgePrimary = props => {
    const { containerSize, containerColor, containerStyle, textSize, textStyle,value } = props
    const defaultContainerSize = totalSize(3)
    const defaultTextSize = totalSize(1.25)
    const defaultContainerColor = colors.appColor2
    return (
        <Wrapper style={[{
            //height: containerSize ? containerSize : defaultContainerSize,
            //width: containerSize ? containerSize : defaultContainerSize,
            padding: totalSize(0.1),
            backgroundColor: containerColor ? containerColor : defaultContainerColor
        }, styles.BadgePrimary, containerStyle]}>
            <SmallText style={[{
                fontSize: textSize ? textSize : null,
            }, styles.BadgePrimaryText, textStyle]}>{value}</SmallText>
        </Wrapper>
    );
}


const styles = StyleSheet.create({
    BadgePrimary: {
        ...appStyles.center,
        borderRadius: 100,
    },
    BadgePrimaryText: {
        ...appStyles.textWhite
    }
})