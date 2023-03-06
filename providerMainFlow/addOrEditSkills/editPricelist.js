import React, { Component, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  MainWrapper,
  RowWrapper,
  Wrapper,
  Spacer,
  TinyTitle,
  ComponentWrapper,
  RegularText,
  SmallTitle,
  ButtonColored,
  AbsoluteWrapper,
  ModalColored,
  MediumTitle,
  TextInputBordered,
  RowWrapperBasic,
  LargeText,
  KeyboardAvoidingScrollView
} from '../../../components';
import { appImages, appStyles, colors, fontFamily, sizes } from '../../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Icon, Image } from 'react-native-elements';
import { totalSize, height, width } from 'react-native-dimension';
import Header from '../../../components/header/header';
import { routes } from '../../../services';
import { mapKey } from '../../../services/constants';

const DATA = [
  { id: 1, title: 'Braiding', icon: '' },
  { id: 2, title: 'Flux Locs', icon: '' },
  { id: 3, title: 'Dreadlocks', icon: '' },
  { id: 4, title: 'Piercing', icon: '' },
  { id: 5, title: 'Tatto', icon: '' },
  { id: 6, title: 'Eyelashes', icon: '' },
  { id: 7, title: 'Perming', icon: '' },
  { id: 8, title: 'Beards', icon: '' },
  { id: 9, title: 'Waxing', icon: '' },
];

