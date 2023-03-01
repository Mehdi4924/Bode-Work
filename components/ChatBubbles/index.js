import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes } from '../../themes';
import { ComponentWrapper, Wrapper } from '../wrappers';
import { RegularText, TinyText } from '../text';

export const ChatBubbule = props => {
    const { containerStyle, myMessage, message, time } = props
    return (
        <ComponentWrapper
        // animation={!myMessage?'fadeInLeft':'fadeInRight'}
            style={[{
                alignItems: !myMessage ? 'flex-start' : 'flex-end',
                //alignItems: 'flex-start',
                marginTop: 5
            }, containerStyle]}
        >
            <Wrapper style={{ backgroundColor: !myMessage ? colors.appColor1 : colors.appBgColor4 + '40', padding: sizes.smallMargin, borderRadius: sizes.chatBubbleRadius,}}>
                <RegularText style={[!myMessage ? appStyles.textWhite : null]}>{message}</RegularText>
            </Wrapper>
            <TinyText style={[appStyles.textLightGray,{margin: sizes.TinyMargin}]}>{time}</TinyText>
        </ComponentWrapper>
    );
}