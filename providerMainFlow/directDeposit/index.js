import React, { useState } from 'react';
import { View, Text, TextInput, StatusBar ,ActivityIndicator, TouchableOpacity} from 'react-native';
import { MainWrapper, Spacer, ButtonColored, AbsoluteWrapper, Wrapper, TextInputBordered, KeyboardAvoidingScrollView } from '../../../components';
import { sizes, colors, ToastMessage } from '../../../themes';
import { height, totalSize } from 'react-native-dimension';
import Header from '../../../components/header/header';
import { useDispatch, useSelector } from 'react-redux';
import { DDeposit } from '../../../services/backend/user';
import { setUserDetail ,} from '../../../services/stores/actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
const DirectDeposit = (props) => {
  const [Accountno, setAccountno] = useState('');
  const [cAccountno, setcAccountno] = useState('');
  const [Routingno, setRoutingno] = useState('');
  const [cRoutingno, setcRoutingno] = useState('');
  const {navigate, goBack, replace} = props.navigation;
  const {userDetail} = useSelector(state => state.user);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const directdeposit = () => {
    const data ={
      'user_id': userDetail?.id,
      'bank_account': Accountno,
      'bank_account_confirmation': cAccountno,
      'bank_routing': Routingno,
      'bank_routing_confirmation': cRoutingno,

    };

    DDeposit(data).then(response => {
      setLoader(true)
      // console.log("ye chala");
      if (response?.success) {
        setLoader(false)
        ToastMessage('Send successfully')
        goBack();
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
        heading={"Direct Deposit"}
        color={colors.appColor1} 
      />
      <KeyboardAvoidingScrollView>
      <Spacer height={sizes.smallMargin} />
      <Wrapper>
        <TextInputBordered 
            title={"Bank Account Number"}
            placeholder={"###########"}
            value={Accountno}
            onChangeText={val => {
              setAccountno(val);
            }}
            containerStyle={{marginBottom:height(3)}}
        />
        <TextInputBordered 
            title={"Confirm Bank Account Number"}
            value={cAccountno}
            placeholder={"###########"}
            onChangeText={val=>{
              setcAccountno(val)
            }}
            containerStyle={{marginBottom:height(3)}}
        />
        <TextInputBordered 
            title={"Bank Routing Number"}
            placeholder={"###########"}
            value={Routingno}
            onChangeText={val=>{
              setRoutingno(val)
            }}
            containerStyle={{marginBottom:height(3)}}
        />
        <TextInputBordered 
            title={"Confirm Bank Routing Number"}
            placeholder={"###########"}
            value={cRoutingno}
            onChangeText={val=>{
              setcRoutingno(val)
            }}
            containerStyle={{marginBottom:height(3)}}
        />
      </Wrapper>
     
      <TouchableOpacity style={{marginTop:height(25)}}>
      {loader ? (
          <View>
            <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
          </View>
        ) : (
        <ButtonColored 
         onPress={() => 
          Accountno!=""&&
          Accountno!=null&&
          cAccountno!=""&&
          cAccountno!=null&&
          Routingno!=""&&
          Routingno!=null&&
          cRoutingno!=""&&
          cRoutingno!=null

          ?directdeposit()
        :ToastMessage('Please fill all feilds')}
            text={"Save"}
        />
        )}
      </TouchableOpacity>
      <Spacer height={sizes.baseMargin} />
      </KeyboardAvoidingScrollView>
    </MainWrapper>
  );
}

export default DirectDeposit;
