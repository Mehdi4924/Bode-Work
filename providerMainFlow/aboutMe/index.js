import React, {useEffect, useState} from 'react';
import {View, StatusBar, ActivityIndicator} from 'react-native';
import {
  MainWrapper,
  KeyboardAvoidingScrollView,
  TextInputBordered,
  ButtonColored,
  Spacer,
} from '../../../components';
import {height, totalSize} from 'react-native-dimension';
import {colors, sizes, ToastMessage} from '../../../themes';
import Header from '../../../components/header/header';
import { addAbout, showAbout, updateAbout } from '../../../services/backend/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AboutMe = (props) => {
  const [loader, setLoader] = useState(false);
  const [bio, setBio] = useState(null);

  useEffect(() => {
    showAboutHandle();
  }, []);
  const showAboutHandle = async () => {
    try {
      const userType = JSON.parse(await AsyncStorage.getItem("userData"));
      const data = {
        user_id: userType?.id,
      };
      showAbout(data).then((response) => {
        console.log("response?.data ======> ", response);
        if (response?.success) {
          console.log("response?.data ======> ", response?.data);
          if (response?.data !== null) {
            setBio(response?.data?.description);
          }
        }
      })
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  const addAboutHandle = async () => {
    try {
      const userType = JSON.parse(await AsyncStorage.getItem("userData"));
      console.log("userType =====> ", userType?.id);
      setLoader(true);
      const data = {
        user_id: userType?.id,
        description: bio,
      };
      addAbout(data).then((response) => {
        setLoader(false);
        if (response?.success) {
          setBio(response?.data?.description);
          ToastMessage("About Add Successfully");
        } else {
          ToastMessage("About Add Failed");
        }
      })
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  const updateAboutHandle = async () => {
    try {
      const userType = JSON.parse(await AsyncStorage.getItem("userData"));
      console.log("userType =====> ", userType?.id);
      setLoader(true);
      const data = {
        user_id: userType?.id,
        description: bio,
      };
      updateAbout(data).then((response) => {
        setLoader(false);
        if (response?.success) {
          setBio(response?.data?.description);
          ToastMessage("About Updated Successfully");
          props.navigation.goBack()
        } else {
          ToastMessage("About Updated Failed");
        }
      })
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  const saveHandle = () => {
    if (bio === null) {
      addAboutHandle();
    } else {
      updateAboutHandle();
    }
  };

  return (
    <MainWrapper>
      <StatusBar 
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
      />
      <Header 
        goBack={() => props.navigation.goBack()}
        heading={"About Me"}
        color={colors.appColor1} 
      />
      <Spacer height={sizes.baseMargin} />
      <KeyboardAvoidingScrollView>
        <TextInputBordered
          title="This is what your client see about you"
          onChangeText={text => setBio(text)}
          value={bio}
          multiline
          titleStyle={{color:"#000"}}
          inputStyle={[{height: height(30), textAlignVertical: 'top'}]}
        />
      </KeyboardAvoidingScrollView>
      <Spacer height={sizes.baseMargin} />
      {loader ? (
        <View>
          <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
        </View>
      ) : (
        <ButtonColored
          text="Save"
          buttonStyle={{marginBottom:height(2)}}
          onPress={saveHandle}
        />
      )}
      <Spacer height={sizes.baseMargin} />
    </MainWrapper>
  );
}

export default AboutMe;
