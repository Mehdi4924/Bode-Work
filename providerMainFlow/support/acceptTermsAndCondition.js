import React, { useState } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import { ButtonColored, MainWrapper, MediumText, RegularText, SmallTitle, Wrapper } from '../../../components';
import { colors } from '../../../themes';
import Header from '../../../components/header/header';
import { height, totalSize, width } from 'react-native-dimension';

const AcceptTermsAndCondition = (props) => {
  return (
    <MainWrapper>
        <StatusBar backgroundColor={"transparent"} barStyle={"dark-content"} />
        <Header 
            goBack={() => props.navigation.goBack()}
            heading={"Accept Terms & Condition"} 
            color={colors.appColor1} 
        />
        <ScrollView>
            <Wrapper 
            // animation="fadeInDown"
             style={{marginHorizontal:width(6),marginTop:height(1)}}>
                <SmallTitle>Terms & Condition</SmallTitle>
                <MediumText style={{marginTop:height(2),lineHeight:22}}>
                    Etiam convallis elementum sapien, a aliquam turpis aliquam vitae. Praesent sollicitudin felis vel mi facilisis posuere. Nulla ultrices facilisis justo, non varius nisl semper vel. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus at ante mattis, condimentum velit et, dignissim nunc. Integer quis tincidunt purus. Duis dignissim mauris vel elit commodo, eu hendrerit leo ultrices. Nulla vehicula vestibulum purus at rutrum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur dignissim massa nec libero scelerisque rutrum. Curabitur ac purus id elit hendrerit lacinia. Nullam sit amet sem efficitur, porta diam in, convallis tortor. Etiam convallis elementum sapien, a aliquam turpis aliquam vitae. Praesent sollicitudin felis vel mi facilisis posuere. Nulla ultrices facilisis justo, non varius nisl semper vel. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus at ante mattis, condimentum velit et, dignissim nunc. Integer quis tincidunt purus. Duis dignissim mauris vel elit commodo, eu hendrerit leo ultrices. Nulla vehicula vestibulum purus at rutrum.
                </MediumText>
            </Wrapper>
        </ScrollView>
        <ButtonColored 
            text={"Accept"}
            buttonStyle={{bottom:totalSize(4)}}
        />
    </MainWrapper>
  );
}

export default AcceptTermsAndCondition;
