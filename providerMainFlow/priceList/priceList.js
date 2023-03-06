import React, { Component, useState } from 'react';
import { View, Text, StatusBar, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { MainWrapper, RowWrapper, Wrapper, Spacer, TinyTitle, ComponentWrapper, RegularText, SmallTitle, ButtonColored, AbsoluteWrapper, ModalColored, MediumTitle, TextInputBordered } from '../../../components';
import { appImages, appStyles, colors, sizes } from '../../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon, Image } from 'react-native-elements';
import { totalSize, height, width } from 'react-native-dimension';
import Header from '../../../components/header/header';
import { routes } from '../../../services';

const PriceList = (props) => {
    const [small, setSmall] = useState("40");
    const [medium, setMedium] = useState("50");
    const [large, setLarge] = useState("80");

    return (
        <MainWrapper>
            <StatusBar backgroundColor={"transparent"} barStyle={"dark-content"} />
            <Header 
                goBack={() => props.navigation.goBack()}
                heading={"Price List"}
                color={colors.appColor1} 
            />
            <ScrollView>
                <Wrapper
                    animation="fadeInDown" 
                    style={{paddingHorizontal:width(4),marginTop:height(2)}}
                >
                    <SmallTitle>{"Braiding > Box Braids"}</SmallTitle>
                    <Wrapper animation="fadeInDown"  style={{position:'relative'}}>
                        <TextInputBordered 
                            animation={"fadeInDown"}
                            title={"Small"}
                            inputContainerStyle={{marginHorizontal:0,marginBottom:height(1)}}
                            titleStyle={{marginLeft:0}}
                            componentWrapperStyle={{marginLeft:0,marginTop:height(2)}}
                        />
                        <AbsoluteWrapper style={{left:totalSize(1.5),bottom:totalSize(2.3)}}>
                            <SmallTitle>${small}</SmallTitle>
                        </AbsoluteWrapper>
                    </Wrapper>
                    <Wrapper animation="fadeInDown" style={{position:'relative'}}>
                        <TextInputBordered 
                            animation={"fadeInDown"}
                            title={"Medium"}
                            inputContainerStyle={{marginHorizontal:0,marginBottom:height(1)}}
                            titleStyle={{marginLeft:0}}
                            componentWrapperStyle={{marginLeft:0,marginTop:height(2)}}
                        />
                        <AbsoluteWrapper style={{left:totalSize(1.5),bottom:totalSize(2.3)}}>
                            <SmallTitle>${medium}</SmallTitle>
                        </AbsoluteWrapper>
                    </Wrapper>
                    <Wrapper animation="fadeInDown" style={{position:'relative'}}>
                        <TextInputBordered 
                            animation={"fadeInDown"}
                            title={"Large"}
                            inputContainerStyle={{marginHorizontal:0,marginBottom:height(1)}}
                            titleStyle={{marginLeft:0}}
                            componentWrapperStyle={{marginLeft:0,marginTop:height(2)}}
                        />
                        <AbsoluteWrapper style={{left:totalSize(1.5),bottom:totalSize(2.3)}}>
                            <SmallTitle>${large}</SmallTitle>
                        </AbsoluteWrapper>
                    </Wrapper>
                </Wrapper>
            </ScrollView>
            <ButtonColored 
                text={"Next"}
                onPress={() => props.navigation.navigate(routes.provider.editSkills)}
                buttonStyle={{marginBottom:totalSize(4)}}
            />
        </MainWrapper>
    );
}

export default PriceList;
