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
import {editService} from '../../../services/backend/user';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VDropDown from '../../../components/VDropDown';
import {
  showServiceData,
  showSingleServiceData,
} from '../../../services/backend/user';
const DATA2 = [
  {id: 1, title: 'Hair Stylist', images: appImages.haircut},
  {id: 2, title: 'Nail Art', images: appImages.nail},
  {id: 3, title: 'Barber', images: appImages.barber},
  {id: 4, title: 'Makeup', images: appImages.makeup},
];
const EditService = props => {
  const param = props.route.params;
  console.log('ye aya param on edit service', JSON.stringify(param, null, 2));
  const {navigate, goBack, replace} = props.navigation;
  const {userDetail} = useSelector(state => state.user);
  console.log('user detail', userDetail);
  const [loader, setLoader] = useState(false);
  // const [servicid, setservicid] = useState(param.item.id!=undefined?param.item.id:param.id);
  // const [ServiceCategory, setServiceCategory] = useState(param?.item?.category!=null?param?.item?.category:'');
  // const [Subcategory, setSubcategory] = useState(param?.item?.subservice!=null?param?.item?.subservice:'');
  const [chargesModalStatus, setChargesModalStatus] = useState(false);
  const [chargesValue, setChargesValue] = useState('$40');
  const [DataSource, setDataSource] = useState('');
  const [category, setcategory] = useState(param?.item?.category);
  const [phone, setphone] = useState('Select Price');
  const [zipcode, setzipcode] = useState();
  const [ProfileImage, setProfileImage] = useState(param?.item?.primary_image);
  // const [ProfileImage, setProfileImage] = useState("");
  console.log('ye i primary image', ProfileImage);
  const [ProfileImageArry, setProfileImageArry] = useState(
    param?.item?.image != null ? param?.item?.image : '',
  );
  console.log('ye i arry', ProfileImageArry);
  const [invitationModalStatus, setInvitationModalStatus] = useState(false);
  const [service, setservice] = useState('');
  console.log('ye i service', service);
  const [subservice, setsubservice] = useState('');
  const [serviceid, setserviceid] = useState('');
  const [servicename, setservicename] = useState(
    param?.item?.service?.name != null ? param?.item?.service?.name : '',
  );
  const [subserviceid, setsubserviceid] = useState('');
  const [subservicename, setsubservicename] = useState(
    param?.item?.subservice?.name != null ? param?.item?.subservice?.name : '',
  );
  const [object, setobject] = useState('');
  const [editImage, setEditImage] = useState(false);
  console.log('ye aya object', object);
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
        setEditImage(true);
        console.log(response);
      },
    );
  };
  const pickImagemulti = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,

        selectionLimit: 5,
      },
      async response => {
        const newArry = [...ProfileImageArry, response.assets[0]];
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
  const getService22 = () => {
    setLoader(true);
    try {
      const data = {
        stylist_id: userDetail?.id,
        //     // stylist_id: '81',
      };
      showSingleServiceData(data).then(response => {
        console.log('showservices data22 =====> ', response.data);
        setLoader(false);
        if (response?.success) {
          // console.log(' showservices data =====> ', response.data[0].subservice[0].category);
          // setDataSource(response.data);
          // setservice(response?.data[0]?.service)
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
    formdata.append('service_id', '1');
    formdata.append('stylist_service_id', param?.item?.id);

    // formdata.append('service_id',serviceid );
    // formdata.append('sub_service_id', subserviceid);
    formdata.append(
      'sub_service_id',
      subserviceid != '' ? subserviceid : param?.item?.sub_service_id,
    );
    formdata.append('description', 'my first service');
    // formdata.append("rates[]",JSON.stringify(object));
    formdata.append(
      'rates[]',
      JSON.stringify(param?.category?.length > 0 ? param?.category : category),
    );
    {
      editImage
        ? formdata.append('primary_image', {
            uri: ProfileImage?.uri,
            type: ProfileImage?.type,
            name: ProfileImage?.fileName,
          })
        : null;
    }
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
      param?.base_cast != null ? param?.base_cast : param?.base_price,
    );
    formdata.append(
      'base_time',
      param?.base_time != null ? param?.base_time : '20',
    );
    // formdata.append("primary_image", {
    //   uri: ProfileImage?.uri,
    //   type: ProfileImage?.type,
    //   name: ProfileImage?.fileName,
    // });
    // formdata.append("primary_image",
    //  {}
    // );
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
    //   formdata.append("image[]",{uri:ProfileImageArry.uri,
    //   type:ProfileImageArry.type,
    // name:ProfileImageArry.name})
    console.log('form data edit screen', formdata);
    editService(formdata).then(response => {
      console.log('edit service reponse =====> ', response);
      if (response?.success == true) {
        setLoader(false);
        invitationToggleModal();
        // console.log("ye chaka a aa");
        // console.log('add service reponse =====> ', response.data);
        // setInvitationModalStatus(true)
        // setDataSource(response?.data);
      } else {
        // ToastMessage(response.message);
        console.log('else chala');
        invitationToggleModal();
        setLoader(false);
      }
    });
  };
  const deleteImage = item => {
    let a = ProfileImageArry.filter(itemm => itemm != item);
    setProfileImageArry(a);
  };
  const renderItem = ({item}) => {
    if (item) {
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
              source={{uri: item?.uri != null ? item?.uri : item}}
              style={{
                resizeMode: 'cover',
                height: height(14),
                width: width(28),
                marginHorizontal: width(1),
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
                  marginTop: height(0.5),
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
        heading={'Edit Service'}
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
          source={{
            uri: ProfileImage.uri != null ? ProfileImage.uri : ProfileImage,
          }}
          style={{
            // : <ImageBackground source={ProfileImage}style={{
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
              <Pressable
                onPress={() => {
                  pickImage();
                }}
                // animation="fadeInUp"
                style={[
                  {
                    alignItems: 'center',
                  },
                ]}>
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
              </Pressable>
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
              defaultValue={servicename}
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
              defaultValue={subservicename}
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
                    category_id: subservice[index]?.category[0]?.id,
                    sub_category_id:
                      subservice[index]?.category[0]?.sub_categories[0]?.id,
                    price:
                      subservice[index]?.category[0]?.sub_categories[0]?.price,
                    time: subservice[index]?.category[0]?.sub_categories[0]
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
              value={
                param?.base_cast != null
                  ? param?.base_cast
                  : param?.item?.base_price
              }
              onPressIcon={() => props.navigation.navigate(routes.pricenewList)}
            />
            <AbsoluteWrapper
              style={{right: totalSize(3.2), top: totalSize(5.2)}}>
              <Entypo
                onPress={() =>
                  props.navigation.navigate(routes.provider.editpricelistt, {
                    data: {
                      item: param.item,
                      flag: 'edit',
                      serviceid: serviceid,
                      subserviceid: subserviceid,
                      category: param?.item?.category,
                      servicename: servicename,
                      subservicename: subservicename,
                    },
                  })
                }
                name="chevron-small-right"
                size={totalSize(3)}
                color={colors.appColor1}
              />
            </AbsoluteWrapper>
            {/* <AbsoluteWrapper 
         
          style={{right: totalSize(3.2), top: totalSize(5.2)}}>
            <Entypo
             onPress= {()=>props.navigation.navigate(routes.provider.editpricelistt,{flag:'edit',})}
              name="chevron-small-right"
              size={totalSize(3)}
              color={colors.appColor1}
            />
          </AbsoluteWrapper> */}
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
                data={ProfileImageArry}
                horizontal={true}
                renderItem={item => renderItem(item)}
                keyExtractor={item => item.id}
              />
            </RowWrapper>
          </Wrapper>
        </Wrapper>
        <Spacer height={sizes.smallMargin} />
        <Spacer height={sizes.smallMargin} />
        {loader ? (
          <View>
            <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
          </View>
        ) : (
          <ButtonColored
            text="Save"
            onPress={() => {
              {
                ProfileImage == ''
                  ? ToastMessage('please select profile image')
                  : // chargesToggleModal()
                    AddService();
              }
            }}
          />
        )}
        <Spacer height={sizes.smallMargin} />
        <Spacer height={sizes.smallMargin} />
      </KeyboardAvoidingScrollView>
      {/* <ModalColored
            style={{backgroundColor: 'rgba(255,255,255,0.85)'}}
            isVisible={chargesModalStatus}
            toggleModal={chargesToggleModal}
            modalHeight={9}
            containerstyle={{
              backgroundColor: colors.snow,
              elevation:100,
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
                    color:colors.appColor1
                  }}>
                  New Service
                </MediumTitle>
           <View style={{alignSelf:'center' ,marginTop:height(3.5)}}>
           <ImageBackground
           source={{uri:ProfileImage.uri}}
            style={{resizeMode:"cover",marginHorizontal:width(1)}}
            imageStyle={{borderRadius: 10}}>
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
                paddingHorizontal:width(7)
              }}>
              <TinyTitle>{ServiceCategory}</TinyTitle>
              <SmallText style={{fontSize:totalSize(1.2),width:width(28),textAlign:'center'}}>{Subcategory}</SmallText>
            </View>
          </ImageBackground>
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
          /> */}
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
              Service edited Successfully!
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

export default EditService;
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
