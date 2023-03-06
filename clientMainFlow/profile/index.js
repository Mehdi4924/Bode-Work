import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import {
  MainWrapperMatrial,
  Wrapper,
  AbsoluteWrapper,
  SmallTitle,
  IconWithText,
  TinyTitle,
  TitleWithInfo,
  ButtonWithTextArrow,
  MediumText,
  ButtonBordered,
  RegularText,
  LargeText,
  ImageProfile,
  ButtonColored,
  ButtonColoredss,
} from '../../../components';
import {
  appImages,
  colors,
  sizes,
  appStyles,
  ToastMessage,
  fontFamily,
} from '../../../themes';
import {height, totalSize, width} from 'react-native-dimension';
import {routes} from '../../../services';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {userProfileData} from '../../../services/backend/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = props => {
  const {navigate, goBack, replace} = props.navigation;
  const {userDetail} = useSelector(state => state.user);
  console.log("ye i user details",userDetail);
  const [dataSource, setDataSource] = useState({});
  const [loader, setLoader] = useState(false);
  const [Provider, setProvider] = useState([]);

  // useFocusEffect(() => {
  //   getUserData();
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, [])
  );
  const getUserData = () => {
    setLoader(true)
    try {
      const data = {
        user_id: userDetail?.id,
        viewer_id: 1,
      };
      userProfileData(data).then(response => {
        console.log('DATAprofile =====> ', response);
        if (response?.success) {
          console.log('DATAprofile =====> ', response.data);
          setDataSource(response?.data);
          setLoader(false)
        }
      });
    } catch (error) {
      ToastMessage(error.message);
      setLoader(false)
    }
  };

  return (
    <MainWrapperMatrial>

      <StatusBar backgroundColor={colors.appColor1} />
      <ScrollView showsVerticalScrollIndicator={false}>
      
        <Wrapper
          // animation="fadeInDown"
          style={{position: 'relative'}}>
          <Wrapper
          //  animation="fadeInDown"
          >
            {/* <Image 
              source={{uri: dataSource?.profile_image === null ? appImages?.user4 : dataSource?.profile_image }}
              style={{
                width: null, 
                height: height(40),
                // borderTopRightRadius: 25,
                // borderTopLeftRadius: 25,
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
              }}
            /> */}
            <ImageProfile
             
              source={{uri: dataSource?.profile_image === null ? appImages?.user4 : dataSource?.profile_image }}
            />
          </Wrapper>

          <View style={styles.editMainView}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigate(routes.client.editProfile)}
              style={styles.editToucableView}>
              <MaterialIcons
                name="edit"
                size={totalSize(2.5)}
                color={colors.appColor1}
              />
            </TouchableOpacity>
          </View>
        </Wrapper>
        <Wrapper
          // animation="fadeInDown"
          flex={1}>
            {loader ? (
        
          <View>
            <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
          </View>
        ) : (
          <>
          <AbsoluteWrapper
            style={styles.absoluteStyle}>
            <View
              style={styles.CardouterView}>
              <SmallTitle style={[appStyles.textCenter, appStyles.textWhite]}>
                {/* {`${dataSource?.first_name!=null?dataSource?.first_name:'N/A'}`} */}
                {dataSource?.first_name&&dataSource?.first_name!=null?dataSource?.first_name:""}{" "}
                {dataSource?.last_name&&dataSource?.last_name!=null?dataSource?.last_name:""}
              </SmallTitle>
              <IconWithText
                iconName="star"
                text= {parseFloat(dataSource&&dataSource?.avg_rating!=null?dataSource?.avg_rating:"N/A").toFixed(2)}
                // text={'(4.9)'}
                tintColor={'#DAC279'}
                textStyle={[appStyles.textWhite]}
                containerStyle={styles.containerStyle}
              />
              <View
                style={styles.cardSecondViewStyle}>
                <View style={styles.largetextOuterView}>
                  <LargeText
                    style={styles.largetextStyles}>
                    {dataSource?.schedule_service}
                  </LargeText>
                  <RegularText
                    style={styles.regularTextStyles}>
                    Scheduled{'\n'} Service
                  </RegularText>
                </View>
                <View style={styles.largetextOuterView}>
                <LargeText
                    style={styles.largetextStyles}>
                    {dataSource?.services_used}
                    </LargeText>
                  <RegularText
                    style={styles.regularTextStyles}>
                    Services{'\n'} Used
                  </RegularText>
                </View>
              </View>
            </View>
          </AbsoluteWrapper>
          </>
        )}
          <Wrapper
            //  animation="fadeInDown"
            style={styles.wrapperStyles}>
            <TinyTitle>Account</TinyTitle>
            <TitleWithInfo
              containerStyle={{marginTop: sizes.smallMargin}}
              title="Email"
              info={dataSource?.email}
            />
            {/* <TitleWithInfo containerStyle={{marginTop:sizes.smallMargin}} title="Email" info="Ahmad@gamil.com" /> */}
            <TitleWithInfo
              containerStyle={{marginTop: sizes.smallMargin}}
              title="Phone"
              info={
                dataSource?.phone_number != null
                  ? dataSource?.phone_number
                  : 'N/A'
              }
            />
            <TitleWithInfo
              containerStyle={{marginTop: sizes.smallMargin}}
              title="Zip"
              info={dataSource?.zip_code != null ? dataSource?.zip_code : 'N/A'}
            />
            <TitleWithInfo
              containerStyle={{marginTop: sizes.smallMargin}}
              title="Country"
              info={dataSource?.country != null ? dataSource?.country : 'N/A'}
            />
          </Wrapper>

          <ButtonWithTextArrow
            text="Change Password"
            onPress={() => navigate(routes.client.changePassword)}
            buttonStyle={styles.buttonStyles}
            textStyle={styles.buttonTextStyles}
          />
          <ButtonWithTextArrow
            text="Paymemt"
            onPress={() => navigate(routes.client.payment)}
            buttonStyle={styles.buttonStyles}
            textStyle={styles.buttonTextStyles}
          />
          <ButtonWithTextArrow
            text="Location"
            onPress={() => navigate(routes.client.locationSetting)}
            buttonStyle={styles.buttonStyles}
            textStyle={styles.buttonTextStyles}
          />
          <ButtonWithTextArrow
            text="Promo"
            onPress={() => navigate(routes.client.promo)}
            buttonStyle={styles.buttonStyles}
            textStyle={styles.buttonTextStyles}
          />
          <ButtonWithTextArrow
            text="Notifications"
            onPress={() => navigate(routes.client.notificationSettings)}
            buttonStyle={styles.buttonStyles}
            textStyle={styles.buttonTextStyles}
          />
          <ButtonWithTextArrow
            text="Support"
            onPress={() => navigate(routes.client.support)}
            buttonStyle={styles.buttonStyles}
            textStyle={styles.buttonTextStyles}
          />
          <ButtonColoredss
            text="Logout"
            buttonStyle={{marginVertical: sizes.doubleBaseMargin}}
            onPress={() => {
              AsyncStorage.removeItem('token');
              AsyncStorage.removeItem('userData');
              replace(routes.auth);
            }}
          />
        </Wrapper>
        
      </ScrollView>
    </MainWrapperMatrial>
  );
};

