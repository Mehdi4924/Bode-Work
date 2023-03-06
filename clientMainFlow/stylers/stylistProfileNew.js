
import React, {Component} from 'react';
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


class StylistProfileNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowPenal: false,
      ShowReviewPenal: false,
      CurrentReview:{},
      Provider:{
        userImages:[],
      },
      CurrentImage: '',
      detail: 'Lorem ipsum tellus in pellentesque mollis,mauris orci dignissim nisl, id gravida nunc enis nibh.Maecenas convallis eros a aaaaaaaaante dignissim, vitae elementum metus faccilisis.',
      portfolio: [
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
      ],
      services: [
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
      ],
      reviews: [
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
      ],
    };
  }

  async componentDidMount() {
    const id = this.props.route.params;
    console.log("ie id",id);
    // let services = await getData('services', Id);
    // let Provider= await getData('Provider',Id)
    // let today = moment().format('YYYY-MM-DD');
    // let CompletedBookings = await getData('Bookings', Id);


    // console.log(item);
    // let confirmedBookings = [];
    // for (let i = 0; i < CompletedBookings.length; i++) {
    //   for (let j = 0; j < CompletedBookings[i].Confirmed.length; j++) {
    //     if (token == CompletedBookings[i].Confirmed[j].UserId) {
    //       let date2 = moment(CompletedBookings[i].Confirmed[j].date).format(
    //         'YYYY-MM-DD',
    //       );
    //       let calculatedDay = moment(date2).diff(today, 'days');
    //       if (calculatedDay >= 0) {
    //         confirmedBookings.push(CompletedBookings[i].Confirmed[j]);
    //       }
    //     }
    //   }
    // }
    this.setState({
      services: services.Details,
      Provider:Provider,
      CompletedBookings:
        CompletedBookings.Confirmed !== undefined
          ? CompletedBookings.Confirmed.length
          : 0,
    });
    this.forceUpdate();
  }

  renderPortfolio = () => {
    const { portfolio,item, Provider } = this.state
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
                    source={{uri: item.imageUrl}}
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
  renderReviews = () => {
    // const {item} = this.props.route.params;
    const { reviews } = this.state;
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
                    image={item.image}
                    name={item.name}
                    rating={item.rating}
                    detail={item.detail}
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
  renderServices = () => {
    const {services} = this.state;
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
                  price={item.price}
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

  render() {
    // const {item} = this.props.route.params;
    // const {navigate} = this.props.navigation;
    const {detail, portfolio, Provider} = this.state;
    return (
      <MainWrapper>
        
        {/* <AbsoluteWrapper style={{ top: sizes.baseMargin, left: sizes.baseMargin,flexDirection:'row',alignItems:"center" }}>
            
            <SmallTitle style={{color:colors.appColor1,marginLeft:width(15),fontSize:fontSize.h4}}>Profile</SmallTitle>
          </AbsoluteWrapper> */}
        
        <ScrollView showsVerticalScrollIndicator={false}>
        
          <ImageProfile
          title={"Stylist Profile"}
            onPress={() => {
              // alert("Call")
              this.setState({CurrentImage: Provider.profileImage, ShowPenal: true});
            }}
            source={{uri: Provider.profileImage}}
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
                      John Doe
                    {/* {' '}
                    {Provider.username} */}
                  </SmallTitle>
                  {/* <Icon
                    name="check-circle"
                    type="font-awesome"
                    // name="license"
                    // type="material-community"
                    size={sizes.appIcons.medium}
                    // color={'blue'}
                    color={'#00acee'}
                    // onPress={onPress}
                  /> */}
                </RowWrapperBasic>
                <Spacer height={sizes.baseMargin} />
                <MediumText style={[appStyles.textCenter, appStyles.textWhite]}>
                  {/* {Provider.title} */}
                  Hair Stylist
                </MediumText>
                <Spacer height={sizes.smallMargin} />
                <IconWithText
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
                  {Provider.positiveReviews}98% positive reviews
                  {/* :{' '}
                  {Provider.reviews ? Provider.reviews.length : 0} */}
                </SmallText>
                <Spacer height={sizes.smallMargin} />
                <SmallText style={[appStyles.textPrimaryColor]}>
                  {Provider.completejpbs}152 completed jobs
                  {/* :{' '}
                  {this.state.CompletedBookings} */}
                </SmallText>
                <Spacer height={sizes.smallMargin} />
                <SmallText style={[appStyles.textPrimaryColor]}>
                 Joined 8 months ago 
                  {/* {moment(Provider.createdAt).fromNow()} */}

                </SmallText>
              </Wrapper>
              <Wrapper style={[appStyles.center]}>
                <SmallText style={[]}>Average Price</SmallText>
                <Spacer height={sizes.smallMargin} />
                <LargeTitle style={[appStyles.textPrimaryColor]}>
                  {/* ${Provider.Price} */}$40
                </LargeTitle>
              </Wrapper>
            </RowWrapper>
            <Spacer height={sizes.doubleBaseMargin} />
            <this.renderPortfolio />
            <Spacer height={sizes.doubleBaseMargin} />
            <this.renderServices />
            <Spacer height={sizes.doubleBaseMargin} />
            <this.renderReviews />
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
          visible={this.state.ShowPenal}>
          <TouchableOpacity
          onPress={() => {
            this.setState({CurrentReview: item, ShowPenal: false});
          }}
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
                this.setState({ShowPenal: false});
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
                  uri: this.state.CurrentImage,
                }}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.ShowReviewPenal}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            this.setState({ShowReviewPenal: false});
          }}
          >
          <TouchableOpacity
          onPress={() => {
            this.setState({CurrentReview: item, ShowReviewPenal: false});
          }}
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
              image={this.state.CurrentReview.image}
              name={this.state.CurrentReview.userName}
              rating={this.state.CurrentReview.rating}
              detail={this.state.CurrentReview.review}
              onPress={() => {
                this.setState({CurrentReview: item, ShowReviewPenal: false});
              }}
            />
          </TouchableOpacity>
        </Modal>
        <View style={{position:'absolute',alignSelf:'flex-start'}}>
           <TouchableOpacity 
              activeOpacity={.7}
              onPress={() => this.props.navigation.goBack()}
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
            onPress={() => this.props.navigation.navigate(routes.client.selectdate)}
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
}

export default StylistProfileNew;
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
