import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import {
  MainWrapper,
  RowWrapper,
  Wrapper,
  Spacer,
  TinyTitle,
  ComponentWrapper,
  RegularText,
  SmallText,
  SmallTitle,
  ButtonColored,
  AbsoluteWrapper,
  ModalColored,
  MediumTitle,
  TextInputBordered,
} from '../../../components';
import {
  appImages,
  appStyles,
  colors,
  fontFamily,
  fontSize,
  sizes,
  ToastMessage,
} from '../../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon, Image} from 'react-native-elements';
import {totalSize, height, width} from 'react-native-dimension';
import Header from '../../../components/header/header';
import {routes} from '../../../services';
import Modal from 'react-native-modal';
import {ImageBackground} from 'react-native';
import {Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import { servicesclientHome ,servicesclientHomefeature} from '../../../services/backend/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import { BlurView } from "@react-native-community/blur";
import { KeyboardAvoidingView } from 'react-native';
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

const Services = props => {
  const param =props.route.params.details
console.log("ye aya param",param);
  const [activeTabs, setActiveTabs] = useState(0);
  const [modalStatus, setModalStatus] = useState(false);
  const [chargesModalStatus, setChargesModalStatus] = useState(false);
  const [chargesValue, setChargesValue] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [serviceName, setserviceName] = useState("");
  const [serviceId, setserviceId] = useState("");
  const [basetime, setBaseTime] = useState("");
  console.log('ye i serviceName', serviceId);
  const {navigate, goBack, replace} = props.navigation;
  const {userDetail} = useSelector(state => state.user);
  console.log('ye i services details', userDetail);
  const [DataSource, setDataSource] = useState("");
  const [DataSource2, setDataSource2] = useState("");
  const [focus, setfocus] = useState(false);
  const [loader, setLoader] = useState(false);
  const [subServiceName, setsubServiceName] = useState("");
  const [provider, setProvider] = useState("");

  // useFocusEffect(() => {
  //   getUserData();
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      getUserData();
    }, []),
  );
  const getUserData = () => {
    setLoader(true)
    try {
      console.log("ye chala servicesclientHome ");
      servicesclientHomefeature().then(response => {
        // console.log("ye chala servicesclientHome 22");
        console.log('servicesclientHome data22 =====> ', response);
        if (response?.success) {
          console.log('servicesclientHome data =====> ', JSON.stringify(response,null,2));
          setDataSource(response?.data.filter(item=>item?.service?.is_feature==true));
          setDataSource2(response?.data.filter(item=>item?.service?.is_feature==false));
          setLoader(false)
        }
      });
    } catch (error) {
      ToastMessage(error.message);
      setLoader(false)
    }
  };
  // const getUserData = () => {
  //   console.log('focus effect chala');
  //   try {
  //     //   const data = {
  //     //     user_id: userDetail?.id,
  //     //     viewer_id: 1,
  //     //   };
  //     showServiceData().then(response => {
  //       console.log('DATAservices =====> ', response);
  //       if (response?.success) {
  //         console.log('DATAserviuces =====> ', response.data);
  //         setDataSource(response?.data);
  //       }
  //     });
  //   } catch (error) {
  //     ToastMessage(error.message);
  //   }
  // };
 const onFocus=() =>{
  setfocus(true)
  }
 const onBlur=() =>{
  setfocus(false)
  }
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
  const renderItem2 = ({ item }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', marginTop: height(0), paddingVertical: height(0.5) }}>
        <Pressable
         onPress={()=>{
          setProvider(item?.providers),setsubServiceName(item?.subservice?.name),
          setserviceName(item?.service?.name);
          setserviceId(item?.service?.id)
          setBaseTime(item?.base_time)
        }}
          //  onPress={console.log("pressed item",item)}
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
            source={{ uri: item?.primary_image }}
            resizeMode='cover'
            style={{ marginHorizontal: width(1) }}
            imageStyle={{ borderRadius: 15 }}>
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
              <Text style={{ fontSize: 12, fontFamily: fontFamily.appTextBold, color: colors.black }} numberOfLines={1}>{item?.service?.name}</Text>
              <SmallText style={{ fontSize: totalSize(1.25) }}>
                {item?.providers} service providers
              </SmallText>
            </View>
          </ImageBackground>
        </Pressable>
      </View>
    );
  };
  const renderItem = ({ item }) => {
    return (
      <View style={{
        width:width(48), justifyContent: "space-between",
        marginTop: height(0), paddingVertical: height(0.5)
      }}>
        <Pressable
          onPress={()=>{
            setProvider(item?.providers),setsubServiceName(item?.subservice?.name),
            setserviceName(item?.service?.name);
            setserviceId(item?.service?.id)
            setBaseTime(item?.base_time)}
            }
          // onPress={console.log("pressed item",item)}
          // onPress={() => navigate(routes.client.selectAddress, {
          //             serviceName: "Nails",
          //           })}
          style={{
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
          }}>
          <ImageBackground
            source={{ uri: item?.primary_image }}
            style={{ marginHorizontal: width(1) }}
            imageStyle={{ borderRadius: 15 }}
          >
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
              <TinyTitle style={{ fontSize: 12, }}>{item?.service?.name}</TinyTitle>
              <SmallText style={{ fontSize: totalSize(1.25) }}>
                {item?.providers} service providers
              </SmallText>
            </View>
          </ImageBackground>
        </Pressable>
      </View>
    );
  };

  return (
    <MainWrapper>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <Header
        goBack={() => props.navigation.goBack()}
        heading={'Services'}
        color={colors.appColor1}
      />
      <ScrollView>
        <Wrapper
          //   animation="fadeInDown"
          style={{
            paddingHorizontal: width(5),
            marginTop: height(2),
            marginBottom: height(10),
          }}>
          <SmallTitle>Select services you can provide</SmallTitle>
          {loader ? (
            <View>
              <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
            </View>
          ) : DataSource?.length > 0 ? (
          <FlatList
            contentContainerStyle={{paddingVertical: height(1.5)}}
            data={DataSource}
            renderItem={item => renderItem(item)}
            numColumns={2}
            keyExtractor={item => item.id}
          /> ) : (
            <View
              style={{
                marginVertical: '15%',
                alignItems: 'center',
                width: '100%',
              }}>
              <Text style={{color:'grey'}} >No data found</Text>
            </View>
        )}

          <SmallTitle>Other Services</SmallTitle>
          {loader ? (
            <View>
              <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
            </View>
          ) : DataSource2?.length > 0 ? (
          <FlatList
            data={DataSource2}
            renderItem={item => renderItem2(item)}
            numColumns={2}
            keyExtractor={item => item.id}
          /> ) : (
            <View
              style={{
                marginVertical: '15%',
                alignItems: 'center',
                width: '100%',
              }}>
              <Text style={{color:'grey'}} >No data found</Text>
            </View>
        )}
        </Wrapper>

        <Modal
          isVisible={modalVisible}
          toggleModal={toggleModal1}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modelMainContainer}>
            <Image
              source={{
                uri: 'https://media.istockphoto.com/photos/beard-grooming-picture-id506514230?k=20&m=506514230&s=612x612&w=0&h=YbxQjEWFBHJd2VIh8kXUCe_QhSlDprR78JCFm2E3Z2Q=',
              }}
              style={{
                height: height(25),
                width: '100%',
                resizeMode: 'contain',
                borderRadius: 10,
              }}
            />
            <View style={styles.braidtetView}>
              <Text style={styles.braisTextStyle}>{serviceName}</Text>
            </View>

            <ScrollView>
              <Pressable
                style={styles.boxbraisView}
                onPress={() => {
                  toggleModal1();
                  chargesToggleModal();
                }}>
                {/* <View style={{}}> */}
                <Text style={styles.boxbraidtextStyle}>{subServiceName}{" "}</Text>
                {/* <Text style={styles.quantatiyTextStyle}>( <Text styles={styles.quantatiyInnerStyle}>12</Text>)</Text> */}
                <Text style={{color: 'white'}}>(</Text>
                <Text style={styles.quantatiyTextStyle}>{provider}</Text>
                <Text style={{color: 'white'}}>)</Text>
                {/* </View> */}
              </Pressable>
              {/* <Pressable
                style={styles.boxbraisView}
                onPress={() => {
                  toggleModal1();
                  chargesToggleModal();
                }}>
                <Text style={styles.boxbraidtextStyle}>Knotless Braids </Text>
                <Text style={{color: 'white'}}>(</Text>
                <Text style={styles.quantatiyTextStyle}>23</Text>
                <Text style={{color: 'white'}}>)</Text>
              </Pressable>
              <Pressable
                style={styles.boxbraisView}
                onPress={() => {
                  toggleModal1();
                  chargesToggleModal();
                }}>
                <Text style={styles.boxbraidtextStyle}>Lemonade Braids </Text>
                <Text style={{color: 'white'}}>(</Text>
                <Text style={styles.quantatiyTextStyle}>16</Text>
                <Text style={{color: 'white'}}>)</Text>
              </Pressable>
              <Pressable
                style={styles.boxbraisView}
                onPress={() => {
                  toggleModal1();
                  chargesToggleModal();
                }}>
                <Text style={styles.boxbraidtextStyle}>Individual Braids </Text>
                <Text style={{color: 'white'}}>(</Text>
                <Text style={styles.quantatiyTextStyle}>16</Text>
                <Text style={{color: 'white'}}>)</Text>
              </Pressable>
              <Pressable
                style={styles.boxbraisView}
                onPress={() => {
                  toggleModal1();
                  chargesToggleModal();
                }}>
                <Text style={styles.boxbraidtextStyle}>Feed-in Braids </Text>
                <Text style={{color: 'white'}}>(</Text>
                <Text style={styles.quantatiyTextStyle}>11</Text>
                <Text style={{color: 'white'}}>)</Text>
              </Pressable>
              <Pressable
                style={styles.boxbraisView}
                onPress={() => {
                  toggleModal1();
                  chargesToggleModal();
                }}>
                <Text style={styles.boxbraidtextStyle}>Crown Braids </Text>
                <Text style={{color: 'white'}}>(</Text>
                <Text style={styles.quantatiyTextStyle}>11</Text>
                <Text style={{color: 'white'}}>)</Text>
              </Pressable>
              <Pressable
                style={styles.boxbraisView}
                onPress={() => {
                  toggleModal1();
                  chargesToggleModal();
                }}>
                <Text style={styles.boxbraidtextStyle}>Braided Up-Do </Text>
                <Text style={{color: 'white'}}>(</Text>
                <Text style={styles.quantatiyTextStyle}>11</Text>
                <Text style={{color: 'white'}}>)</Text>
              </Pressable> */}
            </ScrollView>
          </View>
        </Modal>
        <ScrollView>
          <KeyboardAvoidingView>
          <ModalColored
            style={{backgroundColor: 'rgba(255,255,255,0.9)'}}
            isVisible={chargesModalStatus}
            toggleModal={chargesToggleModal}
            modalHeight={!focus?16:2}
            onFocus={ () => onFocus() }
            containerstyle={{
              backgroundColor: colors.snow,
              borderTopRightRadius: 45,
              borderTopLeftRadius: 45,
            }}
            backdropOpacity={0}
            content={
              <View>
                <MediumTitle
                  style={{
                    textAlign: 'center',
                    fontFamily: fontFamily.appTextBold,
                  }}>
                  Add Charges
                </MediumTitle>
                <TextInputBordered
                  title={'Add Charges'}
                  value={chargesValue}
                  onFocus={ () => onFocus() }
                  onBlur={ () => onBlur() }     
                  onChangeText={val => setChargesValue(val)}
                  placeholder={'Add Charges'}
                  inputStyle={{fontFamily: fontFamily.appTextMedium}}
                  containerStyle={{marginTop: height(2)}}
                />
                <ButtonColored
                  text="Next"
                  buttonStyle={{
                    paddingHorizontal: width(5),
                    borderRadius: 10,
                    marginTop: height(4),
                  }}
                  onPress={() => {
                    
                    chargesToggleModal();
                    props.navigation.navigate(routes.provider.selectDate,{details:{clientdetails:param,serviceid:serviceId,price:chargesValue,basetime:basetime}});
                  }}
                />
              </View>
            }
          />
          </KeyboardAvoidingView>
        </ScrollView>
      </ScrollView>
      <AbsoluteWrapper
        style={{bottom: width(5), left: width(5), right: width(5)}}>
        <ButtonColored
          text="Next"
          buttonStyle={{
            paddingHorizontal: width(5),
            borderRadius: 10,
            marginHorizontal: 0,
          }}
          onPress={()=>
            serviceName!=""&&
            serviceName!=null
            ?toggleModal1()
          :ToastMessage("Please select service")}
        />
      </AbsoluteWrapper>
    </MainWrapper>
  );
};

export default Services;
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
    marginVertical: height(1.5),
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
    paddingBottom: height(7),
    height: height(68),
    marginHorizontal: width(4),
    marginBottom: height(7),
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
