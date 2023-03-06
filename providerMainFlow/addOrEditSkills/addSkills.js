import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  FlatList,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {
  MainWrapper,
  Wrapper,
  Spacer,
  ComponentWrapper,
  LineHorizontal,
  RowWrapperBasic,
  SmallTitle,
  RegularText,
  ButtonColoredSmall,
  ButtonColored,
  AbsoluteWrapper,
  TextInputBordered,
  RowWrapper,
  ModalColored,
  MediumTitle,
  TinyTitle,
  SmallText,
  KeyboardAvoidingScrollView,
} from '../../../components';
import {
  sizes,
  colors,
  fontFamily,
  appImages,
  ToastMessage,
} from '../../../themes';
import {height, totalSize, width} from 'react-native-dimension';
import {Icon} from 'react-native-elements';
import Header from '../../../components/header/header';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {routes} from '../../../services';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import HeaderService from '../../../components/header/headerService';
import {BlurView} from '@react-native-community/blur';
import {addService, showservices} from '../../../services/backend/user';
import {useSelector} from 'react-redux';
import VDropDown from '../../../components/VDropDown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showServiceData} from '../../../services/backend/user';
// const DATA2 = [
//     {id: 1, title: 'Hair Stylist', images: appImages.haircut},
//     {id: 2, title: 'Nail Art', images: appImages.nail},
//     {id: 3, title: 'Barber', images: appImages.barber},
//     {id: 4, title: 'Makeup', images: appImages.makeup},
//   ];
const AddSkills = props => {
  const param = props.route.params;
  console.log('ye aya param', JSON.stringify(param, null, 2));
  const {navigate, goBack, replace} = props.navigation;
  const {userDetail} = useSelector(state => state.user);
  console.log('user detail', userDetail);
  const [loader, setLoader] = useState(false);
  const [ServiceCategory, setServiceCategory] = useState('');
  const [Subcategory, setSubcategory] = useState('');
  const [chargesModalStatus, setChargesModalStatus] = useState(false);
  const [chargesValue, setChargesValue] = useState('$40');
  const [phone, setphone] = useState(
    param?.base_cast != null ? param?.base_cast : 'Select Price',
  );
  const [zipcode, setzipcode] = useState();
  const [ProfileImage, setProfileImage] = useState('');
  const [ProfileImageArry, setProfileImageArry] = useState([]);
  console.log("its new arry",ProfileImageArry);
  const [invitationModalStatus, setInvitationModalStatus] = useState(false);
  const [DataSource, setDataSource] = useState('');
  const [service, setservice] = useState('');
  const [serviceid, setserviceid] = useState('');
  console.log("serviceid",serviceid);
  const [servicename, setservicename] = useState('');
  const [category, setcategory] = useState('');
  const [price, setprice] = useState(
    param?.base_cast != null ? param?.base_cast : '',
  );
  const [subservice, setsubservice] = useState('');
  const [subserviceid, setsubserviceid] = useState('');
  const [subservicename, setsubservicename] = useState('');
  const [object, setobject] = useState('');
  console.log('object', object);
  // console.log("subservice......>>>>",subservice);
  const chargesToggleModal = () => {
    setChargesModalStatus(!chargesModalStatus);
  };
  const invitationToggleModal = () => {
    setInvitationModalStatus(!invitationModalStatus);
  };
  useEffect(() => {
    getService();
  }, []);
  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit: 1,
      },
      async response => {
        setProfileImage(response.assets[0]);
        console.log(response);
      },
    );
  };
  const pickImagemulti = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,

        selectionLimit: 1,
      },
      async response => {
        const obj = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };
        const newArry = [...ProfileImageArry, obj];
        console.log('its new arry', newArry);
        //  setProfileImageArry(response.assets[0]);
        // const a[] = response.assets[0];
        setProfileImageArry(newArry);
        // console.log(response);
      },
    );
  };
  const getService = () => {
    setLoader(true);
    try {
      // const data = {
      //     stylist_id: userDetail?.id,
      //     // stylist_id: '81',
      // };
      showServiceData().then(response => {
        console.log(
          'showservices data22 =====> ',
          response.data[0].subservices[0].category,
        );
        setLoader(false);
        if (response?.success) {
          // console.log(' showservices data =====> ', response.data[0].subservice[0].category);
          setDataSource(response.data);
          setservice(response.data);
          // setsubservice(response.data[0].subservices[0].category)
          setLoader(false);
        }
      });
    } catch (error) {
      console.log('ye chaal');
      ToastMessage(error.message);
      setLoader(false);
    }
  };
  const AddService = () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append('stylist_id', userDetail?.id);
    formdata.append('service_id', serviceid);
    formdata.append('sub_service_id', subserviceid);
    formdata.append('description', 'my first service');
    formdata.append(
      'rates[]',
      JSON.stringify(
        param?.editdata?.category?.length > 0 ? param?.editdata?.category : category,
      ),
    );
    // formdata.append("rates[]",JSON.stringify(param?.editdata?.rates?.length>0?param?.editdata?.rates:[{
    //   "category_id": category?.id,
    //   "sub_category_id": category?.sub_categories?.id,
    //   "price": category?.sub_categories?.price,
    //   "time": category?.sub_categories?.time,
    // }]))
    // formdata.append('rates[0][category_id]', "1");
    // formdata.append('rates[0][sub_category_id]', "1");
    // formdata.append('rates[0][price]', "60");
    // formdata.append('rates[0][time]', "120");
    // formdata.append('rates[1][category_id]', "1");
    // formdata.append('rates[1][sub_category_id]', "1");
    // formdata.append('rates[1][price]', "10");
    // formdata.append('rates[1][time]', "10");
    formdata.append(
      'base_price',
      param?.base_cast != null ? param?.base_cast : '20',
    );
    formdata.append(
      'base_time',
      param?.base_time != null ? param?.base_time : '20',
    );
    formdata.append('primary_image', {
      uri: ProfileImage?.uri,
      type: ProfileImage?.type,
      name: ProfileImage?.fileName,
    });
    formdata.append('image[]',ProfileImageArry[0]);
    formdata.append('image[]',ProfileImageArry[1]);
    formdata.append('image[]',ProfileImageArry[2]);
    formdata.append('image[]',ProfileImageArry[3]);
    // const a = ProfileImageArry.map((item,index)=>{
    // //  formdata.append(
    // // `image[]${index}[images]`, {
    // //   uri:item.uri,
    // //   type:item.type,
    // //   name: item?.fileName,

    // // }
    // // )

    // formdata.append(
    //   `image[${index}][images]`, {
    //     uri:item.uri,
    //     type:item.type,
    //     name: item?.fileName,

    //   }
    //   )

    // })
    //   formdata.append('category', 'Hair Style');
    //   formdata.append('subservice', 'style');
    //   formdata.append('small', '50');
    //   formdata.append('medium', '70');
    //   formdata.append('large', '100');
    //   formdata.append("image[]", {
    //     uri: ProfileImage?.uri,
    //     type: ProfileImage?.type,
    //     name: ProfileImage?.fileName,
    // });
      // formdata.append("image[]",ProfileImageArry)
    console.log('form data on add servicve', formdata);
    addService(formdata).then(response => {
      console.log('add service reponse =====> ', response);
      if (response?.success) {
        setLoader(false);
        chargesToggleModal();
        // console.log("ye chaka a aa");
        // console.log('add service reponse =====> ', response.data);
        // setInvitationModalStatus(true)
        // setDataSource(response?.data);
      } else {
        // ToastMessage(response.message);
        console.log('else chala');
        setLoader(false);
      }
    });
  };
  const deleteImage = item => {
    let a = ProfileImageArry.filter(itemm => itemm != item);
    setProfileImageArry(a);
  };
  const renderItem = ({item}) => {
    if (item?.uri) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            marginTop: height(0),
            paddingVertical: height(0.5),
          }}>
          <Pressable style={{}}>
            <ImageBackground
              source={{uri: item?.uri}}
              style={{
                resizeMode: 'cover',
                height: height(14),
                width: width(28),
                marginHorizontal: width(1),
                marginTop: height(0.5),
              }}
              imageStyle={{borderRadius: 15}}>
              <TouchableOpacity
                onPress={() => deleteImage(item)}
                style={{
                  height: height(2),
                  width: width(4),
                  borderRadius: 100,
                  backgroundColor: '#fff',
                  alignSelf: 'flex-end',
                  margin: totalSize(1),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Entypo name="cross" size={totalSize(1.5)} color="red" />
              </TouchableOpacity>
            </ImageBackground>
          </Pressable>
        </View>
      );
    }
  };
  const renderHeader = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          marginTop: height(0),
          paddingVertical: height(0.5),
        }}>
        <Pressable style={{}}>
          <Pressable
            // source={item?.images}
            style={{
              height: height(14),
              width: width(28),
              backgroundColor: '#00000029',
              borderRadius: 15,
              marginTop: height(0.5),
              marginRight: width(1.5),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity style={{}} onPress={() => pickImagemulti()}>
              <AntDesign name="plus" size={totalSize(3)} color={colors.black} />
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </View>
    );
  };
  return (
    <MainWrapper>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <Header
        goBack={() => props.navigation.goBack()}
        heading={'Create Service'}
        color={colors.appColor1}
      />
      <Spacer height={sizes.smallMargin} />
      {chargesModalStatus ? (
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={95}
          reducedTransparencyFallbackColor="white"
        />
      ) : null}
      {ProfileImage == '' ? (
        <Pressable
          onPress={() => {
            pickImage();
          }}
          // animation="fadeInUp"
          style={[
            {
              height: height(20),
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1.5,
              borderColor: colors.lightgrey,
              padding: sizes.baseMargin,
              borderRadius: 100,
              width: height(20),
              alignSelf: 'center',
              backgroundColor: '#FFFFFF',
            },
          ]}>
          <Entypo name="camera" size={totalSize(3)} color={colors.lightgrey} />
          <RegularText
            style={{
              color: '#BBBBBB',
              marginTop: height(0),
              fontFamily: fontFamily.appTextBold,
              fontSize: totalSize(1.3),
            }}>
            Change profile picture
          </RegularText>
        </Pressable>
      ) : (
        <ImageBackground
          source={ProfileImage}
          style={{
            height: height(20),
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.lightgrey,
            padding: sizes.baseMargin,
            borderRadius: 100,
            width: height(20),
            alignSelf: 'center',
          }}
          imageStyle={{borderRadius: 100}}
          blurRadius={chargesModalStatus ? 30 : 0}>
          {!chargesModalStatus ? (
            <>
              <Entypo name="camera" size={totalSize(3)} color={colors.snow} />
              <RegularText
                style={{
                  color: colors.snow,
                  marginTop: height(0),
                  fontFamily: fontFamily.appTextBold,
                  fontSize: totalSize(1.3),
                }}>
                Change profile picture
              </RegularText>
            </>
          ) : null}
        </ImageBackground>
      )}
      <KeyboardAvoidingScrollView>
        <Wrapper>
          <View style={{paddingHorizontal: width(5)}}>
            <Spacer height={sizes.baseMargin} />
            <VDropDown
              inputContainer={[
                styles.back,
                {
                  justifyContent: 'space-between',
                },
              ]}
              options={
                service.length > 0
                  ? service.map(item => item.name)
                  : ['loading...']
              }
              title={'Service Category'}
              // options={service.name}
              defaultValue={'Select Service'}
              defaultTextStyle={{
                color: colors.lightgrey,
                fontSize: totalSize(1.5),
                fontFamily: fontFamily.appTextRegular,
              }}
              dropdownTextStyle={styles.downtextStyle}
              dropDownContainer={styles.dropDownContainer}
              dropModal={styles.dropModal}
              rightIconName={'down'}
              onSelect={(index, value) => {
                // setsubservice(service[index].category);
                setsubservice(service[index].subservices);
                setservicename(service[index].name);
                setserviceid(service[index].id);
              }}
            />
            <Spacer height={sizes.smallMargin} />
            <VDropDown
              inputContainer={[
                styles.back,
                {
                  justifyContent: 'space-between',
                },
              ]}
              options={
                subservice.length > 0
                  ? subservice.map(item => item.name)
                  : ['loading...']
              }
              title={'Sub-Service Category'}
              // options={["Sub Briding","Sub Hair",]}
              defaultValue={'Select Sub-Service '}
              defaultTextStyle={{
                color: colors.lightgrey,
                fontSize: totalSize(1.5),
                fontFamily: fontFamily.appTextRegular,
              }}
              dropdownTextStyle={styles.downtextStyle}
              dropDownContainer={styles.dropDownContainer}
              dropModal={styles.dropModal}
              rightIconName={'down'}
              onSelect={(index, value) => {
                setsubservicename(subservice[index].name);
                setsubserviceid(subservice[index].id);
                setcategory(subservice[index].category);
                //   setSelectedBloodFor(items[index]);
                const a = [
                  {
                    [`rates[${0}][category_id]`] : subservice[index]?.category[0]?.id,
                    [`rates[${0}][sub_category_name]`] :
                      subservice[index]?.category[0]?.sub_categories[0]?.name,
                      [`rates[${0}][price]`] :
                      subservice[index]?.category[0]?.sub_categories[0]?.price,
                      [`rates[${0}][time]`]  : subservice[index]?.category[0]?.sub_categories[0]
                      ?.time,
                  },
                ];
                setobject(a);
              }}
            />
          </View>

          <Spacer height={sizes.smallMargin} />
          {/* <TextInputBordered
        // isButton={true}
          title="Price Rate"
          value={phone}
          iconName={"chevron-small-right"}
          iconColor={colors.appColor1}
          onPressIcon= {()=>props.navigation.navigate(routes.pricenewList)}

          // onChangeText={val => {
          //   setphone(val);
          // }}
        /> */}
          <View style={{position: 'relative', marginTop: totalSize(0)}}>
            <TextInputBordered
              isButton={true}
              title="Price Rate"
              value={param?.base_cast != null ? param?.base_cast : 'Select Price'}
              //  onPressIcon= {()=>props.navigation.navigate(routes.pricenewList)}
            />
            <AbsoluteWrapper
              style={{right: totalSize(3.2), top: totalSize(5.2)}}>
              <Entypo
                onPress={() =>
                  servicename != '' &&
                  serviceid != null &&
                  subserviceid != '' &&
                  subserviceid != null
                    ? props.navigation.navigate(
                        routes.provider.editpricelistt,
                        {
                          data: {
                            serviceid: serviceid,
                            subserviceid: subserviceid,
                            category: category,
                            servicename: servicename,
                            subservicename: subservicename,
                          },
                        },
                      )
                    : ToastMessage('please fill service and subservice')
                }
                name="chevron-small-right"
                size={totalSize(3)}
                color={colors.appColor1}
              />
            </AbsoluteWrapper>
          </View>
          <Spacer height={sizes.baseMargin} />
          <Text
            style={{
              color: colors.appColor1,
              fontSize: totalSize(1.5),
              fontFamily: fontFamily.gothicBold,
              marginLeft: width(8),
              // backgroundColor:'red'
            }}>
            Product Images
          </Text>
          <Spacer height={sizes.smallMargin} />
          <Wrapper>
            <RowWrapper style={[{flexWrap: 'wrap'}]}>
              <FlatList
                ListHeaderComponent={renderHeader}
                contentContainerStyle={{paddingHorizontal: width(5)}}
                showsHorizontalScrollIndicator={false}
                data={
                  ProfileImageArry && ProfileImageArry != null
                    ? ProfileImageArry
                    : ProfileImageArry
                }
                horizontal={true}
                renderItem={item => renderItem(item)}
                keyExtractor={item => item.id}
              />
            </RowWrapper>
          </Wrapper>
        </Wrapper>
        <Spacer height={sizes.smallMargin} />
        <Spacer height={sizes.smallMargin} />
        <Spacer height={sizes.baseMargin} />
        {loader ? (
          <View>
            <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
          </View>
        ) : (
          <ButtonColored
            text="Continue"
            onPress={() => {
              {
                ProfileImage == ''
                  ? ToastMessage('please select profile image and price rate')
                  : param?.flag == 'price'
                  ? AddService()
                  : ToastMessage('slect price rate');
                // chargesToggleModal()
              }
            }}
          />
        )}
        <Spacer height={sizes.baseMargin} />
        <Spacer height={sizes.baseMargin} />
      </KeyboardAvoidingScrollView>
      <ModalColored
        style={{backgroundColor: 'rgba(255,255,255,0.85)'}}
        isVisible={chargesModalStatus}
        toggleModal={chargesToggleModal}
        modalHeight={9}
        containerstyle={{
          backgroundColor: colors.snow,
          elevation: 100,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
        }}
        backdropOpacity={0}
        content={
          <View>
            <MediumTitle
              style={{
                textAlign: 'center',
                fontFamily: fontFamily.appTextBold,
                color: colors.appColor1,
              }}>
              New Service
            </MediumTitle>
            <View style={{alignSelf: 'center', marginTop: height(3.5)}}>
              <View style={{elevation: 5}}>
                <ImageBackground
                  source={{uri: ProfileImage.uri}}
                  style={{
                    resizeMode: 'cover',
                    marginHorizontal: width(1),
                    elevation: 5,
                  }}
                  imageStyle={{borderRadius: 10, elevation: 5}}>
                  <View
                    style={{
                      backgroundColor: colors.snow,
                      marginTop: height(15.3),
                      // marginHorizontal: totalSize(0.4),
                      alignItems: 'center',
                      height: height(6),
                      borderRadius: 10,
                      justifyContent: 'center',
                      elevation: 2,
                      paddingHorizontal: width(7),
                    }}>
                    <TinyTitle>{servicename}</TinyTitle>
                    <SmallText
                      style={{
                        fontSize: totalSize(1.2),
                        width: width(28),
                        textAlign: 'center',
                      }}>
                      {subservicename}
                    </SmallText>
                  </View>
                </ImageBackground>
              </View>
            </View>
            <ButtonColored
              text="Add Service"
              buttonStyle={{
                paddingHorizontal: width(5),
                borderRadius: 10,
                marginTop: height(4),
              }}
              onPress={() => {
                chargesToggleModal();
                invitationToggleModal();
                // props.navigation.navigate(routes.workLicense);
              }}
            />
          </View>
        }
      />
      <ModalColored
        style={{backgroundColor: 'rgba(255,255,255,0.8)'}}
        isVisible={invitationModalStatus}
        toggleModal={invitationToggleModal}
        containerstyle={{backgroundColor: '#FFF'}}
        modalHeight={14}
        content={
          <View>
            <Ionicons
              name="checkmark-circle"
              size={totalSize(10)}
              color={colors.appColor1}
              style={{alignSelf: 'center', marginBottom: height(3)}}
            />
            <MediumTitle style={{textAlign: 'center', color: colors.appColor1}}>
              Service Added Successfully
            </MediumTitle>
            <ButtonColored
              text="Done"
              buttonStyle={{
                paddingHorizontal: width(5),
                borderRadius: 10,
                marginTop: height(4),
              }}
              onPress={() => {
                invitationToggleModal();
                props.navigation.navigate(routes.provider.editSkills);
              }}
            />
          </View>
        }
      />
    </MainWrapper>
  );
};

