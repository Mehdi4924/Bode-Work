import {StyleSheet} from 'react-native';
import {totalSize, height, width} from 'react-native-dimension';
import {colors, fontFamily, fontSize, sizes} from '..';

export const appStyles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    height: null,
    width: null,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.appBgColor1,
  },
  h1: {
    fontSize: fontSize.h1,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextBold,
  },
  h2: {
    fontSize: fontSize.h2,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextBold,
  },
  h3: {
    fontSize: fontSize.h3,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextBold,
  },
  h4: {
    fontSize: fontSize.h4,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextBold,
  },
  h5: {
    fontSize: fontSize.h5,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextMedium,
  },
  h6: {
    fontSize: fontSize.h6,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextMedium,
  },
  h7: {
    fontSize: fontSize.h7,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextMedium,
  },
  textLarge: {
    fontSize: fontSize.large,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextRegular,
  },
  textMedium: {
    fontSize: fontSize.medium,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextRegular,
  },
  textRegular: {
    fontSize: fontSize.regular,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextRegular,
  },
  textSmall: {
    fontSize: fontSize.small,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextRegular,
  },
  textTiny: {
    fontSize: fontSize.tiny,
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextRegular,
  },
  inputContainerUnderLined: {
    marginHorizontal: width(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFFF',
  },
  inputContainerBorderd: {
    marginHorizontal: width(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 0.5,
    borderColor: colors.appColor1,
    // backgroundColor:'red'
  },
  inputContainerHeighted: {
    marginHorizontal: width(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 0.5,
    borderColor: colors.appColor1,
    backgroundColor: colors.snow,
    height: totalSize(20),
  },
  inputContainerColored: {
    marginHorizontal: width(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFF',
    borderRadius: 2.5,
  },
  inputField: {
    height: height(7),
    //width: width(80),
    color: colors.appTextColor1,
    fontFamily: fontFamily.appTextLight,
    fontSize: totalSize(1.75),
  },
  inputFieldBorderd: {
    marginHorizontal: width(5),
    height: height(7),
    borderWidth: 0.5,
    borderColor: colors.appColor1,
    fontSize: totalSize(1.75),
    fontFamily: fontFamily.appTextRegular,
    borderRadius: 2.5,
  },
  inputFieldColored: {
    marginHorizontal: width(5),
    height: height(7),
    fontSize: totalSize(1.75),
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'black',
    shadowOpacity: 0.25,
    elevation: 5,
    backgroundColor: '#FFFF',
    borderRadius: 2.5,
  },

  buttonBorderd: {
    marginHorizontal: width(5),
    height: height(8),
    borderRadius: 2.5,
    borderWidth: 1,
    borderColor: colors.appColor1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonColord: {
    marginHorizontal: width(5),
    height: height(8),
    borderRadius: 2.5,
    backgroundColor: colors.appColor1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGradient: {
    paddingHorizontal: width(5),
    height: height(8),
    borderRadius: 2.5,
    backgroundColor: colors.appColor1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SocialButtonColord: {
    height: height(8),
    marginHorizontal: width(5),
    borderRadius: 2.5,
    backgroundColor: colors.facebook,
  },
  buttonText: {
    fontSize: totalSize(2),
    color: '#000000',
    fontFamily: fontFamily.appTextMedium,
  },
  compContainer: {
    marginHorizontal: width(5),
    marginVertical: height(2.5),
  },
  rowCompContainer: {
    marginHorizontal: width(5),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height(2.5),
  },
  headerStyle: {
    backgroundColor: colors.appBgColor1,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: null,
    shadowOpacity: 0,
    height: sizes.headerHeight,
    borderBottomWidth: 0,
  },
  materialHeaderStyle: {
    backgroundColor: colors.appColor1,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: null,
    shadowOpacity: 0,
    height: sizes.headerHeight,
    borderBottomWidth: 0,
    //borderTopRightRadius:sizes.wrapperRadius
  },
  headerTitleStyle: {
    fontSize: totalSize(2),
    color: colors.appColor1,
    fontFamily: fontFamily.appTextBold,
    marginBottom:height(0.4)
  },
  materialHeaderTitleStyle: {
    fontSize: totalSize(2),
    color: colors.appTextColor6,
    fontFamily: fontFamily.appTextBold,
  },
  cardView: {
    marginHorizontal: width(5),
    borderRadius: 5,
    backgroundColor: colors.appTextColor6,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,

    elevation: 6,
  },
  shadow: {
    shadowColor: colors.appColor1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  shadowColored: {
    shadowColor: colors.appColor1,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.5,
    shadowRadius: 9.51,
    elevation: 15,
  },
  tabBarStyle: {
    backgroundColor: colors.appColor1,
    height: sizes.tabBarHeight,
    // borderTopRightRadius: 35,
    // borderTopLeftRadius: 35,
    borderTopWidth: 0,
    elevation: 0,
    paddingHorizontal: width(7),
  },
  textCenter: {
    textAlign: 'center',
  },
  textGray: {
    color: colors.appTextColor4,
  },
  textLightGray: {
    color: colors.appTextColor5,
  },
  textPrimaryColor: {
    color: colors.appColor1,
  },
  textWhite: {
    color: colors.appTextColor6,
  },
  textBlack: {
    color: "#000",
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  textBold: {
    fontFamily: fontFamily.appTextMedium,
  },
  stylesTopTabBarStyle: {
    backgroundColor: colors.appColor1,
  },
  colorCode: {
    width: totalSize(3.8),
    height: totalSize(3.8),
    borderRadius: totalSize(3.8) / 2,
  },
  selectedColorCode: {
    width: totalSize(4.5),
    height: totalSize(4.5),
    borderRadius: totalSize(4.5) / 2,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
