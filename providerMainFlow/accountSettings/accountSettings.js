import React, {useState} from 'react';
import {View, Text, Modal, StatusBar, ActivityIndicator} from 'react-native';
import {
  MainWrapper,
  Spacer,
  ButtonWithTextArrow,
  Wrapper,
  CardWrapper,
  TinyTitle,
  ButtonColored,
  ComponentWrapper,
  SmallText,
  RegularText,
  LargeText,
} from '../../../components';
import {sizes, appStyles, colors, ToastMessage} from '../../../themes';
import {routes} from '../../../services';
import Header from '../../../components/header/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pauseAccount,logOutUser } from '../../../services/backend/user';
import { totalSize } from 'react-native-dimension';
import { useSelector } from 'react-redux';
const AccountSettings = (props) => {
  const { navigate, goBack, replace } = props.navigation;
  const [loader, setLoader] = useState(false);
  const [isPauseAccountModalVisible, setIsPauseAccountModalVisible] = useState(false);
  const { userDetail } = useSelector(state => state.user);
  const pauseAccounHandle = async () => {
    try {
      const userType = JSON.parse(await AsyncStorage.getItem("userData"));
      console.log("userType =====> ", userType);
      setLoader(true);
      const data = {
        user_id: userType?.id,
      };
      pauseAccount(data).then((response) => {
        setLoader(false);
        setIsPauseAccountModalVisible(false);
        if (response?.success) {
          ToastMessage("Account Pause Successfully");
          AsyncStorage.removeItem('token');
          AsyncStorage.removeItem("userData");
          userLogOut()
          setIsPauseAccountModalVisible(!isPauseAccountModalVisible)
        } else {
          ToastMessage("Account Pause Failed");
        }
      })
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  const userLogOut = () => {
    // setLoader(true)
    const data={
      user_id:userDetail?.id
    };
      try {
        logOutUser(data).then(response => {
          console.log('userLogOut data22 =====> ', response);
          setLoader(false)
          if (response?.success) {
            setLoader(false)
            replace(routes.auth)
          }
        });
      } catch (error) {
          // console.log("ye chaal");
        ToastMessage(error.message);
        setLoader(false)
      }
    };
  
  const PauseAccountModal = () => {
    return (
      <Modal
        visible={isPauseAccountModalVisible}
        transparent
        // animationType="slide"
        >
        <Wrapper flex={1} style={{justifyContent: 'center'}}>
          <CardWrapper style={[{}, appStyles.shadowColored]}>
            <ComponentWrapper>
              <Spacer height={sizes.baseMargin} />
              <LargeText style={[appStyles.textPrimaryColor]}>
                Are You sure?
              </LargeText>
              <Spacer height={sizes.smallMargin} />
              <RegularText style={{color:"#000",opacity:0.5}}>
                Phasellus finibus enim nulla, quis ornare odio facilisis eu. Suspendisse ornare ante sit amet arcu semper, vel eleifend tortor egestas. 
              </RegularText>
              <Spacer height={sizes.smallMargin} />
            </ComponentWrapper>
            <Spacer height={sizes.baseMargin} />
            <ButtonColored
              text="No"
              onPress={() => setIsPauseAccountModalVisible(!isPauseAccountModalVisible)}
            />
            <Spacer height={sizes.baseMargin} />
            {loader ? (
              <View>
                <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
              </View>
            ) : (
              <ButtonColored
                text="Yes"
                buttonStyle={{backgroundColor: colors.alert}}
                onPress={pauseAccounHandle}
              />
            )}
            <Spacer height={sizes.baseMargin} />
          </CardWrapper>
        </Wrapper>
      </Modal>
    );
  };

  return (
    <MainWrapper>
      <StatusBar 
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
      />
      <Header 
        goBack={() => props.navigation.goBack()}
        heading={"Account Settings"}
        color={colors.appColor1} 
      />
      <Spacer height={sizes.baseMargin} />
      <ButtonWithTextArrow
        text="Pause Account"
        onPress={() => setIsPauseAccountModalVisible(!isPauseAccountModalVisible)}
      />
      <Spacer height={sizes.baseMargin} />
      <ButtonWithTextArrow
        text="Change Password"
        onPress={() => props.navigation.navigate(routes.provider.changePassword)}
      />
      <PauseAccountModal />
    </MainWrapper>
  );
}

export default AccountSettings;