export default AddSkills;
const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  back: {
    backgroundColor: colors.snow,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'space-between',
    height: height(7),
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.appColor1,
    paddingHorizontal: width(2.5),
  },
  dropModal: {
    width: width(89),
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: height(2),
    alignItems: 'center',
    elevation: 5,
    marginLeft: -10,
    // marginLeft: Theme.wp("-9%"),
  },
  downtextStyle: {
    color: 'black',
    width: width(80),
    textAlign: 'center',
    height: height(3),
    fontFamily: fontFamily.appTextRegular,
    marginVertical: height(1),
  },
});
// import React, { Component, useState } from 'react';
// import { View, Text, StatusBar, FlatList, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import {
//     MainWrapper, RowWrapper, Wrapper, Spacer, TinyTitle, ComponentWrapper, RegularText,
//     SmallText, SmallTitle, ButtonColored, AbsoluteWrapper, ModalColored, MediumTitle, TextInputBordered
// } from '../../../components';
// import { appImages, appStyles, colors, fontFamily, fontSize, sizes } from '../../../themes';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Icon, Image } from 'react-native-elements';
// import { totalSize, height, width } from 'react-native-dimension';
// import Header from '../../../components/header/header';
// import { routes } from '../../../services';
// import Modal from 'react-native-modal';
// import { ImageBackground } from 'react-native';
// import { Pressable } from 'react-native';
// import {useSelector} from 'react-redux';
// import {showServiceData,deleteServiceData} from '../../../services/backend/user';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import { ActivityIndicator } from 'react-native-paper';
// const DATA2 = [
//     { id: 1, title: "Hair Stylist", images: appImages.haircut },
//     { id: 2, title: "Nail Art", images: appImages.nail },
//     { id: 3, title: "Barber", images: appImages.barber },
//     { id: 4, title: "Makeup", images: appImages.makeup },

