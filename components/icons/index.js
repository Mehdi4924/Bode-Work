import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Icon, Badge} from 'react-native-elements';
import {height, totalSize, width} from 'react-native-dimension';
import {colors, appStyles, sizes, fontFamily, appIcons} from '../../themes';
import * as Animatable from 'react-native-animatable';
import {SmallText} from '../text';
import {Wrapper} from '../wrappers';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const BackIcon = props => {
  const {style, onPress, size, color} = props;
  return (
    <Icon
      name="chevron-back-outline"
      type="ionicon"
      size={size ? size : totalSize(3)}
      //raised
      //reverse
      //reverseColor={colors.appTextColor6}
      color={color ? color : colors.appColor1}
      iconStyle={[
        {marginHorizontal: Platform.OS === 'ios' ? width(5) : null},
        style,
      ]}
      onPress={onPress}
    />
  );
};
export const CloseIcon = props => {
  const {style, onPress, size, color} = props;
  return (
    <Icon
      name="close"
      type="ionicon"
      size={size ? size : totalSize(3)}
      //raised
      //reverse
      //reverseColor={colors.appTextColor6}
      color={color ? color : colors.appColor1}
      iconStyle={[{}, style]}
      onPress={onPress}
    />
  );
};
export const BellIcon = props => {
  const {style, onPress, size, color, value} = props;
  return (
    <Wrapper style={[style]}>
      <Icon
        name="bell"
        type="material-community"
        size={size ? size : sizes.appIcons.large}
        //raised
        //reverse
        //reverseColor={colors.appTextColor6}
        color={color ? color : colors.appTextColor6}
        onPress={onPress}
      />
      {value ? (
        <Badge
          value={value}
          status="error"
          containerStyle={{position: 'absolute', top: 0, right: -7.5}}
        />
      ) : null}
    </Wrapper>
  );
};
export const ChatIcon = props => {
  const {style, onPress, size, color, value} = props;
  return (
    <Wrapper style={[style]}>
      <Icon
        name="chatbubbles"
        type="ionicon"
        size={size ? size : sizes.appIcons.large}
        //raised
        //reverse
        //reverseColor={colors.appTextColor6}
        color={color ? color : colors.appTextColor6}
        onPress={onPress}
      />
      {value ? (
        <Badge
          value={value}
          status="error"
          containerStyle={{position: 'absolute', top: 0, left: -5}}
        />
      ) : null}
    </Wrapper>
  );
};

export const IconButton = props => {
  const {style, onPress, iconSize, iconColor, iconName, iconType, buttonColor} =
    props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.IconButtonContainer,
        {backgroundColor: buttonColor ? buttonColor : colors.appColor1},
        style,
      ]}>
      <Icon
        name={iconName ? iconName : 'heart'}
        type={iconType ? iconType : 'material-community'}
        size={iconSize ? iconSize : totalSize(3)}
        color={iconColor ? iconColor : colors.appTextColor6}
      />
    </TouchableOpacity>
  );
};
export const MenuIcon = props => {
  const {style, onPress, color, size} = props;
  return (
    <Icon
      name="menu"
      type="entypo"
      size={size ? size : totalSize(2.5)}
      //raised
      // reverse
      // reverseColor={colors.appTextColor6}
      color={color ? color : colors.appTextColor3}
      appIconstyle={style}
      onPress={onPress}
    />
  );
};
export const FilterIcon = props => {
  const {style, onPress, color, size} = props;
  return (
    <Icon
      name="options"
      type="ionicon"
      size={size ? size : totalSize(2.5)}
      //raised
      // reverse
      // reverseColor={colors.appTextColor6}
      color={color ? color : colors.appTextColor3}
      appIconstyle={style}
      onPress={onPress}
    />
  );
};
export const CustomIcon = props => {
  const {
    icon,
    size,
    animation,
    duration,
    iterationCount,
    color,
    containerStyle,
  } = props;
  const defaulSize = totalSize(5);
  return (
    <Animatable.View
      animation={animation}
      duration={duration}
      iterationCount={iterationCount}
      style={containerStyle}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          height: size ? size : defaulSize,
          width: size ? size : defaulSize,
          tintColor: color,
        }}
      />
    </Animatable.View>
  );
};
export const CustomIconnewlogo = props => {
  const {
    icon,
    size,
    animation,
    duration,
    iterationCount,
    color,
    containerStyle,
  } = props;
  const defaulSize = totalSize(5);
  return (
    <Animatable.View
      animation={animation}
      duration={duration}
      iterationCount={iterationCount}
      style={containerStyle}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          height: size ? size : defaulSize,
          width: size ? size : defaulSize,
          tintColor: color,
          // backgroundColor:'red'
        }}
      />
      <View style={{alignSelf: 'center'}}>
        <Text
          style={{
            color: colors.black,
            fontFamily: fontFamily.appTextBold,
            fontSize: totalSize(4),
            marginTop: -35,
          }}>
          BodeWrk
        </Text>
      </View>
    </Animatable.View>
  );
};
export const CustomIconNew = props => {
  const {
    icon,
    size,
    animation,
    duration,
    iterationCount,
    color,
    containerStyle,
  } = props;
  const defaulSize = totalSize(5);
  return (
    <Animatable.View
      animation={animation}
      duration={duration}
      iterationCount={iterationCount}
      style={containerStyle}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          height: size ? size : defaulSize,
          width: size ? size : defaulSize,
          tintColor: color,
        }}
      />
    </Animatable.View>
  );
};

