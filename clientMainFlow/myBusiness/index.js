import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, FlatList,View,Text, ActivityIndicator, StatusBar} from 'react-native';
import {
  Spacer,
  ComponentWrapper,
  SmallTitle,
  RowWrapper,
  Wrapper,
  RegularText,
  LargeTitle,
  TitleWithInfo,
  StylerReviewCard,
  ProviderReviewCard,
  KeyboardAvoidingScrollView,
  StylistQualifierCard,
  RowWrapperBasic,
  MainWrapperMatrial,
} from '../../../components';
import {sizes, appStyles, colors, appImages} from '../../../themes';
import {ButtonGroup} from 'react-native-elements';
import {width, height} from 'react-native-dimension';
import {LineChart, YAxis, Grid, XAxis, BarChart} from 'react-native-svg-charts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getData, saveData} from '../../../backend/firebase/utility';
import moment from 'moment';
import MianHeader from '../../../components/header/mainHeader';

const Reviews = [
  {
    imageUrl: appImages.user3,
    name: 'Jackob Black',
    rating: '4.5',
    service: 'Hair Cut',
    comment:
      'Maecenas interdum lorem eleifend orci aliquam mollis. Aliquam non rhoncus magna. Suspendisse aliquet tincidunt enim, ut commodo elit feugiat et.',
  },
  {
    imageUrl: appImages.user1,
    name: 'Jane Alex',
    rating: '4.6',
    service: 'Hair Cut',
    comment:
      'Maecenas interdum lorem eleifend orci aliquam mollis. Aliquam non rhoncus magna. Suspendisse aliquet tincidunt enim, ut commodo elit feugiat et.',
  },
];
const Qualifies = [
  {
    title: 'Silver Stylist',
    subTitle: 'Keep 85% of what you make',
    type: 'silver',
    checks: [
      'Keep a 4 Stars or above from clients',
      'Complete 20 Jobs in your lifetime',
    ],
  },
  {
    title: 'Gold Stylist',
    subTitle: 'Keep 90% of what you make',
    type: 'gold',
    checks: [
      'Keep a 4.6 Stars or above from clients',
      'Complete 35 Jobs in your lifetime',
    ],
  },
];

