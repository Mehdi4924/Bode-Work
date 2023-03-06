import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  Text,
  Pressable,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {
  MainWrapperMatrial,
  Wrapper,
  Spacer,
  SmallText,
  MediumTitle,
  TextInputBordered,
  AbsoluteWrapper,
  TinyTitle,
  ModalColored,
  SmallTitle,
  ButtonColored,
  KeyboardAvoidingScrollView,
} from '../../../components';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  colors,
  fontFamily,
  sizes,
  ToastMessage,
  appImages,
  fontSize,
} from '../../../themes';
import {width, height, totalSize} from 'react-native-dimension';
import {routes} from '../../../services';
import ClientHeader from '../../../components/header/clientHeader';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {mapKey} from '../../../services/constants';
import {
  servicesclientHome,
  servicesclientHomefeature,
} from '../../../services/backend/client';
import {showServiceData} from '../../../services/backend/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import {setUserCordinates} from '../../../services/stores/actions/user';
import {SearchData} from '../../../services/backend/client';
const DATA2 = [
  {id: 1, title: 'Hair Stylist', images: appImages.haircut},
  {id: 2, title: 'Nail Art', images: appImages.nail},
  {id: 3, title: 'Barber', images: appImages.barber},
  {id: 4, title: 'Makeup', images: appImages.makeup},
];