export const CustomIconIconNew = props => {
  const {
    icon,
    size,
    animation,
    duration,
    iterationCount,
    color,
    containerStyle,
  } = props;
  const defaulSize = totalSize(5);
  return (
    <Animatable.View
      animation={animation}
      duration={duration}
      iterationCount={iterationCount}
      style={containerStyle}>
      <Image
        source={{uri: icon}}
        resizeMode="contain"
        style={{
          height: size ? size : defaulSize,
          width: size ? size : defaulSize,
          tintColor: color,
        }}
      />
    </Animatable.View>
  );
};

export const TouchableCustomIcon = props => {
  const {icon, size, color, onPress} = props;
  const defaulSize = totalSize(5);
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          height: size ? size : defaulSize,
          width: size ? size : defaulSize,
          tintColor: color,
        }}
      />
    </TouchableOpacity>
  );
};

export const IconWithText = props => {
  const {
    text,
    containerStyle,
    title,
    customIcon,
    onPress,
    tintColor,
    iconName,
    iconType,
    iconSize,
    textStyle,
    titleStyle,
    direction,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[
        {flexDirection: direction ? direction : 'row', alignItems: 'center'},
        containerStyle,
      ]}>
      {customIcon ? (
        <CustomIcon
          icon={customIcon}
          size={iconSize ? iconSize : totalSize(2)}
          color={tintColor ? tintColor : colors.appColor1}
        />
      ) : (
        <Ionicons
          name={iconName ? iconName : 'email'}
          size={iconSize ? iconSize : totalSize(1.5)}
          color={tintColor ? tintColor : colors.appTextColor1}
        />
        // <Icon
        //   name={iconName ? iconName : 'email'}
        //   type={iconType ? iconType : 'material-community'}
        //   size={iconSize ? iconSize : totalSize(2)}
        //   color={tintColor ? tintColor : colors.appTextColor1}
        // />
      )}
      <View
        style={
          direction === 'column'
            ? {marginVertical: height(1.5)}
            : {marginHorizontal: width(2)}
        }>
        {title ? (
          <Text
            style={[
              appStyles.textRegular,
              {
                color: tintColor ? tintColor : colors.appTextColor1,
                fontFamily: FontFamily.appTextBold,
                marginBottom: 5,
              },
              titleStyle,
            ]}>
            {title}
          </Text>
        ) : null}
        <SmallText
          style={[
            {color: tintColor ? tintColor : colors.appTextColor1},
            textStyle,
          ]}>
          {text}
        </SmallText>
      </View>
    </TouchableOpacity>
  );
};
export const IconWithTextimage = props => {
  const {
    text,
    containerStyle,
    title,
    customIcon,
    onPress,
    tintColor,
    iconName,
    iconType,
    iconSize,
    textStyle,
    titleStyle,
    direction,
    text1
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[
        {flexDirection: direction ? direction : 'row', alignItems: 'center'},
        containerStyle,
      ]}>
         <SmallText
          style={[
            {color: tintColor ? tintColor : colors.appTextColor1},
            textStyle,
          ]}>
          {text1}
        </SmallText>
      {customIcon ? (
        <CustomIcon
          icon={customIcon}
          size={iconSize ? iconSize : totalSize(2)}
          color={tintColor ? tintColor : colors.appColor1}
        />
      ) : (
        <Image
          source={appIcons.star}
          resizeMode="cover"
          style={{
            height: 15,
            width: 15,
          }}
        />
        // <Icon
        //   name={iconName ? iconName : 'email'}
        //   type={iconType ? iconType : 'material-community'}
        //   size={iconSize ? iconSize : totalSize(2)}
        //   color={tintColor ? tintColor : colors.appTextColor1}
        // />
      )}
      <View
        style={
          direction === 'column'
            ? {marginVertical: height(1.5)}
            : {marginHorizontal: width(2)}
        }>
        {title ? (
          <Text
            style={[
              appStyles.textRegular,
              {
                color: tintColor ? tintColor : colors.appTextColor1,
                fontFamily: fontFamily.appTextBold,
                marginBottom: 5,
              },
              titleStyle,
            ]}>
            {title}
          </Text>
        ) : null}
        <SmallText
          style={[
            {color: tintColor ? tintColor : colors.appTextColor1},
            textStyle,
          ]}>
          {text}
        </SmallText>
      </View>
    </TouchableOpacity>
  );
};
export const SimpleText = props => {
  const {
    text,
    containerStyle,
    title,
    customIcon,
    onPress,
    tintColor,
    iconName,
    iconType,
    iconSize,
    textStyle,
    titleStyle,
    direction,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[
        {flexDirection: direction ? direction : 'row', alignItems: 'center'},
        containerStyle,
      ]}>
      <View
        style={
          direction === 'column'
            ? {marginVertical: height(1.5)}
            : {marginHorizontal: width(2)}
        }>
        {title ? (
          <Text
            style={[
              appStyles.textRegular,
              {
                color: tintColor ? tintColor : colors.appTextColor1,
                fontFamily: FontFamily.appTextBold,
                marginBottom: 5,
              },
              titleStyle,
            ]}>
            {title}
          </Text>
        ) : null}
        <SmallText
          style={[
            {color: tintColor ? tintColor : colors.appTextColor1},
            textStyle,
          ]}>
          {text}
        </SmallText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  IconButtonContainer: {
    height: totalSize(5),
    width: totalSize(5),
    backgroundColor: colors.appColor1,
    borderRadius: 100,
    ...appStyles.center,
    //...appStyles.shadow
  },
});