// ];
// const DATA3 = [
//     { id: 1, title: "box Braids", quantity:'16' },
//     { id: 2, title: "Knotless Braids ", quantity:'16' },
//     { id: 3, title: "Lemonade Braids ", quantity:'16'},
//     { id: 4, title: "Individual Braids ", quantity:'16' },
//     { id: 5, title: "Feed-in Braids  ", quantity:'16' },
//     { id: 6, title: "Crown Braids ", quantity:'16' },
//     { id: 7, title: "Braided Up-Do ", quantity:'16' },
//     // { id: 4, title: "Crown Braids ", quantity:'16' },

// ];

// const DATA = [
//     { id: 4, title: "Makeup", images: appImages.makeup },
//     { id: 3, title: "Barber", images: appImages.barber },
//     { id: 1, title: "Hair Stylist", images: appImages.haircut },
//     { id: 2, title: "Nail Art", images: appImages.nail },
// ];

// const AddSkills = (props) => {
//     const [activeTabs, setActiveTabs] = useState(0);
//     const [modalStatus, setModalStatus] = useState(false);
//     const [chargesModalStatus, setChargesModalStatus] = useState(false);
//     const [chargesValue, setChargesValue] = useState("$40");
//     const [modalVisible, setModalVisible] = useState(false);
//     const {navigate, goBack, replace} = props.navigation;
//     const {userDetail} = useSelector(state => state.user);
//     console.log('ye i services details', userDetail);
//     const [dataSource, setDataSource] = useState({});
//     const [Provider, setProvider] = useState([]);
//     const [serviceName, setserviceName] = useState("");
//     const [subserviceName, setsubserviceName] = useState("");
//     const [image, setimage] = useState("");
//     console.log("ye aya name",serviceName);

