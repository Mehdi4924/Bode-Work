import React, {useState} from 'react';
import {View, Text, Modal, StatusBar} from 'react-native';
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
import {sizes, appStyles, colors} from '../../../themes';
import {routes} from '../../../services';
import Header from '../../../components/header/header';

const AccountSettings = (props) => {
  const [isPauseAccountModalVisible, setIsPauseAccountModalVisible] = useState(false);
  
  const PauseAccountModal = () => {
    return (
      <Modal
        visible={isPauseAccountModalVisible}
        transparent
        animationType="slide">
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
            <ButtonColored
              text="Yes"
              buttonStyle={{backgroundColor: colors.alert}}
              onPress={() => setIsPauseAccountModalVisible(!isPauseAccountModalVisible)}
            />
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
