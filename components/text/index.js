import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {totalSize} from 'react-native-dimension';
import {appStyles, colors, fontFamily} from '../../themes';
import {RowWrapperBasic} from '../wrappers';

// Title Texts
export const XXLTitle = props => {
  return (
    <Text style={[styles.xxlTitleStyle, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const XLTitle = props => {
  return (
    <Text style={[styles.xlTitleStyle, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const LargeTitle = props => {
  return (
    <Text style={[styles.largeTitleStyle, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const MediumTitle = props => {
  return (
    <Text
      style={[styles.mediumTitleStyle, props.style]}
      onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const SmallTitle = props => {
  return (
    <Text style={[styles.smallTitleStyle, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const  TinyTitle = props => {
  return (
    <Text style={[styles.tinyTitleStyle, props.style,]} onPress={props.onPress} >
      {props.children}
    </Text>
  );
};
// Normal Texts
export const LargeText = props => {
  return (
    <Text style={[styles.largeTextStyle, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const MediumText = props => {
  return (
    <Text style={[styles.mediumTextStyle, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const RegularText = props => {
  return (
    <Text
      numberOfLines={props.numberOfLines}
      style={[styles.regularTextStyle, props.style]}
      onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const SmallText = props => {
  return (
    <Text style={[styles.smallTextStyle, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const TinyText = props => {
  return (
    <Text style={[styles.tinyTextStyle, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export const InputTitle = props => {
  return (
    <Text style={[styles.inputTitleStyle, props.style]}>{props.children}</Text>
  );
};

export const TitleWithInfo = props => {
  const {
    containerStyle,
    titleStyle,
    infoStyle,
    title,
    info,
    onPressInfo,
  } = props;
  return (
    <RowWrapperBasic
      style={[{justifyContent: 'space-between'}, containerStyle]}>
      <SmallText style={[appStyles.textPrimaryColor, titleStyle]}>
        {title}
      </SmallText>
      <SmallText
        onPress={onPressInfo}
        style={[infoStyle, {marginHorizontal: totalSize(1)}]}>
        {info}
      </SmallText>
    </RowWrapperBasic>
  );
};

const styles = StyleSheet.create({
  xxlTitleStyle: {
    ...appStyles.h1,
  },
  xlTitleStyle: {
    ...appStyles.h2,
  },
  largeTitleStyle: {
    ...appStyles.h3,
  },
  mediumTitleStyle: {
    ...appStyles.h4,
  },
  smallTitleStyle: {
    ...appStyles.h5,
  },
  tinyTitleStyle: {
    ...appStyles.h6,
    fontFamily: fontFamily.appTextBold,
  },
  largeTextStyle: {
    ...appStyles.textLarge,
  },
  mediumTextStyle: {
    ...appStyles.textMedium,
  },
  regularTextStyle: {
    ...appStyles.textRegular,
  },
  smallTextStyle: {
    ...appStyles.textSmall,
  },
  tinyTextStyle: {
    ...appStyles.textTiny,
  },
  inputTitleStyle: {
    ...appStyles.textSmall,
    color: colors.appColor1,
  },
});
