import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ViewPropTypes,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {height, totalSize, width} from 'react-native-dimension';
import {colors, sizes, appStyles} from '../../themes';
import {IconWithText} from '../icons';

export const CheckBoxPrimary = props => {
  const {textStyle, containerStyle, text, checked, onPress, iconSize} = props;
  // const checkedIconName = 'ios-checkmark-circle-sharp';
  const checkedIconName = 'checkmark';
  const uncheckedIconName = 'ios-checkmark-circle-outline';
  const checkboxIconType = 'ionicon';
  const checkboxappIconsize = sizes.appIcons.medium;
  const checkIconColor = colors.appColor1;
  const uncheckIconColor = colors.appTextColor5;
  return (
    <IconWithText
      text={text}
      iconName={checked ? checkedIconName : uncheckedIconName}
      iconType={checkboxIconType}
      iconSize={iconSize ? iconSize : checkboxappIconsize}
      tintColor={checked ? checkIconColor : uncheckIconColor}
      onPress={onPress}
      textStyle={[styles.checkboxText, textStyle]}
      containerStyle={containerStyle}
    />
  );
};

const styles = StyleSheet.create({
  checkboxText: {
    ...appStyles.textRegular,
    // ...appStyles.textGray
  },
});
