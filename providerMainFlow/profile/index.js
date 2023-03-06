import React, { Component, useState } from 'react';
import { View, Text, Image, ScrollView, StatusBar, TouchableOpacity, StyleSheet,ActivityIndicator } from 'react-native';
import {
  MainWrapperMatrial,
  Wrapper,
  ImageProfile,
  AbsoluteWrapper,
  CardWrapper,
  SmallTitle,
  IconWithText,
  IconWithTextimage,
  Spacer,
  RowWrapper,
  ComponentWrapper,
  TinyTitle,
  TitleWithInfo,
  ButtonWithTextArrow,
  ButtonColored,
  ButtonColoredss,
  Buttoncolo,
  IconButton,
  SmallText,
  MediumText,

  MediumTitle,
  ButtonBordered,
  ButtonBorderedSmall,
  RegularText,
  CustomIcon
} from '../../../components';
import { appImages, colors, sizes, appStyles, fontFamily, fontSize, appIcons, ToastMessage } from '../../../themes';
import { height, totalSize, width } from 'react-native-dimension';
import { routes } from '../../../services';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE ,Marker,Circle} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { userProfileData ,showsinglestylistData,showportfolioData,logOutUser} from '../../../services/backend/user';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

const customStyle = [
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
];
const DATA = [1, 2, 3, 4, 5, 6];