//     // useFocusEffect(() => {
//     //   getUserData();
//     // }, []);
//     useFocusEffect(
//       React.useCallback(() => {
//         getUserData();

//       }, []),
//     );
//     const getUserData = () => {
//         try {
//             showServiceData().then(response => {
//             console.log('add skill data22 =====> ', response);
//             if (response?.success) {
//               console.log(' add skill data =====> ', response.data);
//               setDataSource(response.data);
//             }
//           });
//         } catch (error) {
//             console.log("ye chaal");
//           ToastMessage(error.message);
//         }
//       };

//     const toggleModal = () => {
//         setModalStatus(!modalStatus);
//     };
//     const toggleModal1 = () => {
//         setModalVisible(!modalVisible);
//     };
//     const chargesToggleModal = () => {
//         setModalStatus(false);
//         setChargesModalStatus(!chargesModalStatus);
//     };
//     const renderItem2 = ({item}) => {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', marginTop: height(1) }}>
//             <TouchableOpacity
//             onPress={()=>{setserviceName(item?.name);setimage(item.image); toggleModal1()}}
//             //
//             style={{
//                 // width: width(44),
//                 marginHorizontal:width(1) ,
//                 // marginVertical: height(1),
//                 backgroundColor: "#fff",
//                 borderRadius: 20,
//                 shadowColor: "#2A2F3529",
//                 shadowOffset: {
//                     width: 0,
//                     height: 5,
//                 },
//                 shadowOpacity: 5.36,
//                 shadowRadius: 6.68,

