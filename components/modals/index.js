import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {height, totalSize, width} from 'react-native-dimension';
import {colors, sizes, fontSize, appStyles} from '../../themes';
import Modal from 'react-native-modal';
import {Wrapper, ComponentWrapper} from '../wrappers';
import {Spacer} from '../spacers';
import {IconWithText,SimpleText} from '../icons';

export const ModalColored = props => {
  const {containerstyle, isVisible, title,title2, content, toggleModal, modalHeight,style} = props;
  return (
    <Modal
    
      isVisible={isVisible}
      style={[styles.modelStyle,style]}
      onBackdropPress={toggleModal}
      statusBarTranslucent
      // swipeDirection="down"
      // onSwipeComplete={toggleModal}
    >
      <Wrapper flex={1}>
        <Wrapper flex={modalHeight === undefined ? 2 : modalHeight} />
        <Wrapper
          flex={8}
          style={[styles.ModalColoredContainer, containerstyle]}>
          {title !== undefined && <Spacer height={sizes.baseMargin} /> }
          <ComponentWrapper>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
              {title !== undefined &&
                <IconWithText
                  text={title}
                  iconName="ios-chevron-back"
                  iconType="ionicon"
                  tintColor={colors.appTextColor6}
                  iconSize={sizes.appIcons.large}
                  textStyle={[appStyles.h6, appStyles.textWhite]}
                  onPress={toggleModal}
                />
              }
            <SimpleText
              text={title2}
              // iconName="ios-chevron-back"
              // iconType="ionicon"
              // tintColor={colors.appTextColor6}
              // iconSize={sizes.appIcons.large}
              textStyle={[appStyles.h6, appStyles.textWhite]}
              onPress={toggleModal}
            />
            </View>
            
          </ComponentWrapper>
          <Spacer height={sizes.baseMargin} />
          {content}
          <Spacer height={sizes.baseMargin} />
        </Wrapper>
      </Wrapper>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ModalColoredContainer: {
    backgroundColor: colors.appColor1,
    borderTopRightRadius: sizes.modalRadius,
    borderTopLeftRadius: sizes.modalRadius,
  },
  modelStyle:{margin: 0, justifyContent: 'flex-end',blurRadius:1}
});