const Profile = (props) => {
  const { navigate, goBack, replace } = props.navigation;
  const { latitude, longitude, address } = useSelector((state) => state.user);
  const { userDetail } = useSelector(state => state.user);
  const [dataSource, setDataSource] = useState("");
  const [loader, setLoader] = useState(false);
  const [editdataSource, seteditdataSource] = useState("");
  const [portfoliodataSource, setportfoliodataSource] = useState("");
  console.log("...", userDetail);
  useFocusEffect(
    React.useCallback(() => {
      getUserData();
      geteditData();
      getportfiloData();
    }, [])
  );
  const getUserData = () => {
    try {
      const data = {
        user_id: userDetail?.id,
        viewer_id: 1,
      };
      userProfileData(data).then(response => {
        // console.log('DATAprofile =====> ', response);
        if (response?.success) {
          // console.log('DATAprofile =====> ', response.data);
          setDataSource(response?.data);
        }
      });
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  const geteditData = () => {
    setLoader(true)
    try {
        const data = {
          
            stylist_id: userDetail?.id,
            // stylist_id: '81',
          };
        showsinglestylistData(data).then(response => {
          setLoader(false)
        // console.log('edit skill data22 =====> ', response);
        if (response?.success) {
          // console.log(' edit skill data =====> ', response.data);
          seteditdataSource(response.data);
          setLoader(false)
        }
      });
    } catch (error) {
        // console.log("ye chaal");
      ToastMessage(error.message);
      setLoader(false)
    }
  };
  const getportfiloData = () => {
    setLoader(true)
    const data={
      user_id:userDetail?.id
      // user_id:"1"
    };
      try {
        showportfolioData(data).then(response => {
          // console.log('show portfolio data22 =====> ', response.data);
          setLoader(false)
          if (response?.success) {
            // console.log(' show portfolio data =====> ', response.data);
            setportfoliodataSource(response.data);
            setLoader(false)
          }
        });
      } catch (error) {
          // console.log("ye chaal");
        ToastMessage(error.message);
        setLoader(false)
      }
    };
  const userLogOut = () => {
    // setLoader(true)
    const data={
      user_id:userDetail?.id
    };
      try {
        logOutUser(data).then(response => {
          console.log('userLogOut data22 =====> ', response);
          setLoader(false)
          if (response?.success) {
            setLoader(false)
            replace(routes.auth)
          }
        });
      } catch (error) {
          // console.log("ye chaal");
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
          style={{ position: "relative" }}>
          <Wrapper
          //  animation="fadeInDown"
          >
              <ImageProfile
             
             source={{uri: dataSource?.profile_image === null ? appImages?.user4 : dataSource?.profile_image }}
           />
            
          </Wrapper>
          <AbsoluteWrapper style={{ top: sizes.baseMargin, left: sizes.baseMargin, flexDirection: 'row', alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={.7}
              onPress={() => goBack()}
              style={styles.backiconStyle}>
              <Ionicons
                name='chevron-back'
                size={totalSize(3)}
                color="#fff"
              />
            </TouchableOpacity>
            
            <SmallTitle style={{ color: colors.snow, marginLeft: width(3), fontSize: fontSize.h4 }}>Profile</SmallTitle>
           
          </AbsoluteWrapper>
          <View style={styles.editMainView}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigate(routes.provider.profileUpdate)}
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
          <AbsoluteWrapper style={{ right: 0, left: 0, top: -height(10) }}>
            <View
              style={styles.detailscardStyles}>
              <MediumTitle style={[appStyles.textCenter, appStyles.textWhite]}>
                {dataSource?.first_name&&dataSource?.first_name!=null?dataSource?.first_name:""}{" "}
                {dataSource?.last_name&&dataSource?.last_name!=null?dataSource?.last_name:""}
              </MediumTitle>
              <MediumText style={styles.hairstyleText}>{dataSource?.title&&dataSource?.title!=null?dataSource?.title:'Hair Style'}</MediumText>
              <IconWithTextimage
                // iconName="star"
                // iconType="entypo"
                text={"(4.9)"}
                
                tintColor={colors.rating}
                color={"#C9A858"}
                textStyle={[appStyles.textWhite]}
                containerStyle={[{ alignSelf: 'center', marginTop: sizes.smallMargin, marginBottom: sizes.baseMargin }]}
              />
              <SmallText style={[appStyles.textCenter, appStyles.textWhite, { marginVertical: height(1), fontSize:totalSize(1.5), fontFamily: fontFamily.appTextRegular ,height:height(7)}]}>
                {dataSource?.about!=null?dataSource?.about:'Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna si.'}
              </SmallText>
            </View>
          </AbsoluteWrapper>
          <Wrapper
            // animation="fadeInDown" 
            style={{ marginTop: sizes.doubleBaseMargin * 3, marginHorizontal: width(5) }}>
            <TinyTitle style={{ fontSize: totalSize(2) }}>Account</TinyTitle>
            <TitleWithInfo titleStyle={{ fontSize: totalSize(1.55) }} infoStyle={{ fontSize: totalSize(1.55) }} containerStyle={{ marginTop: sizes.smallMargin }} title="Email" info={dataSource?.email} />
            <TitleWithInfo titleStyle={{ fontSize: totalSize(1.55) }} infoStyle={{ fontSize: totalSize(1.55) }} containerStyle={{ marginTop: sizes.smallMargin }} title="Phone" info={
                dataSource?.phone_number != null
                  ? dataSource?.phone_number
                  : 'N/A'
              } />
            <TitleWithInfo titleStyle={{ fontSize: totalSize(1.55) }} infoStyle={{ fontSize: totalSize(1.55) }} containerStyle={{ marginTop: sizes.smallMargin }} title="Zip"  info={dataSource?.zip_code != null ? dataSource?.zip_code : 'N/A'} />
            <TitleWithInfo titleStyle={{ fontSize: totalSize(1.55) }} infoStyle={{ fontSize: totalSize(1.55) }} containerStyle={{ marginTop: sizes.smallMargin }} title="Country" info={dataSource?.country != null ? dataSource?.country : 'N/A'}/>
          </Wrapper>
          <View style={{ flex:1,flexDirection: 'row', marginHorizontal: width(5), marginTop: sizes.baseMargin }}>
            <View style={{ flex: 0.7, justifyContent: 'center'}}>
              <TinyTitle style={{ fontSize: totalSize(2) }}>What's on the schedule?</TinyTitle>
            </View>
            <TouchableOpacity
              activeOpacity={.6}
              onPress={() => navigate(routes.provider.availablilityTab)}
              style={{ flex: 0.3, justifyContent: 'center' }}>
              <SmallText style={{ color: colors.appColor1, textAlign: "right", fontFamily: fontFamily.appTextBold, fontSize: fontSize.regular }}>See Calendar</SmallText>
            </TouchableOpacity>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {DATA.map((val, key) => {
              return (
                <Wrapper
                  key={key}
                  // animation="fadeInDown"
                  style={{
                    backgroundColor: "#FFF",
                    marginLeft: totalSize(2),
                    marginTop: totalSize(2),
                    marginLeft: key === 0 ? totalSize(2) : 0,
                    marginBottom: totalSize(2),
                    marginRight: totalSize(2),
                    borderRadius: 20,
                    padding: totalSize(2),
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 6,
                    },
                    shadowOpacity: 0.37,
                    shadowRadius: 7.49,
                    elevation: 12,
                  }}>
                  <View style={{ flexDirection: 'row', borderBottomColor: "#00000029", borderBottomWidth: 1, paddingBottom: totalSize(1) }}>
                    <View>
                      <Image
                        source={appImages.imageOne}
                        style={{ height: totalSize(8), width: totalSize(8), resizeMode: 'cover', borderRadius: 100 }}
                      />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', marginLeft: totalSize(1) }}>
                      <SmallTitle style={{ color: "#000" }}>Jane Doe</SmallTitle>
                      <IconWithTextimage
                // iconName="star"
                // iconType="entypo"
                // title={"ali"}
                text={"(4.9)"}
                tintColor={colors.rating}
                color={"#C9A858"}
                textStyle={[appStyles.textBlack]}
                containerStyle={[{ alignSelf: 'center', marginTop: sizes.smallMargin, marginBottom: sizes.baseMargin }]}
              />
                    </View>
                    <View style={{ justifyContent: 'flex-start', marginLeft: totalSize(3) }}>
                      <ButtonColoredss
                        text="Hair Cut"
                        textStyle={{ fontSize: 12 }}
                        buttonStyle={{ marginHorizontal: 0, paddingHorizontal: width(7), borderRadius: 100, height: height(3) }}
                      // onPress={() => }
                      />
                      <MediumTitle style={{ color: "#000", marginTop: height(2), textAlign: "right" }}>$40</MediumTitle>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: totalSize(1.4) }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                      <RegularText style={{ color: "#7F7F7F" }}>Time Slot</RegularText>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                      <RegularText style={{ color: "#000000" }}>12:00 pm - 02:00 pm</RegularText>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: totalSize(.5) }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                      <RegularText style={{ color: "#7F7F7F" }}>Date</RegularText>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                      <RegularText style={{ color: "#000000" }}>29th July, 2020</RegularText>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: totalSize(2) }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                      <RegularText style={{ color: "#7F7F7F" }}>Location</RegularText>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                      <RegularText style={{ color: "#000000" }}>17 Johnson Ave, NYC</RegularText>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: totalSize(.5) }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                      <RegularText style={{ color: "#7F7F7F" }}>Distance</RegularText>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                      <RegularText style={{ color: "#000000" }}>6 miles away</RegularText>
                    </View>
                  </View>
                </Wrapper>
              )
            })}
          </ScrollView>
          <ButtonBordered
            textStyle={{ fontSize: totalSize(1.9), fontFamily: fontFamily.appTextBold }}
            text={"Sync Your Personal & Bod-e-Work Calendar"}
            buttonStyle={{ marginTop: sizes.smallMargin }}
          />
          {/* <View style={{ flexDirection: 'row', marginHorizontal: width(5), marginTop: sizes.smallMargin * 3, justifyContent: 'center' }}>
            <View >
              <TinyTitle style={{ fontSize: totalSize(2) }}>Business Photos</TinyTitle>
            </View>
            <TouchableOpacity
              activeOpacity={.8}
              onPress={() => navigate(routes.provider.businessPhoto)}
              style={{ flex: 1, justifyContent: 'center' }}>
              <SmallText style={{ color: colors.appColor1, textAlign: "right", fontFamily: fontFamily.appTextBold, fontSize: fontSize.regular }}>Edit Photos</SmallText>
            </TouchableOpacity>
          </View> */}
          {/* <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {portfoliodataSource&&portfoliodataSource.length>0?
                        <>
            {portfoliodataSource.map((val, key) => {
              return (
                <Wrapper
                  key={key}
                  // animation="fadeInDown"
                  style={{
                    backgroundColor: "#FFF",
                    height: height(24),
                    width: width(30),
                    marginLeft: key === 0 ? totalSize(2) : 0,
                    marginRight: totalSize(2),
                    marginTop: totalSize(2),
                    marginBottom: totalSize(2),
                    borderRadius: 20,
                  }}>
                  <Image
                    source={{uri: val.attachment}}
                    style={{ height: "100%", width: "100%", resizeMode: 'cover', borderRadius: 20 }}
                  />
                </Wrapper>
              )
            })}
              </>
                        :<View style={{alignItems:'center',justifyContent:'center',alignSelf:'center',width:width(100),height:height(10)}}>
                          <Text style={{alignSelf:'center'}}>No data found</Text>
                        </View>
                        }

          </ScrollView> */}
          <View style={{ flexDirection: 'row', marginHorizontal: width(5), marginTop: sizes.baseMargin }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TinyTitle style={{ fontSize: totalSize(2) }}>Skills & Rates</TinyTitle>
            </View>
            <TouchableOpacity
              activeOpacity={.8}
              onPress={() => navigate(routes.provider.editSkills)}
              style={{ flex: 1, justifyContent: 'center' }}>
              <SmallText style={{ color: colors.appColor1, textAlign: "right", fontFamily: fontFamily.appTextBold, fontSize: fontSize.regular }}>
                Create or edit skills
              </SmallText>
            </TouchableOpacity>
          </View>
          {loader ? (
                    <View
                      style={{
                        marginVertical: '10%',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                     <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
                    </View>)
         : editdataSource&&editdataSource.length>0?
                        <>
          {editdataSource.map((val, key) => {
            return (
          <View style={styles.boxBraisButtonView}>
            <Image
              source={appIcons.docpic}
              style={styles.docpicImagestyle}
              resizeMode={"contain"}
            />

            <View style={{ flex: 1, justifyContent: 'center', paddingLeft: totalSize(1) }}>
              <SmallTitle style={{ color: "#FFF" }}>{val?.service.name}</SmallTitle>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <SmallTitle style={{ color: "#FFF",marginRight:width(2) }}>${val?.base_price}</SmallTitle>
            </View>
          </View>
            )
          })}
          </>
         :<View style={{alignItems:'center',justifyContent:'center',alignSelf:'center',width:width(100),height:height(10)}}>
         <Text style={{alignSelf:'center'}}>No skill found</Text>
       </View>
          }
          {/* <View style={styles.boxBraisButtonView}> */}
            {/* <Image
              source={appIcons.docpic}
              style={styles.docpicImagestyle}
            />
            <View style={{ flex: 1, justifyContent: 'center', paddingLeft: totalSize(1) }}>
              <SmallTitle style={{ color: "#FFF" }}>Box Braids</SmallTitle>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <SmallTitle style={{ color: "#FFF" }}>$40</SmallTitle>
            </View>
          </View>
          <View style={styles.boxBraisButtonView}>
            <Image
              source={appIcons.docpic}
              style={styles.docpicImagestyle}
            />
            <View style={{ flex: 1, justifyContent: 'center', paddingLeft: totalSize(1) }}>
              <SmallTitle style={{ color: "#FFF" }}>Box Braids</SmallTitle>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <SmallTitle style={{ color: "#FFF" }}>$40</SmallTitle>
            </View>
          </View> */}
          <View style={{ flexDirection: 'row', marginHorizontal: width(5), marginTop: sizes.baseMargin }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TinyTitle style={{ fontSize: totalSize(2) }}>Work Area</TinyTitle>
            </View>
            <TouchableOpacity
              activeOpacity={.8}
              onPress={() => navigate(routes.provider.selectWorkArea)}
              style={{ flex: 1, justifyContent: 'center' }}>
              <SmallText style={{ color: colors.appColor1, textAlign: "right", fontFamily: fontFamily.appTextBold }}>
                Edit Work Area
              </SmallText>
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: width(5), borderRadius: 30, marginTop: height(2), overflow: 'hidden' }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              customMapStyle={customStyle}
              region={{
                latitude: latitude&&latitude!=null?latitude:31.5522984,
                longitude: longitude&&longitude!=null?longitude:74.3470166,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
              style={{ height: height(35), borderRadius: 15, overflow: 'hidden' }}
            >
                <Circle
      //   center={{
      //     latitude: 31.5522984,
      // longitude: 74.3470166,
      //   }}
        center={{ 
          latitude:parseFloat(latitude&&latitude!=null?latitude:31.5522984,),
          longitude:parseFloat(longitude&&longitude!=null?longitude:74.3470166) 
          // latitude: parseFloat(37.78825,), 
          // longitude: parseFloat(-122.4324) 
        }}
        radius={3000}
        strokeWidth={1}
        strokeColor={colors.appColor1}
        fillColor="rgb(169,225,219)"
      />
               <Marker
              coordinate={{ 
                latitude: parseFloat(latitude&&latitude!=null?latitude:31.5522984,), 
                longitude: parseFloat(longitude&&longitude!=null?longitude:74.3470166) 
                // latitude: parseFloat(37.78825,), 
                // longitude: parseFloat(-122.4324) 
              }}
              // onSelect={e => markerMoveHandle('onSelect', e)}
              // onDrag={e => markerMoveHandle('onDrag', e)}
              // onDragStart={e => markerMoveHandle('onDragStart', e)}
              // onDragEnd={e => markerMoveHandle('onDragEnd', e)}
              // onPress={e => markerMoveHandle('onPress', e)}
              // draggable
            >
              <CustomIcon
                icon={appIcons.mapMarker}
                size={totalSize(6)}
              />
            </Marker>
            </MapView>
          </View>
          <ButtonWithTextArrow
            text="Direct Deposit"
            textStyle={{ fontFamily: fontFamily.appTextMedium }}
            onPress={() => navigate(routes.provider.directDeposit)}
            buttonStyle={{ marginTop: sizes.baseMargin + sizes.baseMargin }}
          />
          <ButtonWithTextArrow
            text="Location"
            textStyle={{ fontFamily: fontFamily.appTextMedium }}
            onPress={() => navigate(routes.provider.locationSetting)}
            buttonStyle={{ marginTop: sizes.baseMargin + sizes.smallMargin }}
          />
          <ButtonWithTextArrow
            text="About Me"
            textStyle={{ fontFamily: fontFamily.appTextMedium }}
            onPress={() => navigate(routes.provider.aboutMe)}
            buttonStyle={{ marginTop: sizes.baseMargin + sizes.smallMargin }}
          />
          <ButtonWithTextArrow
            text="Closing Message"
            textStyle={{ fontFamily: fontFamily.appTextMedium }}
            onPress={() => navigate(routes.provider.closingMessage)}
            buttonStyle={{ marginTop: sizes.baseMargin + sizes.smallMargin }}
          />
          {/* <ButtonWithTextArrow
            text="Promotiom"
            textStyle={{ fontFamily: fontFamily.appTextMedium }}
            onPress={() => navigate(routes.provider.promo)}
            buttonStyle={{ marginTop: sizes.baseMargin + sizes.smallMargin }}
          /> */}
          <ButtonWithTextArrow
            text="Account Settings"
            textStyle={{ fontFamily: fontFamily.appTextMedium }}
            onPress={() => navigate(routes.provider.accountSettings)}
            buttonStyle={{ marginTop: sizes.baseMargin + sizes.smallMargin }}
          />
          <ButtonWithTextArrow
            text="Support"
            textStyle={{ fontFamily: fontFamily.appTextMedium }}
            onPress={() => navigate(routes.provider.support)}
            buttonStyle={{ marginTop: sizes.baseMargin + sizes.smallMargin }}
          />
          <ButtonBordered
            text="Logout"
            onPress={() => {
              AsyncStorage.removeItem('token');
              AsyncStorage.removeItem("userData");
              userLogOut()
              // replace(routes.auth)
            }}
            buttonStyle={{ marginVertical: sizes.doubleBaseMargin }}
          />
        </Wrapper>
      </ScrollView>
    </MainWrapperMatrial>
  );
}

export default Profile;
const styles = StyleSheet.create({
  imageStyle: {
    width: null,
    height: height(40),
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  backiconStyle: {
    height: height(5),
    width: height(5),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.appColor1
  },
  detailscardStyles: {
    backgroundColor: colors.appColor1,
    paddingVertical: sizes.smallMargin,
    paddingHorizontal: sizes.baseMargin + sizes.baseMargin,
    marginHorizontal: width(8),
    borderRadius: 20,
    shadowColor: "#00827F4C",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

  },
  hairstyleText: {
    color: "#FFF", textAlign: "center",
    marginTop: height(1),
    fontFamily: fontFamily.appTextRegular
  },
  boxBraisButtonView: {
    flexDirection: 'row',
    marginTop: sizes.smallMargin,
    backgroundColor: colors.appColor1,
    paddingVertical: height(1.5),
    paddingHorizontal: totalSize(2),
    borderRadius: 25,
    marginHorizontal: width(4)
  },
  docpicImagestyle: {
    height: height(5),
    width: height(6),
    resizeMode: "contain",
    color: '#fff',
    // backgroundColor:'red'
  },
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
  
    editMainView: {position: 'absolute', alignSelf: 'flex-end'},
})