//             }}>
//                 <ImageBackground
//                     source={{uri:item?.image}}
//                     style={{ resizeMode: 'cover', }}
//                     imageStyle={{ borderRadius: 30 }}
//                 >
//                     <View style={{
//                         backgroundColor: colors.snow,  marginTop: height(18),
//                         alignItems: 'center',  height: height(6), borderRadius: 10, justifyContent: 'center', elevation:2
//                     }}>
//                         <TinyTitle>{item?.category}</TinyTitle>
//                         <SmallText>{item.providers} service providers</SmallText>
//                     </View>
//                 </ImageBackground>

//             </TouchableOpacity>
//         </View>
//         )
//     };
//     const renderItem = ({ item }) => {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', marginTop: height(1) }}>
//                 <TouchableOpacity
//                 onPress={()=>{setserviceName(item?.name);setimage(item.image); toggleModal1()}}
//                 style={{

//                     // width: width(44),
//                     // marginVertical: height(1),
//                     marginHorizontal:width(1) ,
//                     // backgroundColor: "#fff",
//                     borderRadius: 10,
//                     backdropOpacity:'red',
//                     shadowColor: "#2A2F3529",
//                     shadowOffset: {
//                         width: 0,
//                         height: 5,
//                     },
//                     shadowOpacity: 5.36,
//                     shadowRadius: 6.68,

