import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { appStyles, colors, fontFamily } from '../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { height, totalSize, width } from 'react-native-dimension';
const CalendarTheme = {
  // backgroundColor: 'red',
  // calendarBackground: 'pink',
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
};
export default function Calender(props) {
  const d = new Date();
  const c = d.toISOString().split('T');
  const b = d.setDate(d.getDate() + 7);
  const dateCheck = new Date(b).toISOString();

  const [initalDate, setInitalDate] = useState(c[0]);
  const [selectedDate, setSelectedDate] = useState();
  console.log("component m select date",selectedDate);
  function renderCustomHeader(date) {
    const header = date.toString('MMMM yyyy');
    const [month, year] = header.split(' ');
    const textStyle = {
      fontSize: 18,
      fontWeight: 'bold',
      paddingTop: 10,
      paddingBottom: 10,
      color: '#fff',
      paddingRight: 5,
    };
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 10,
          backgroundColor: colors.appColor1,
          paddingHorizontal: 14,
          borderRadius: 25,
        }}>
           <TouchableOpacity
          onPress={() => {
            const a = initalDate.split('-');
            const x = Number(a[1]);
            const y = x - 1;
            a[1] = y > 9 ? `${y}` : `0${y}`;
            setInitalDate(a.join('-'));
          }}>
        
            
          <Ionicons
            name="caret-back-outline"
            size={totalSize(2)}
            color="#fff"
          />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={[
              {
                marginLeft: 5,
              },
              textStyle,
            ]}>{`${month}`}</Text>
          <Text
            style={[
              {
                marginRight: 5,
              },
              textStyle,
            ]}>
            {year}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            const a = initalDate.split('-');
            const x = Number(a[1]);
            const y = x + 1;
            a[1] = y > 9 ? `${y}` : `0${y}`;
            setInitalDate(a.join('-'));
          }}>
          <Ionicons name="caret-forward" size={totalSize(2)} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <Calendar
        enableSwipeMonths={true}
        style={[styles.calendar, { height: 350 }]}
        renderHeader={renderCustomHeader}
        hideArrows={true}
        initialDate={initalDate}
        theme={CalendarTheme}
        dayComponent={({ date, state }) => {
          console.log(date,'date chekc is');
          return (
            <TouchableOpacity
              onPress={() =>
                date.dateString >= c[0] && date.dateString <= dateCheck.split("T")[0] ?
                  state.date != 'disabled'
                    ? [props.onDatePress(date),setSelectedDate(date)]
                    : null : null
              }>
              <Text
                style={{
                  textAlign: 'center',
                  borderRadius: 20,
                  width: 30,
                  padding: 5,
                  backgroundColor:
                    selectedDate?.dateString == date.dateString
                      ? colors.appColor1
                      : 'F2F2F2',
                  color: date.dateString >= c[0] && date.dateString <= dateCheck.split("T")[0] ? date.dateString === selectedDate ? 'green' : 'gray' : "lightgray",
                }}>
                {date.day}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
