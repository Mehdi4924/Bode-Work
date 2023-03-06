import React, { Component, useState, useEffect } from 'react';
import { View, Text,ActivityIndicator } from 'react-native';
import { MainWrapper, ComponentWrapper, LogoMain, Spacer, TextInputColored, ButtonColored, CustomIcon, TextInputBordered } from '../../../components';
import { appImages, appStyles, colors, sizes, ToastMessage } from '../../../themes';
// import { totalSize } from 'react-native-dimension';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { sendPasswordReset } from '../../../backend/firebase/auth';
import { routes, stores } from '../../../services';
import { totalSize, width, height } from 'react-native-dimension';
import { forGetemail } from '../../../services/backend/user';
const ResetPassword = (props) => {
  const [email, setemail] = useState("");
  const [emailError, setemailError] = useState("");
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const resetPasswordFn = async () => {
    setLoader(true)
    // const resetPasswordFn(){
    if (email == "") {
      ToastMessage('The email cannot be empty, it is a required field')
      setLoader(false)
    } else {
      const data = {

        email:email,

      };
      console.log("form data ====>",data);
      forGetemail(data).then((response) => {
        // console.log("RESPONSEw =====> ", response);
        if (response?.message=="Email Sent successfully") {
          ToastMessage("Email Sent successfully");
          props.navigation.navigate(routes.signin)
          setLoader(false);
        } else {
          ToastMessage("Email Not Sent successfully");
          setLoader(false);
        }
      })
    }
    // sendPasswordReset(email).then(() => {
    //   this.props.navigation.navigate(routes.signin)
  };


const { navigate } = props.navigation;
return (
  <MainWrapper>
    <KeyboardAwareScrollView>
      <Spacer height={sizes.doubleBaseMargin} />
      <ComponentWrapper style={[appStyles.center]}>
        {/* <LogoMain size={totalSize(20)}/>  */}
        <CustomIcon
          // animation={"fadeInDown"}
          icon={appImages.resetPassImage}
          size={totalSize(25)}
        />
      </ComponentWrapper>
      <Spacer height={sizes.doubleBaseMargin} />
      <TextInputBordered
        title="Email"
        placeholder="example@abc.com"
        // animation="fadeInRight"
        keyboardType="email-address"
        onChangeText={val => {
          setemail(val);
          let reg2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (reg2.test(val) === false) {
            if (email !== undefined && email !== '') {
              setemailError("The email is badly formatted, must include @ and . in the end");
              setDisabled(true);
            } else {
              setemailError("The email cannot be empty, it is a required field");
              setDisabled(true);
            }
          } else {
            setemailError("");
          
          }
        }}
        value={email}
      />
      {emailError.length > 0 && (
        <Text style={{ paddingLeft: width(5), color: 'red' }}>
          {emailError}
        </Text>
      )}
      <Spacer height={sizes.baseMargin} />
      {loader ? (
          <View>
            <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
          </View>
        ) : (
      <ButtonColored
        onPress={() => resetPasswordFn()}
        text="Reset Password"
      />
        )}
      <Spacer height={sizes.doubleBaseMargin} />
    </KeyboardAwareScrollView>
  </MainWrapper>
);
      }


export default ResetPassword;
