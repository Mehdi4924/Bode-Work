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
import {colors, appStyles, sizes} from '../../themes';
import * as Animatable from 'react-native-animatable';

export const MainWrapper = props => {
  const {children, style, animation} = props;
  return (
    <Animatable.View
      animation={animation}
      style={[appStyles.mainContainer, style]}>
      {children}
    </Animatable.View>
  );
};
export const MainWrapperMatrial = props => {
  const {children, style, animation, primaryColor, secondryColor,style2, flex} = props;
  const defaultWrapperRadius = sizes.wrapperRadius;
  return (
    <Animatable.View
      animation={animation}
      style={[
        appStyles.mainContainer,
        {
          flex: flex ? flex : 1,
          backgroundColor: primaryColor ? primaryColor : colors.appColor1,
        },
        style,
      ]}>
      <View
        style={[
          appStyles.mainContainer,
          {
            backgroundColor: secondryColor ? secondryColor : colors.appBgColor1,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          },
          style2,
        ]}>
        {children}
      </View>
    </Animatable.View>
  );
};
export const Wrapper = props => {
  const {children, style, animation, flex, marginVertical} = props;
  return (
    <Animatable.View animation={animation} style={[{flex: flex,marginBottom:marginVertical}, style]}>
      {children}
    </Animatable.View>
  );
};
export const ComponentWrapper = props => {
  const {children, style, animation} = props;
  return (
    <Animatable.View
      animation={animation}
      style={[appStyles.compContainer, styles.removerMarginVertical, style]}>
      {children}
    </Animatable.View>
  );
};

export const RowWrapper = props => {
  const {children, style, animation} = props;
  return (
    <Animatable.View
      animation={animation}
      style={[appStyles.rowCompContainer, styles.removerMarginVertical, style]}>
      {children}
    </Animatable.View>
  );
};
export const RowWrapperBasic = props => {
  const {children, style, animation} = props;
  return (
    <Animatable.View animation={animation} style={[appStyles.rowView, style]}>
      {children}
    </Animatable.View>
  );
};
export const CardWrapper = props => {
  const {children, style, animation} = props;
  return (
    <Animatable.View
      animation={animation}
      style={[appStyles.cardView, {borderRadius: sizes.cardRadius}, style]}>
      {children}
    </Animatable.View>
  );
};
export const AbsoluteWrapper = props => {
  const {children, style, animation} = props;
  return (
    <Animatable.View
      animation={animation}
      style={[{position: 'absolute'}, style]}>
      {children}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  removerMarginVertical: {
    marginVertical: null,
  },
});
