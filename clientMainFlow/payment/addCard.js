import React, {Component, useState} from 'react';
import {View, Text, StatusBar,ActivityIndicator} from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import { CardAdd } from '../../../services/backend/client';
import { setUserDetail ,} from '../../../services/stores/actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AddCard = (props) => {
  const [cpassword, setcpassword] = useState('');
  const [validTill, setValiTill] = useState('');
  const [cvvCode, setcvvCode] = useState('');
  const [cpassError, setcpassError] = useState('');
  const [validTillsError, setvalidTillsError] = useState('');
  const [cvvCodeError, setcvvCodeError] = useState('');
  const dispatch = useDispatch();
  const {navigate, goBack, replace} = props.navigation;
  const {userDetail} = useSelector(state => state.user);
  const [loader, setLoader] = useState(false);
  const addcard = () => {
    const data ={
      'user_id': userDetail?.id,
      'card_number': cpassword,
      'valid_till': validTill,
      'cvv': cvvCode,

    };

    CardAdd(data).then(response => {
      setLoader(true)
      // console.log("ye chala");
      if (response?.success) {
        setLoader(false)
        ToastMessage('Card added successfully')
        // console.log('changepaswwordDATA =====> ', response);
        goBack();
        // setDataSource(response?.data);
      }
      else{
        setLoader(false)
      }
    });
  };

  return (
    <MainWrapper>
      <StatusBar 
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
      />
      <Header 
        goBack={() => props.navigation.goBack()}
        heading={"Add Card"}
        color={colors.appColor1}
      />
      <KeyboardAvoidingScrollView>
        <Wrapper flex={1}>
          <Spacer height={sizes.baseMargin} />
          <TextInputBordered
            title="Card Number"
            placeholder={"#### #### #### ####"}
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
            title="Valid Till"
            placeholder={"## / ##"}
            onChangeText={val => setValiTill(val)}
            value={validTill}
          />
          {validTillsError.length > 0 && (
            <Text style={{paddingLeft: width(5), color: 'red'}}>
              {validTillsError}
            </Text>
          )}
          <Spacer height={sizes.baseMargin} />
          <TextInputBordered
            title="CVV"
            placeholder={"###"}
            onChangeText={val => setcvvCode(val)}
            value={cvvCode}
          />
          {cvvCodeError.length > 0 && (
            <Text style={{paddingLeft: width(5), color: 'red'}}>
              {cvvCodeError}
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
        text="Add Card"
        onPress={() => 
          cpassword&&
          cpassword!=null&&
          validTill&&
          validTill!=null&&
          cvvCode&&
          cvvCode!=null

          ?addcard()
        :ToastMessage('Please fill all feilds')}
      />)}
      <Spacer height={sizes.doubleBaseMargin} />
    </MainWrapper>
  );
}

export default AddCard;
