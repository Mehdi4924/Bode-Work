import React, { Component, useEffect, useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { MainWrapper, MediumText, RegularText, SmallText, SmallTitle, Wrapper } from '../../../components';
import { appStyles, colors, sizes, ToastMessage } from '../../../themes';
import Header from '../../../components/header/header';
import { height, width } from 'react-native-dimension';
import { privacyPolicyData } from '../../../services/backend/support';

const PrivacyPolicy = (props) => {
  const [privacyPolicy, setPrivacyPolicy] = useState({});

  useEffect(() => {
    getPrivacyPolicy();
  }, []);
  const getPrivacyPolicy = () => {
    try {
      privacyPolicyData().then((response) => {
        if (response?.success) {
          setPrivacyPolicy(response?.data);
        } else {
          setPrivacyPolicy({});
        }
      })
    } catch (error) {
      ToastMessage(error.message);
    }
  };

  return (
    <MainWrapper>
      <StatusBar backgroundColor={"#FFF"} barStyle={"dark-content"} />
      <Header 
        goBack={() => props.navigation.goBack()}
        heading={"Privacy Policy"} 
        color={colors.appColor1} 
    />
      <Wrapper 
      // animation="fadeInDown"
       style={{marginHorizontal:width(6),marginTop:height(2)}}>
        <SmallTitle>Privacy Policy</SmallTitle>
        <MediumText style={{marginTop:height(2),lineHeight:22}}>
          {privacyPolicy?.description}
        </MediumText>
      </Wrapper>
    </MainWrapper>
  );
}

export default PrivacyPolicy;
