import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StatusBar, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
  MainWrapperMatrial,
  Wrapper,
  SmallTitle,
  ClientStylerCard,
  ClientCompletedCardnew
} from '../../../components';
import { colors, appImages, sizes, ToastMessage } from '../../../themes';
import { height, totalSize } from 'react-native-dimension';
import ClientHeader from '../../../components/header/clientHeader';
import { favouriteStylers, pastStylers } from '../../../services/backend/stylers';
import { showallStylistData, addFavoriteData, removeFavoriteData } from '../../../services/backend/client';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
const favouriteStylersList = [
  {
    name: 'James De',
    bgImage: appImages.barber1,
    image: appImages.user1,
    title: 'Hair Stylist',
    rating: 4.6,
    price: '34',
    location: '17 Johnson Ave, NYC',
    date: '29th July, 2020',
    time: '04:00 pm',
    liked: true,
  },
  {
    name: 'Alexa Jo',
    bgImage: appImages.barber1,
    image: appImages.user2,
    title: 'Nail Stylist',
    rating: 4,
    price: '45',
    location: '17 Johnson Ave, NYC',
    date: '29th July, 2020',
    time: '04:00 pm',
    liked: true,
  },
  {
    name: 'Jackobe Bl',
    bgImage: appImages.barber1,
    image: appImages.user3,
    title: 'Hair Stylist',
    rating: 4.9,
    price: '56',
    location: '17 Johnson Ave, NYC',
    date: '29th July, 2020',
    time: '04:00 pm',
    liked: true,
  },
];
const PastData = [
  {
    name: 'Jackobe Bl',
    bgImage: appImages.barber1,
    image: appImages.user3,
    title: 'Hair Stylist',
    rating: 4.9,
    price: '56',
    location: '17 Johnson Ave, NYC',
    date: '29th July, 2020',
    time: '04:00 pm',
    liked: true,
  },
  {
    name: 'Jackobe Bl',
    image: appImages.user3,
    bgImage: appImages.barber1,
    title: 'Hair Stylist',
    rating: 4.9,
    price: '56',
    location: '17 Johnson Ave, NYC',
    date: '29th July, 2020',
    time: '04:00 pm',
    liked: false,
  },
  {
    name: 'Jackobe Bl',
    image: appImages.user3,
    bgImage: appImages.barber1,
    title: 'Hair Stylist',
    rating: 4.9,
    price: '56',
    location: '17 Johnson Ave, NYC',
    date: '29th July, 2020',
    time: '04:00 pm',
    liked: true,
  },
  {
    name: 'Jackobe Bl',
    image: appImages.user3,
    bgImage: appImages.barber1,
    title: 'Hair Stylist',
    rating: 4.9,
    price: '56',
    location: '17 Johnson Ave, NYC',
    date: '29th July, 2020',
    time: '04:00 pm',
    liked: false,
  },
];

