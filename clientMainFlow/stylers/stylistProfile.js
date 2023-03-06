import React, {Component,useState} from 'react';
import {View, Text, FlatList, ScrollView,StyleSheet} from 'react-native';
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
  StylerReviewCard,
  RegularText,
  LargeTitle,
  ComponentWrapper,
  TinyTitle,
  TitleWithInfo,
  ButtonWithTextArrow,
  ButtonColored,
  MainWrapper,
  MediumText,
  SmallText,
  ImagePortfolio,
  ServiceIconCard,
  RowWrapperBasic,
  IconWithTextimage,
} from '../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon} from 'react-native-elements';
import {appImages, colors, sizes, appStyles, appIcons,fontSize} from '../../../themes';
import {height, totalSize, width} from 'react-native-dimension';
import PostReview from '../postReview';
import {Image} from 'react-native';
import {routes} from '../../../services';
import {getAllOfCollection, getData} from '../../../backend/firebase/utility';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Modal} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { StylistProfileData } from '../../../services/backend/client';
// const{navigate} = props.navigation; 
const portfolio= [
    {
      imageUrl:
        'https://i.pinimg.com/736x/9c/95/d5/9c95d5bf82a9684f8bb39306bf253a35.jpg',
    },
    {
      imageUrl:
        'https://i.pinimg.com/originals/1e/75/a6/1e75a61cbcfd0bfb7194eb9cc88f25ec.jpg',
    },
    {
      imageUrl:
        'https://i.pinimg.com/originals/f5/7a/7c/f57a7c9a22905250ca8c033aaa687cec.jpg',
    },
    {
      imageUrl:
        'https://www.menshairstyletrends.com/wp-content/uploads/2016/12/virogas.barber-medium-to-long-hairstyle-for-men-2017-new-819x1024.jpg',
    },
    {
      imageUrl:
        'https://1.bp.blogspot.com/-hDkVLAuDjnw/XXoyIB7ky1I/AAAAAAAAAVE/3Ht1EClsuys2coCdCxyh9vVBQiomfBHjgCNcBGAsYHQ/s1600/Trending-Hair-styles-For-Men-1.jpg',
    },
    {
      imageUrl:
        'https://i.pinimg.com/originals/27/e2/cb/27e2cb9b98a17b69583925ffda6dc91e.jpg',
    },
  ]
  const services=[
    {
      icon: appIcons.braiding,
      title: 'Braiding',
      price:'$50',
    },
    {
      icon: appIcons.piercing,
      title: 'Piercing',
      price:'$50',
    },
   
    {
      icon: appIcons.tatoo,
      title: 'Tattoo',
      price:'$50',
     
    },
    {
      icon: appIcons.beard,
      title: 'Beard',
      price:'$50',
    },
    {
      icon: appIcons.imageDoc,
      title: 'Shape-Up',
      price:'$50',
    },
  ]
  const reviews=[
    {
      name: "Jolly Wil",
      image: appImages.user1,
      rating: 4.9,
      date: "29th July, 2020",
      time: '04:00 pm',
      detail: 'Lorem ipsum tellus in pellentesque mollis,mauris orci dignissim nisl, id gravida nunc enis nibh.Maecenas convallis eros a aaaaaaaaante dignissim, vitae elementum metus faccilisis.',
    },
    {
      name: "Jackobe Black",
      image: appImages.user4,
      rating: 4.5,
      date: "29th July, 2020",
      time: '04:00 pm',
      detail: 'Lorem ipsum tellus in pellentesque mollis,mauris orci dignissim nisl, id gravida nunc enis nibh.Maecenas convallis eros a aaaaaaaaante dignissim, vitae elementum metus faccilisis.',
    },
    {
      name: "Amy Jackson",
      image: appImages.user2,
      rating: 4.9,
      date: "29th July, 2020",
      time: '04:00 pm',
      detail: 'Lorem ipsum tellus in pellentesque mollis,mauris orci dignissim nisl, id gravida nunc enis nibh.Maecenas convallis eros a aaaaaaaaante dignissim, vitae elementum metus faccilisis.',
    },
  ]
