import React, {useState} from 'react';
import {View, Text, StatusBar, Image, TextInput} from 'react-native';
import {
  MainWrapperMatrial,
  Wrapper,
  SmallText,
  SmallTitle,
  ButtonColored,
  MediumText,
} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, appImages} from '../../../themes';
import {width, height, totalSize} from 'react-native-dimension';
import Header from '../../../components/header/header';
import { routes } from '../../../services';

const DATA = [1, 2, 3, 4, 5];

const SearchClient = (props) => {
    const [searchText, setSearchText] = useState("");

    return (
        <MainWrapperMatrial style={{backgroundColor:"#FFF"}}>
            <StatusBar backgroundColor={"#FFF"} barStyle={'dark-content'} />
            <View style={{flex:1,backgroundColor:colors.appColor1,borderTopLeftRadius:45,borderTopRightRadius:45}}>
                <Header heading={"Search Clients"} color={"#FFF"} />
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <View style={{flexDirection:'row',marginBottom: totalSize(3),backgroundColor:"#FFF",borderRadius:16,paddingVertical:height(2),paddingHorizontal:width(4),marginHorizontal:width(6)}}>
                        <View style={{flex:1,justifyContent:'center',}}>
                            <TextInput
                                onChangeText={(val) => setSearchText(val)}
                                value={searchText}
                                placeholder={"Search Clients"}
                                placeholderTextColor={'#7F7F7F'}
                                style={{paddingVertical:0}}
                                // onFocus={(() => (focused = true), onFocus)}
                                // onBlur={(() => (focused = false), onBlur)}
                            />
                        </View>
                        <View style={{justifyContent:'center'}}>
                            <Ionicons
                                name='search'
                                size={totalSize(2)}
                                color={colors.appColor1}
                            />
                        </View>
                    </View>
                    {searchText !== "" &&
                    DATA.map((val, key) => {
                        return (
                            <Wrapper
                                key={key}
                                animation="fadeInDown" 
                                style={{
                                    backgroundColor:"#FFF",
                                    marginHorizontal:width(6),
                                    marginBottom: totalSize(3),
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
                                <View style={{flexDirection:'row',borderBottomColor:"#00000029",borderBottomWidth:1,paddingBottom:totalSize(1)}}>
                                    <View style={{justifyContent:'center'}}>
                                        <Image 
                                        source={appImages.imageOne} 
                                        style={{height:totalSize(8),width:totalSize(8),resizeMode:'cover',borderRadius:100}}  
                                        />
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',marginLeft:totalSize(1)}}>
                                        <SmallTitle style={{color:"#000"}}>Jane Doe</SmallTitle>
                                        <Text>
                                        <Ionicons 
                                            name='star'
                                            size={totalSize(1.5)}
                                            color="#C9A858"
                                        />
                                        <SmallText style={{color:"#000000"}}> (4.9)</SmallText>
                                        </Text>
                                    </View> 
                                </View>
                                <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                        <MediumText style={{color:"#7F7F7F"}}>Email</MediumText>
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                        <MediumText style={{color:"#000000"}}>Janedoe@gamil.com</MediumText>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                        <MediumText style={{color:"#7F7F7F"}}>Location</MediumText>
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                        <MediumText style={{color:"#000000"}}>17 Johnson Ave, NYC</MediumText>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                        <MediumText style={{color:"#7F7F7F"}}>Distance</MediumText>
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                        <MediumText style={{color:"#000000"}}>6 miles away</MediumText>
                                    </View>
                                </View>
                                <ButtonColored 
                                    text="Resere"
                                    buttonStyle={{marginTop:height(4),marginBottom:width(3),paddingHorizontal:width(5),borderRadius:20}}
                                    onPress={() => props.navigation.navigate(routes.provider.services)}
                                />
                            </Wrapper>
                        )
                    })}
                </KeyboardAwareScrollView>
            </View>
        </MainWrapperMatrial>
    )
}

export default SearchClient;