const editPricenewList = props => {
  const { data } = props?.route?.params
  console.log("yaya data",JSON.stringify(data,null,2));
  const [basecost, setbasecost] = useState(data?.item?.base_price!=null?data?.item?.base_price:20);
  const [basecosttime, setbasecosttime] = useState(data?.item?.base_time!=null?data?.item?.base_time:20);
  const [screenData, setScreenData] = useState(data);
  const [finalDataToSend, setFinalDataToSend] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  return (
    <MainWrapper>
      <KeyboardAvoidingScrollView>
        <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
        <Header
          goBack={() => props.navigation.goBack()}
          heading={'Set Rate'}
          color={colors.appColor1}
        />
        <ScrollView>
          <Spacer width={sizes.baseMargin} />
          <Text style={styles.headingText}>Flat Twist </Text>
          <RowWrapper>
            <View>
              <Text style={styles.toptextStyle}>Base Cost ($)</Text>
              <RowWrapperBasic style={[styles.radiusCounterContainer]}>
                <TouchableOpacity style={[styles.iconContainer]}
                  onPress={() => {
                    if (basecost < 500) {
                      setbasecost(basecost + 1)
                    }
                  }}>
                  <Ionicons
                    name='add'
                    size={totalSize(3)}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Spacer width={sizes.baseMargin} />
                <LargeText>{basecost}</LargeText>
                <Spacer width={sizes.baseMargin} />
                <TouchableOpacity style={[styles.iconContainer]}
                  onPress={() => {
                    if (basecost > 1) {
                      setbasecost(basecost - 1)
                    }
                  }}
                >
                  <AntDesign
                    name="minus"
                    size={totalSize(3)}
                    color={colors.appTextColor6}

                  />
                </TouchableOpacity>
              </RowWrapperBasic>
            </View>
            <View>
              <Text style={styles.toptextStyle}>Time (mins)</Text>
              <RowWrapperBasic style={[styles.radiusCounterContainer]}>
                <TouchableOpacity style={[styles.iconContainer]}
                  onPress={() => {
                    if (basecosttime < 500) {
                      setbasecosttime(basecosttime + 1)
                    }
                  }}
                >
                  <Ionicons
                    name='add'
                    size={totalSize(3)}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Spacer width={sizes.baseMargin} />
                <LargeText>{basecosttime}</LargeText>
                <Spacer width={sizes.baseMargin} />
                <TouchableOpacity style={[styles.iconContainer]}
                  onPress={() => {
                    if (basecosttime > 1) {
                      setbasecosttime(basecosttime - 1)
                    }
                  }}
                >
                  <AntDesign
                    name="minus"
                    size={totalSize(3)}
                    color={colors.appTextColor6}
                  />
                </TouchableOpacity>
              </RowWrapperBasic>
            </View>
          </RowWrapper>
          <Spacer width={sizes.baseMargin} />
          {screenData?.category?.map((item, index) => {
            console.log(JSON.stringify(screenData, null, 2), 'screen data');
            console.log(JSON.stringify(finalDataToSend, null, 2), 'final data top send');
            return (
              <>
                <Spacer width={sizes.baseMargin} />
                <Text style={styles.headingText}>{item?.name || "Category"}</Text>
                {item?.sub_categories?.map((subCat, subCatIndex) => {
                  return (
                    <RowWrapper>
                      <View>
                        <Text style={styles.toptextStyle}>{subCat?.name} ($)</Text>
                        <RowWrapperBasic style={[styles.radiusCounterContainer]}>
                          <TouchableOpacity style={[styles.iconContainer]}
                            onPress={() => {
                              const findedIndex = finalDataToSend?.length > 0 ? finalDataToSend.findIndex(ind => ind.category_id == item.id && ind.sub_category_id == subCat.id) : -1
                              if (findedIndex != -1) {
                                finalDataToSend[findedIndex].price = finalDataToSend[findedIndex]?.price + 1
                              } else {
                                const a = item?.sub_categories[subCatIndex]
                                setFinalDataToSend([...finalDataToSend, { category_id: a?.category_id, sub_category_name: subCat?.name, price: subCat?.price, time: subCat?.time }])
                              }
                              screenData.category[index].sub_categories[subCatIndex].price = screenData.category[index]?.sub_categories[subCatIndex]?.price + 1
                              setScreenData(screenData)
                              setRefreshing(!refreshing)
                            }}
                          >
                            <Ionicons
                              name='add'
                              size={totalSize(3)}
                              color="#fff"

                            />
                          </TouchableOpacity>
                          <Spacer width={sizes.baseMargin} />
                          <LargeText>{subCat?.price || "0"}</LargeText>
                          <Spacer width={sizes.baseMargin} />
                          <TouchableOpacity style={[styles.iconContainer]}
                            onPress={() => {
                              const findedIndex = finalDataToSend?.length > 0 ? finalDataToSend.findIndex(ind => ind.category_id == item.id && ind.sub_category_id == subCat.id) : -1
                              if (findedIndex != -1) {
                                finalDataToSend[findedIndex].price = finalDataToSend[findedIndex]?.price - 1
                              } else {
                                const a = item?.sub_categories[subCatIndex]
                                setFinalDataToSend([...finalDataToSend, { [`rates[${index}][category_id]`]: a?.category_id, [`rates[${index}][sub_category_name]`]: subCat?.name, [`rates[${index}][price]`]: subCat?.price, [`rates[${index}][time]`]: subCat?.time }])
                              }
                              screenData.category[index].sub_categories[subCatIndex].price = screenData.category[index]?.sub_categories[subCatIndex]?.price - 1
                              setScreenData(screenData)
                              setRefreshing(!refreshing)
                            }}
                          >
                            <AntDesign
                              name="minus"
                              size={totalSize(3)}
                              color={colors.appTextColor6}

                            />
                          </TouchableOpacity>
                        </RowWrapperBasic>
                      </View>
                      <View>
                        <Text style={styles.toptextStyle}>Time (mins)</Text>
                        <RowWrapperBasic style={[styles.radiusCounterContainer]}>
                          <TouchableOpacity style={[styles.iconContainer]}
                            onPress={() => {
                              const findedIndex = finalDataToSend?.length > 0 ? finalDataToSend.findIndex(ind => ind.category_id == item.id && ind.sub_category_id == subCat.id) : -1
                              if (findedIndex != -1) {
                                finalDataToSend[findedIndex].time = finalDataToSend[findedIndex]?.time + 1
                              } else {
                                const a = item?.sub_categories[subCatIndex]
                                setFinalDataToSend([...finalDataToSend, { category_id: a?.category_id, sub_category_id: subCat?.id, price: subCat?.price, time: subCat?.time }])
                              }
                              screenData.category[index].sub_categories[subCatIndex].time = screenData.category[index]?.sub_categories[subCatIndex]?.time + 1
                              setScreenData(screenData)
                              setRefreshing(!refreshing)
                            }}>
                            <Ionicons
                              name='add'
                              size={totalSize(3)}
                              color="#fff"
                            />
                          </TouchableOpacity>
                          <Spacer width={sizes.baseMargin} />
                          <LargeText>{subCat?.time || "0"}</LargeText>
                          <Spacer width={sizes.baseMargin} />
                          <TouchableOpacity style={[styles.iconContainer]}
                            onPress={() => {
                              const findedIndex = finalDataToSend?.length > 0 ? finalDataToSend.findIndex(ind => ind.category_id == item.id && ind.sub_category_id == subCat.id) : -1
                              if (findedIndex != -1) {
                                finalDataToSend[findedIndex].time = finalDataToSend[findedIndex]?.time - 1
                              } else {
                                const a = item?.sub_categories[subCatIndex]
                                setFinalDataToSend([...finalDataToSend, { category_id: a?.category_id, sub_category_id: subCat?.id, price: subCat?.price, time: subCat?.time }])
                              }
                              screenData.category[index].sub_categories[subCatIndex].time = screenData.category[index]?.sub_categories[subCatIndex]?.time - 1
                              setScreenData(screenData)
                              setRefreshing(!refreshing)
                            }}
                          >
                            <AntDesign
                              name="minus"
                              size={totalSize(3)}
                              color={colors.appTextColor6}
                            />
                          </TouchableOpacity>
                        </RowWrapperBasic>
                      </View>
                    </RowWrapper>
                  )
                })}

                <Spacer height={sizes.baseMargin} />
              </>
            )
          })}


          {/* <Text style={styles.headingText}>Flat Twist Added to Base Cost</Text>
          <RowWrapper>
            <View>
              <Text style={styles.toptextStyle}>Length $</Text>
              <RowWrapperBasic style={[styles.radiusCounterContainer]}>
                <TouchableOpacity style={[styles.iconContainer]}
                 onPress={() => {
                  if (basecostlength < 20) {
                    setbasecostlength(basecostlength + 1)
                  }
                }}>
                  <Ionicons
                    name='add'
                    size={totalSize(3)}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Spacer width={sizes.baseMargin} />
                <LargeText>{basecostlength}</LargeText>
                <Spacer width={sizes.baseMargin} />
                <TouchableOpacity style={[styles.iconContainer]}
                 onPress={() => {
                  if (basecostlength > 1) {
                    setbasecostlength(basecostlength - 1)
                  }
                }}
                >
                  <AntDesign
                    name="minus"
                    size={totalSize(3)}
                    color={colors.appTextColor6}
                   
                  />
                </TouchableOpacity>
              </RowWrapperBasic>
            </View>
            <View>
              <Text style={styles.toptextStyle}>Time (mins)</Text>
              <RowWrapperBasic style={[styles.radiusCounterContainer]}>
                <TouchableOpacity style={[styles.iconContainer]}
                 onPress={() => {
                  if (basecostlengthtime < 20) {
                    setbasecostlengthtime(basecostlengthtime + 1)
                  }
                }}
                >
                  <Ionicons
                    name='add'
                    size={totalSize(3)}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Spacer width={sizes.baseMargin} />
                <LargeText>{basecostlengthtime}</LargeText>
                <Spacer width={sizes.baseMargin} />
                <TouchableOpacity style={[styles.iconContainer]}
                 onPress={() => {
                  if (basecostlengthtime > 1) {
                    setbasecostlengthtime(basecostlengthtime - 1)
                  }
                }}
                >
                  <AntDesign
                    name="minus"
                    size={totalSize(3)}
                    color={colors.appTextColor6}
                  />
                </TouchableOpacity>
              </RowWrapperBasic>
            </View>
          </RowWrapper>
          <Spacer height={sizes.baseMargin} />
          <Text style={styles.headingText}>Set the rate of length Selection</Text>
          <RowWrapper>
            <View>
              <Text style={styles.toptextStyle}>Short (Shoulder) $</Text>
              <RowWrapperBasic style={[styles.radiusCounterContainer]}>
                <TouchableOpacity style={[styles.iconContainer]}
                 onPress={() => {
                  if (short < 20) {
                    setshort(short + 1)
                  }
                }}
                >
                  <Ionicons
                    name='add'
                    size={totalSize(3)}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Spacer width={sizes.baseMargin} />
                <LargeText>{short}</LargeText>
                <Spacer width={sizes.baseMargin} />
                <TouchableOpacity style={[styles.iconContainer]}
                 onPress={() => {
                  if (short > 1) {
                    setshort(short - 1)
                  }
                }}
                >
                  <AntDesign
                    name="minus"
                    size={totalSize(3)}
                    color={colors.appTextColor6}
                   
                  />
                </TouchableOpacity>
              </RowWrapperBasic>
            </View>
            <View>
              <Text style={styles.toptextStyle}>Time (mins)</Text>
              <RowWrapperBasic style={[styles.radiusCounterContainer]}>
                <TouchableOpacity style={[styles.iconContainer]}
                  onPress={() => {
                    if (shorttime < 20) {
                      setshorttime(shorttime + 1)
                    }
                  }}
                >
                  <Ionicons
                    name='add'
                    size={totalSize(3)}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Spacer width={sizes.baseMargin} />
                <LargeText>{shorttime}</LargeText>
                <Spacer width={sizes.baseMargin} />
                <TouchableOpacity style={[styles.iconContainer]}
                 onPress={() => {
                  if (shorttime > 1) {
                    setshorttime(shorttime - 1)
                  }
                }}
                >
                  <AntDesign
                    name="minus"
                    size={totalSize(3)}
                    color={colors.appTextColor6}
                   
                  />
                </TouchableOpacity>
              </RowWrapperBasic>
            </View>
          </RowWrapper>
          <RowWrapper>
            <View>
              <Text style={styles.toptextStyle}>Medium (BraStrap) $</Text>
              <RowWrapperBasic style={[styles.radiusCounterContainer]}>
                <TouchableOpacity style={[styles.iconContainer]}
                  onPress={() => {
                    if (medium < 20) {
                      setmedium(medium + 1)
                    }
                  }}
                >
                  <Ionicons
                    name='add'
                    size={totalSize(3)}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Spacer width={sizes.baseMargin} />
                <LargeText>{medium}</LargeText>
                <Spacer width={sizes.baseMargin} />
                <TouchableOpacity style={[styles.iconContainer]}
                  onPress={() => {
                    if (medium > 1) {
                      setmedium(medium - 1)
                    }
                  }}
                >
                  <AntDesign
                    name="minus"
                    size={totalSize(3)}
                    color={colors.appTextColor6}
                  
                  />
                </TouchableOpacity>
              </RowWrapperBasic>
            </View>
            <View>
              <Text style={styles.toptextStyle}>Time (mins)</Text>
              <RowWrapperBasic style={[styles.radiusCounterContainer]}>
                <TouchableOpacity style={[styles.iconContainer]}
                 onPress={() => {
                  if (mediumtime < 20) {
                    setmediumtime(mediumtime + 1)
                  }
                }}
                >
                  <Ionicons
                    name='add'
                    size={totalSize(3)}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Spacer width={sizes.baseMargin} />
                <LargeText>{mediumtime}</LargeText>
                <Spacer width={sizes.baseMargin} />
                <TouchableOpacity style={[styles.iconContainer]} onPress={() => {
                      if (mediumtime > 1) {
                        setmediumtime(mediumtime - 1)
                      }
                    }}
                
                >
                  <AntDesign
                    name="minus"
                    size={totalSize(3)}
                    color={colors.appTextColor6}
                   
                  />
                </TouchableOpacity>
              </RowWrapperBasic>
            </View>
          </RowWrapper>
          <RowWrapper>
            <View>
              <Text style={styles.toptextStyle}>Long (Waist) $</Text>
              <RowWrapperBasic style={[styles.radiusCounterContainer]}>
                <TouchableOpacity style={[styles.iconContainer]}
                 onPress={() => {
                  if (long < 20) {
                    setlong(long + 1)
                  }
                }}
                >
                  <Ionicons
                    name='add'
                    size={totalSize(3)}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Spacer width={sizes.baseMargin} />
                <LargeText>{long}</LargeText>
                <Spacer width={sizes.baseMargin} />
                <TouchableOpacity style={[styles.iconContainer]}
                 onPress={() => {
                  if (long > 1) {
                    setlong(long - 1)
                  }
                }}
                >
                  <AntDesign
                    name="minus"
                    size={totalSize(3)}
                    color={colors.appTextColor6}
                   
                  />
                </TouchableOpacity>
              </RowWrapperBasic>
            </View>
            <View>
              <Text style={styles.toptextStyle}>Time (mins)</Text>
              <RowWrapperBasic style={[styles.radiusCounterContainer]}>
                <TouchableOpacity style={[styles.iconContainer]}
                 onPress={() => {
                  if (longtime < 20) {
                    setlongtime(longtime + 1)
                  }
                }}
                >
                  <Ionicons
                    name='add'
                    size={totalSize(3)}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Spacer width={sizes.baseMargin} />
                <LargeText>{longtime}</LargeText>
                <Spacer width={sizes.baseMargin} />
                <TouchableOpacity style={[styles.iconContainer]}
                 onPress={() => {
                  if (longtime > 1) {
                    setlongtime(longtime - 1)
                  }
                }}
                >
                  <AntDesign
                    name="minus"
                    size={totalSize(3)}
                    color={colors.appTextColor6}
                   
                  />
                </TouchableOpacity>
              </RowWrapperBasic>
            </View>
          </RowWrapper>
          <RowWrapper>
            <View>
              <Text style={styles.toptextStyle}>Longer (Calf) $</Text>
              <RowWrapperBasic style={[styles.radiusCounterContainer]}>
                <TouchableOpacity style={[styles.iconContainer]}
                onPress={() => {
                  if (longer < 1) {
                    setlonger(longer + 1)
                  }
                }}
                >
                  <Ionicons
                    name='add'
                    size={totalSize(3)}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Spacer width={sizes.baseMargin} />
                <LargeText>{longer}</LargeText>
                <Spacer width={sizes.baseMargin} />
                <TouchableOpacity style={[styles.iconContainer]}
                 onPress={() => {
                  if (longer > 1) {
                    setlonger(longer - 1)
                  }
                }}
                >
                  <AntDesign
                    name="minus"
                    size={totalSize(3)}
                    color={colors.appTextColor6}
                   
                  />
                </TouchableOpacity>
              </RowWrapperBasic>
            </View>
            <View>
              <Text style={styles.toptextStyle}>Time (mins)</Text>
              <RowWrapperBasic style={[styles.radiusCounterContainer]}>
                <TouchableOpacity style={[styles.iconContainer]}
                 onPress={() => {
                  if (longertime < 20) {
                    setlongertime(longertime + 1)
                  }
                }}
                >
                  <Ionicons
                    name='add'
                    size={totalSize(3)}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Spacer width={sizes.baseMargin} />
                <LargeText>{longertime}</LargeText>
                <Spacer width={sizes.baseMargin} />
                <TouchableOpacity style={[styles.iconContainer]}
                 onPress={() => {
                  if (longertime > 1) {
                    setlongertime(longertime - 1)
                  }
                }}
                >
                  <AntDesign
                    name="minus"
                    size={totalSize(3)}
                    color={colors.appTextColor6}
                   
                  />
                </TouchableOpacity>
              </RowWrapperBasic>
            </View>
          </RowWrapper> */}
        </ScrollView>
        {data.flag == "edit" ?
          <ButtonColored
            text={'Save'}
            onPress={() => {
              const a = { ...data, rates: finalDataToSend }
              delete a.category
              delete a.servicename
              delete a.subservicename
              // console.log('>>>>>',JSON.stringify(a,null,2));
              props.navigation.navigate(routes.provider.editservice, { item:data.item, editdata: a, base_cast: basecost, base_ime: basecosttime ,flag:"price"})
            }}
            buttonStyle={{ marginTop: totalSize(10) }}
          /> :
          <ButtonColored
            text={'Save'}
            onPress={() => {
              const a = { ...data, rates: finalDataToSend }
              // delete a.category
              delete a.servicename
              delete a.subservicename
              // console.log('>>>>>',JSON.stringify(a,null,2));
              props.navigation.navigate(routes.provider.addSkills, { editdata: a, base_cast: basecost, base_time: basecosttime ,flag:"price"})
            }}
            buttonStyle={{ marginTop: totalSize(10) }}
          />}
        <Spacer height={sizes.baseMargin} />
      </KeyboardAvoidingScrollView>
    </MainWrapper>
  );
};

export default editPricenewList;
const styles = StyleSheet.create({
  headingText: {
    color: colors.black,
    fontFamily: fontFamily.appTextBold,
    fontSize: totalSize(1.6),
    marginLeft: width(6),
    marginTop: height(2)
  },
  iconContainer: {
    height: totalSize(5),
    width: totalSize(5),
    ...appStyles.center,
    backgroundColor: colors.appColor1,
    borderRadius: 10
  },
  radiusCounterContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.appColor1
  },
  toptextStyle: {
    color: colors.appColor1,
    fontFamily: fontFamily.appTextRegular,
    fontSize: totalSize(1.4),
    textAlign: 'center',
    marginVertical: height(1)
  }
})