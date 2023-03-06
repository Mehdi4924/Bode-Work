import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { MainWrapper, Spacer, ButtonColored, Wrapper, SmallText, MediumText, RegularText, SmallTitle, MediumTitle, LargeText, ButtonBordered } from '../../../components';
import { sizes, colors, appImages } from '../../../themes';
import { height, totalSize, width } from 'react-native-dimension';
import Header from '../../../components/header/header';
import MapView from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { routes } from '../../../services';

const JobDetail = (props) => {
    const { navigate, goBack } = props.navigation;
    const [status, setStatus] = useState("Pending");

    return (
        <MainWrapper>
            <StatusBar 
                barStyle={"dark-content"}
                backgroundColor={"transparent"}
            />
            <Header
                goBack={() => goBack()}
                heading={"Job Details"}
                color={colors.appColor1} 
            />
            <View style={{backgroundColor:status==="Pending"?"#00827F":status==="Job Started"?"#00827F":status==="In Progress"?colors.appColor1:status==="Completed"?"#00BF13":"#0CC4BC",paddingVertical:height(.8)}}>
                <RegularText style={{color:"#FFF",textAlign:"center"}}>{status}...</RegularText>
            </View>
            <ScrollView>
                <Wrapper animation="fadeInDown">
                    <TouchableOpacity 
                        activeOpacity={.7}
                        onPress={() => 
                            {
                                if(status === "Pending") {
                                    setStatus("Job Started");
                                } else if (status === "Job Started") {
                                    setStatus("In Progress");
                                }  else if (status === "In Progress") {
                                    setStatus("Completed");
                                }
                            }
                        }
                    >
                        <MapView
                            region={{
                                latitude: 51.5447,
                                longitude: 0.1246,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            style={{height:height(45)}}
                        />
                    </TouchableOpacity>
                </Wrapper>
                <Wrapper animation="fadeInDown">
                    <View style={{paddingVertical:height(2),paddingHorizontal:width(5)}}>
                        <SmallTitle style={{textAlign:"center"}}>
                            This job is not yet started by {"\n"}the service provider
                        </SmallTitle>
                    </View>
                </Wrapper>
                <Wrapper
                    // animation="fadeInDown" 
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
                            <MediumText style={{color:"#000"}}>Hair Stylish</MediumText>
                            <Text>
                                <Ionicons 
                                    name='star'
                                    size={totalSize(1)}
                                    color="#DBC37A"
                                />
                                <Ionicons 
                                    name='star'
                                    size={totalSize(1)}
                                    color="#DBC37A"
                                />
                                <Ionicons 
                                    name='star'
                                    size={totalSize(1)}
                                    color="#DBC37A"
                                />
                                <Ionicons 
                                    name='star'
                                    size={totalSize(1)}
                                    color="#DBC37A"
                                />
                                <Ionicons 
                                    name='star'
                                    size={totalSize(1)}
                                    color="#DBC37A"
                                />
                                <SmallText style={{color:"#000000"}}> (4.9)</SmallText>
                            </Text>
                        </View>
                        <View style={{justifyContent:'center',marginLeft:totalSize(3)}}>
                            <LargeText style={{color:"#000000",marginTop:height(2),textAlign:"right"}}>$40</LargeText>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                            <SmallText style={{color:colors.appColor1}}>Location</SmallText>
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                            <SmallText style={{color:"#000000"}}>17 Johnson Ave, NYC</SmallText>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                            <SmallText style={{color:colors.appColor1}}>Date</SmallText>
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                            <SmallText style={{color:"#000000"}}>29th July, 2020</SmallText>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                            <SmallText style={{color:colors.appColor1}}>Time</SmallText>
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                            <SmallText style={{color:"#000000"}}>12:00 pm - 02:00 pm</SmallText>
                        </View>
                    </View>
                    <View style={{borderBottomColor:"#00000029",borderBottomWidth:1,paddingVertical:totalSize(1)}}></View>
                    {status !== "Completed" && 
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <ButtonColored 
                                    text="Chat"
                                    onPress={() => navigate(routes.client.chatScreen)}
                                    buttonStyle={{alignSelf:"center",marginHorizontal:0,height:totalSize(4),width:totalSize(13),borderRadius:100,marginTop:totalSize(2)}}
                                />
                            </View>
                            <View style={{flex:1}}>
                                <ButtonColored 
                                    text="Cancel"
                                    disabled={status === "Job Started" ? true : status === "In Progress" ? true : false}
                                    buttonStyle={{backgroundColor:"#D40000",alignSelf:"center",marginHorizontal:0,
                                    opacity:status==="Job Started"?0.5:status==="In Progress"?0.5:1,height:totalSize(4),width:totalSize(13),borderRadius:100,marginTop:totalSize(2)}}
                                />
                            </View>
                        </View>
                    }
                </Wrapper>
                {status === "Completed" && 
                    <>
                        <ButtonColored 
                            text={"Post a Review"}
                            onPress={() => navigate(routes.client.postReview)}
                            buttonStyle={{marginBottom:totalSize(3)}}
                        />
                        <ButtonColored 
                            text={"Report"}
                            buttonStyle={{backgroundColor:"#C40707",marginBottom:totalSize(3)}}
                        />
                    </>
                }
            </ScrollView>
        </MainWrapper>
    );
}

export default JobDetail;