const Stylers = (props) => {
  const { userDetail } = useSelector((state) => state.user);
  console.log('user id', userDetail.id);
  const [favouriteTabActive, setFavouriteTabActive] = useState(true);
  const [pastTabActive, setPastTabActive] = useState(false);
  const [favouriteStylersList, setFavouriteStylersList] = useState([]);
  const [pastFavouriteStylersList, setpastFavouriteStylersList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [Startrating, setStartrating] = useState(5);
  // const [pastStylers, setPastStylers] = useState([]);

  // useEffect(() => {
  //   getFavouriteStylers();
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      getFavouriteStylers();
      getPastStylers ();

    }, [])
  );
  const getFavouriteStylers = () => {
    setLoader(true)
    try {
      const data = {
        user_id: userDetail?.id,
      };
      favouriteStylers(data).then((response) => {
        if (response?.success) {
          console.log("RESPONSE favourites =====> ", JSON.stringify(response?.data?.stylist,null,2));
          setFavouriteStylersList(response?.data?.stylist);
          setLoader(false)
        } else {
          setFavouriteStylersList([]);
          setLoader(false)
        }
      })
    } catch (error) {
      ToastMessage(error.message);
      setLoader(false)
    }
  };
  const getPastStylers = () => {
    try {
      const data = {
        stylist_id: userDetail?.id,
        // stylist_id: "5",
        // month: "6"
      };
      pastStylers(data).then((response) => {
        if (response?.success) {
          console.log("RESPONSE past =====> ", JSON.stringify(response?.data, null, 2));
          setpastFavouriteStylersList(response?.data);
        } else {

          setpastFavouriteStylersList([]);
          console.log("error in past");
        }
      })
    } catch (error) {
      ToastMessage(error.message);
    }
  }; 
  const addFavorite = (item) => {
    try {
      const data = {
        user_id: userDetail?.id,
        stylist_id: item?.id,
      };
      addFavoriteData(data).then(response => {
        // console.log('addFavoriteData 22 =====> ', response);
        if (response?.success) {
          const newdata = [...favouriteStylersList]
          newdata[index].favorite_stylist = true
          let a = favouriteStylersList.map(item => {
            if (item.id == id) {
              return { ...item, favorite_stylist: true }
            } else {
              return item
            }
          })
          setFavouriteStylersList(a)
          // dataSource[index]=favorite_stylist(true)
          // setDataSource(dataSource);
          // // console.log(' addFavoriteData data =====> ', JSON.stringify(response.data, null, 2));

        }
      });
    } catch (error) {
      ToastMessage(error.message);
    }
  };
  const removeFavorite = (item,index) => {
    try {
      const data = {
        user_id: userDetail?.id,
        stylist_id: item?.id,
      };
      removeFavoriteData(data).then(response => {
        if (response?.success==true) {
          let a = favouriteStylersList.filter(itemm => itemm.id != item.id);
          // console.log("canfirmbookingData filter k bad arry",JSON.stringify(a,null,2));
          setFavouriteStylersList(a);
          ToastMessage('Removed from favorite');
        } else {
          setFavouriteStylersList(favouriteStylersList);
        }
      });
    
    } catch (error) {
      ToastMessage(error.message);
    }
  };

  return (
    <MainWrapperMatrial>
      <StatusBar backgroundColor={"#FFF"} barStyle={'dark-content'} />
      <ClientHeader
        heading={"Stylers"}
        notification={false}
        headingStyle={{ color: colors.appColor1 }}
        headerStyle={{ backgroundColor: "#FFF" }}
      />
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          activeOpacity={.7}
          onPress={() => {
            setFavouriteTabActive(true);
            setPastTabActive(false);
          }}
          style={{ flex: 1, justifyContent: 'center', borderBottomWidth: favouriteTabActive ? 2 : 0, borderBottomColor: colors.appColor1, paddingVertical: height(2), borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
          <SmallTitle style={{ color: colors.appColor1, textAlign: "center" }}>Favorite</SmallTitle>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={.7}
          onPress={() => {
            setFavouriteTabActive(false);
            setPastTabActive(true);
            getPastStylers();
          }}
          style={{ flex: 1, justifyContent: 'center', borderBottomWidth: pastTabActive ? 2 : 0, borderBottomColor: colors.appColor1, paddingVertical: height(2), borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
          <SmallTitle style={{ color: colors.appColor1, textAlign: "center" }}>Past</SmallTitle>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Wrapper
          // animation="fadeInDown"
          style={{ marginTop: totalSize(2), marginBottom: height(3) }}
        >
          {favouriteTabActive ?
            <>
              {loader ? (
                <View
                  style={{
                    marginVertical: '10%',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
                </View>
              ) : favouriteStylersList?.length > 0 ? (
                <>
                  {favouriteStylersList.map((item, key,index) => {


                    return (
                      <ClientCompletedCardnew
                        key={key}
                        name={item?.first_name}
                        lastname={item?.last_name}
                        rating={item?.avg_rating!=null?item?.avg_rating:'0'}
                        // bgimage={item?.bgImage}
                        bgimage={item?.profile_image != null ? item?.profile_image : appImages.barber1}
                        image={item?.stylist?.profile_image != null ? item?.stylist?.profile_image : appImages.barber1}
                        // image={item.image}
                        about={item?.about != null ? item?.about : 'We like the sleek design and beautiful photos that complete it. You find it fascinating too? Here is proof thatsimple sites work...'}
                        title={item?.title != null ? item?.title : 'Hair Style'}
                        reviews={item?.reviews.length != null ? item?.reviews.length : '5'}
                        price={item?.avg_price != null ? item?.avg_price: '0'}
                        completed_jobs={item?.completed_jobs!=null?item?.completed_jobs:'0'}
                        // isLiked={true}
                        favorite_stylist={true}
                        // onPress={() => { }}
                        onPressHeart={() => addFavorite(item)}
                        onPressHeart2={()=>removeFavorite(item,index)}
                        // onPressHeart2={()=>console.log("index",item)}
                      // containerStyle={}
                      />
                    )
                  })}
                </>
              ) : (
                <View
                  style={{
                    marginVertical: '75%',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <Text>No favoriteData</Text>
                </View>
              )}
            </>
            :
            <>
              {loader ? (
                <View
                  style={{
                    marginVertical: '10%',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <ActivityIndicator size={totalSize(3)} color={colors.appColor1} />
                </View>
              ) : pastFavouriteStylersList?.length > 0 ? (
                <>
                  {pastFavouriteStylersList.map((item, key) => {
                    return (
                      <ClientCompletedCardnew
                        key={key}
                        name={item?.stylist?.first_name}
                        lastname={item?.stylist?.last_name}
                        // bgimage={item?.bgImage}
                        bgimage={item?.profile_image != null ? item?.profile_image : appImages.barber1}
                        image={item?.stylist?.profile_image != null ? item?.stylist?.profile_image : appImages.barber1}
                        // image={item.image}
                        about={item?.stylist?.about != null ? item?.stylist?.about : 'We like the sleek design and beautiful photos that complete it. You find it fascinating too? Here is proof thatsimple sites work...'}
                        title={item?.title != null ? item?.title : 'Hair Style'}
                        reviews={item?.rating != null ? item?.rating : '5'}
                        price={item?.stylist?.avg_price != null ? item?.stylist?.avg_price  : '40'}
                        // onPressHeart={() => console.log(" pressded item",JSON.stringify(item,null,2))}
                        // onPressHeart2={()=>console.log("prssed item 2",item)}
                        // isLiked={true}
                        // onPress={() => { }}
                        // onPressHeart={(item, index) => { }}
                      // containerStyle={}
                      />
                      // <ClientStylerCard
                      //     key={key}
                      //     name={item?.stylist?.first_name}
                      //     bgimage={item?.service?.image}
                      //     image={item?.stylist?.profile_image}
                      //     title={item?.service?.name!=null?item?.service?.name:'Hair style'}
                      //     rating={item?.rating!=null?item?.rating:'5'}
                      //     isLiked={item.liked}
                      //     onPress={() => {}}
                      //     onPressHeart={(item, index) => { console.log("pressde item",item);}}
                      //     // containerStyle={{marginBottom:sizes.smallMargin*2}}
                      // />
                    )
                  })}
                </>
              ) : (
                <View
                  style={{
                    marginVertical: '75%',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <Text>No pastData</Text>
                </View>
              )}
            </>
          }
        </Wrapper>
      </ScrollView>
    </MainWrapperMatrial>
  );
}

export default Stylers;
