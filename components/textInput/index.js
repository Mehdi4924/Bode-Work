import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  AbsoluteWrapper
} from 'react-native';
import {Icon} from 'react-native-elements';
import {height, totalSize, width} from 'react-native-dimension';
import {colors, appStyles, sizes, fontFamily} from '../../themes';
import {InputTitle, RegularText} from '../text';
import {ComponentWrapper} from '../wrappers';
import {Spacer} from '../spacers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import TextInputBordered from './textInputBordered'
import * as Animatable from 'react-native-animatable';
const TextInputColored = props => {
  var focused = false;
  const {
    iconName,
    iconType,
    onPress,
    title,
    isButton,
    titleStyle,
    placeholder,
    editable,
    animation,
    multiline,
    onFocus,
    onBlur,
    onChangeText,
    secureTextEntry,
    value,
    iconColor,
    iconSize,
    containerStyle,
    inputContainerStyle,
    onPressIcon,
    inputStyle,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[containerStyle]}>
      {title ? (
        <ComponentWrapper>
          <InputTitle style={[titleStyle]}>{title}</InputTitle>
          <Spacer height={sizes.smallMargin} />
        </ComponentWrapper>
      ) : null}
      <Animatable.View
        animation={animation ? animation : 'fadeInUp'}
        style={[
          appStyles.inputContainerColored,
          {
            borderRadius: sizes.inputRadius,
            backgroundColor: colors.inputBgColor1,
          },
          inputContainerStyle,
        ]}>
        <View style={{flex: 8}}>
          {isButton ? (
            <ComponentWrapper>
              <Spacer height={sizes.baseMargin} />
              <RegularText style={value ? null : appStyles.textGray}>
                {value ? value : placeholder}
              </RegularText>
              <Spacer height={sizes.baseMargin} />
            </ComponentWrapper>
          ) : (
            <TextInput
              onChangeText={onChangeText}
              value={value}
              placeholder={placeholder}
              editable={editable}
              multiline={multiline}
              placeholderTextColor={'#21212180'}
              onFocus={(() => (focused = true), onFocus)}
              onBlur={(() => (focused = false), onBlur)}
              secureTextEntry={secureTextEntry}
              style={[
                appStyles.inputField,
                {width: null, height: height(7), paddingHorizontal: width(5)},
                inputStyle,
              ]}
            />
          )}
        </View>
        {iconName ? (
          <View style={{flex: 2, alignItems: 'center'}}>
            <Icon
              name={iconName}
              type={iconType}
              size={iconSize ? iconSize : sizes.icons.medium}
              color={iconColor ? iconColor : colors.appTextColor5}
              iconStyle={{}}
              onPress={onPressIcon}
            />
          </View>
        ) : null}
      </Animatable.View>
    </TouchableOpacity>
  );
};

const TextInputBordered = props => {
  var focused = false;
  const {
    iconName,
    iconType,
    onPress,
    keyboardType,
    title,
    isButton,
    titleStyle,
    placeholder,
    editable,
    animation,
    multiline,
    onFocus,
    onBlur,
    onChangeText,
    secureTextEntry,
    value,
    iconColor,
    iconSize,
    containerStyle,
    inputContainerStyle,
    onPressIcon,
    inputStyle,
    right,
    iconStyle,
    componentWrapperStyle,
    maxLength,
    placeholderTextColor
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[containerStyle]}>
      {title ? (
        <ComponentWrapper style={componentWrapperStyle}>
          <InputTitle style={[titleStyle,{marginLeft: width(2.5),fontFamily:fontFamily.gothicBold}]}>
            {title}
          </InputTitle>
          <Spacer height={sizes.TinyMargin} />
        </ComponentWrapper>
      ) : null}
      <Animatable.View
        // animation={animation ? animation : 'fadeInUp'}
        style={[
          appStyles.inputContainerBorderd,
          {
            borderRadius: 12,
            borderWidth: 1,
          },
          inputContainerStyle,
        ]}>
        <View style={{flex: 8}}>
          {isButton ? (
            <ComponentWrapper>
              <Spacer height={sizes.baseMargin} />
              <RegularText style={[value ? null : appStyles.textGray,{marginLeft:-6}]}>
                {value ? value : placeholder}
              </RegularText>
              <Spacer height={sizes.baseMargin} />
            </ComponentWrapper>
          ) : (
            <TextInput
              maxLength={maxLength}
              onChangeText={onChangeText}
              value={value}
              placeholder={placeholder}
              editable={editable}
              keyboardType={keyboardType}
              multiline={multiline}
              placeholderTextColor={"grey"}
              onFocus={ onFocus}
              onBlur={ onBlur}
              secureTextEntry={secureTextEntry}
              style={[
                appStyles.inputField,
                {width: null, height: height(6), paddingHorizontal: width(2.8)},
                inputStyle,
              ]}
            />
          )}
        </View>
        {right ? (
          right
        ) : iconName ? (
          <View style={{flex: 1, alignItems: 'center'}}>
            <FontAwesome
              name={iconName}
              size={iconSize ? iconSize : sizes.appIcons.medium}
              color={iconColor ? iconColor : colors.appTextColor5}
              iconStyle={iconStyle}
              onPress={onPressIcon}
            />
          </View>
        ) : null}
      </Animatable.View>
    </TouchableOpacity>
  );
};

