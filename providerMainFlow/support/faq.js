import React, { Component, useState,useEffect } from 'react';
import { View, Text, StatusBar,FlatList ,ActivityIndicator} from 'react-native';
import { MainWrapper, RegularText, SmallText, SmallTitle, Wrapper } from '../../../components';
import { appStyles, colors, sizes ,ToastMessage,} from '../../../themes';
import Header from '../../../components/header/header';
import { height, totalSize, width } from 'react-native-dimension';
import { faqsData } from '../../../services/backend/support';
const Faq = (props) => {
  const [faqdata, setfaqdata] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getfaqsData();
  }, []);
  const getfaqsData = () => {
    setLoader(true)
    try {
      faqsData().then((response) => {
        if (response?.success) {
          setLoader(false)
          console.log("ye aya fq daata",response.data);
          setfaqdata(response?.data);
        } else {
          console.log("else cghala");
          setfaqdata({});
          setLoader(false)
        }
      })
    } catch (error) {
      ToastMessage(error.message);
      setLoader(false)
    }
  };
  return (
    <MainWrapper>
      <StatusBar backgroundColor={"#FFF"} barStyle={"dark-content"} />
      <Header 
        goBack={() => props.navigation.goBack()}
        heading={"Frequently Asked Questions"} 
        color={colors.appColor1} 
    />
    <>
     {loader ? (
                    <View
                      style={{
                        marginVertical: '10%',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                     <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
                    </View>) 
    :<FlatList
        data={faqdata}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View>

<Wrapper 
      // animation="fadeInDown" 
      style={{marginHorizontal:width(6),marginTop:height(2)}}>

     
        <SmallTitle>{item?.question}</SmallTitle>
        <RegularText style={{marginTop:height(1),marginBottom:height(3)}}>
         {item?.answer}
        </RegularText>
      </Wrapper>
            </View>
          );
        }}
      />
      }
    
    {/* {loader ? (
                    <View
                      style={{
                        marginVertical: '10%',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                     <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
                    </View>)
         :faqdata.map((item, key) => {
        return ( */}
    
      {/* // <Wrapper  */}
      {/* // animation="fadeInDown"  */}
      {/* // style={{marginHorizontal:width(6),marginTop:height(2)}}> */}

     
        {/* <SmallTitle>{item?.question}</SmallTitle> */}
        {/* <RegularText style={{marginTop:height(1),marginBottom:height(3)}}> */}
         {/* {item?.answer} */}
        {/* </RegularText> */}
        {/* <SmallTitle>Question Lorem Ipsum</SmallTitle>
        <RegularText style={{marginTop:height(1),marginBottom:height(3)}}>
          Aliquam in bibendum mauris. Sed vitae erat vel velit blandit pharetra vitae nec ante. Cras at est augue. Cras ut interdum elit.
        </RegularText>
        <SmallTitle>Question Lorem Ipsum</SmallTitle>
        <RegularText style={{marginTop:height(1),marginBottom:height(3)}}>
          Aliquam in bibendum mauris. Sed vitae erat vel velit blandit pharetra vitae nec ante. Cras at est augue. Cras ut interdum elit.
        </RegularText>
        <SmallTitle>Question Lorem Ipsum</SmallTitle>
        <RegularText style={{marginTop:height(1),marginBottom:height(3)}}>
          Aliquam in bibendum mauris. Sed vitae erat vel velit blandit pharetra vitae nec ante. Cras at est augue. Cras ut interdum elit.
        </RegularText>
        <SmallTitle>Question Lorem Ipsum</SmallTitle>
        <RegularText style={{marginTop:height(1),marginBottom:height(3)}}>
          Aliquam in bibendum mauris. Sed vitae erat vel velit blandit pharetra vitae nec ante. Cras at est augue. Cras ut interdum elit.
        </RegularText>
        <SmallTitle>Question Lorem Ipsum</SmallTitle>
        <RegularText style={{marginTop:height(1),marginBottom:height(3)}}>
          Aliquam in bibendum mauris. Sed vitae erat vel velit blandit pharetra vitae nec ante. Cras at est augue. Cras ut interdum elit.
        </RegularText> */}
       
        
      {/* </Wrapper> */}
      {/* //  ) */}
      {/* // })} */}
      
      </>
    </MainWrapper>
 
  );
}

export default Faq;
