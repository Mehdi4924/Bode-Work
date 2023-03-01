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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {height, totalSize, width} from 'react-native-dimension';
import {colors, appStyles, fontSize, sizes} from '../../themes';
import {SmallText, RegularText, MediumText} from '../text';
import {RowWrapper} from '../wrappers';
import {CustomIcon} from '../icons';
import LinearGradient from 'react-native-linear-gradient';

export const ButtonColored = props => {
  const {
    text,
    onPress,
    buttonStyle,
    textStyle,
    iconName,
    iconType,
    appIconsize,
    iconColor,
    appIconstyle,
    tintColor,
    disabled,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        appStyles.buttonColord,
        {
          marginHorizontal: width(5),
          borderRadius: 15,
          height: height(7),
        },
        appStyles.shadow,
        buttonStyle,
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {iconName ? (
          <Icon
            name={iconName ? iconName : 'email-outline'}
            type={iconType ? iconType : 'material-community'}
            size={appIconsize ? appIconsize : totalSize(3)}
            color={tintColor ? tintColor : colors.appTextColor6}
            appIconstyle={[{marginRight: width(2.5)}, appIconstyle]}
          />
        ) : null}
        <Text
          style={[
            appStyles.buttonText,
            {
              color: tintColor ? tintColor : colors.appTextColor6,
              fontSize: fontSize.medium,
            },
            textStyle,
          ]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export const ButtonColoredss = props => {
  const {
    text,
    onPress,
    buttonStyle,
    textStyle,
    iconName,
    iconType,
    appIconsize,
    iconColor,
    appIconstyle,
    tintColor,
    disabled,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        appStyles.buttonColord,
        {
          marginHorizontal: width(5),
          borderRadius: sizes.buttonRadius,
          height: height(7),
        },
        
        buttonStyle,
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {iconName ? (
          <Icon
            name={iconName ? iconName : 'email-outline'}
            type={iconType ? iconType : 'material-community'}
            size={appIconsize ? appIconsize : totalSize(3)}
            color={tintColor ? tintColor : colors.appTextColor6}
            appIconstyle={[{marginRight: width(2.5)}, appIconstyle]}
          />
        ) : null}
        <Text
          style={[
            appStyles.buttonText,
            {
              color: tintColor ? tintColor : colors.appTextColor6,
              fontSize: fontSize.medium,
            },
            textStyle,
          ]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export const ButtonGradient = props => {
  const {
    text,
    onPress,
    buttonStyle,
    textStyle,
    iconName,
    iconType,
    appIconsize,
    iconColor,
    appIconstyle,
    tintColor,
    disabled,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      // style={[
      //   appStyles.buttonColord,
      //   {
      //     marginHorizontal: width(5),
      //     borderRadius: sizes.buttonRadius,
      //     height: height(7),
      //   },
        
      //   buttonStyle,
      // ]}
      >
        <LinearGradient colors={['#01CED1', '#14B1E4', '#2992FB']} style={[
        appStyles.buttonGradient,
        {
          
          borderRadius: sizes.buttonRadius,
          height: height(7),
        },
        
        buttonStyle,
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {iconName ? (
          <Icon
            name={iconName ? iconName : 'email-outline'}
            type={iconType ? iconType : 'material-community'}
            size={appIconsize ? appIconsize : totalSize(3)}
            color={tintColor ? tintColor : colors.appTextColor6}
            appIconstyle={[{marginRight: width(2.5)}, appIconstyle]}
          />
        ) : null}
        <Text
          style={[
            appStyles.buttonText,
            {
              color: tintColor ? tintColor : colors.appTextColor6,
              fontSize: fontSize.medium,
            },
            textStyle,
          ]}>
          {text}
        </Text>
      </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const ButtonColoredSmall = props => {
  const {
    text,
    onPress,
    buttonStyle,
    customIcon,
    direction,
    textStyle,
    iconName,
    iconType,
    appIconsize,
    iconColor,
    appIconstyle,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          borderRadius: sizes.smallButtonRadius,
          paddingHorizontal: width(5),
          paddingVertical: height(1.25),
          backgroundColor: colors.appColor1,
        },
        buttonStyle,
      ]}>
      <View
        style={{
          flexDirection: direction ? direction : 'row',
          alignItems: 'center',
        }}>
        {customIcon ? (
          <CustomIcon
            icon={customIcon}
            size={appIconsize ? appIconsize : totalSize(2)}
            color={iconColor ? iconColor : colors.appTextColor6}
            containerStyle={[{}, appIconstyle]}
          />
        ) : iconName ? (
          <Icon
            name={iconName ? iconName : 'email-outline'}
            type={iconType ? iconType : 'material-community'}
            size={appIconsize ? appIconsize : totalSize(2)}
            color={iconColor ? iconColor : colors.appTextColor6}
            iconStyle={[{}, appIconstyle]}
          />
        ) : null}
        <SmallText style={[{color: colors.appTextColor6}, textStyle]}>
          {' '}
          {text}{' '}
        </SmallText>
      </View>
    </TouchableOpacity>
  );
};

export const ButtonBordered = props => {
  const {
    text,
    onPress,
    buttonStyle,
    textStyle,
    direction,
    iconName,
    iconType,
    iconSize,
    iconColor,
    appIconstyle,
    tintColor,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        appStyles.buttonBorderd,
        {
          borderRadius: sizes.buttonRadius,
          height: height(7),
          borderColor: tintColor ? tintColor : colors.appColor1,
        },
        buttonStyle,
      ]}>
      <View
        style={{
          flexDirection: direction ? direction : 'row',
          alignItems: 'center',
        }}>
        {iconName ? (
          <Icon
            name={iconName ? iconName : 'email-outline'}
            type={iconType ? iconType : 'material-community'}
            size={iconSize ? iconSize : totalSize(3)}
            color={tintColor ? tintColor : colors.appColor1}
            iconStyle={[{marginRight: width(2.5)}, appIconstyle]}
          />
        ) : null}
        <Text
          style={[
            appStyles.buttonText,
            {
              color: tintColor ? tintColor : colors.appColor1,
              fontSize: fontSize.regular,
            },
            textStyle,
          ]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const ButtonBorderedSmall = props => {
  const {
    text,
    onPress,
    buttonStyle,
    rowReverse,
    textStyle,
    iconName,
    iconType,
    appIconsize,
    iconColor,
    appIconstyle,
    tintColor,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          borderRadius: sizes.smallButtonRadius,
          paddingHorizontal: width(5),
          paddingVertical: height(1.25),
          borderColor: tintColor ? tintColor : colors.appColor1,
          borderWidth: 1,
        },
        buttonStyle,
      ]}>
      <View
        style={{
          flexDirection: rowReverse ? 'row-reverse' : 'row',
          alignItems: 'center',
        }}>
        {iconName ? (
          <Icon
            name={iconName ? iconName : 'email-outline'}
            type={iconType ? iconType : 'material-community'}
            size={appIconsize ? appIconsize : totalSize(2)}
            color={tintColor ? tintColor : colors.appColor1}
            appIconstyle={[{marginHorizontal: width(2)}, appIconstyle]}
          />
        ) : null}
        <SmallText
          style={[
            {color: tintColor ? tintColor : colors.appColor1},
            textStyle,
          ]}>
          {' '}
          {text}{' '}
        </SmallText>
      </View>
    </TouchableOpacity>
  );
};

export const ButtonWithTextArrow = props => {
  const {
    text,
    onPress,
    buttonStyle,
    textStyle,
    iconName,
    iconType,
    iconSize,
    iconStyle,
    tintColor,
    style
  } = props;
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <RowWrapper style={[buttonStyle]}>
        <MediumText
          style={[
            {color: tintColor ? tintColor : colors.appTextColor1},
            textStyle,
          ]}>
          {text}
        </MediumText>
        <Ionicons
                name={iconName ? iconName : 'chevron-forward'}
                size={iconSize ? iconSize : totalSize(3)}
                color={tintColor ? tintColor : colors.appTextColor1}
              />
        {/* <Icon
          name={iconName ? iconName : 'chevron-right'}
          type={iconType ? iconType : 'material'}
          size={iconSize ? iconSize : totalSize(3)}
          color={tintColor ? tintColor : colors.appTextColor1}
          iconStyle={[{}, iconStyle]}
        /> */}
      </RowWrapper>
    </TouchableOpacity>
  );
};
