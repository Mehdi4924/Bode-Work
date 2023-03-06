import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { MainWrapper, MediumText, SmallTitle, Wrapper } from '../../../components';
import { colors, ToastMessage } from '../../../themes';
import Header from '../../../components/header/header';
import { height, width } from 'react-native-dimension';
import { termsAndConditions } from '../../../services/backend/support';

const TermsAndCondition = (props) => {
  const [termsAndConditionData, setTermsAndConditionData] = useState({});

  useEffect(() => {
    getTermsAndCondition();
  }, []);
  const getTermsAndCondition = () => {
    try {
      termsAndConditions().then((response) => {
        if (response?.success) {
          console.log("RESPONSE =====> ", response?.data);
          setTermsAndConditionData(response?.data);
        } else {
          setTermsAndConditionData({});
        }
      })
    } catch (error) {
      ToastMessage(error.message);
    }
  };

  return (
    <MainWrapper>
      <StatusBar backgroundColor={"transparent"} barStyle={"dark-content"} />
      <Header 
        goBack={() => props.navigation.goBack()}
        heading={"Terms & Condition"}
        color={colors.appColor1} 
      />
      <Wrapper 
      // animation="fadeInDown"
       style={{marginHorizontal:width(6),marginTop:height(1)}}>
        <SmallTitle>Terms & Condition</SmallTitle>
        <MediumText style={{marginTop:height(2),lineHeight:22}}>
          {termsAndConditionData?.description}
        </MediumText>
      </Wrapper>
    </MainWrapper>
  );
}

export default TermsAndCondition;
