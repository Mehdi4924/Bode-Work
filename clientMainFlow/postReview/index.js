import React, {useState} from 'react';
import {View, StatusBar, ActivityIndicator} from 'react-native';
import {
  MainWrapper,
  ComponentWrapper,
  ImageRound,
  TinyTitle,
  Spacer,
  TextInputBordered,
  ButtonColored,
  SmallTitle,
  Primary
} from '../../../components';
import {
  appImages,
  appStyles,
  colors,
  fontFamily,
  sizes,
  ToastMessage,
} from '../../../themes';
import {totalSize, height,width} from 'react-native-dimension';
// import {AirbnbRating,Rating} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../../components/header/header';
import {useSelector} from 'react-redux';
import {userpostReview} from '../../../services/backend/booking';
import {color} from 'react-native-reanimated';
import {Rating, AirbnbRating} from 'react-native-ratings';

const data = [{images: appImages.nailArtist2}];
const PostReview = props => {
  const param =props.route.params
  console.log("ye aya param post review pr",param);
  const {navigate, goBack} = props.navigation;
  const {userDetail} = useSelector(state => state.user);
  const [loader, setLoader] = useState(false);
  const [Startrating, setStartrating] = useState(0);
  const [review, setReview] = useState('');
  const [starCount, setstarCount] = useState(2.5);
  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
  };
  const postReviewHandle = () => {
    try {
      setLoader(true);
      const data = {
        user_id: userDetail?.id,
        stylist_id: props?.route?.params?.stylistid,
        service_id: props?.route?.params?.serviceid,
        rating: param?.rating!=null?param?.rating:'4',
        comment: review,
        image:param?.image
      };
      console.log("fomdata on review",data);
      userpostReview(data).then(response => {
        setLoader(false);
        if (response?.success) {
          ToastMessage('Review Post Successfully');
          setStartrating(0);
          setReview('');
          props.navigation.goBack()
        } else {
          ToastMessage('Review Post Failed');
        }
      });
    } catch (error) {
      setLoader(false);
      ToastMessage(error.message);
    }
  };

  return (
    <MainWrapper>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <Header
        goBack={() => goBack()}
        heading={'Post a Review'}
        color={colors.appColor1}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Spacer height={sizes.doubleBaseMargin} />
        <ComponentWrapper style={[appStyles.center]}>
          <ImageRound source={{uri:param.image!=null?param.image:appImages.barber1}} size={totalSize(12)} />
          <Spacer height={sizes.baseMargin} />
          <SmallTitle style={{textTransform: 'capitalize'}}>
            {/* {props?.route?.params?.first_name} */}{param?.name}
          </SmallTitle>
          <Spacer height={sizes.smallMargin} />
          <View
            style={{
              height: 26,
              width: 92,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TinyTitle
              style={{
                color: '#000',
                textAlign: 'center',
                textTransform: 'capitalize',
                fontFamily: fontFamily.appTextRegular,
              }}>
              {/* {props?.route?.params?.service_name} */}
              {param?.servicename}
            </TinyTitle>
          </View>
        </ComponentWrapper>
        <Spacer height={sizes.doubleBaseMargin} />
        <ComponentWrapper style={[appStyles.center]}>
          <TinyTitle>Rate Your Experience</TinyTitle>
          <Spacer height={sizes.smallMargin} />
          {/* <AirbnbRating
                        defaultRating={Startrating}
                        showRating={false}
                        onFinishRating={rating => setStartrating(rating)}
                    /> */}
          {/* <Rating startingValue={0} imageSize={totalSize(5) }/> */}
          {/* <AirbnbRating
            type="star"
            showRating={false}
            size={30}
            ratingImage={appImages.starCount}
            ratingColor="#DBC379"
            ratingBackgroundColor="#DBC379"
            ratingCount={5}
            imageSize={30}

            onFinishRating={ratingCompleted}
            style={{paddingVertical: 10, width: 200}}
            starContainerStyle={{width: 200, justifyContent: 'space-between'}}
          /> */}
          <Primary 
          fillIconName={"star"}
          emptyIconName={'md-star-outline'}
          iconType={"ionicon"}
          value={""}
          // onPressIcon={console.log("pressed")}
          // disabled={}
          iconSize={totalSize(5)}
          />
        </ComponentWrapper>
        <Spacer height={sizes.doubleBaseMargin} />
        <TextInputBordered
          placeholder="Write a review"
          value={review}
          multiline
          onChangeText={text => setReview(text)}
          inputStyle={[{textAlignVertical: 'top', height: height(20)}]}
        />
        <Spacer height={sizes.doubleBaseMargin} />
      
      {loader ? (
        <View>
          <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
        </View>
      ) : (
        <ButtonColored
          text="Share Review"
          onPress={()=>
            review!=""&&
            review!=null
            ?postReviewHandle()
          :ToastMessage("please write somthing")}
          // onPress={() => goBack()}
        />
      )}
      <Spacer height={sizes.baseMargin} />
      </KeyboardAwareScrollView>
    </MainWrapper>
  );
};

export default PostReview;