const TextInputSimple = props => {
  var focused = false;
  const {
    iconName,
    iconType,
    onPress,
    keyboardType,
    title,
    isButton,
    titleStyle,
    placeholder,
    editable,
    animation,
    multiline,
    onFocus,
    onBlur,
    onChangeText,
    secureTextEntry,
    value,
    iconColor,
    iconSize,
    containerStyle,
    inputContainerStyle,
    onPressIcon,
    inputStyle,
    right,
    iconStyle,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[containerStyle]}>
      {/* {title ? (
        <ComponentWrapper style={{}}>
          <InputTitle style={[{marginLeft: width(2.5)}, titleStyle]}>
            {title}
          </InputTitle>
          <Spacer height={sizes.TinyMargin} />
        </ComponentWrapper>
      ) : null} */}
      <View
        style={[
          appStyles.inputContainerHeighted,
          {
            borderRadius: sizes.inputRadius,
            borderWidth: 1,
          },
          inputContainerStyle,
        ]}>
        <View style={{flex: 1}}>
          {/* {isButton ? (
            <ComponentWrapper>
              <Spacer height={sizes.baseMargin} />
              <RegularText style={value ? null : appStyles.textGray}>
                {value ? value : placeholder}
              </RegularText>
              <Spacer height={sizes.baseMargin} />
            </ComponentWrapper>
          ) : ( */}
          <TextInput
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            editable={editable}
            keyboardType={keyboardType}
            multiline={multiline}
            placeholderTextColor={'#21212180'}
            onFocus={(() => (focused = true), onFocus)}
            onBlur={(() => (focused = false), onBlur)}
            secureTextEntry={secureTextEntry}
            style={[
              appStyles.inputField,
              {width: null, height: height(6), paddingHorizontal: width(5)},
              inputStyle,
            ]}
          />
          {/* )} */}
        </View>
        {/* {right ? (
          right
        ) : iconName ? (
          <View style={{flex: 2, alignItems: 'center'}}>
            <Icon
              name={iconName}
              type={iconType}
              size={iconSize ? iconSize : sizes.appIcons.medium}
              color={iconColor ? iconColor : colors.appTextColor5}
              iconStyle={iconStyle}
              onPress={onPressIcon}
            />
          </View>
        ) : null} */}
      </View>
    </TouchableOpacity>
  );
};

const TextInputChat = props => {
  const {onChangeText, onSend,value} = props;
  return (
  //   <View style={{position: 'relative', marginTop: totalSize(3)}}>
  //   <TextInputBordered
  //     placeholder={'Search for services'}
  //     placeholderTextColor={'#21212180'}
  //     inputStyle={{color:"grey",fontFamily:fontFamily.appTextRegular}}
  //     onChangeText={onChangeText}
  //     onPressIcon={onSend}
  //     value={value}
  //   />
  //   <AbsoluteWrapper style={{right: totalSize(4), top: totalSize(1.4)}}>
  //     <AntDesign
  //       name="search1"
  //       size={totalSize(2.5)}
  //       color={colors.appColor1}
  //     />
  //   </AbsoluteWrapper>
  // </View>
    <TextInputBordered
      placeholder="Write a message"
      placeholderTextColor={'grey'}
      iconName="send"
      multiline
      iconColor={colors.appColor1}
      inputStyle={{
        height: null,
        // backgroundColor: 'red',
        marginBottom:height(0.3),
        paddingVertical: Platform.OS === 'ios' ? height(2) : null,
      }}
      inputContainerStyle={[
        {alignItems: "center", marginVertical: height(2)},
      ]}
      iconStyle={{marginVertical: height(5),backgroundColor:'green'}}
      value={value}
      onChangeText={onChangeText}
      onPressIcon={onSend}
    />
  );
};

export {TextInputColored, TextInputBordered, TextInputChat, TextInputSimple};
