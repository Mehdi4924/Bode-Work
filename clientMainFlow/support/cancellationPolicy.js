import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { height, width } from 'react-native-dimension';
import { MainWrapper, ComponentWrapper, Spacer, MediumText, SmallTitle, Wrapper } from '../../../components';
import Header from '../../../components/header/header';
import { cancelationPolicyData } from '../../../services/backend/support';
import { colors, sizes, ToastMessage } from '../../../themes';

const CancellationPolicy = (props) => {
  const [cancelationPolicy, setCancelationPolicy] = useState({});

  useEffect(() => {
    getCancelationPolicy();
  }, []);
  const getCancelationPolicy = () => {
    try {
      cancelationPolicyData().then((response) => {
        if (response?.success) {
          setCancelationPolicy(response?.data);
        } else {
          setCancelationPolicy({});
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
        heading={"Cancellation Policy"} 
        color={colors.appColor1} 
      />
      <Wrapper 
      // animation="fadeInDown" 
      style={{marginHorizontal:width(6),marginTop:height(2)}}>
        <SmallTitle>Cancellation Policy</SmallTitle>
        <MediumText style={{marginTop:height(2),lineHeight:22}}>
          {cancelationPolicy?.description}
        </MediumText>
      </Wrapper>
    </MainWrapper>
  );
}

export default CancellationPolicy;
