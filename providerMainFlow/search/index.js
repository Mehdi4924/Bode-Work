import React, { useState } from 'react';
import { View, Text, StatusBar, Image, TextInput, Pressable ,ActivityIndicator,TouchableOpacity} from 'react-native';
import {
    MainWrapperMatrial,
    Wrapper,
    SmallText,
    SmallTitle,
    ButtonColored,
    MediumText,
    RegularText,
    Spacer,
} from '../../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, appImages, sizes, fontFamily, fontSize } from '../../../themes';
import { width, height, totalSize } from 'react-native-dimension';
import Header from '../../../components/header/header';
import { routes } from '../../../services';
import { useFocusEffect } from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {userSearchData,showAllUser} from '../../../services/backend/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
const DATA = [1, 2, 3, 4, 5];

const SearchClient = (props) => {
    const [searchText, setSearchText] = useState("");
    const [searchData, setsearchData] = useState("");
    const [dataSource, setdataSource] = useState("");
    const [alldataSource, setalldataSource] = useState("");
    const [loader, setLoader] = useState(false);
    const [search, setSearch] = useState(true);
    const [focused, setfocused] = useState(false);
    const { userDetail } = useSelector(state => state.user);
    console.log("hhhh",focused);
    const space = sizes.baseMargin ;
    useFocusEffect(
        React.useCallback(() => {
            // getSearchData();
            getallClient();
        }, [])
      );
      const getSearchData = () => {
        setLoader(true)
        try {
          const data = {
            // user_id: userDetail?.id,
            query:searchText,
           
          };
          userSearchData(data).then(response => {
            if (response?.success) {
              console.log('search data =====> ', response.data);
            //   setsearchData(response?.data);
            setdataSource(response?.data);
            setSearch(false)
              setLoader(false)
             
            }
          });
        } catch (error) {
          ToastMessage(error.message);
          setLoader(false)
        }
      };
      const getallClient = () => {
        setLoader(true)
        try {
          const data = {
            user_id: userDetail?.id,
            // user_id:"ubaid",
           
          };
          showAllUser(data).then(response => {
            if (response?.success) {
              console.log('show all client data =====> ', response.data);
              setalldataSource(response?.data);
              setdataSource(response?.data);
              setLoader(false)
             
            }
          });
        } catch (error) {
          ToastMessage(error.message);
          setLoader(false)
        }
      };
    return (
        <MainWrapperMatrial style={{ backgroundColor: "#FFF" }}>
            <StatusBar backgroundColor={"#FFF"} barStyle={'dark-content'} />
            <View style={{ flex: 1, backgroundColor: colors.appColor1, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                <View style={{ marginTop:height(0)}}></View>
                <Header
                    goBack={() => props.navigation.goBack()}
                    heading={"Search Results"} color={"#FFF"} />
                    <Spacer height={sizes.baseMargin}/>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    {search  ?
                        <View style={{ flexDirection: 'row', marginBottom: totalSize(3), backgroundColor: "#FFF",
                         borderRadius: 16, paddingVertical: height(2), paddingHorizontal: width(4), marginHorizontal: width(6) }}>
                            <View style={{ flex: 1, justifyContent: 'center', }}>
                                <TextInput
                                    // onChangeText={(val) => {setSearchText(val)}}
                                    onChangeText={(text) => {
                                        if (text.length > 0) {
                                          let a =
                                          alldataSource?.length > 0
                                              ? alldataSource?.filter(
                                                  (item) =>
                                                    item?.first_name
                                                      ?.toLowerCase()
                                                      ?.includes(text?.toLowerCase()) 
                                                  
                                                )
                                              : null;
                                            //   console.log("aaaaaaaaaaaaaa",a);
                                          setdataSource(a);
                                    
                                        } else {
                                          setdataSource(alldataSource);
                                        }
                                        setSearchText(text);
                                      }}
                                    value={searchText}                          
                                    placeholder={"Search Clients"}
                                    placeholderTextColor={'#7F7F7F'}
                                    style={{ paddingVertical: 0 }}
                                    isFocused={() => {setfocused(true)} }
                                // onBlur={(() => (focused = false), onBlur)}
                                />
                            </View>
                            <TouchableOpacity
                            onPress={()=> setSearch(false)}
                            style={{ justifyContent: 'center' }}>
                                <Ionicons
                                    name='search'
                                    size={totalSize(3)}
                                    color={colors.appColor1}
                                />
                            </TouchableOpacity>
                        </View>
                         : null}
                        {/* {searchData.filter((item)=>item?.first_name!=null)} */}
                        {dataSource?.length>0?
                        <>
                    {
                        dataSource.map((val, key) => {
                            return (
                                <Wrapper
                                    key={key}
                                    // animation="fadeInDown" 
                                    style={{
                                        backgroundColor: "#FFF",
                                        marginHorizontal: width(5),
                                        marginBottom: totalSize(1),

                                        borderRadius: 15,
                                        padding: totalSize(1.5),
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 6,
                                        },
                                        shadowOpacity: 0.37,
                                        shadowRadius: 7.49,
                                        elevation: 2,
                                    }}>
                                    <Pressable 
                                    onPress={() => {props.navigation.navigate(routes.provider.services,{details:{firstname:val?.first_name,about:val?.about,id:val?.id,image:val?.profile_image}})}}
                                    // onPress={() => console.log("pressed itm",val)}
                                    >
                                    <View style={{ flexDirection: 'row', borderBottomColor: colors.appColor1, borderBottomWidth: 2, paddingBottom: totalSize(1) }}>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Image
                                                source={{uri:val?.profile_image!=null?val?.profile_image:appImages.barber1}}
                                                style={{ height: totalSize(8), width: totalSize(8), resizeMode: 'cover', borderRadius: 100 }}
                                            />
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', marginLeft: totalSize(1) }}>
                                            <SmallTitle style={{ color: "#000" ,fontFamily:fontFamily.gothicBold,marginBottom:height(1)}}>{val?.first_name}{" "}{val?.last_name}</SmallTitle>
                                            <Text>
                                                <SmallText style={{ color: "#000000" }}>
                                                    {/* {val?.avg_rating!=null?val?.avg_rating:"4.5"}  */}
                                                     {parseFloat(val&&val?.avg_rating!=null?val?.avg_rating:"N/A").toFixed(2)}
                                                 </SmallText>
                                                <Ionicons
                                                    name='star'
                                                    size={totalSize(1.5)}
                                                    color="#C9A858"
                                                />

                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ color: colors.black, fontSize:totalSize(1.67), fontFamily:fontFamily.gothicBold, borderBottomWidth: 1, borderBottomColor: colors.black, marginVertical:height(1) }}>ABOUT ME</Text>
                                    </View>
                                    <View style={{ paddingHorizontal: width(3),height:height(10)}}>
                                        <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: fontFamily.gothicRegular ,lineHeight:height(3),color:"grey"}}>
                                            {val?.about!=null?val.about:'We like the sleek design and beautiful photos that complete it. You find it fascinating too? Here is proof thatsimple sites work...'}
                                            {/* We like the sleek design and beautiful photos that complete it. You find it fascinating too? Here is proof thatsimple sites work... */}
                                        </Text>
                                    </View>
                                    </Pressable>
                                    {/* <View style={{flexDirection:'row',marginTop:totalSize(1.5)}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                        <RegularText style={{color:"#7F7F7F"}}>Email</RegularText>
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                        <RegularText style={{color:"#000000"}}>Janedoe@gamil.com</RegularText>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',marginTop:totalSize(.5)}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                        <RegularText style={{color:"#7F7F7F"}}>Location</RegularText>
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                        <RegularText style={{color:"#000000"}}>17 Johnson Ave, NYC</RegularText>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',marginTop:totalSize(.5)}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                        <RegularText style={{color:"#7F7F7F"}}>Distance</RegularText>
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                        <RegularText style={{color:"#000000"}}>6 miles away</RegularText>
                                    </View>
                                </View>
                                <ButtonColored 
                                    text="Reserve"
                                    buttonStyle={{marginTop:height(4),paddingHorizontal:width(5),borderRadius:20}}
                                    onPress={() => props.navigation.navigate(routes.provider.services)}
                                /> */}
                                </Wrapper>
                            )
                        })}
                        </>
                        :<View>
                        <ActivityIndicator size={totalSize(3)} color={colors.snow} />
                      </View>}
                </KeyboardAwareScrollView>
            </View>
        </MainWrapperMatrial>
    )
}

export default SearchClient;