//                 }}>
//                     <ImageBackground
//                         // source={{uri:item?.image}}
//                         source={{uri:item?.image}}
//                         style={{  resizeMode: 'cover',marginHorizontal:width(1) ,}}
//                         imageStyle={{ borderRadius: 15 }}
//                     >
//                          <View style={{
//                         backgroundColor: colors.snow,  marginTop: height(18),marginHorizontal:totalSize(0),
//                         alignItems: 'center',  height: height(6), borderRadius: 10, justifyContent: 'center', elevation:2
//                     }}>
//                              <TinyTitle>{item?.name}</TinyTitle>
//                             <SmallText>{item.providers} service providers</SmallText>
//                         </View>
//                     </ImageBackground>

//                 </TouchableOpacity>
//             </View>
//         )
//     };
//     const renderItem3 = ({ item }) => {
//         return (
//             <View>
//                <Pressable style={styles.boxbraisView}
//                                 onPress={() => {setsubserviceName(item.title); toggleModal1(); props.navigation.navigate(routes.provider.setRate,{serviceName:serviceName,subserviceName:subserviceName,image:image})}}  >
//                               <Text style={styles.boxbraidtextStyle}>{item?.title} </Text>
//                                 <Text style={{color:'white'}}>(</Text>
//                                 <Text style={styles.quantatiyTextStyle}>{item?.quantity}</Text>
//                                 <Text style={{color:'white'}}>)</Text>

