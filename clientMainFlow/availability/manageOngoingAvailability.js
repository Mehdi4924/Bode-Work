import React, {useEffect, useState} from 'react';
import {View, StatusBar,Switch, TouchableOpacity} from 'react-native';
import {
  MainWrapperMatrial,
  TinyTitle,
  SmallText,
  ModalColored,
  SmallTitle,
  MediumTitle,
  ButtonColored,
} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../themes';
import {width, height, totalSize} from 'react-native-dimension';

const DATA = [
    {id: 1, day: "Monday", status: false},
    {id: 2, day: "Tuesday", status: false},
    {id: 3, day: "Wednesday", status: false},
    {id: 4, day: "Thursday", status: false},
    {id: 5, day: "Friday", status: false},
    {id: 6, day: "Saturday", status: false},
    {id: 7, day: "Sunday", status: false},
];

const ManageOngoingAvailability = (props) => {
    const [invitationModalStatus, setInvitationModalStatus] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [breakData, setBreakData] = useState([]);

    useEffect(() => {
        console.log("breakData =====> ", breakData);
    }, [breakData]);
    const toggleSwitch = (index) => {
        if (DATA[index].status) {
            DATA[index].status = false;
            setIsEnabled(false);
        } else {
            DATA[index].status = true;
            setIsEnabled(true);
        }
    };
    const invitationToggleModal = () => {
        setInvitationModalStatus(!invitationModalStatus);
    };
    const addBreakHandle = (index) => {
        console.log("ID =====> ", index);
        const data = breakData;
        data.push({id: index, breakStart: "09:00 AM", breakEnd: "10:00 AM"})
        setBreakData(data);
        setIsEnabled(!isEnabled);
        console.log("DATA =====> ", data);
    };
    const removeBreakHandle = (index) => {
        breakData.splice(index, 1);
        // setIsEnabled(!isEnabled);
    };

    return (
        <MainWrapperMatrial style={{backgroundColor:"#FFF"}}>
            <StatusBar backgroundColor={"#FFF"} barStyle={'dark-content'} />
            <View style={{flex:1,backgroundColor:"#FFF",borderTopLeftRadius:45,borderTopRightRadius:45}}>
                <View style={{
                    flexDirection:'row',
                    backgroundColor:colors.appColor1,
                    paddingVertical:height(2),
                    paddingHorizontal:width(8),
                    borderTopLeftRadius:45,
                    borderTopRightRadius:45,
                }}>
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
                        <SmallTitle style={{color:"#FFF"}}>Manage Ongoing Availability</SmallTitle>
                    </View>
                </View>
                <KeyboardAwareScrollView style={{marginTop:height(2)}} showsVerticalScrollIndicator={false}>
                    {DATA.map((val, key) => {
                        return (
                            <>
                                <View 
                                    key={key} 
                                    style={{
                                        flexDirection:'row',
                                        borderColor:"#E9E9E9",
                                        borderTopWidth:key===0?1:0,
                                        borderBottomWidth:1,    
                                        paddingHorizontal:width(6),
                                        paddingVertical:height(2)
                                    }}
                                >
                                    <View style={{flex:1,justifyContent:'center'}}>
                                        <SmallTitle>{val.day}</SmallTitle>
                                    </View>
                                    <View style={{justifyContent:'center'}}>
                                        <Switch
                                            trackColor={{ false: "#E9E9E9", true: "#E9E9E9" }}
                                            thumbColor={val.status ? "#B5B5B5" : "#B5B5B5"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={() => toggleSwitch(key)}
                                            value={val.status}
                                        />
                                    </View>
                                </View>
                                {val.status &&
                                    <>
                                        <View style={{
                                            flexDirection:'row',
                                            borderColor:"#E9E9E9",
                                            borderTopWidth:0,
                                            borderBottomWidth:1,    
                                            paddingHorizontal:width(6),
                                            paddingVertical:height(2)
                                        }}>
                                            <View style={{flex:1,justifyContent:'center',borderRightColor:"#000",borderRightWidth:1,marginRight:width(3),paddingRight:width(3)}}>
                                                <View style={{flexDirection:'row'}}>
                                                    <View style={{flex:1,justifyContent:'center'}}>
                                                        <SmallText style={{fontWeight:"bold"}}>HOURS</SmallText>
                                                    </View>
                                                    <View style={{flex:1,justifyContent:'center'}}>
                                                        <ButtonColored 
                                                            text={"09:00 AM"}
                                                            textStyle={{fontSize:totalSize(1.5)}}
                                                            buttonStyle={{marginHorizontal:0,borderRadius:10,height:height(5)}}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{flex:1,justifyContent:'center'}}>
                                                <View style={{flexDirection:'row'}}>
                                                    <View style={{flex:1,justifyContent:'center'}}>
                                                        <SmallText style={{fontWeight:"bold"}}>TO</SmallText>
                                                    </View>
                                                    <View style={{flex:1,justifyContent:'center'}}>
                                                        <ButtonColored 
                                                            text={"09:00 AM"}
                                                            textStyle={{fontSize:totalSize(1.5)}}
                                                            buttonStyle={{marginHorizontal:0,borderRadius:10,height:height(5)}}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        {breakData.map((item, index) => {
                                            return (
                                                <>
                                                    {val.id === item.id &&
                                                        <View 
                                                            key={index} 
                                                            style={{
                                                                flexDirection:'row',
                                                                borderColor:"#E9E9E9",
                                                                borderTopWidth:0,
                                                                borderBottomWidth:1,    
                                                                paddingHorizontal:width(6),
                                                                paddingVertical:height(2)
                                                            }}
                                                        >
                                                            <View style={{flex:1,justifyContent:'center',borderRightColor:"#000",borderRightWidth:1,marginRight:width(3),paddingRight:width(3)}}>
                                                                <View style={{flexDirection:'row'}}>
                                                                    <View style={{flex:1,justifyContent:'center'}}>
                                                                        <SmallText style={{fontWeight:"bold"}}>BREAK</SmallText>
                                                                    </View>
                                                                    <View style={{flex:1,justifyContent:'center'}}>
                                                                        <ButtonColored 
                                                                            text={item.breakStart}
                                                                            textStyle={{fontSize:totalSize(1.5)}}
                                                                            buttonStyle={{marginHorizontal:0,borderRadius:10,height:height(5)}}
                                                                        />
                                                                    </View>
                                                                </View>
                                                            </View>
                                                            <View style={{flex:1,justifyContent:'center'}}>
                                                                <View style={{flexDirection:'row'}}>
                                                                    <View style={{flex:1,justifyContent:'center'}}>
                                                                        <SmallText style={{fontWeight:"bold"}}>TO</SmallText>
                                                                    </View>
                                                                    <View style={{flex:1,justifyContent:'center'}}>
                                                                        <ButtonColored 
                                                                            text={item.breakEnd}
                                                                            textStyle={{fontSize:totalSize(1.5)}}
                                                                            buttonStyle={{marginHorizontal:0,borderRadius:10,height:height(5)}}
                                                                        />
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    }
                                                </>
                                            )
                                        })}
                                        <View style={{borderColor:"#E9E9E9",borderBottomWidth:1,paddingVertical:height(1)}}>
                                            <TouchableOpacity
                                                activeOpacity={.7}
                                                onPress={() => addBreakHandle(key)}
                                            >
                                                <TinyTitle style={{color:colors.appColor1,textAlign:"center"}}>
                                                    ADD BREAK
                                                </TinyTitle>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                }
                            </>
                        )
                    })}
                </KeyboardAwareScrollView>
            </View>
            <ModalColored 
                isVisible={invitationModalStatus}
                toggleModal={invitationToggleModal}
                modalHeight={14}
                containerstyle={{backgroundColor:"#FFF"}}
                content={
                    <View>
                        <Ionicons 
                            name='star'
                            size={totalSize(10)}
                            color="#C9A858"
                            style={{alignSelf:'center',marginBottom:height(3)}}
                        />
                        <MediumTitle style={{textAlign:"center",color:colors.appColor1}}>Reservation Invitation Sent</MediumTitle>
                        <ButtonColored 
                            text="Done"
                            buttonStyle={{paddingHorizontal:width(5),borderRadius:20,marginTop:height(4)}}
                            onPress={invitationToggleModal}
                        />  
                    </View>
                }
            />
        </MainWrapperMatrial>
    )
}

export default ManageOngoingAvailability;
