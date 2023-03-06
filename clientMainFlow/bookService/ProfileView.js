import React, {Component} from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';
import {
  Wrapper,
  ImageProfile,
  AbsoluteWrapper,
  CardWrapper,
  SmallTitle,
  IconWithText,
  Spacer,
  RowWrapper,
  StylerReviewCard,
  LargeTitle,
  ComponentWrapper,
  TinyTitle,
  MainWrapper,
  MediumText,
  SmallText,
  ImagePortfolio,
  ServiceIconCard,
  RowWrapperBasic,
} from '../../../components';
import {Icon} from 'react-native-elements';
import {colors, sizes, appStyles, appIcons} from '../../../themes';
import {height, totalSize, width} from 'react-native-dimension';
import {Image} from 'react-native';
import {getData} from '../../../backend/firebase/utility';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Modal} from 'react-native';

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowPenal: false,
      ShowReviewPenal: false,
      CurrentReview:{},
      CurrentImage: '',
      item:{
        userImages:[],
      },
      detail:
        'Duis mauris augue, efficitur eu arcu sit amet, posuere dignissim neque. Aenean enim sem, pharetra et magna si.',
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
        // {
        //     icon: appIcons.tatoo,
        //     title: 'Tattoo'
        // },
        // {
        //     icon: appIcons.piercing,
        //     title: 'Piercing'
        // },
        // {
        //     icon: appIcons.braiding,
        //     title: 'Braiding'
        // },
        // {
        //     icon: appIcons.beard,
        //     title: 'Beard'
        // },
        // {
        //     icon: appIcons.imageDoc,
        //     title: 'Shape-Up'
        // },
      ],
      reviews: [
        // {
        //     name: "Jolly Wil",
        //     image: appImages.user1,
        //     rating: 4.2,
        //     date: "29th July, 2020",
        //     time: '04:00 pm',
        //     detail: 'lorem ipsum text of the review that the user has submitted about this stylist'
        // },
        // {
        //     name: "Jackobe Black",
        //     image: appImages.user4,
        //     rating: 4.5,
        //     date: "29th July, 2020",
        //     time: '04:00 pm',
        //     detail: 'lorem ipsum text of the review that the user has submitted about this stylist'
        // },
        // {
        //     name: "Amy Jackson",
        //     image: appImages.user2,
        //     rating: 4.9,
        //     date: "29th July, 2020",
        //     time: '04:00 pm',
        //     detail: 'lorem ipsum text of the review that the user has submitted about this stylist'
        // },
      ],
    };
  }

  async componentDidMount() {
    const {ProviderId} = this.props.route.params;
    // alert(ProviderId)
    let Provider = await getData("Provider",ProviderId)
    console.log("Provider: ",Provider)
    let services = await getData('services', ProviderId);
    let today = moment().format('YYYY-MM-DD');
    let CompletedBookings = await getData('Bookings', ProviderId);
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
      item:Provider,
      CompletedBookings:
        CompletedBookings.Confirmed !== undefined
          ? CompletedBookings.Confirmed.length
          : 0,
    });
    this.forceUpdate();
  }

  renderPortfolio = () => {
    // const { portfolio,item } = this.state
    const {item} = this.state;
    return (
      <Wrapper>
        <ComponentWrapper>
          <TinyTitle>Portfolio</TinyTitle>
        </ComponentWrapper>
        <Spacer height={sizes.smallMargin} />
        <Wrapper animation="fadeInRightBig">
          {item.userImages!== undefined &&  item.userImages.length > 0 ? (
            <FlatList
              data={item.userImages}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity onPress={() => {
                    // alert("Call")
                    this.setState({CurrentImage: item, ShowPenal: true});
                  }}>
                  <ImagePortfolio
                    containerStyle={{
                      marginLeft: index === 0 ? width(5) : 0,
                      marginRight: width(2.5),
                    }}
                    source={{uri: item}}
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
    const {item} = this.state;
    // const { reviews } = this.state
    return (
      <Wrapper>
        <ComponentWrapper>
          <TinyTitle>Reviews</TinyTitle>
        </ComponentWrapper>
        <Wrapper animation="fadeInRightBig">
          {item.reviews && item.reviews.length > 0 ? (
            <FlatList
              data={item.reviews}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <StylerReviewCard
                    containerStyle={{
                      marginLeft: index === 0 ? width(5) : 0,
                      marginRight: width(5),
                      marginVertical: height(1),
                    }}
                    image={item.image}
                    name={item.userName}
                    rating={item.rating}
                    detail={item.review}
                    onPress={() => {
                      // alert("Call")
                      this.setState({
                        CurrentReview: item,
                        ShowReviewPenal: true,
                      });
                    }}
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
  renderServices = ({navigate}) => {
    const {services} = this.state;
    return (
      <Wrapper>
        <ComponentWrapper style={{}}>
          <TinyTitle>Services</TinyTitle>
        </ComponentWrapper>
        {services!== undefined && services.length > 0 ? (
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
                  icon={appIcons.imageDoc}
                  title={item.Service}
                  price={item.Price[0].Value}
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
    const {item,detail, portfolio} = this.state;
    return (
      <MainWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageProfile
            onPress={() => {
              // alert("Call")
              this.setState({CurrentImage: item.profileImage, ShowPenal: true});
            }}
            source={{uri: item.profileImage}}
          />
          <Wrapper flex={1}>
            <AbsoluteWrapper style={{right: 0, left: 0, top: -height(7.5)}}>
              <CardWrapper
                animation="fadeInDown"
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
                    {' '}
                    {item.username}
                  </SmallTitle>
                  <Icon
                    name="check-circle"
                    type="font-awesome"
                    // name="license"
                    // type="material-community"
                    size={sizes.appIcons.medium}
                    // color={'blue'}
                    color={'#00acee'}
                    // onPress={onPress}
                  />
                </RowWrapperBasic>
                <Spacer height={sizes.baseMargin} />
                <MediumText style={[appStyles.textCenter, appStyles.textWhite]}>
                  {item.title}
                </MediumText>
                <Spacer height={sizes.smallMargin} />
                <IconWithText
                  iconName="star"
                  text={item.rating}
                  tintColor={colors.rating}
                  textStyle={[appStyles.textWhite]}
                  containerStyle={[{alignSelf: 'center'}]}
                />
                <Spacer height={sizes.smallMargin} />
                <ComponentWrapper>
                  <SmallText
                    style={[appStyles.textCenter, appStyles.textWhite]}>
                    {item.aboutMe}
                  </SmallText>
                </ComponentWrapper>
              </CardWrapper>
            </AbsoluteWrapper>
            <Spacer height={sizes.doubleBaseMargin * 3} />
            <RowWrapper>
              <Wrapper>
                <SmallText style={[appStyles.textPrimaryColor]}>
                  {item.positiveReviews} positive reviews:{' '}
                  {item.reviews ? item.reviews.length : 0}
                </SmallText>
                <Spacer height={sizes.smallMargin} />
                <SmallText style={[appStyles.textPrimaryColor]}>
                  {item.completejpbs} completed jobs:{' '}
                  {this.state.CompletedBookings}
                </SmallText>
                <Spacer height={sizes.smallMargin} />
                <SmallText style={[appStyles.textPrimaryColor]}>
                  Joined {moment(item.createdAt).fromNow()}
                </SmallText>
              </Wrapper>
              <Wrapper style={[appStyles.center]}>
                <SmallText style={[]}>Average Price</SmallText>
                <Spacer height={sizes.smallMargin} />
                <LargeTitle style={[appStyles.textPrimaryColor]}>
                  ${item.Price}
                </LargeTitle>
              </Wrapper>
            </RowWrapper>
            <Spacer height={sizes.doubleBaseMargin} />
            <this.renderPortfolio />
            <Spacer height={sizes.doubleBaseMargin} />
            {/* <this.renderServices /> */}
            {/* <Spacer height={sizes.doubleBaseMargin} /> */}
            <this.renderReviews />
            <Spacer height={sizes.doubleBaseMargin * 2} />
          </Wrapper>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          // visible={this.state.ShowPenal}
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

        {/* <AbsoluteWrapper style={{right: 0, left: 0, bottom: height(2.5)}}>
          <ButtonColored
            text="Continue"
            onPress={() => navigate(routes.provider.selectDate, {item: item})}
          />
        </AbsoluteWrapper> */}
      </MainWrapper>
    );
  }
}

export default ProfileView;