//                             </Pressable>
//             </View>
//         )
//     };

//     return (
//         <MainWrapper>
//             <StatusBar backgroundColor={"transparent"} barStyle={"dark-content"} />
//             <Header
//                 goBack={() => props.navigation.goBack()}
//                 heading={"Services"}
//                 color={colors.appColor1}
//             />
//             <ScrollView>
//                 <Wrapper
//                     // animation="fadeInDown"
//                     style={{ paddingHorizontal: width(5), marginTop: height(2), marginBottom: height(10) }}
//                 >
//                     <SmallTitle>Select services you can provide</SmallTitle>
//                     {dataSource?.length>0?
//                     <FlatList
//                     contentContainerStyle={{ paddingVertical: height(1.5) }}
//                         data={dataSource.filter(item=>item.image!=null&&item.name!=null)}
//                         renderItem={item => renderItem(item)}
//                         numColumns={2}
//                         keyExtractor={item => item.id}

//                     />
//                     : <Text>Data loding</Text>}

//                      <SmallTitle >Other Services</SmallTitle>
//                      {dataSource?.length>0?
//                     <FlatList
//                         data={dataSource.filter(item=>item.image!=null&&item.name!=null)}
//                         renderItem={ item => renderItem2(item)}
//                         numColumns={2}
//                         keyExtractor={item => item.id}
//                     />
//                     : <Text>Data loding</Text>}

//                 </Wrapper>

//                 <Modal
//                     isVisible={modalVisible}
//                     toggleModal={toggleModal1}
//                     onRequestClose={() => {
//                         setModalVisible(!modalVisible);
//                       }}

//                 >
//                     <View style={styles.modelMainContainer}>
//                         <Image
//                             source={{ uri: "https://media.istockphoto.com/photos/beard-grooming-picture-id506514230?k=20&m=506514230&s=612x612&w=0&h=YbxQjEWFBHJd2VIh8kXUCe_QhSlDprR78JCFm2E3Z2Q=" }}
//                             style={{ height: height(25), width: "100%", resizeMode: "contain", borderRadius: 10, }}
//                         />
//                         <View style={styles.braidtetView}>
//                             <Text style={styles.braisTextStyle}>{serviceName}</Text>
//                         </View>

//                         <FlatList
//                     contentContainerStyle={{ paddingVertical: height(1.5) }}
//                         data={DATA3}
//                         renderItem={item => renderItem3(item)}
//                         numColumns={1}
//                         keyExtractor={item => item.id}

//                     />

//                         {/* <ScrollView>
//                             <Pressable style={styles.boxbraisView}
//                                 onPress={() => { toggleModal1(); props.navigation.navigate(routes.provider.setRate); }}  >

//                               <Text style={styles.boxbraidtextStyle}>Box Braids </Text>

//                                 <Text style={{color:'white'}}>(</Text>
//                                 <Text style={styles.quantatiyTextStyle}>15</Text>
//                                 <Text style={{color:'white'}}>)</Text>

//                             </Pressable>
//                             <Pressable style={styles.boxbraisView}
//                                 onPress={() => { toggleModal1(); props.navigation.navigate(routes.provider.setRate,{}); }} >

