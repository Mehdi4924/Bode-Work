import React, { Component,useState } from 'react';
import { View, Text, TextInput, StatusBar, Image, TouchableOpacity } from 'react-native';
import { MainWrapper, Spacer, ComponentWrapper, LineHorizontal, RowWrapperBasic } from '../../../components';
import { sizes, colors, appIcons, ToastMessage } from '../../../themes';
import { height } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import Header from '../../../components/header/header';
import {useSelector} from 'react-redux';
import { CustomeremailSuports } from '../../../services/backend/client';
const EmailCustomerSupport = (props) => {
  const [chatMessages, setChatMessages] = useState("");
  const {userDetail} = useSelector(state => state.user);
  const [loader, setLoader] = useState(false);
  console.log("user detail",userDetail);
  const sendemail = () => {
    // setLoader(true)
    const formdata = new FormData();
    formdata.append("user_id",userDetail?.id);
    formdata.append("message",chatMessages);
 
    console.log('form data', formdata);
    CustomeremailSuports(formdata).then(response => {
      console.log('customer reponse =====> ', response);
      if (response?.success==true) {
        ToastMessage('Successfully email sent to support')
        props.navigation.goBack()
       
      }else{
        // ToastMessage(response.message);
        ToastMessage(' Email not sent to support')
        console.log("else chala");
        // setLoader(false)
      }
    });
  };
  return (
    <MainWrapper>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"#FFF"}
      />
      <Header
        goBack={() => props.navigation.goBack()}
        heading={"Email Customer Support"}
        color={colors.appColor1}
      />
      <Spacer height={sizes.smallMargin} />
      <ComponentWrapper
        // animation="fadeInUp" 
        style={[{ borderWidth: 1, borderColor: colors.appColor1, padding: sizes.baseMargin, borderRadius: sizes.inputRadius }]}>
        <TextInput
          placeholder="Write a message"
          value={chatMessages}
          onChangeText={(val) => { 
            setChatMessages(val)
          }}
          style={{ height: height(25), textAlignVertical: 'top' }}
          multiline
        />
        <LineHorizontal />
        <Spacer height={sizes.baseMargin} />
        <RowWrapperBasic style={[{ justifyContent: 'space-between' }]}>
          <Icon
            name="attach-file"
            type="material"
            color={colors.appColor1}
          />
          {/* <Icon
            name="send"
            type="font-awesome"
            color={colors.appColor1}
          /> */}
         <TouchableOpacity onPress={()=>
          
          chatMessages!=''&&
          chatMessages!=null
         ? sendemail()
        :ToastMessage("Please write something")}
          >
         <Image
            source={appIcons.send}
            resizeMode="cover"
            style={{
              height: 25,
              width: 25,

            }}
          />
         </TouchableOpacity>
        </RowWrapperBasic>
      </ComponentWrapper>
    </MainWrapper>
  );
}

export default EmailCustomerSupport;
