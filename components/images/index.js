import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ViewPropTypes ,ImageBackground} from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, fontFamily, sizes } from '../../themes';
import PropTypes from 'prop-types'
import { Wrapper, AbsoluteWrapper } from '../wrappers';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const ImageRound = props => {
    const { style, size, source ,onPress} = props
    const defaultSize = totalSize(5)
    return (
        <TouchableOpacity onPress={onPress}>
        <Image
            source={source}
            style={[{ height: size ? size : defaultSize, width: size ? size : defaultSize, borderRadius: 100 }, style]}
        />
</TouchableOpacity>
    );
}

export const ImageSqareRound = props => {
    const { style, size, source } = props
    const defaultSize = totalSize(5)
    return (
        <Image
            source={source}
            style={[{ height: size ? size : defaultSize, width: size ? size : defaultSize, borderRadius: 15 }, style]}
        />
    );
}

export const ImageProfile = props => {
    const { imageStyle, source, containerStyle,onPress ,title } = props
    return (
        <Wrapper style={containerStyle}>
            <TouchableOpacity onPress={onPress}>
            <ImageBackground
                source={source}
                style={[styles.ImageProfile, imageStyle]}
            >
                
            </ImageBackground>
            <AbsoluteWrapper style={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <LinearGradient
                    colors={colors.profileImageGradiant}
                   locations={[0.03,0.4]}
                    style={[{flex:1},styles.ImageProfileOverlay]}
                >
                 <View style={{marginLeft:width(18),marginTop:height(2.7)}}>
                 <Text style={{color:colors.snow,fontSize:totalSize(2.5),fontFamily:fontFamily.appTextBold}}>{title}</Text>
                 </View>
                </LinearGradient>
            </AbsoluteWrapper>
            </TouchableOpacity>
        </Wrapper>
    );
}
export const ImagePortfolio = props => {
    const { imageStyle, source, containerStyle } = props
    return (
        <Wrapper style={containerStyle}>
            <Image
                source={source}
                style={[styles.ImagePortfolio, imageStyle]}
            />
        </Wrapper>
    );
}
export const ImagePortfolio2 = props => {
    const { imageStyle, source, containerStyle,Icon, IconName} = props
    return (
        <Wrapper style={containerStyle}>
            <ImageBackground
                source={source}
                style={[styles.ImagePortfolio, imageStyle,{borderRadius:25}]}
            >
               
            {/* <View style={{position:'absolute' ,alignSelf:'center',justifyContent:'center',backgroundColor:colors.appColor1,
        height:height(4),width:width(8),borderRadius:100,alignItems:'center',marginTop:height(12)}}>
             <AntDesign
             name={IconName}
             size={totalSize(3)}
             color={"red"}
             />
            </View> */}
           
            </ImageBackground>
        </Wrapper>
    );
}


const styles = StyleSheet.create({
    ImageProfile: {
        width: null,
         height: height(40),
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    ImageProfileOverlay: {
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    ImagePortfolio: {
        width: width(25),
        height: height(20),
        borderRadius: 25,
    }
})
