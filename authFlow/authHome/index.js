import React, { useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { MainWrapper, ComponentWrapper, LogoMain, ButtonColored, Spacer, SmallText, TinyTitle } from '../../../components';
import { appStyles, sizes } from '../../../themes';
import { totalSize, height } from 'react-native-dimension';
import { routes } from '../../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthHome = (props) => {

  useEffect(() => {
    console.log("ye i typerrrrrrrrrrrrrrrr",);
    // AsyncStorage.setItem("token", "0");
    const { navigate, replace } = props.navigation;
    async function fetchData() {
      const token = await AsyncStorage.getItem("token");
      if(token === "1"){
        let type = await AsyncStorage.getItem("type");
        console.log("ye i type",type);
        if(type==="provider"){
          replace(routes.providerApp)
        }else{
          console.log("ye i typerrrrrrrrrrrrrrrr",);
          replace(routes.clientApp)
        }
      }
    }

    fetchData();
  }, []);
  const onGetStarted = async(type) => {
    const { navigate } = props.navigation;
    await AsyncStorage.setItem("type", type);
    navigate(routes.signInUp);
  };

  const { navigate } = props.navigation;
  return (
    <MainWrapper>
      <StatusBar 
        backgroundColor={"#FFF"}
        barStyle={'dark-content'}
      />
      <ComponentWrapper style={[appStyles.center]}>
        <LogoMain
          size={totalSize(25)}
        />
      </ComponentWrapper>
      <TinyTitle style={[appStyles.textCenter,]}>Get Started As</TinyTitle>
      <Spacer height={sizes.doubleBaseMargin} />
      <ButtonColored
        text='Client'
        onPress={() => onGetStarted('client')}
        // onPress={()=> props.navigation.replace(routes.clientApp)}
        buttonStyle={[styles.buttonStyle]}
        textStyle={[styles.buttonTextStyle]}
      />
      <Spacer height={sizes.baseMargin} />
      <SmallText style={[appStyles.textCenter]}>Or</SmallText>
      <Spacer height={sizes.baseMargin} />
      <ButtonColored
        text='Provider'
        onPress={() => onGetStarted('provider')}
        buttonStyle={[styles.buttonStyle]}
        textStyle={[styles.buttonTextStyle]}
      />
      <Spacer height={sizes.doubleBaseMargin} />
    </MainWrapper>
  );
}

export default AuthHome;

const styles = StyleSheet.create({
  buttonStyle: {
    height: height(15),
    elevation:0,
  },
  buttonTextStyle: {
    ...appStyles.h6,
    ...appStyles.textWhite
  }
})