const MyBusiness = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userinfo, setUserInfo] = useState({});
  const [token, setToken] = useState('');
  const [buttonSelectedIndex, setButtonSelectedIndex] = useState(0);
  const [reviews, setReviews] = useState(Reviews);
  const [qualifies, setQualifies] = useState(Qualifies);

  const UpdateButtonIndex = (buttonSelectedIndex) => {
    setButtonSelectedIndex(buttonSelectedIndex)
  };

  const RenderReviews = () => {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={reviews}
        renderItem={({item, index}) => {
          return (
            <ProviderReviewCard
              containerStyle={[
                {
                  marginVertical: sizes.smallMargin,
                  marginLeft: index === 0 ? width(5) : 0,
                },
              ]}
              image={item.imageUrl}
              name={item.name}
              rating={item.rating}
              title={item.service}
              detail={item.comment}
            />
          );
        }}
      />
    );
  };

  const RenderQualifiers = () => {
    return (
      <FlatList
        data={qualifies}
        renderItem={({item, index}) => {
          return (
            <StylistQualifierCard
              containerStyle={[
                {
                  marginBottom: sizes.baseMargin,
                  marginTop: index === 0 ? sizes.baseMargin : 0,
                },
              ]}
              title={item.title}
              subTitle={item.subTitle}
              checks={item.checks}
              type={item.type}
            />
          );
        }}
      />
    );
  };

  const fill = colors.appColor1;
  const Buttons = ['Daily', 'Monthly'];
  const weekData = [
    10, 59, 250, 220, 300, 400, 250
  ];
  const monthData = [
    10,
    59,
    250,
    220,
    300,
    400,
    250,
    200,
    500,
    300,
    145,
    367,
  ];
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ];
  const contentInset = {top: 20, bottom: 20};

  return (
    <MainWrapperMatrial>
      <StatusBar backgroundColor={colors.appColor1} />
      {/* <MianHeader heading={"My Business"} /> */}
      <MianHeader 
         iconLeftOnPress={() => props.navigation.navigate(routes.provider.notifications)}
         heading={"My Business"} 
         iconRightOnPress={() => props.navigation.navigate(routes.provider.Chats)}
      />
      {isLoading?
        <View
          style={{
            marginVertical: '50%',
            alignItems: 'center',
            width: '100%',
          }}>
          <ActivityIndicator size={'large'} />
        </View>
      :
        <KeyboardAvoidingScrollView>
          <Spacer height={sizes.baseMargin} />
          <ComponentWrapper>
            <SmallTitle>Monthly Earning</SmallTitle>
          </ComponentWrapper>
          <Spacer height={sizes.baseMargin} />
        <RowWrapper>
          <Wrapper style={[appStyles.center]}>
            <LargeTitle style={[appStyles.textPrimaryColor]}>
              $999
            </LargeTitle>
            <Spacer height={sizes.smallMargin} />
            <RegularText>{moment().format('MMMM, YYYY')}</RegularText>
          </Wrapper>
          <Wrapper style={[appStyles.center]}>
            <LargeTitle style={[appStyles.textPrimaryColor]}>
              999
            </LargeTitle>
            <Spacer height={sizes.smallMargin} />
            <RegularText>Hours</RegularText>
          </Wrapper>
          <Wrapper style={[appStyles.center]}>
            <LargeTitle style={[appStyles.textPrimaryColor]}>
              399
            </LargeTitle>
            <Spacer height={sizes.smallMargin} />
            <RegularText>Clients</RegularText>
          </Wrapper>
        </RowWrapper>
        <Spacer height={sizes.baseMargin} />
        <ComponentWrapper>
          <RowWrapperBasic style={[{height: height(30)}]}>
            <YAxis
              data={buttonSelectedIndex === 0 ? weekData : monthData}
              contentInset={contentInset}
              svg={{
                fill: colors.appColor1,
                fontSize: 10,
              }}
              numberOfTicks={10}
              formatLabel={value => `$${value}`}
            />
            <Wrapper flex={1} style={{marginHorizontal: sizes.TinyMargin}}>
              {buttonSelectedIndex === 0 ? (
                <LineChart
                  style={{flex: 1}}
                  data={weekData}
                  svg={{stroke: colors.appColor1}}
                  contentInset={contentInset}>
                  <Grid />
                </LineChart>
              ) : (
                <BarChart
                  style={{flex: 1}}
                  data={monthData}
                  svg={{fill}}
                  //svg={{ stroke: 'rgb(134, 65, 244)' }}
                  contentInset={{top: 30, bottom: 30}}>
                  <Grid />
                </BarChart>
              )}

              <XAxis
              // showEvenNumberXaxisLabel = {false}
                style={{marginHorizontal: -10}}
                data={buttonSelectedIndex === 0 ? weekDays : months}
                formatLabel={(value, index) => index+1}
                // formatLabel={value => value}
                contentInset={{left: 10, right: 10}}
                svg={{fontSize: 10, fill: 'black'}}
              />
            </Wrapper>
          </RowWrapperBasic>
        </ComponentWrapper>
        <Spacer height={sizes.baseMargin} />
        <ButtonGroup
          buttons={Buttons}
          onPress={UpdateButtonIndex}
          containerStyle={styles.buttonGroupContainer}
          selectedButtonStyle={styles.buttonGroupSelected}
          selectedIndex={buttonSelectedIndex}
          innerBorderStyle={{width: 0}}
          textStyle={[styles.buttonGroupText]}
        />
        <Spacer height={sizes.baseMargin} />
        <ComponentWrapper>
          <SmallTitle>Current Metrics</SmallTitle>
          <Spacer height={sizes.baseMargin} />
          <TitleWithInfo
            title="Response Rate"
            info={"100%"}
            titleStyle={[styles.secondaryTitleStyle]}
            infoStyle={[styles.secondaryInfoStyle]}
          />
          <Spacer height={sizes.TinyMargin} />
          <TitleWithInfo
            title="Acceptance"
            info={"100%"}
            titleStyle={[styles.secondaryTitleStyle]}
            infoStyle={[styles.secondaryInfoStyle]}
          />
          <Spacer height={sizes.TinyMargin} />
          <TitleWithInfo
            title="Reliability"
            titleStyle={[styles.secondaryTitleStyle]}
            infoStyle={[styles.secondaryInfoStyle]}
          />
          <Spacer height={sizes.TinyMargin} />
          <TitleWithInfo
            title="No Show"
            info={"####"}
            titleStyle={[styles.secondaryTitleStyle,{paddingLeft:width(3)}]}
            infoStyle={[styles.secondaryInfoStyle]}
          />
          <Spacer height={sizes.TinyMargin} />
          <TitleWithInfo
            title="Late Cancel"
            info={"####"}
            titleStyle={[styles.secondaryTitleStyle,{paddingLeft:width(3)}]}
            infoStyle={[styles.secondaryInfoStyle]}
          />
        </ComponentWrapper>
        <Spacer height={sizes.baseMargin} />
        <ComponentWrapper>
          <SmallTitle>Rating and Reviews</SmallTitle>
          <Spacer height={sizes.baseMargin} />
          <TitleWithInfo
            title="Star Rating"
            info={"5.0"}
            titleStyle={[styles.secondaryTitleStyle]}
            infoStyle={[styles.secondaryInfoStyle]}
          />
          <Spacer height={sizes.TinyMargin} />
          <TitleWithInfo
            title="Reviews Count"
            info={"399"}
            titleStyle={[styles.secondaryTitleStyle]}
            infoStyle={[styles.secondaryInfoStyle]}
          />
          <Spacer height={sizes.TinyMargin} />
          <TitleWithInfo 
            title="Reviews"
            info="View All"
            titleStyle={[styles.secondaryTitleStyle]}
            infoStyle={[styles.secondaryInfoStyle]}
            onPressInfo={() => {}}
          />
        </ComponentWrapper>
        {reviews.length>0?
          <RenderReviews />
        :
          <View
            style={{
              marginVertical: '10%',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text>No Review</Text>
          </View>
        }
        
        <Spacer height={sizes.baseMargin} />
        <ComponentWrapper>
          <SmallTitle>Silver Stylist and Gold Stylist Qualifier</SmallTitle>
          <Spacer height={sizes.smallMargin} />
          <RegularText style={[appStyles.textGray]}>
            Make more from every job. Get a Silver or Gold Badge on your
            profile
          </RegularText>
        </ComponentWrapper>
        <Spacer height={sizes.smallMargin} />
        <RenderQualifiers />
        <Spacer height={sizes.doubleBaseMargin} />
      </KeyboardAvoidingScrollView>
      }
    </MainWrapperMatrial>
  );
}

export default MyBusiness;
const styles = StyleSheet.create({
  buttonGroupContainer: {
    borderRadius: 100,
    borderColor: colors.appColor1,
  },
  buttonGroupSelected: {
    backgroundColor: colors.appColor1,
    borderRadius: 100,
  },
  buttonGroupText: {
    ...appStyles.textRegular,
    color: colors.appColor1,
  },
  secondaryTitleStyle: {
    ...appStyles.textRegular,
  },
  secondaryInfoStyle: {
    ...appStyles.textRegular,
    color: colors.appColor1,
  },
});