const StylistProfile = (props) => {
    const param = props.route.params
  console.log("ye aaya param stylist profile" , param);
    const { navigate, goBack, replace } = props.navigation;
    const { userDetail } = useSelector(state => state.user);
    console.log("user detailid",userDetail.id);
    const [dataSource, setDataSource] = useState("");
    const [ShowPenal, setShowPenal] = useState(false);
    const [ShowReviewPenal, setShowReviewPenal] = useState(false);
    const [CurrentReview, setCurrentReview] = useState({});
    const [Provider, setProvider] = useState({});
    const [CurrentImage, setCurrentImage] = useState("");
    const [joined, setjoined] = useState("");
    const [reviews, setreviews] = useState("");
    const [services ,setservices] = useState("");
    const [portfolio ,setportfolio] = useState("");
    const [loader, setLoader] = useState(true);
    // console.log("ye ay reviews",reviews);
    
    const [detail, setdetail] = useState("Lorem ipsum tellus in pellentesque mollis,mauris orci dignissim nisl, id gravida nunc enis nibh.Maecenas convallis eros a aaaaaaaaante dignissim, vitae elementum metus faccilisis.");
  
    useFocusEffect(
        React.useCallback(() => {
          getUserData();
        }, [])
      );
      const getUserData = () => {
        try {
          const data = {
            user_id:param.stylistid,
            viewer_id:userDetail.id,
            // user_id:'48',
            // viewer_id:'3'
          };
          StylistProfileData(data).then(response => {
            // console.log('DATAprofile =====> ', response);
            if (response?.success) {
              console.log('DATAprofile =====> ', JSON.stringify(response.data,null,2));
              setDataSource(response?.data);
              setreviews(response?.data?.reviews);
              setservices(response?.data?.skills)
              setportfolio(response?.data?.portfolios)
              setLoader(false)
            }
          });
        } catch (error) {
          ToastMessage(error.message);
          setLoader(false)
        }
      };

    const RenderPortfolio = ({ item }) => {
        // const { portfolio,item, Provider } = this.state
        return (
          <Wrapper>
            <ComponentWrapper>
              <TinyTitle style={{fontSize:totalSize(1.8)}}>Portfolio</TinyTitle>
            </ComponentWrapper>
            <Spacer height={sizes.smallMargin} />
            <Wrapper 
            // animation="fadeInRightBig"
            >
              {portfolio.length > 0 ? (
                <FlatList
                  data={portfolio}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity 
                      // onPress={() => {
                      //   // alert("Call")
                      //   this.setState({CurrentImage: item.imageUrl, ShowPenal: true});
                      // }}
                      >
                      <ImagePortfolio
                        containerStyle={{
                          marginLeft: index === 0 ? width(5) : 0,
                          marginRight: width(2.5),
                        
                        }}
                        source={{uri: item.attachment}}
                      />
                      </TouchableOpacity>
                    );
                  }}
                />
              ) : (
                <View style={{width: '100%', alignItems: 'center'}}>
                  <Text>No images</Text>
                </View>
              )}
            </Wrapper>
          </Wrapper>
        );
      };
      const RenderReviews = () => {
        // const {item} = this.props.route.params;
        // const { reviews } = this.state;
        // const {Provider} = this.state;
        return (
          <Wrapper>
            <ComponentWrapper>
              <TinyTitle style={{fontSize:totalSize(1.8)}}>Reviews</TinyTitle>
            </ComponentWrapper>
            <Wrapper 
            // animation="fadeInRightBig"
            >
              {reviews && reviews.length > 0 ? (
                <FlatList
                  data={reviews}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      <StylerReviewCard
                        containerStyle={{
                          marginLeft: index === 0 ? width(5) : 0,
                          marginRight: width(5),
                          marginVertical: height(1),
                          // backgroundColor:'red'
                        }}
                        image={{uri:item?.image}}
                        name={item.name}
                        rating={item?.rating}
                        detail={item?.comment}
                        // onPress={() => {
                        //   // alert("Call")
                        //   this.setState({
                        //     CurrentReview: item,
                        //     ShowReviewPenal: true,
                        //   });
                        // }}
                      />
                    );
                  }}
                />
              ) : (
                <View style={{width: '100%', alignItems: 'center'}}>
                  <Text>No Reviews</Text>
                </View>
              )}
            </Wrapper>
          </Wrapper>
        );
      };
      const RenderServices = () => {
        // const {services} = this.state;
        return (
          <Wrapper>
            <ComponentWrapper style={{}}>
              <TinyTitle style={{fontSize:totalSize(1.8)}}>Services</TinyTitle>
            </ComponentWrapper>
            {services.length > 0 ? (
              <FlatList
                data={services}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <ServiceIconCard
                      onPress={() => {}}
                      containerStyle={{
                        width: width(30),
                        marginLeft: index === 0 ? width(5) : 0,
                        marginRight: width(2.5),
                        marginVertical: height(1),
                      }}
                      icon={item.icon}
                      title={item.title}
                      price={item?.large}
                      // price={item.Price[0].Value}
                    />
                  );
                }}
              />
            ) : (
              <View style={{width: '100%', alignItems: 'center'}}>
                <Text>No Services</Text>
              </View>
            )}
          </Wrapper>
        );
      };
    return (
        <MainWrapper>
        
        {/* <AbsoluteWrapper style={{ top: sizes.baseMargin, left: sizes.baseMargin,flexDirection:'row',alignItems:"center" }}>
            
            <SmallTitle style={{color:colors.appColor1,marginLeft:width(15),fontSize:fontSize.h4}}>Profile</SmallTitle>
          </AbsoluteWrapper> */}
        
        <ScrollView showsVerticalScrollIndicator={false}>
        
          <ImageProfile
          title={"Stylist Profile"}
            // onPress={() => {
            //   // alert("Call")
            //   this.setState({CurrentImage: Provider.profileImage, ShowPenal: true});
            // }}
            // source={{uri: Provider.profileImage}}
          />
          
          <Wrapper flex={1}>
          
            <AbsoluteWrapper style={{right:width(4), left:width(4), top: -height(10.5)}}>
              <CardWrapper
                // animation="fadeInDown"
                style={{
                  backgroundColor: colors.appColor1,
                  padding: sizes.baseMargin,
                  
                
                }}>
                <RowWrapperBasic style={{alignSelf: 'center'}}>
                  <SmallTitle
                    style={[
                      appStyles.textCenter,
                      appStyles.textWhite,
                      
                      {marginRight: totalSize(1)},
                    ]}>
                      {dataSource?.first_name}{" "}{dataSource?.last_name}
                    {/* {' '}
                    {Provider.username} */}
                  </SmallTitle>
                </RowWrapperBasic>
                <Spacer height={sizes.baseMargin} />
                <MediumText style={[appStyles.textCenter, appStyles.textWhite]}>
                  {/* {Provider.title} */}
                  Hair Stylist
                </MediumText>
                <Spacer height={sizes.smallMargin} />
                <IconWithTextimage
                  iconName="star"
                  text={('(4.5)')}
                  tintColor={colors.rating}
                  textStyle={[appStyles.textWhite]}
                  containerStyle={[{alignSelf: 'center'}]}
                />
                <Spacer height={sizes.smallMargin} />
                <ComponentWrapper>
                  <SmallText
                    style={[appStyles.textCenter, appStyles.textWhite,{fontSize:totalSize(1.5)}]}>
                    {/* {Provider.aboutMe} */}
                    Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna si.
                  </SmallText>
                </ComponentWrapper>
              </CardWrapper>
            </AbsoluteWrapper>
            <Spacer height={sizes.doubleBaseMargin * 3} />
            <RowWrapper>
              <Wrapper>
                <SmallText style={[appStyles.textPrimaryColor]}>
                  {dataSource?.positive_reviews}% positive reviews
                  {/* :{' '}
                  {Provider.reviews ? Provider.reviews.length : 0} */}
                </SmallText>
                <Spacer height={sizes.smallMargin} />
                <SmallText style={[appStyles.textPrimaryColor]}>
                  {dataSource?.completed_jobs} completed jobs
                  {/* :{' '}
                  {this.state.CompletedBookings} */}
                </SmallText>
                <Spacer height={sizes.smallMargin} />
                <SmallText style={[appStyles.textPrimaryColor]}>
                 Joined {dataSource?.joined} 
                  {/* {moment(Provider.createdAt).fromNow()} */}

                </SmallText>
              </Wrapper>
              <Wrapper style={[appStyles.center]}>
                <SmallText style={[]}>Average Price</SmallText>
                <Spacer height={sizes.smallMargin} />
                <LargeTitle style={[appStyles.textPrimaryColor]}>
                  {/* ${Provider.Price}${dataSource?.avg_price} */}
                  ${parseFloat(dataSource?.avg_price!=null?dataSource?.avg_price:"N/A").toFixed()}
                </LargeTitle>
              </Wrapper>
            </RowWrapper>
            <Spacer height={sizes.doubleBaseMargin} />
            <RenderPortfolio />
            <Spacer height={sizes.doubleBaseMargin} />
            <RenderServices />
            <Spacer height={sizes.doubleBaseMargin} />
            <RenderReviews />
            <Spacer height={sizes.doubleBaseMargin * 2} />
          </Wrapper>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            this.setState({ShowPenal: false});
          }}
          visible={ShowPenal}>
          <TouchableOpacity
        //   onPress={() => {
        //     this.setState({CurrentReview: item, ShowPenal: false});
        //   }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: height(100),
              width: width(100),
              backgroundColor: 'rgba(0,0,0,0.8)',
              zIndex: 0,
              
            }}>
            <TouchableOpacity
              onPress={() => {
                // alert('Call 2');
                ShowPenal(false)
              }}
              style={{}}>
              <Image
                resizeMode="contain"
                imageBackgroundColor="#000000"
                style={{
                  width: width(80),
                  height: height(80),
                }}
                source={{
                  uri: CurrentImage,
                }}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowReviewPenal}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            ShowReviewPenal (false)
          }}
          >
          <TouchableOpacity
        //   onPress={() => {
        //     this.setState({CurrentReview: item, ShowReviewPenal: false});
        //   }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: height(100),
              width: width(100),
              backgroundColor: 'rgba(0,0,0,0.8)',
              zIndex: 0,
            }}>
            <StylerReviewCard
              containerStyle={
                {
                  // marginLeft: index === 0 ? width(5) : 0,
                  // marginRight: width(5),
                  // marginVertical: height(1),
                  height: height(15),
                  width: width(90),

                }
              }
              imageSize={10}
              image={CurrentReview.image}
              name={CurrentReview.userName}
              rating={CurrentReview.rating}
              detail={CurrentReview.review}
            //   onPress={() => {
            //     this.setState({CurrentReview: item, ShowReviewPenal: false});
            //   }}
            />
          </TouchableOpacity>
        </Modal>
        <View style={{position:'absolute',alignSelf:'flex-start'}}>
           <TouchableOpacity 
              activeOpacity={.7}
              onPress={() => props.navigation.goBack()}
              style={{height:height(5),width:height(5),borderRadius:50,alignItems:'center',justifyContent:'center',
              backgroundColor:colors.appColor1,marginLeft:height(2),marginVertical:height(2)}}>
              <Ionicons 
                name='chevron-back'
                size={totalSize(3)}
                color="#fff"
              />  
            </TouchableOpacity>
           </View>
        <AbsoluteWrapper style={{right: 0, left: 0, bottom: height(0)}}>
          <ButtonColored
            text="Continue"
            onPress={() => props.navigation.navigate(routes.client.selectdate,{data:param,stylistinfo:dataSource})}
          />
        </AbsoluteWrapper>
           {/* <ButtonColored
                text="Continue"
                onPress={() => props.navigation.navigate(routes.provider.charges)}
                buttonStyle={{postition:"absolute",marginVertical:height(2)}}
            /> */}
      </MainWrapper>
  );
}

export default StylistProfile;
const styles=StyleSheet.create({
    backiconStyle: {
      height: height(5),
      width: height(5),
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.appColor1
    },
  })