const DATA = [
  {id: 4, title: 'Makeup', images: appImages.makeup},
  {id: 3, title: 'Barber', images: appImages.barber},
  {id: 1, title: 'Hair Stylist', images: appImages.haircut},
  {id: 2, title: 'Nail Art', images: appImages.nail},
];
const Home = props => {
  const param = props.route.params;
  console.log('param', param);
  const {navigate} = props.navigation;
  const dispatch = useDispatch();
  // const { latitude, longitude, address } = useSelector(state => state.user);
  // console.log("ye ay lat long",latitude,longitude,address);
  const [modalStatus, setModalStatus] = useState(false);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [otherServices, setOtherServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [activeTabs, setActiveTabs] = useState(0);
  const [DataSource, setDataSource] = useState('');
  const [allDataSource, setallDataSource] = useState('');
  const [DataSource2, setDataSource2] = useState('');
  const [allDataSource2, setallDataSource2] = useState('');
  const [serviceid, setServiceId] = useState('');
  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [chargesModalStatus, setChargesModalStatus] = useState(false);
  const [chargesValue, setChargesValue] = useState('$40');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedName, setselectedName] = useState('');
  const [subServiceName, setsubServiceName] = useState('');
  const [provider, setProvider] = useState('');
  const [addresss, setaddresss] = useState('');
  const [search, setsearch] = useState('');
  const [selectedImage, setselectedImage] = useState('');
  const [category, setCategory] = useState('');
  console.log('category>>>', category);
  // console.log("ye aya image link",selectedImage);
  // console.log("ye aya name", selectedName);
  const toggleModal = () => {
    setModalStatus(!modalStatus);
  };
  const toggleModal1 = () => {
    setModalVisible(!modalVisible);
  };
  const chargesToggleModal = () => {
    setModalStatus(false);
    setChargesModalStatus(!chargesModalStatus);
  };
  useEffect(() => {
    // getOneTimeLocation()
    //   getLocationName()
    getUserData();
    // const addresssss = AsyncStorage.getItem("setloaction");
    // console.log(">>>>>>>>>>>",addresssss);
    // getUserData2();
  }, []);
  // useEffect(() => {
  //   getLocationName(parseFloat(latitude), parseFloat(longitude));
  //   console.log("address=====> ", address);

  // }, [latitude, longitude, address]);
  useFocusEffect(
    React.useCallback(async () => {
      // getOneTimeLocation()
      // getLocationName()
      // getUserData();
      // getUserData2()
      const addresssss = await AsyncStorage.getItem('setloaction');
      console.log('>>>>>>>>>>>', addresssss);
      setaddresss(addresssss);
    }, []),
  );
  const getUserData = () => {
    setLoader(true);
    try {
      console.log('ye chala servicesclientHome ');
      servicesclientHomefeature().then(response => {
        // console.log("ye chala servicesclientHome 22");
        console.log(
          'servicesclientHome data22 =====> ',
          JSON.stringify(response, null, 2),
        );
        if (response?.success) {
          // console.log('servicesclientHome data =====> ', JSON.stringify(response,null,2));
          setDataSource(
            response?.data.filter(item => item?.service?.is_feature == true),
          );
          setallDataSource(
            response?.data.filter(item => item?.service?.is_feature == true),
          );
          setDataSource2(
            response?.data.filter(item => item?.service?.is_feature == false),
          );
          setallDataSource2(
            response?.data.filter(item => item?.service?.is_feature == false),
          );
          setLoader(false);
        }
      });
    } catch (error) {
      ToastMessage(error.message);
      setLoader(false);
    }
  };
  const getUserData2 = () => {
    setLoader(true);
    try {
      showServiceData().then(response => {
        console.log('showServiceData =====> ', response);
        if (response?.success) {
          console.log('showServiceData =====> ', response.data);
          setDataSource2(response?.data);
          setLoader(false);
        }
      });
    } catch (error) {
      ToastMessage(error.message);
      setLoader(false);
    }
  };
  const getsearchData = () => {
    // setLoader1(true)
    try {
      const data = {
        query: search,
      };
      SearchData(data).then(response => {
        setsearch('');
        console.log('search data =====> ', response);
        if (response?.success) {
          console.log('search data =====> ', response.data);
          if (response.data.is_feature != false) {
            setDataSource(response?.data);
          } else {
            setDataSource2(response?.data);
          }
          setLoader1(false);
        }
      });
    } catch (error) {
      ToastMessage(error.message);
      setLoader1(false);
    }
  };
  const renderItem2 = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          marginTop: height(0),
          paddingVertical: height(0.5),
        }}>
        <Pressable
          onPress={() => {
            setProvider(item?.providers),
              setsubServiceName(item?.subservice?.name),
              setselectedName(item?.service?.name),
              setselectedImage(item?.primary_image),
              setServiceId(item?.service?.id),
              setCategory(item?.subservice[0]?.category),
              toggleModal1();
          }}
          // onPress={()=>console.log("pressed item",JSON.stringify(item,null,2))}
          style={{
            // flex:0.5,
            // width: width(44),
            // marginHorizontal:width(1),
            // marginVertical: height(0),
            // backgroundColor: 'red',
            borderRadius: 15,
            // shadowColor: '#2A2F3529',
            // shadowOffset: {
            //   width: 0,
            //   height: 1,
            // },
            // shadowOpacity: 5.36,
            // shadowRadius: 6.68,
          }}>
          <ImageBackground
            source={{uri: item?.primary_image}}
            resizeMode="cover"
            style={{marginHorizontal: width(1)}}
            imageStyle={{borderRadius: 15}}>
            <View
              style={{
                backgroundColor: colors.snow,
                marginTop: height(20),
                // marginHorizontal: totalSize(0.4),
                alignItems: 'center',
                height: height(6),
                borderRadius: 15,
                justifyContent: 'center',
                elevation: 2,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fontFamily.appTextBold,
                  color: colors.black,
                }}
                numberOfLines={1}>
                {item?.service?.name}
              </Text>
              <SmallText>{item?.providers} service providers</SmallText>
            </View>
          </ImageBackground>
        </Pressable>
      </View>
    );
  };
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          width: width(48),
          justifyContent: 'space-between',
          marginTop: height(0),
          paddingVertical: height(0.5),
        }}>
        <Pressable
          onPress={() => {
            setProvider(item?.providers),
              setsubServiceName(item?.subservice?.name),
              setselectedName(item?.service?.name),
              setselectedImage(item?.primary_image),
              setServiceId(item?.service?.id),
              toggleModal1();
          }}
          // onPress={()=>console.log("pressed item",JSON.stringify(item,null,2))}
          // onPress={() => navigate(routes.client.selectAddress, {
          //             serviceName: "Nails",
          //           })}
          style={
            {
              // flex:0.5,
              // width: width(44),
              // marginHorizontal:width(1),
              // marginVertical: height(1),
              // backgroundColor: 'red',
              // // borderRadius: 50,
              // // shadowColor: '#2A2F3529',
              // shadowOffset: {
              //   width: 0,
              //   height: 5,
              // },
              // shadowOpacity: 5.36,
              // shadowRadius: 6.68,
            }
          }>
          <ImageBackground
            source={{uri: item?.primary_image}}
            style={{marginHorizontal: width(1)}}
            imageStyle={{borderRadius: 15}}>
            <View
              style={{
                backgroundColor: colors.snow,
                marginTop: height(20),
                // marginHorizontal: width(1),
                alignItems: 'center',
                height: height(6),
                borderRadius: 15,
                justifyContent: 'center',
                elevation: 2,
              }}>
              <TinyTitle style={{fontSize: 12}}>
                {item?.service?.name}
              </TinyTitle>
              <SmallText style={{fontSize: totalSize(1.25)}}>
                {item?.providers} service providers
              </SmallText>
            </View>
          </ImageBackground>
        </Pressable>
      </View>
    );
  };
  // useEffect(() => {
  //   getOneTimeLocation();
  //   getService();
  // }, []);
  // useEffect(() => {
  //   getLocationName(parseFloat(latitude), parseFloat(longitude));
  //   console.log("address=====> ", address);
  // }, [latitude, longitude, address]);
  // const getService = () => {
  //   try {
  //     services().then((response) => {
  //       if (response?.success) {
  //         let featured = [];
  //         let other = [];
  //         response?.data?.map(val => {
  //           if (val?.is_feature) {
  //             featured.push(val);
  //           } else {
  //             other.push(val);
  //           }
  //         })
  //         setFeaturedServices(featured);
  //         setOtherServices(other);
  //       } else {
  //         setFeaturedServices([]);
  //         setOtherServices([]);
  //       }
  //     })
  //   } catch (error) {
  //     ToastMessage(error.message);
  //   }
  // };
  // const toggleModal = () => {
  //   setModalStatus(!modalStatus);
  // };
  // const renderFeaturedServices = ({item, index}) => {
  //   const even = index % 2 === 0;
  //   return (
  //     <View
  //       key={index}
  //       style={{flex:1,justifyContent:'center'}}>
  //       <TouchableOpacity
  //         activeOpacity={.7}
  //         onPress={() => navigate(routes.client.selectAddress, {
  //           serviceName: "Hair",
  //         })}
  //         style={{
  //           backgroundColor: "#FFF",
  //           borderRadius: 20,
  //           shadowColor: "#000",
  //           shadowOffset: {
  //             width: 0,
  //             height: 5,
  //           },
  //           shadowOpacity: 0.36,
  //           shadowRadius: 6.68,
  //           elevation: 11,
  //           marginRight: even ? 0 : totalSize(2),
  //           marginLeft: totalSize(2),
  //           marginBottom: totalSize(2),
  //         }}>
  //         <Image
  //           source={{ uri: item?.image }}
  //           style={{height:height(20),width:"100%",resizeMode:'cover',borderRadius:20}}
  //         />
  //         <View style={{paddingHorizontal:width(3),paddingVertical:height(1)}}>
  //           <TinyTitle>{item?.name}</TinyTitle>
  //           <SmallText style={{opacity:0.5}}>129 service providers</SmallText>
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   )
  // };
  // const renderOtherServices = ({item, index}) => {
  //   console.log("item?.image", item?.image);
  //   return (
  //     <TouchableOpacity
  //       key={index}
  //       activeOpacity={.7}
  //       onPress={() => {
  //         toggleModal();
  //         setSubServices(item);
  //       }}
  //       style={{
  //         flex:1,
  //         justifyContent:'center',
  //         backgroundColor: "#FFF",
  //         borderRadius: 20,
  //         shadowColor: "#000",
  //         shadowOffset: {
  //           width: 0,
  //           height: 5,
  //         },
  //         shadowOpacity: 0.36,
  //         shadowRadius: 6.68,
  //         elevation: 11,
  //         alignItems:'center',
  //         paddingVertical: height(2),
  //         marginRight: totalSize(1),
  //         marginLeft: totalSize(1),
  //         marginBottom: totalSize(2),
  //       }}>
  //       <Image
  //         source={{ uri: item?.image }}
  //         style={{height:totalSize(6),width:"100%",resizeMode:'contain'}}
  //       />
  //       <View style={{paddingHorizontal:width(3),marginTop:height(2)}}>
  //         <TinyTitle style={{textAlign:"center",color:"#000"}}>
  //           {item?.name}
  //         </TinyTitle>
  //       </View>
  //     </TouchableOpacity>
  //   )
  // };
  // const renderSubervices = ({item, index}) => {
  //   return (
  //     <TouchableOpacity
  //       key={index}
  //       activeOpacity={.7}
  //       onPress={() => {
  //         toggleModal();
  //         navigate(routes.client.selectAddress, {
  //           serviceName: "Nails"
  //         });
  //       }}
  //       style={{flex:1,justifyContent:'center'}}>
  //       <View style={{
  //         backgroundColor: "#FFF",
  //         borderRadius: 20,
  //         shadowColor: "#000",
  //         shadowOffset: {
  //           width: 0,
  //           height: 5,
  //         },
  //         shadowOpacity: 0.36,
  //         shadowRadius: 6.68,
  //         elevation: 11,
  //         alignItems:'center',
  //         paddingVertical: height(2),
  //         marginRight: totalSize(1),
  //         marginLeft: totalSize(1),
  //         marginBottom: totalSize(2),
  //       }}>
  //         <Image
  //           source={{ uri: item?.image }}
  //           style={{height:totalSize(6),width:"100%",resizeMode:'contain'}}
  //         />
  //           <View style={{paddingHorizontal:width(3),marginTop:height(2)}}>
  //             <TinyTitle style={{textAlign:"center",color:"#000"}}>
  //               {item?.title}
  //             </TinyTitle>
  //           </View>
  //       </View>
  //     </TouchableOpacity>
  //   )
  // };
  const getOneTimeLocation = () => {
    console.log('ye chala onetime location');
    // setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //getting the Latitude from the location json
        const lat = position.coords.latitude;

        //getting the Longitude from the location json
        const lng = position.coords.longitude;

        //Setting Longitude state
        console.log('latitude =====> ', lat);
        AsyncStorage.setItem('currentLatitude', JSON.stringify(lat));

        //Setting Longitude state
        console.log('longitude =====> ', lng);
        AsyncStorage.setItem('currentLongitude', JSON.stringify(lng));

        getLocationName(parseFloat(lat), parseFloat(lng));
      },
      error => {
        // Alert.alert(
        //   "Location Service Permission",
        //   "Turn On Location Services to Allow Bode Work to Determine Your Location!",
        //   [
        //     {
        //       text: "Cancel",
        //       onPress: () => {
        //         ToastMessage("User Cancelled Location Service Permission")
        //       },
        //       style: "cancel"
        //     },
        //     {
        //       text: "Settings",
        //       onPress: () =>  AndroidOpenSettings.locationSourceSettings(),
        //       style: "default"
        //     }
        //   ]
        // );
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };
  const getLocationName = async (lat, lng) => {
    console.log('ye getname call howa');
    try {
      await Geocoder.fallbackToGoogle(mapKey);
      let response = await Geocoder.geocodePosition({lat, lng});
      let location = response[0].formattedAddress;

      const data = {
        latitude: lat,
        longitude: lng,
        address: location,
      };
      console.log('location =====> ', data);
      setaddresss(data.address);
      dispatch(setUserCordinates(data));
      // setaddresss(data.address)
    } catch (error) {
      // ToastMessage(error.message);
    }
  };

  return (
    <MainWrapperMatrial
      style2={{
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}>
      <StatusBar backgroundColor={colors.appColor1} barStyle={'dark-content'} />
      <ClientHeader
        heading={'home'}
        notification={true}
        iconLeftOnPress={() => navigate(routes.client.notifications)}
        headerStyle={{
          // borderTopLeftRadius:30,
          // borderTopRightRadius:30,
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
          paddingTop: totalSize(2),
          // backgroundColor:"red"
        }}
      />
      {/* <View style={{borderColor:"#FFF",borderWidth:.2}}></View> */}
      <KeyboardAvoidingScrollView>
        <Wrapper
          // animation="fadeInDown"
          style={{
            backgroundColor: colors.appColor1,
            // elevation: 2,
            paddingBottom: totalSize(2),
            paddingTop: totalSize(1),
          }}>
          <TinyTitle
            style={{
              color: '#FFF',
              marginHorizontal: width(8),
              marginBottom: 2,
              fontSize: totalSize(1.5),
              fontFamily: fontFamily.appTextMedium,
            }}>
            Location
          </TinyTitle>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: width(5),
              borderColor: '#FFF',
              borderWidth: 0.5,
              borderRadius: sizes.inputRadius,
              paddingRight: 14,
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TextInputBordered
                // value={param?.flag=="Location"?param.location:addresss}
                value={
                  param?.locationAdress && param?.locationAdress != null
                    ? param?.locationAdress
                    : addresss
                }
                onChangeText={val => {
                  setaddresss(val);
                }}
                placeholder={'17 Johnson Ave, NYC'}
                placeholderTextColor={'#fff'}
                editable={false}
                titleStyle={{color: '#FFF'}}
                inputStyle={{
                  color: '#FFF',
                  fontFamily: fontFamily.appTextRegular,
                }}
                inputContainerStyle={{
                  borderWidth: 0,
                  marginHorizontal: 0,
                  borderRadius: 0,
                }}
              />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigate(routes.client.selectLocation, {data: {flag: 'home'}})
                }
                style={{alignItems: 'center'}}>
                <SmallText style={{color: '#FFF'}}>Change</SmallText>
              </TouchableOpacity>
            </View>
          </View>
        </Wrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{position: 'relative', marginTop: totalSize(3)}}>
            <TextInputBordered
              value={search.trim()}
              // onChangeText={val => {
              //   {setsearch(val)}
              // }}
              onChangeText={text => {
                if (text.length > 0) {
                  let a =
                    allDataSource2?.length > 0
                      ? allDataSource2?.filter(item =>
                          item?.service?.name
                            ?.toLowerCase()
                            ?.includes(text?.toLowerCase()),
                        )
                      : null;
                  console.log(JSON.stringify(a, null, 2), 'result');
                  setDataSource2(a);
                  let b =
                  allDataSource?.length > 0
                      ? allDataSource?.filter(item =>
                          item?.service?.name
                            ?.toLowerCase()
                            ?.includes(text?.toLowerCase()),
                        )
                      : null;
                  setDataSource(b);
                } else {
                  setDataSource2(allDataSource2);
                  setDataSource(allDataSource);
                }
                setsearch(text);
              }}
              placeholder={'Search for services'}
              placeholderTextColor={'#21212180'}
              inputStyle={{
                color: 'grey',
                fontFamily: fontFamily.appTextRegular,
              }}
            />
            <AbsoluteWrapper style={{right: totalSize(4), top: totalSize(1.4)}}>
              <TouchableOpacity
              // onPress={()=>getsearchData()}
              >
                {loader1 ? (
                  <View>
                    <ActivityIndicator
                      size={totalSize(3)}
                      color={colors.appColor1}
                    />
                  </View>
                ) : (
                  <AntDesign
                    name="search1"
                    size={totalSize(2.5)}
                    color={colors.appColor1}
                  />
                )}
              </TouchableOpacity>
            </AbsoluteWrapper>
          </View>

          <Wrapper
            // animation="fadeInDown"
            style={{
              paddingHorizontal: width(2.5),
              marginTop: height(2),
              marginBottom: height(3),
            }}>
            <SmallTitle style={{marginHorizontal: width(2)}}>
              Featured Services
            </SmallTitle>
            {loader ? (
              <View>
                <ActivityIndicator
                  size={totalSize(3)}
                  color={colors.appColor1}
                />
              </View>
            ) : DataSource?.length > 0 ? (
              <FlatList
                contentContainerStyle={{marginVertical: 1}}
                data={DataSource}
                renderItem={item => renderItem(item)}
                numColumns={2}
                keyExtractor={item => item.id}
              />
            ) : (
              <View
                style={{
                  marginVertical: '15%',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text style={{color: 'grey'}}>No service found</Text>
              </View>
            )}

            <SmallTitle
              style={{marginTop: height(1.2), marginHorizontal: width(2)}}>
              Other Services
            </SmallTitle>
            {loader ? (
              <View>
                <ActivityIndicator
                  size={totalSize(3)}
                  color={colors.appColor1}
                />
              </View>
            ) : DataSource2?.length > 0 ? (
              <FlatList
                contentContainerStyle={{marginVertical: 1}}
                data={DataSource2}
                // data={DataSource2.filter(item=>item?.name!=DataSource2?.name )}
                renderItem={item => renderItem2(item)}
                numColumns={2}
                keyExtractor={item => item.id}
              />
            ) : (
              <View
                style={{
                  marginVertical: '15%',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text style={{color: 'grey'}}>No service found</Text>
              </View>
            )}
          </Wrapper>

          <Modal
            isVisible={modalVisible}
            toggleModal={toggleModal1}
            transparent={true}
            // style={{backgroundColor:"rgba(255,255,255,0.8)"}}
            // containerstyle={{ backgroundColor: "#FFF" }}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modelMainContainer}>
              <Image
                source={{uri: selectedImage}}
                style={{
                  height: height(25),
                  width: '100%',
                  resizeMode: 'contain',
                  borderRadius: 10,
                }}
              />
              <View style={styles.braidtetView}>
                <Text style={styles.braisTextStyle}>{selectedName}</Text>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Pressable
                  style={styles.boxbraisView}
                  onPress={() => {
                    toggleModal1();
                    navigate(routes.client.selectAddress, {
                      serviceName: 'Nails',
                      selectname: selectedName,
                      sericeid: serviceid,
                    });
                  }}>
                  {/* <View style={{}}> */}
                  <Text style={styles.boxbraidtextStyle}>
                    {subServiceName}{' '}
                  </Text>
                  {/* <Text style={styles.quantatiyTextStyle}>( <Text styles={styles.quantatiyInnerStyle}>12</Text>)</Text> */}
                  <Text style={{color: 'white'}}>(</Text>
                  <Text style={styles.quantatiyTextStyle}>{provider}</Text>
                  <Text style={{color: 'white'}}>)</Text>
                  {/* </View> */}
                </Pressable>
                {/* <Pressable style={styles.boxbraisView}
                onPress={() => {
                  toggleModal1(); navigate(routes.client.selectAddress, {
                    serviceName: "Nails", selectname: selectedName,sericeid:serviceid,category:category
                  })
                }} >

                <Text style={styles.boxbraidtextStyle}>Knotless Braids </Text>
                <Text style={{ color: 'white' }}>(</Text>
                <Text style={styles.quantatiyTextStyle}>23</Text>
                <Text style={{ color: 'white' }}>)</Text>
              </Pressable>
              <Pressable style={styles.boxbraisView}
                onPress={() => {
                  toggleModal1(); navigate(routes.client.selectAddress, {
                    serviceName: "Nails", selectname: selectedName,sericeid:serviceid,category:category
                  })
                }} >
                <Text style={styles.boxbraidtextStyle}>Lemonade Braids </Text>
                <Text style={{ color: 'white' }}>(</Text>
                <Text style={styles.quantatiyTextStyle}>16</Text>
                <Text style={{ color: 'white' }}>)</Text>
              </Pressable>
              <Pressable style={styles.boxbraisView}
                onPress={() => {
                  toggleModal1(); navigate(routes.client.selectAddress, {
                    serviceName: "Nails", selectname: selectedName,sericeid:serviceid,category:category
                  })
                }} >
                <Text style={styles.boxbraidtextStyle}>Individual Braids </Text>
                <Text style={{ color: 'white' }}>(</Text>
                <Text style={styles.quantatiyTextStyle}>16</Text>
                <Text style={{ color: 'white' }}>)</Text>
              </Pressable>
              <Pressable style={styles.boxbraisView}
                onPress={() => {
                  toggleModal1(); navigate(routes.client.selectAddress, {
                    serviceName: "Nails", selectname: selectedName,sericeid:serviceid,category:category
                  })
                }} >
                <Text style={styles.boxbraidtextStyle}>Feed-in Braids </Text>
                <Text style={{ color: 'white' }}>(</Text>
                <Text style={styles.quantatiyTextStyle}>11</Text>
                <Text style={{ color: 'white' }}>)</Text>
              </Pressable>
              <Pressable style={styles.boxbraisView}
                onPress={() => {
                  toggleModal1(); navigate(routes.client.selectAddress, {
                    serviceName: "Nails", selectname: selectedName,sericeid:serviceid,category:category
                  })
                }} >
                <Text style={styles.boxbraidtextStyle}>Crown Braids </Text>
                <Text style={{ color: 'white' }}>(</Text>
                <Text style={styles.quantatiyTextStyle}>11</Text>
                <Text style={{ color: 'white' }}>)</Text>
              </Pressable>
              <Pressable style={styles.boxbraisView}
                onPress={() => {
                  toggleModal1(); navigate(routes.client.selectAddress, {
                    serviceName: "Nails", selectname: selectedName,sericeid:serviceid,category:category
                  })
                }} >
                <Text style={styles.boxbraidtextStyle}>Braided Up-Do </Text>
                <Text style={{ color: 'white' }}>(</Text>
                <Text style={styles.quantatiyTextStyle}>11</Text>
                <Text style={{ color: 'white' }}>)</Text>
              </Pressable> */}
              </ScrollView>
            </View>
          </Modal>
        </ScrollView>
        {/* <Wrapper
          animation="fadeInDown"
          style={{
            marginTop: -totalSize(3),
            paddingTop: totalSize(1),
            elevation: 1,
          }}>
          <Spacer height={totalSize(4)} />
          <MediumTitle style={{color: '#000', paddingHorizontal: totalSize(2)}}>
            Featured Services
          </MediumTitle>
          <FlatList
            data={featuredServices}
            renderItem={renderFeaturedServices}
            numColumns={2}
            style={{marginTop: sizes.smallMargin}}
            keyExtractor={item => item.id}
          />
          <MediumTitle
            style={{
              color: '#000',
              marginTop: sizes.smallMargin * 2,
              paddingHorizontal: totalSize(2),
            }}>
            Other Services
          </MediumTitle>
          <FlatList
            data={otherServices}
            renderItem={renderOtherServices}
            numColumns={3}
            style={{
              marginTop: sizes.smallMargin,
              marginHorizontal: totalSize(1),
            }}
            keyExtractor={item => item.id}
          />
        </Wrapper>
      
      <ModalColored
        isVisible={modalStatus}
        toggleModal={toggleModal}
        title={'Braiding'}
        content={
          <FlatList
            data={subServices?.subservices}
            renderItem={renderSubervices}
            numColumns={3}
            style={{
              marginTop: sizes.smallMargin,
              marginHorizontal: totalSize(1),
            }}
            keyExtractor={item => item.id}
          />
        }
      /> */}
      </KeyboardAvoidingScrollView>
    </MainWrapperMatrial>
  );
};

export default Home;
const styles = StyleSheet.create({
  braidtetView: {
    // width:width(100),
    height: height(9),
    // backgroundColor:'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  braisTextStyle: {
    fontFamily: fontFamily.appTextBold,
    fontSize: fontSize.h4,
  },
  boxbraisView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height(1.2),
  },
  boxbraidtextStyle: {
    color: colors.snow,
    fontFamily: fontFamily.appTextMedium,
    fontSize: fontSize.large,
  },
  quantatiyTextStyle: {
    color: colors.black,
    fontFamily: fontFamily.appTextMedium,
  },
  quantatiyInnerStyle: {
    color: colors.black,
  },
  modelMainContainer: {
    backgroundColor: colors.appColor1,
    borderRadius: 20,
    paddingBottom: height(3.8),
    height: height(63),
    marginHorizontal: width(3.5),
    marginBottom: height(0),
    marginTop: height(2),
  },
});
