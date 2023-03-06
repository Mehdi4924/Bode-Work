import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { MainWrapper, ComponentWrapper, CustomIcon, Spacer, RegularText, MediumText } from '../../../components';
import { appIcons, appImages, appStyles, sizes, fontSize, colors } from '../../../themes';
import { totalSize, height } from 'react-native-dimension';
import Header from '../../../components/header/header';

const Redemptions = (props) => {

    return (
        <MainWrapper>
            <StatusBar 
                barStyle={"dark-content"}
                backgroundColor={"transparent"}
            />
            <Header 
                goBack={() => props.navigation.goBack()}
                heading={"Redemptions"}
                color={colors.appColor1}
            />
            <ComponentWrapper style={[appStyles.center,{}]}>
                <CustomIcon
                    icon={appImages.redeemArtwork}
                    size={totalSize(25)}
                    containerStyle={{marginBottom:height(10),marginTop:height(20)}}
                    // animation='fadeInDown'
                />
                <RegularText style={[appStyles.textPrimaryColor, { fontSize: fontSize.h3 }]}>Oops!</RegularText>
                <Spacer height={sizes.smallMargin} />
                <MediumText style={[appStyles.textPrimaryColor]}>Nothing to redeem</MediumText>
            </ComponentWrapper>
        </MainWrapper>
    );
}

export default Redemptions;
