import React, {useState} from 'react';
import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import {
  MainWrapperMatrial,
  Wrapper,
  SmallText,
  ModalColored,
  SmallTitle,
  MediumTitle,
  ButtonColored,
  MediumText,
  AbsoluteWrapper,
} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors, appImages} from '../../../themes';
import {width, height, totalSize} from 'react-native-dimension';
import { routes } from '../../../services';

const DATA = [1];

const Charges = (props) => {
    const [invitationModalStatus, setInvitationModalStatus] = useState(false);

    const invitationToggleModal = () => {
        setInvitationModalStatus(!invitationModalStatus);
    };

    return (
        <MainWrapperMatrial style={{backgroundColor:"#FFF"}}>
            <StatusBar backgroundColor={"#FFF"} barStyle={'dark-content'} />
            <View style={{flex:1,backgroundColor:"#FFF",borderTopLeftRadius:45,borderTopRightRadius:45}}>
                <View style={{flexDirection:'row',backgroundColor:colors.appColor1,paddingVertical:height(2),paddingHorizontal:width(8),borderTopLeftRadius:45,borderTopRightRadius:45}}>
                    <TouchableOpacity 
                        onPress={() => props.navigation.goBack()}
                        style={{justifyContent:'center'}}>
                        <FontAwesome
                            name='angle-left'
                            size={totalSize(3)}
                            color="#FFF"
                        />
                    </TouchableOpacity>
                    <View style={{flex:1,justifyContent:'center',marginLeft:width(8)}}>
                        <SmallTitle style={{color:"#FFF"}}>29th July, 2020</SmallTitle>
                    </View>
                </View>
                <KeyboardAwareScrollView style={{marginTop:height(2)}} showsVerticalScrollIndicator={false}>
                    {DATA.map((val, key) => {
                        return (
                            <Wrapper
                                key={key}
                                animation="fadeInDown" 
                                style={{
                                    backgroundColor:"#FFF",
                                    marginHorizontal: totalSize(3),
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
                                    <View>
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
                                    <View style={{justifyContent:'flex-start',marginLeft:totalSize(3)}}>
                                        <ButtonColored 
                                            text="Hair Cut"
                                            buttonStyle={{marginHorizontal:0,paddingHorizontal:width(5),borderRadius:100,height: height(5)}}
                                            // onPress={() => }
                                        />
                                        <MediumTitle style={{color:"#000000",marginTop:height(2),textAlign:"right"}}>$40</MediumTitle>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                        <MediumText style={{color:"#7F7F7F"}}>Time Slot</MediumText>
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                        <MediumText style={{color:"#000000"}}>12:00 pm - 02:00 pm</MediumText>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                                        <MediumText style={{color:"#7F7F7F"}}>Date</MediumText>
                                    </View>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                                        <MediumText style={{color:"#000000"}}>29th July, 2020</MediumText>
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
                            </Wrapper>
                        )
                    })}
                </KeyboardAwareScrollView>
                <AbsoluteWrapper style={{bottom:width(6),left:width(6),right:width(6)}}>
                    <ButtonColored 
                        text="Done"
                        buttonStyle={{marginHorizontal:0,paddingHorizontal:width(5),borderRadius:10}}
                        onPress={invitationToggleModal}
                    />
                </AbsoluteWrapper>
            </View>
            <ModalColored 
                isVisible={invitationModalStatus}
                toggleModal={invitationToggleModal}
                containerstyle={{backgroundColor:"#FFF"}}
                modalHeight={14}
                content={
                    <View>
                        <Ionicons 
                            name='checkmark-circle'
                            size={totalSize(10)}
                            color={colors.appColor1}
                            style={{alignSelf:'center',marginBottom:height(3)}}
                        />
                        <MediumTitle style={{textAlign:"center",color:colors.appColor1}}>Reservation Invitation Sent</MediumTitle>
                        <ButtonColored 
                            text="Done"
                            buttonStyle={{paddingHorizontal:width(5),borderRadius:20,marginTop:height(4)}}
                            onPress={() => {
                                invitationToggleModal();
                                props.navigation.navigate(routes.provider.home)
                            }}
                        />  
                    </View>
                }
            />
        </MainWrapperMatrial>
    )
}

export default Charges;
