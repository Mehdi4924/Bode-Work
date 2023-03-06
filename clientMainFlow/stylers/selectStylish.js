import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  MainWrapperMatrial,
  Wrapper,
  SmallText,
  SmallTitle,
  ButtonColored,
  MediumText,
  RegularText,
  LargeText,
  TouchableCustomIcon,
} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  colors,
  appImages,
  fontFamily,
  fontSize,
  appIcons,
} from '../../../themes';
import {width, height, totalSize} from 'react-native-dimension';
import Header from '../../../components/header/header';
import Modal from 'react-native-modal';
import {routes} from '../../../services';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  showallStylistData,
  addFavoriteData,
  removeFavoriteData,
} from '../../../services/backend/client';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

// const DATA = [1, 2, 3, 4, 5];

const SelectStylish = props => {
  const param = props.route.params.data;
  console.log('ye aaya param on select stylist', param);
  const [loader, setLoader] = useState(false);
  const {userDetail} = useSelector(state => state.user);
  const {navigate, goBack} = props.navigation;
  const [modalVisible, setModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState('');
  const [fevorite, setfevorite] = useState('');
  const [stylistid, setstylistid] = useState('');
  console.log('ye i stylistid', userDetail.id);
  // console.log("aya data ",dataSource);
  const toggleModal1 = () => {
    setModalVisible(!modalVisible);
  };
  // useFocusEffect(
  //   React.useCallback(() => {
  //     getStylistData();
  //   }, [])
  // );
  useEffect(() => {
    getStylistData();
  }, []);

  const getStylistData = () => {
    setLoader(true);
    console.log('ye chala');
    try {
      const data = {
        user_id: userDetail?.id,
      };
      showallStylistData(data).then(response => {
        // console.log("ye chala22");
        // console.log('showallStylistData 22 =====> ', response);
        if (response?.success) {
          // console.log("ye chala33");
          console.log(
            ' showallStylistData data =====> ',
            JSON.stringify(response.data, null, 2),
          );
          setDataSource(response.data);
          setLoader(false);
        }
      });
    } catch (error) {
      // console.log("ye chaal");
      ToastMessage(error.message);
      setLoader(false);
    }
  };
  const addFavorite = (id, index) => {
    try {
      const data = {
        user_id: userDetail?.id,
        stylist_id: id,
      };
      addFavoriteData(data).then(response => {
        // console.log('addFavoriteData 22 =====> ', response);
        if (response?.success) {
          const newdata = [...dataSource];
          newdata[index].favorite_stylist = true;
          let a = dataSource.map(item => {
            if (item.id == id) {
              return {...item, favorite_stylist: true};
            } else {
              return item;
            }
          });
          setDataSource(a);
          // dataSource[index]=favorite_stylist(true)
          // setDataSource(dataSource);
          // // console.log(' addFavoriteData data =====> ', JSON.stringify(response.data, null, 2));
        }
      });
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  const removeFavorite = (id, index) => {
    try {
      const data = {
        user_id: userDetail?.id,
        stylist_id: id,
      };
      removeFavoriteData(data).then(response => {
        if (response?.success) {
          const newdata = [...dataSource];
          newdata[index].favorite_stylist = true;
          let a = dataSource.map(item => {
            if (item.id == id) {
              return {...item, favorite_stylist: false};
            } else {
              return item;
            }
          });
          setDataSource(a);
        }
      });
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  const renderItem = (item, index) => {
    return (
      <Wrapper
        // animation="fadeInDown"
        style={{
          backgroundColor: '#FFF',
          marginHorizontal: width(5),
          marginBottom: totalSize(1),
          borderRadius: 10,
          padding: totalSize(1.2),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,
          elevation: 2,
        }}>
        <Pressable
          onPress={() => {
            setstylistid(item.id),
              navigate(routes.client.stylistProfile, {stylistid: item.id,data:param});
          }}
          // onPress={() => console.log("seletdr item", item, index)}
        >
          <Pressable
            //  onPress={() => navigate(routes.client.jobDetail)}
            style={{
              flexDirection: 'row',
              borderBottomColor: colors.appColor1,
              borderBottomWidth: 2,
              paddingBottom: totalSize(1),
            }}>
            <View style={{justifyContent: 'center'}}>
              <Image
                source={appImages.imageOne}
                style={{
                  height: totalSize(8),
                  width: totalSize(8),
                  resizeMode: 'cover',
                  borderRadius: 100,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                marginLeft: totalSize(1),
              }}>
              <SmallTitle
                style={{
                  color: '#000',
                  fontFamily: fontFamily.gothicBold,
                  marginBottom: height(1),
                }}>
                {item?.first_name}{" "}{item?.last_name}
              </SmallTitle>
              <Text>
                <SmallText style={{color: '#000000'}}>4.9 </SmallText>
                <Image
                  source={appIcons.star}
                  resizeMode="cover"
                  style={{
                    height: 15,
                    width: 15,
                  }}
                />
              </Text>
            </View>
            {!item.favorite_stylist ? (
              <TouchableOpacity
                style={{marginTop: height(1), width: width(7)}}
                onPress={() => addFavorite(item.id, index)}>
                <Image
                  source={appIcons.hearto}
                  resizeMode="cover"
                  style={{
                    height: 23,
                    width: 25,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{marginTop: height(1), width: width(7)}}
                onPress={() => removeFavorite(item.id, index)}>
                <Image
                  source={appIcons.heart}
                  resizeMode="cover"
                  style={{
                    height: 27,
                    width: 29,
                  }}
                />
              </TouchableOpacity>
            )}
          </Pressable>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: colors.black,
                fontSize: 15,
                fontFamily: fontFamily.gothicBold,
                borderBottomWidth: 1,
                borderBottomColor: colors.black,
                marginVertical: totalSize(1),
              }}>
              ABOUT ME
            </Text>
          </View>
          {item?.about == null ? (
            <View style={{paddingHorizontal: width(3), height: height(13.5)}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: totalSize(1.79),
                  fontFamily: fontFamily.gothicRegular,
                  lineHeight: height(3.2),
                  marginBottom: height(1),
                  color: '#111111',
                }}>
                We like the sleek design and beautiful photos that complete it.
                You find it fascinating too? Here is proof thatsimple sites
                work...
              </Text>
            </View>
          ) : (
            <View style={{paddingHorizontal: width(3), height: height(13.5)}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: totalSize(1.79),
                  fontFamily: fontFamily.gothicRegular,
                  lineHeight: height(3.2),
                  marginBottom: height(1),
                  color: '#111111',
                }}>
                {item?.about}
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderTopWidth: 2,
              borderTopColor: colors.appColor1,
              paddingTop: height(0.7),
            }}>
            <View>
              <Text>
                <Ionicons
                  name="star"
                  size={totalSize(2.3)}
                  color={colors.appColor1}
                />
                {item.reviews != null ? (
                  <SmallText
                    style={{
                      color: '#111111',
                      fontSize: totalSize(1.65),
                      fontFamily: fontFamily.gothicRegular,
                    }}>
                    {' '}
                    81 Reiews
                  </SmallText>
                ) : (
                  <SmallText
                    style={{
                      color: '#111111',
                      fontSize: totalSize(1.65),
                      fontFamily: fontFamily.gothicRegular,
                    }}>
                    {' '}
                    {item.reviews}
                  </SmallText>
                )}
              </Text>
              <Text>
                <Image
                  source={appIcons.complete}
                  resizeMode="cover"
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
                <SmallText
                  style={{
                    color: '#111111',
                    fontSize: totalSize(1.65),
                    fontFamily: fontFamily.gothicRegular,
                  }}>
                  {' '}
                  {item.completed_jobs} Completed Styles
                </SmallText>
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: '#111111',
                  fontFamily: fontFamily.gothicRegular,
                  fontSize: totalSize(1.3),
                }}>
                Starting At
              </Text>
              <Text
                style={{
                  color: colors.appColor1,
                  fontFamily: fontFamily.gothicBold,
                  fontSize: totalSize(2.55),
                }}>
                ${item?.avg_price&&item?.avg_price!=null?item?.avg_price:'0'}
              </Text>
            </View>
          </View>
        </Pressable>
      </Wrapper>
    );
  };
  return (
    <MainWrapperMatrial style={{backgroundColor: '#FFF'}}>
      <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
      {
        // console.log("navi console aiiii ", JSON.stringify(dataSource, null, 2))
      }

      <View
        style={{
          flex: 1,
          backgroundColor: colors.appColor1,
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor:'red'
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Header
              goBack={() => goBack()}
              heading={'Select Stylist'}
              color={'#FFF'}
            />
          </View>
          <Pressable
            onPress={toggleModal1}
            style={{
              paddingRight: totalSize(3.5),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesome name="sort" size={totalSize(2)} color="#fff" />
            <RegularText style={{color: '#FFF', marginLeft: width(2)}}>
              Sort
            </RegularText>
          </Pressable>
        </View>

        {dataSource?.length > 0 ? (
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              contentContainerStyle={{paddingVertical: height(1.5)}}
              // data={dataSource }
              extraData={dataSource}
              data={dataSource.filter(
                item => item?.first_name != dataSource?.first_name,
              )}
              renderItem={({item, index}) => renderItem(item, index)}
              numColumns={1}
              keyExtractor={item => item.id}
            />
          </KeyboardAwareScrollView>
        ) : (
          <View>
            <ActivityIndicator size={totalSize(3)} color={colors.snow} />
          </View>
        )}
      </View>

      <Modal
        isVisible={modalVisible}
        toggleModal={toggleModal1}
        transparent={true}
        style={{backgroundColor: 'rgba(255,255,255,0.1)'}}
        // containerstyle={{ backgroundColor: "#FFF" }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modelMainContainer}>
          <Pressable
            onPress={() => toggleModal1()}
            style={[styles.modelSecondView, {backgroundColor: '#E5F2F2'}]}>
            <Text style={styles.modelTextStyle}>Price</Text>
          </Pressable>
          <Pressable
            onPress={() => toggleModal1()}
            style={styles.modelSecondView}>
            <Text style={styles.modelTextStyle}>Rating</Text>
          </Pressable>
          <Pressable
            onPress={() => toggleModal1()}
            style={styles.modelSecondView}>
            <Text style={styles.modelTextStyle}>Reviews</Text>
          </Pressable>
          <Pressable
            onPress={() => toggleModal1()}
            style={styles.modelSecondView}>
            <Text style={styles.modelTextStyle}>Recommended</Text>
          </Pressable>
        </View>
      </Modal>
    </MainWrapperMatrial>
  );
};

export default SelectStylish;

const styles = StyleSheet.create({
  modelMainContainer: {
    backgroundColor: colors.snow,
    borderRadius: 20,
    // paddingBottom: height(3.8),
    paddingVertical: height(1),
    // height: height(50),
    marginHorizontal: width(2),
    marginBottom: height(0),
    marginTop: height(2),
    // alignItems:'center',
    justifyContent: 'center',
  },
  modelSecondView: {
    height: 64,
    marginVertical: height(1),
    justifyContent: 'center',
    // backgroundColor:'#E5F2F2',
    marginHorizontal: width(3),
    paddingHorizontal: width(5),
    borderRadius: 20,
  },
  modelTextStyle: {
    fontFamily: fontFamily.appTextRegular,
    color: colors.black,
    fontSize: totalSize(1.8),
  },
});
