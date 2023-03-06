import React, {Component, useState} from 'react';
import {View, Text, StatusBar, ActivityIndicator} from 'react-native';
import {
  MainWrapper,
  Wrapper,
  TextInputBordered,
  Spacer,
  KeyboardAvoidingScrollView,
  ButtonColored,
} from '../../../components';
import {colors, sizes, ToastMessage} from '../../../themes';
import {totalSize, width, height} from 'react-native-dimension';
import auth from '@react-native-firebase/auth';
import Header from '../../../components/header/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changePassword } from '../../../services/backend/user';
import {routes} from '../../../services';
const ChangePassword = (props) => {
  const {navigate, goBack, replace} = props.navigation;
  const [loader, setLoader] = useState(false);
  const [cpassword, setcpassword] = useState('');
  const [npassword, setnpassword] = useState('');
  const [cnpassword, setcnpassword] = useState('');
  const [cpassError, setcpassError] = useState('');
  const [npassError, setnpassError] = useState('');
  const [cnpassError, setcnpassError] = useState('');

  const resetStates = () => {
    setcpassword('');
    setnpassword('');
    setcnpassword('');
    setcpassError('');
    setnpassError('');
    setcnpassError('');
  };
  const validateField = () => {
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passReg = /^[\w\d@$!%*#?&]{8,30}$/;
    if (passReg.test(cpassword) === false) {
      if (cpassword === '') {
        setcpassError("The current password can not be empty, it is a required field");
        return false;
      } else if (cpassword.length > 7) {
        setcpassError("The current password is badly formatted");
        return false;
      } else {
        setcpassError('The current password should be atleast 8 characters long!');
        return false;
      }
    } else {
      setcpassError('');
    }
    if (passReg.test(npassword) === false) {
      if (npassword === '') {
        setnpassError("The new password can not be empty, it is a required field");
        return false;
      } else if (npassword.length > 7) {
        setnpassError("The new password is badly formatted");
        return false;
      } else {
        setnpassError('The new password should be atleast 8 characters long!');
        return false;
      }
    } else {
      setnpassError('');
    }
    if (passReg.test(cnpassword) === false) {
      if (cnpassword === '') {
        setcnpassError("The confirm new password can not be empty, it is a required field");
        return false;
      } else if (cnpassword.length > 7) {
        setcnpassError("The confirm new password is badly formatted");
        return false;
      } else {
        setcnpassError('The confirm new password should be atleast 8 characters long!');
        return false;
      }
    } else {
      setcnpassError('');
    }
    return true;
  };
  const changePasswordHandle = async () => {
    try {
      if (validateField()) {
        const userType = JSON.parse(await AsyncStorage.getItem("userData"));
        console.log("userDetail =====> ", userType?.id);
        setLoader(true);
        const data = {
          user_id: userType?.id,
          old_password: cpassword,
          password: npassword,
          password_confirmation: cnpassword,
        };
        changePassword(data).then((response) => {
          setLoader(false);
          if (response?.success) {
            resetStates();
            ToastMessage("Password Changed Successfully");
            navigate(routes.client.profile);
          } else {
            ToastMessage(response?.message);
          }
        })
      }
    } catch (error) {
      ToastMessage(error.message);
    }
  };

  return (
    <MainWrapper>
      <StatusBar 
        barStyle={"dark-content"}
        backgroundColor={"#FFF"}
      />
      <Header 
        goBack={() => props.navigation.goBack()}
        heading={"Change Password"}
        color={colors.appColor1}
      />
      <KeyboardAvoidingScrollView>
        <Wrapper flex={1}>
          <Spacer height={sizes.baseMargin} />
          <TextInputBordered
            title="Current Password"
            secureTextEntry
            onChangeText={val => setcpassword(val)}
            value={cpassword}
          />
          {cpassError.length > 0 && (
            <Text style={{paddingLeft: width(5), color: 'red'}}>
              {cpassError}
            </Text>
          )}
          <Spacer height={sizes.baseMargin} />
          <TextInputBordered
            title="New Password"
            secureTextEntry
            onChangeText={val => setnpassword(val)}
            value={npassword}
          />
          {npassError.length > 0 && (
            <Text style={{paddingLeft: width(5), color: 'red'}}>
              {npassError}
            </Text>
          )}
          <Spacer height={sizes.baseMargin} />
          <TextInputBordered
            title="Confirm New Password"
            secureTextEntry
            onChangeText={val => setcnpassword(val)}
            value={cnpassword}
          />
          {cnpassError.length > 0 && (
            <Text style={{paddingLeft: width(5), color: 'red'}}>
              {cnpassError}
            </Text>
          )}
        </Wrapper>
      </KeyboardAvoidingScrollView>
      <Spacer height={sizes.doubleBaseMargin} />
      {loader ? (
        <View>
          <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
        </View>
      ) : (
        <ButtonColored
          text="Save"
          onPress={changePasswordHandle}
        />
      )}
      <Spacer height={sizes.doubleBaseMargin} />
    </MainWrapper>
  );
}

export default ChangePassword;