export default Profile;
const styles = StyleSheet.create({
  editMainView: {position: 'absolute', alignSelf: 'flex-end'},
  editToucableView: {
    height: height(5),
    width: height(5),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.snow,
    marginRight: height(2),
    marginVertical: height(2),
  },
  absoluteStyle:{right: width(3), left: width(3), top: -height(10)},
  CardouterView:{
    backgroundColor: colors.appColor1,
    // paddingHorizontal: sizes.baseMargin,
    paddingVertical: sizes.baseMargin,
    marginHorizontal: width(5),
    borderRadius: 20,
  },containerStyle:{alignSelf: 'center', marginVertical: sizes.baseMargin},
  cardSecondViewStyle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  largetextStyles:{
    color: '#FFF',
    fontSize: totalSize(4),
    textAlign: 'center',
  },
  regularTextStyles:{
    color: '#FFF',
    fontSize: totalSize(2),
    textAlign: 'center',
  },
  largetextOuterView:{flex: 0.4, justifyContent: 'center'},
  wrapperStyles:{
    marginTop: sizes.doubleBaseMargin * 3.5,
    marginHorizontal: width(5),
  },
  buttonStyles:{marginTop: sizes.baseMargin + sizes.smallMargin},
  buttonTextStyles:{fontFamily: fontFamily.appTextMedium}
});