//                                 <Text style={styles.boxbraidtextStyle}>Knotless Braids </Text>
//                                 <Text style={{color:'white'}}>(</Text>
//                                 <Text style={styles.quantatiyTextStyle}>23</Text>
//                                 <Text style={{color:'white'}}>)</Text>
//                             </Pressable>
//                             <Pressable style={styles.boxbraisView}
//                                 onPress={() => { toggleModal1(); props.navigation.navigate(routes.provider.setRate); }} >
//                                 <Text style={styles.boxbraidtextStyle}>Lemonade Braids </Text>
//                                 <Text style={{color:'white'}}>(</Text>
//                                 <Text style={styles.quantatiyTextStyle}>16</Text>
//                                 <Text style={{color:'white'}}>)</Text>
//                             </Pressable>
//                             <Pressable style={styles.boxbraisView}
//                                 onPress={() => { toggleModal1(); props.navigation.navigate(routes.provider.setRate);}} >
//                                 <Text style={styles.boxbraidtextStyle}>Individual Braids </Text>
//                                 <Text style={{color:'white'}}>(</Text>
//                                 <Text style={styles.quantatiyTextStyle}>16</Text>
//                                 <Text style={{color:'white'}}>)</Text>
//                             </Pressable>
//                             <Pressable style={styles.boxbraisView}
//                                 onPress={() => { toggleModal1(); props.navigation.navigate(routes.provider.setRate); }} >
//                                 <Text style={styles.boxbraidtextStyle}>Feed-in Braids </Text>
//                                 <Text style={{color:'white'}}>(</Text>
//                                 <Text style={styles.quantatiyTextStyle}>11</Text>
//                                 <Text style={{color:'white'}}>)</Text>
//                             </Pressable>
//                             <Pressable style={styles.boxbraisView}
//                                 onPress={() => { toggleModal1(); props.navigation.navigate(routes.provider.setRate); }} >
//                                 <Text style={styles.boxbraidtextStyle}>Crown Braids </Text>
//                                 <Text style={{color:'white'}}>(</Text>
//                                 <Text style={styles.quantatiyTextStyle}>11</Text>
//                                 <Text style={{color:'white'}}>)</Text>
//                             </Pressable>
//                             <Pressable style={styles.boxbraisView}
//                                 onPress={() => { toggleModal1(); props.navigation.navigate(routes.provider.setRate); }} >
//                                 <Text style={styles.boxbraidtextStyle}>Braided Up-Do </Text>
//                                 <Text style={{color:'white'}}>(</Text>
//                                 <Text style={styles.quantatiyTextStyle}>11</Text>
//                                 <Text style={{color:'white'}}>)</Text>
//                             </Pressable>

//                         </ScrollView> */}
//                     </View>

//                 </Modal>
//                 <ScrollView>
//                     <ModalColored
//                     style={{backgroundColor:"rgba(255,255,255,0.9)"}}
//                         isVisible={chargesModalStatus}
//                         toggleModal={chargesToggleModal}
//                         modalHeight={16}

//                         backdropOpacity={0}
//                         content={
//                             <View>
//                                 <MediumTitle style={{ textAlign: "center", fontFamily: fontFamily.appTextBold }}>Add Charges</MediumTitle>
//                                 <TextInputBordered
//                                     title={"Add Charges"}
//                                     value={chargesValue}
//                                     onChangeText={(val) => setChargesValue(val)}
//                                     placeholder={"Add Charges"}
//                                     containerStyle={{ marginTop: height(2) }}
//                                 />
//                                 <ButtonColored
//                                     text="Next"
//                                     buttonStyle={{ paddingHorizontal: width(5), borderRadius: 20, marginTop: height(4) }}
//                                     onPress={() => {
//                                         chargesToggleModal();
//                                         props.navigation.navigate(routes.provider.selectDate);
//                                     }}
//                                 />
//                             </View>
//                         }
//                     />
//                 </ScrollView>
//             </ScrollView>
//             {/* <AbsoluteWrapper style={{ bottom: width(5), left: width(5), right: width(5) }}>
//                     <ButtonColored
//                         text="Next"
//                         buttonStyle={{ paddingHorizontal: width(5), borderRadius: 12, marginHorizontal:0,
//                            }}
//                         onPress={toggleModal1}
//                     />
//                 </AbsoluteWrapper> */}
//         </MainWrapper>
//     );
// }

// export default AddSkills;
// const styles = StyleSheet.create({
//     braidtetView: {
//         // width:width(100),
//         height: height(9),
//         // backgroundColor:'red',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     braisTextStyle: {
//         fontFamily: fontFamily.appTextBold,
//         fontSize: fontSize.h4
//     },
//     boxbraisView: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginVertical: height(1.5)
//     },
//     boxbraidtextStyle: {
//         color: colors.snow,
//         fontFamily: fontFamily.appTextMedium,
//         fontSize: fontSize.large
//     },
//     quantatiyTextStyle: {
//         color: colors.black,
//         fontFamily: fontFamily.appTextMedium,
//     },
//     quantatiyInnerStyle: {
//         color: colors.black
//     },
//     modelMainContainer: {
//         backgroundColor: colors.appColor1,
//         borderRadius: 20,
//         paddingBottom: height(7),
//         height: height(68),
//         marginHorizontal: width(4),
//         marginBottom: height(7)
//     }

// })
