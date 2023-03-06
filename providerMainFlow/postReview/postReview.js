import React, {useState} from 'react';
import {View, StatusBar,ActivityIndicator} from 'react-native';
import {
  MainWrapper,
  ComponentWrapper,
  ImageRound,
  TinyTitle,
  Spacer,
  TextInputBordered,
  ButtonColored,
  SmallTitle,
  Primary,
} from '../../../components';
import {
  appImages,
  appStyles,
  colors,
  sizes,
  ToastMessage,
} from '../../../themes';
import {totalSize, height} from 'react-native-dimension';
import {AirbnbRating, Rating} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../../components/header/header';
import {routes} from '../../../services';
import {postStylistReviewData} from '../../../services/backend/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PostReview = props => {
  const param = props.route.params.data;
  console.log('ye aya param on post review', JSON.stringify(param, null, 2));
  const [Startrating, setStartrating] = useState(4);
  const [review, setReview] = useState('');
  const [rating, setrating] = useState(4);
  const [loader, setLoader] = useState(false);
  const postReview = () => {
    setLoader(true)
    const formdata = new FormData();
    formdata.append('stylist_id', param?.stylist_id);
    formdata.append('user_id', param?.user_id);
    formdata.append('service_id', param?.service_id);
    formdata.append('rating', '4');
    formdata.append('comment', review);
    console.log('form data', formdata);
    postStylistReviewData(formdata).then(response => {
      // console.log("ye chaala",response);
      if (response?.success) {
        setLoader(false)
        console.log('postReviewDATA =====> ', response.data);
        props.navigation.navigate(routes.provider.home);
      } else {
        ToastMessage(response.error);
        setLoader(false)
      }
    });
  };
  return (
    <MainWrapper>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <Header
        goBack={() => props.navigation.goBack()}
        heading={'Post a Review'}
        color={colors.appColor1}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Spacer height={sizes.doubleBaseMargin} />
        <ComponentWrapper style={[appStyles.center]}>
          <ImageRound
            source={
              param && param?.user?.profile_image != null
                ? param?.user?.profile_image
                : appImages.imageOne
            }
            size={totalSize(12)}
          />
          <Spacer height={sizes.baseMargin} />
          <SmallTitle>
            {param && param?.user?.first_name != null
              ? param?.user?.first_name
              : 'N/A'}{' '}
            {param && param?.user?.first_name != null
              ? param?.user?.first_name
              : 'N/A'}
          </SmallTitle>
          <Spacer height={sizes.smallMargin} />
          <View
            style={{
              backgroundColor: colors.appColor1,
              height: 26,
              width: 92,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TinyTitle style={{color: '#FFF', textAlign: 'center'}}>
              Hair Cut
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
          {/* <Rating startingValue={3} imageSize={totalSize(5) }/> */}
          <Primary
            fillIconName={'star'}
            emptyIconName={'md-star-outline'}
            iconType={'ionicon'}
            value={rating}
            // onPressIcon={}
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
      </KeyboardAwareScrollView>
      {loader ? (
          <View>
            <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
          </View>
        ) : (
      <ButtonColored
        text="Share Review"
        onPress={() => 
            review!=""&&
            review!=null
            ?postReview()
        :ToastMessage("Please write something")
        }
        //  onPress={()=>props.navigation.navigate(routes.provider.home)}
      />
        )}
      <Spacer height={sizes.baseMargin} />
    </MainWrapper>
  );
};

export default PostReview;
