import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { MainWrapper, RegularText, SmallTitle, Wrapper } from '../../../components';
import { colors, ToastMessage } from '../../../themes';
import Header from '../../../components/header/header';
import { height, width } from 'react-native-dimension';
import { legalNoticesData } from '../../../services/backend/support';
import { View } from 'react-native-animatable';

const LegalNotices = (props) => {
  const [legalNotices, setLegalNotices] = useState([]);

  useEffect(() => {
    getLegalNotices();
  }, []);
  const getLegalNotices = () => {
    try {
      legalNoticesData().then((response) => {
        if (response?.success) {
          setLegalNotices(response?.data);
        } else {
          setLegalNotices({});
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
        heading={"Legal Notices"} 
        color={colors.appColor1} 
      />
      <Wrapper 
      // animation="fadeInDown"
       style={{marginHorizontal:width(6),marginTop:height(2)}}>
        {legalNotices?.map((val, key) => {
          return (
            <View key={key}>
              <SmallTitle style={{textTransform:"capitalize"}}>{val?.title}</SmallTitle>
              <RegularText style={{marginTop:height(1),marginBottom:height(3),lineHeight:20}}>
                {val?.description}
              </RegularText>
            </View>
          )
        })}
      </Wrapper>
    </MainWrapper>
  );
}

export default LegalNotices;
