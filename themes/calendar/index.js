const {totalSize} = require('react-native-dimension');
const {fontFamily, colors} = require('..');

const calendar = {
  primaryTheme: {
    backgroundColor: 'transparent',
    calendarBackground: 'transparent',
    textSectionTitleColor: colors.appColor1,
    selectedDayBackgroundColor: colors.appColor1,
    selectedDayTextColor: colors.appTextColor4,
    todayTextColor: colors.appColor1,
    dayTextColor: colors.appTextColor4,
    textDisabledColor: colors.appTextColor5,
    dotColor: colors.appColor1,
    selectedDotColor: colors.appColor1,
    arrowColor: colors.appTextColor1,
    disabledArrowColor: '#d9e1e8',
    monthTextColor: colors.appTextColor1,
    indicatorColor: colors.appTextColor1,
    textDayFontFamily: fontFamily.appTextRegular,
    textMonthFontFamily: fontFamily.appTextRegular,
    textDayHeaderFontFamily: fontFamily.appTextRegular,
    //textDayFontWeight: '300',
    //textMonthFontWeight: 'bold',
    //textDayHeaderFontWeight: '300',
    textDayFontSize: totalSize(1.5),
    textMonthFontSize: totalSize(1.5),
    textDayHeaderFontSize: totalSize(1.5),
  },
};

export default calendar;
