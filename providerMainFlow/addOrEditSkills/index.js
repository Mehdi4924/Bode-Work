import React, {Component} from 'react';
import {View, Text, Image, ScrollView, StatusBar, TouchableOpacity} from 'react-native';
import {
  MainWrapperMatrial,
  Wrapper,
  ImageProfile,
  AbsoluteWrapper,
  CardWrapper,
  SmallTitle,
  IconWithText,
  Spacer,
  RowWrapper,
  ComponentWrapper,
  TinyTitle,
  TitleWithInfo,
  ButtonWithTextArrow,
  ButtonColored,
  IconButton,
  SmallText,
  MediumText,
  MediumTitle,
  ButtonBordered,
  ButtonBorderedSmall,
} from '../../../components';
import {appImages, colors, sizes, appStyles} from '../../../themes';
import {height, totalSize, width} from 'react-native-dimension';
import {routes} from '../../../services';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { Marker, Callout } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA = [1, 2, 3, 4, 5, 6];

const Profile = (props) => {
  return (
    <MainWrapperMatrial>
      <StatusBar 
        translucent
        backgroundColor={"transparent"} 
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Wrapper animation="fadeInDown" style={{position:"relative"}}>
          <Wrapper animation="fadeInDown">
            <Image 
              source={{uri: appImages.user4 }}
              style={{
                width: null, 
                height: height(40),
                borderTopRightRadius: 25,
                borderTopLeftRadius: 25
              }}
            />
          </Wrapper>
          <AbsoluteWrapper style={{top: sizes.doubleBaseMargin, left: sizes.baseMargin}}>
            <TouchableOpacity 
              activeOpacity={.7}
              onPress={() => props.navigation.goBack()}
              style={{height:height(5),width:height(5),borderRadius:50,alignItems:'center',justifyContent:'center',backgroundColor:colors.appColor1}}>
              <Ionicons 
                name='chevron-back'
                size={totalSize(3)}
                color="#fff"
              />
            </TouchableOpacity>
          </AbsoluteWrapper>
        </Wrapper>
        <Wrapper
        //  animation="fadeInDown"
          flex={1}>
          <AbsoluteWrapper style={{right: 0, left: 0, top: -height(10)}}>
            <View
              style={{
                backgroundColor: colors.appColor1,
                padding: sizes.baseMargin,
                marginHorizontal: width(5),
                borderRadius: 20,
              }}>
              <SmallTitle style={[appStyles.textCenter, appStyles.textWhite]}>
                John Doe
              </SmallTitle>
              <MediumText style={{color:"#FFF",textAlign:"center",marginTop:height(1)}}>Hair Stylist</MediumText>
              <IconWithText
                iconName="star"
                text={4.9}
                tintColor={colors.rating}
                textStyle={[appStyles.textWhite]}
                containerStyle={[{alignSelf: 'center',marginVertical:sizes.baseMargin}]}
              />
              <SmallText style={[appStyles.textCenter, appStyles.textWhite, {lineHeight:20}]}>
                Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. 
                Aenean enim sem, pharetra et magna si.
              </SmallText>
            </View>
          </AbsoluteWrapper>
          <Wrapper animation="fadeInDown" style={{marginTop:sizes.doubleBaseMargin*3,marginHorizontal:width(5)}}>
            <TinyTitle>Account</TinyTitle>
            <TitleWithInfo containerStyle={{marginTop:sizes.smallMargin}} title="Email" info={"johndow@gmail.com"} />
            <TitleWithInfo containerStyle={{marginTop:sizes.smallMargin}} title="Phone" info={"+1-234-567-890"} />
            <TitleWithInfo containerStyle={{marginTop:sizes.smallMargin}} title="Zip" info={"90001"} />
            <TitleWithInfo containerStyle={{marginTop:sizes.smallMargin}} title="Country" info={"USA"} />
          </Wrapper>
          <View style={{flexDirection:'row',marginHorizontal:width(5),marginTop:sizes.baseMargin}}>
            <View style={{flex:1,justifyContent:'center'}}>
              <TinyTitle>What's on the schedule?</TinyTitle>
            </View>
            <TouchableOpacity 
              activeOpacity={.8}
              onPress={() => props.navigation.navigate(routes.provider.availablilityTab)}
              style={{flex:1,justifyContent:'center'}}>
              <SmallText style={{color:colors.appColor1,textAlign:"right"}}>See Calendar</SmallText>
            </TouchableOpacity>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {DATA.map((val, key) => {
              return (
                <Wrapper
                  key={key}
                  animation="fadeInDown" 
                  style={{
                    backgroundColor:"#FFF",
                    marginLeft: totalSize(2),
                    marginTop: totalSize(2),
                    marginLeft: key === 0 ? totalSize(2) : 0,
                    marginBottom: totalSize(2),
                    marginRight: totalSize(2),
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
                        <MediumTitle style={{color:"#00BF13",marginTop:height(2),textAlign:"right"}}>$40</MediumTitle>
                      </View>
                  </View>
                  <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                      <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                        <SmallText style={{color:"#7F7F7F"}}>Time Slot</SmallText>
                      </View>
                      <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                        <SmallText style={{color:"#000000"}}>12:00 pm - 02:00 pm</SmallText>
                      </View>
                  </View>
                  <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                      <SmallText style={{color:"#7F7F7F"}}>Date</SmallText>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                      <SmallText style={{color:"#000000"}}>29th July, 2020</SmallText>
                    </View>
                  </View>
                  <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                      <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                        <SmallText style={{color:"#7F7F7F"}}>Location</SmallText>
                      </View>
                      <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                        <SmallText style={{color:"#000000"}}>17 Johnson Ave, NYC</SmallText>
                      </View>
                  </View>
                  <View style={{flexDirection:'row',marginTop:totalSize(1.4)}}>
                      <View style={{flex:1,justifyContent:'center',alignItems:'flex-start'}}>
                        <SmallText style={{color:"#7F7F7F"}}>Distance</SmallText>
                      </View>
                      <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                        <SmallText style={{color:"#000000"}}>6 miles away</SmallText>
                      </View>
                  </View>
                </Wrapper>
              ) 
            })}
          </ScrollView>
          <ButtonBordered 
            text={"Sync Your Personal & Bod-e-Work Calendar"}
            buttonStyle={{marginTop:sizes.smallMargin}}
          />
          <View style={{flexDirection:'row',marginHorizontal:width(5),marginTop:sizes.smallMargin*3}}>
            <View style={{flex:1,justifyContent:'center'}}>
              <TinyTitle>Business Photos</TinyTitle>
            </View>
            <TouchableOpacity 
              activeOpacity={.8}
              onPress={() => props.navigation.navigate(routes.provider.businessPhoto)}
              style={{flex:1,justifyContent:'center'}}>
              <SmallText style={{color:colors.appColor1,textAlign:"right"}}>Edit Profile</SmallText>
            </TouchableOpacity>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {DATA.map((val, key) => {
              return (
                <Wrapper
                  key={key}
                  animation="fadeInDown" 
                  style={{
                    backgroundColor:"#FFF",
                    height: height(24),
                    width: width(30),
                    marginLeft: key === 0 ? totalSize(2) : 0,
                    marginRight: totalSize(2),
                    marginTop: totalSize(2),
                    marginBottom: totalSize(2),
                    borderRadius: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 6,
                    },
                    shadowOpacity: 0.37,
                    shadowRadius: 7.49,
                    elevation: 12,
                  }}>
                    <Image 
                      source={appImages.imageTwo} 
                      style={{height:"100%",width:"100%",resizeMode:'cover',borderRadius:20}}  
                    />
                </Wrapper>
              )
            })}
          </ScrollView>
          <View style={{flexDirection:'row',marginHorizontal:width(5),marginTop:sizes.baseMargin}}>
            <View style={{flex:1,justifyContent:'center'}}>
              <TinyTitle>Skills & Rates</TinyTitle>
            </View>
            <TouchableOpacity 
              activeOpacity={.8}
              onPress={() => props.navigation.navigate(routes.provider.editSkills)}
              style={{flex:1,justifyContent:'center'}}>
              <SmallText style={{color:colors.appColor1,textAlign:"right"}}>
                Add or edit skills
              </SmallText>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',marginTop:sizes.smallMargin,backgroundColor:colors.appColor1,paddingVertical:height(1.5),paddingHorizontal:width(4),borderRadius:40,marginHorizontal:width(4)}}>
            <View style={{justifyContent:'center'}}>
              {/* <Ionicons 
                name='starss'
                size={totalSize(3)}
                color="#fff"
              /> */}
            </View>
            <View style={{flex:1,justifyContent:'center',paddingLeft:width(2)}}>
              <SmallTitle style={{color:"#FFF"}}>Bos Braids</SmallTitle>
            </View>
            <View style={{justifyContent:'center'}}>
              <SmallTitle style={{color:"#FFF"}}>$40</SmallTitle>
            </View>
          </View>
          <View style={{flexDirection:'row',marginTop:sizes.smallMargin,backgroundColor:colors.appColor1,paddingVertical:height(1.5),paddingHorizontal:width(4),borderRadius:40,marginHorizontal:width(4)}}>
            <View style={{justifyContent:'center'}}>
              {/* <Ionicons 
                name='starss'
                size={totalSize(3)}
                color="#fff"
              /> */}
            </View>
            <View style={{flex:1,justifyContent:'center',paddingLeft:width(2)}}>
              <SmallTitle style={{color:"#FFF"}}>Bos Braids</SmallTitle>
            </View>
            <View style={{justifyContent:'center'}}>
              <SmallTitle style={{color:"#FFF"}}>$40</SmallTitle>
            </View>
          </View>
          <View style={{flexDirection:'row',marginTop:sizes.smallMargin,backgroundColor:colors.appColor1,paddingVertical:height(1.5),paddingHorizontal:width(4),borderRadius:40,marginHorizontal:width(4)}}>
            <View style={{justifyContent:'center'}}>
              {/* <Ionicons 
                name='starss'
                size={totalSize(3)}
                color="#fff"
              /> */}
            </View>
            <View style={{flex:1,justifyContent:'center',paddingLeft:width(2)}}>
              <SmallTitle style={{color:"#FFF"}}>Bos Braids</SmallTitle>
            </View>
            <View style={{justifyContent:'center'}}>
              <SmallTitle style={{color:"#FFF"}}>$40</SmallTitle>
            </View>
          </View>
          <View style={{flexDirection:'row',marginHorizontal:width(5),marginTop:sizes.baseMargin}}>
            <View style={{flex:1,justifyContent:'center'}}>
              <TinyTitle>Work Area</TinyTitle>
            </View>
            <TouchableOpacity 
              activeOpacity={.8}
              // onPress={() => }
              style={{flex:1,justifyContent:'center'}}>
              <SmallText style={{color:colors.appColor1,textAlign:"right"}}>
                Edit Work Area
              </SmallText>
            </TouchableOpacity>
          </View>
          <View style={{marginHorizontal:width(5),borderRadius:20,marginTop:height(2)}}>
            <MapView
              region={{
                latitude: 51.5347,
                longitude: 0.1246,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
              style={{height:height(22),borderRadius:20}}
            />
          </View>
          <ButtonWithTextArrow
            text="Direct Deposit"
            // onPress={() => }
            buttonStyle={{marginTop:sizes.baseMargin}}
          />
          <ButtonWithTextArrow
            text="Location"
            // onPress={() => navigate(routes.provider.locationSetting)}
            buttonStyle={{marginTop:sizes.baseMargin}}
          />
          <ButtonWithTextArrow
            text="About Me"
            // onPress={() => navigate(routes.provider.locationSetting)}
            buttonStyle={{marginTop:sizes.baseMargin}}
          />
          <ButtonWithTextArrow
            text="Closing Message"
            // onPress={() => navigate(routes.provider.promo)}
            buttonStyle={{marginTop:sizes.baseMargin}}
          />
          <ButtonWithTextArrow
            text="Promotiom"
            // onPress={() => navigate(routes.provider.notificationSettings)}
            buttonStyle={{marginTop:sizes.baseMargin}}
          />
          <ButtonWithTextArrow
            text="Account Settings"
            // onPress={() => navigate(routes.provider.notificationSettings)}
            buttonStyle={{marginTop:sizes.baseMargin}}
          />
          <ButtonWithTextArrow
            text="Support"
            onPress={() => props.navigation.navigate(routes.provider.support)}
            buttonStyle={{marginTop:sizes.baseMargin}}
          />
          <ButtonBordered 
            text="Logout" 
            onPress={() => {
              console.log("RUN")
              AsyncStorage.removeItem('user');
              props.navigation.navigate(routes.signin)
            }} 
            buttonStyle={{marginVertical:sizes.doubleBaseMargin}}
          />
        </Wrapper>
      </ScrollView>
    </MainWrapperMatrial>
  );
}

export default Profile;
