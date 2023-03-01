import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  ImageBackground,
  FlatList,
} from 'react-native';
import {Icon, Rating} from 'react-native-elements';
import {height, totalSize, width} from 'react-native-dimension';
import {
  appStyles,
  sizes,
  colors,
  appImages,
  fontSize,
  fontFamily,
  appIcons,
} from '../../themes';
import {
  Wrapper,
  RowWrapperBasic,
  CardWrapper,
  ComponentWrapper,
  RowWrapper,
} from '../wrappers';
import {Primary} from '../ratings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  RegularText,
  TinyText,
  SmallText,
  TinyTitle,
  TitleWithInfo,
  MediumTitle,
  LargeTitle,
  MediumText,
  SmallTitle,
  LargeText,
} from '../text';
import {Spacer} from '../spacers';
import {CustomIcon, IconWithText, IconButton, CustomIconNew} from '../icons';
import {ImageRound} from '../images';
import {LineHorizontal} from '../lines';
import {
  ButtonColoredSmall,
  ButtonBorderedSmall,
  ButtonColored,
  ButtonBordered,
  ButtonColoredss,
  ButtonGradient,
} from '../buttons';

import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {Pressable} from 'react-native';
export const FeaturedServiceCard = props => {
  const {containerStyle, image, title, providers, onPress} = props;
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Wrapper style={[styles.FeaturedServiceCard, containerStyle]}>
        <Image source={{uri: image}} style={styles.serviceImage} />
        <Wrapper style={styles.serviceTextContainer}>
          <TinyTitle style={[appStyles.textBold]}>{title}</TinyTitle>
          {/* {providers ? ( */}
          <Wrapper>
            <Spacer height={sizes.TinyMargin} />
            <SmallText style={[appStyles.textGray]}>
              {providers} service providers
            </SmallText>
          </Wrapper>
          {/* ) : null} */}
        </Wrapper>
      </Wrapper>
    </TouchableOpacity>
  );
};
export const ServiceIconCard = props => {
  const {
    containerStyle,
    subContainerStyle,
    icon,
    title,
    onPress,
    price,
    iconcolor,
  } = props;
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Wrapper style={[styles.serviceIconCard, containerStyle]}>
        {console.log(icon)}

        <Wrapper
          style={[styles.serviceIconCardSubContainer, subContainerStyle]}>
          <CustomIconNew
            icon={icon}
            size={sizes.appIcons.xl}
            color={iconcolor}
          />
          <Spacer height={sizes.baseMargin} />
          <TinyTitle style={[appStyles.textCenter]}>{title}</TinyTitle>
          <Spacer height={sizes.TinyMargin} />
          {price ? (
            <SmallText style={[appStyles.textCenter]}>${price}</SmallText>
          ) : null}
        </Wrapper>
      </Wrapper>
    </TouchableOpacity>
  );
};
export const ServiceIconCardNew = props => {
  const {
    containerStyle,
    subContainerStyle,
    icon,
    iconcolor,
    title,
    onPress,
    price,
  } = props;
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Wrapper style={[styles.serviceIconCard, containerStyle]}>
        <Wrapper
          style={[styles.serviceIconCardSubContainer, subContainerStyle]}>
          <CustomIconNew
            icon={icon}
            size={sizes.appIcons.xl}
            color={iconcolor}
          />
          <Spacer height={sizes.baseMargin} />
          <TinyTitle style={[appStyles.textCenter]}>{title}</TinyTitle>
          <Spacer height={sizes.TinyMargin} />
          {price ? (
            <SmallText style={[appStyles.textCenter]}>{price}</SmallText>
          ) : null}
        </Wrapper>
      </Wrapper>
    </TouchableOpacity>
  );
};

export const ClientServiceCard = props => {
  const {
    containerStyle,
    image,
    name,
    rating,
    title,
    location,
    date,
    time,
    isCompleted,
    price,
    onPress,
    onPressChat,
    StartTime,
    CompleteTime,
    onPressCancel,
    onImagePress,
    onPressReview,
    onPressReport,
    FinalCost,
    isStarted,
    isServiceCompleted,
  } = props;
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Wrapper
        style={[
          styles.clientServiceCard,
          containerStyle,
          {backgroundColor: isStarted ? '#89cff0' : colors.appTextColor6},
        ]}>
        {/* <Image
                    source={{ uri: image }}
                    style={styles.clientServiceImage}
                /> */}
        <RowWrapperBasic>
          <Wrapper
            animation="fadeInRight"
            flex={7.5}
            style={[appStyles.rowView]}>
            <ImageRound
              onPress={onImagePress}
              source={{uri: image}}
              size={totalSize(7.5)}
            />
            <Spacer width={sizes.baseMargin} />
            <Wrapper>
              <RowWrapperBasic>
                <RegularText
                  style={[appStyles.textBold, {marginRight: totalSize(1)}]}>
                  {name}
                </RegularText>
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
              <Spacer height={sizes.TinyMargin} />
              <SmallText style={[]}>{title}</SmallText>
              <Spacer height={sizes.TinyMargin} />
              <RowWrapperBasic>
                <Rating startingValue={rating} imageSize={totalSize(1)} />
                <TinyText style={[]}> ({rating})</TinyText>
              </RowWrapperBasic>
            </Wrapper>
          </Wrapper>
          <Wrapper flex={2.5} animation="zoomIn" style={[appStyles.center]}>
            <TinyTitle style={[]}>${price}</TinyTitle>
            <Spacer height={sizes.TinyMargin} />
            {isCompleted ? (
              <ButtonColoredSmall
                text={isCompleted}
                textStyle={[appStyles.textTiny, appStyles.textWhite]}
                buttonStyle={{
                  paddingVertical: height(0.5),
                  paddingHorizontal: width(2.5),
                }}
              />
            ) : null}
          </Wrapper>
        </RowWrapperBasic>
        <LineHorizontal style={{marginVertical: sizes.smallMargin}} />
        <TitleWithInfo title="Location" info={location} />
        <Spacer height={sizes.smallMargin} />
        <TitleWithInfo title="Date" info={date} />
        <Spacer height={sizes.smallMargin} />
        <TitleWithInfo title="Time" info={time} />
        {StartTime && <TitleWithInfo title="Start time" info={StartTime} />}
        {CompleteTime && <TitleWithInfo title="End Time" info={CompleteTime} />}
        {FinalCost && <TitleWithInfo title="Final Cost" info={FinalCost} />}

        {/* <TitleWithInfo title="Time" info={time} /> */}
        <LineHorizontal style={{marginVertical: sizes.smallMargin}} />
        {isServiceCompleted ? (
          <RowWrapperBasic style={{}}>
            {/* <ButtonBorderedSmall
              text="Review"
              buttonStyle={[styles.clientServiceButtonStyle]}
              onPress={onPressReview}
            /> */}
            <ButtonBorderedSmall
              text="Report"
              buttonStyle={[styles.clientServiceButtonStyle, {}]}
              tintColor={colors.error}
              onPress={onPressReport}
            />
          </RowWrapperBasic>
        ) : (
          <RowWrapperBasic style={{}}>
            {isStarted && (
              <ButtonColoredSmall
                text="Chat"
                buttonStyle={[styles.clientServiceButtonStyle]}
                onPress={onPressChat}
              />
            )}
            {!isStarted && (
              <ButtonColoredSmall
                text="Cancel"
                buttonStyle={[
                  styles.clientServiceButtonStyle,
                  {backgroundColor: colors.error},
                ]}
                onPress={onPressCancel}
              />
            )}
          </RowWrapperBasic>
        )}
      </Wrapper>
    </TouchableOpacity>
  );
};
export const StylerInfoCard = props => {
  const {
    containerStyle,
    image,
    name,
    rating,
    title,
    isLiked,
    onPress,
    onPressHeart,
    price,
    positiveReview,
  } = props;
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Wrapper style={[styles.clientStylerCard, containerStyle]}>
        <RowWrapperBasic>
          <RowWrapperBasic
            // animation="fadeInRight"
            flex={7.5}
            style={[appStyles.rowView]}>
            <ImageRound source={{uri: image}} size={totalSize(7.5)} />
            <Spacer width={sizes.baseMargin} />
            <RowWrapperBasic>
              <RegularText
                style={[appStyles.textBold, {marginRight: totalSize(1)}]}>
                {name}
              </RegularText>
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
            <Spacer width={sizes.smallMargin} />
            <IconWithText
              text={'(' + rating + ')'}
              iconName="star"
              iconSize={sizes.appIcons.tiny}
              tintColor={colors.rating}
              textStyle={[appStyles.textSmall]}
            />
          </RowWrapperBasic>
        </RowWrapperBasic>
        <Spacer height={sizes.smallMargin} />
        <RowWrapperBasic style={[{justifyContent: 'space-between'}]}>
          <Wrapper flex={7.5}>
            <SmallText style={[]}>{title}</SmallText>
            <Spacer height={sizes.smallMargin} />
            <SmallText style={[]}>{positiveReview} positive reviews</SmallText>
          </Wrapper>
          <Wrapper flex={2.5} style={[appStyles.center]}>
            <LargeTitle>${price}</LargeTitle>
          </Wrapper>
        </RowWrapperBasic>
      </Wrapper>
    </TouchableOpacity>
  );
};
export const ClientStylerCard = props => {
  const {
    containerStyle,
    image,
    name,
    rating,
    title,
    isLiked,
    onPress,
    onPressHeart,
    bgimage,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{marginHorizontal: width(10), marginVertical: height(1.2)}}>
      <ImageBackground source={{uri: bgimage}} imageStyle={{borderRadius: 15}}>
        {/* <View
          style={{
            backgroundColor: colors.snow,
            paddingHorizontal: width(1),
            borderRadius: 10,
            paddingVertical: height(1.4),
            flex: 1,
            marginTop: height(22),
            elevation: 5,
          }}> */}
        <Wrapper style={[styles.clientStylerCard, containerStyle]}>
          <RowWrapperBasic>
            <Wrapper
              // animation="fadeInRight"
              flex={7.5}
              style={{flexDirection: 'row'}}>
              <ImageRound source={{uri: image}} size={totalSize(7.5)} />
              <Spacer width={sizes.baseMargin} />
              <Wrapper>
                <RowWrapperBasic>
                  <RegularText
                    style={[
                      appStyles.textBold,
                      {
                        textTransform: 'capitalize',
                        marginRight: totalSize(1),
                        fontFamily: fontFamily.appTextBold,
                        fontSize: totalSize(1.9),
                      },
                    ]}>
                    {name}
                  </RegularText>
                </RowWrapperBasic>
                <Spacer height={sizes.TinyMargin} />
                <SmallText
                  style={{
                    fontFamily: fontFamily.appTextRegular,
                    fontSize: totalSize(1.5),
                  }}>
                  {title}
                </SmallText>
                <Spacer height={sizes.TinyMargin} />
                <RowWrapperBasic>
                  {/* <Rating startingValue={rating} imageSize={totalSize(1)}/>
                <TinyText style={[]}> ({rating})</TinyText> */}
                  <Primary
                    fillIconName={'star'}
                    emptyIconName={'md-star-outline'}
                    iconType={'ionicon'}
                    value={rating}
                    // onPressIcon={}
                    iconSize={totalSize(1)}
                  />
                  <TinyText style={[]}> ({rating})</TinyText>
                </RowWrapperBasic>
              </Wrapper>
            </Wrapper>
            <Wrapper
              flex={2.5}
              // animation="zoomIn"
              style={{alignItems: 'flex-end'}}>
              {isLiked ? (
                <TouchableOpacity onPress={onPressHeart}>
                  <Image
                    source={appIcons.heart}
                    resizeMode="cover"
                    style={{
                      height: 25,
                      width: 27,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={onPressHeart}>
                  <Image
                    source={appIcons.hearto}
                    resizeMode="cover"
                    style={{
                      height: 23,
                      width: 25,
                    }}
                  />
                </TouchableOpacity>
              )}
              {/* <Icon
              // name={isLiked ? 'heart' : 'heart-outline'}
              name={isLiked ? 'heart' : 'heart'}
              type="material-community"
              color={colors.appColor1}
              onPress={onPressHeart}
              size={totalSize(3)}
            /> */}
            </Wrapper>
          </RowWrapperBasic>
        </Wrapper>
        {/* </View> */}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export const StylerReviewCard = props => {
  const {
    containerStyle,
    image,
    name,
    rating,
    title,
    detail,
    isLiked,
    onPress,
    onPressHeart,
    imageSize = 6,
  } = props;
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Wrapper style={[styles.StylerReviewCard, containerStyle]}>
        <RowWrapperBasic style={[{alignItems: 'flex-start'}]}>
          <ImageRound source={image} size={totalSize(imageSize)} />
          <Spacer width={sizes.smallMargin} />
          <Wrapper flex={1}>
            <Spacer height={sizes.smallMargin} />
            <RegularText style={[appStyles.textBold]}>{name}</RegularText>
            <Spacer height={sizes.TinyMargin} />
            <RowWrapperBasic>
              {/* <Rating startingValue={rating} imageSize={totalSize(1)} /> */}
              <Primary
                fillIconName={'star'}
                emptyIconName={'md-star-outline'}
                iconType={'ionicon'}
                value={rating}
                // onPressIcon={}
                iconSize={totalSize(1)}
              />
              <TinyText style={{marginLeft: width(1)}}> ({rating})</TinyText>
            </RowWrapperBasic>
            <Spacer height={sizes.TinyMargin} />
            <SmallText
              style={[
                appStyles.textGray,
                {
                  fontSize: 11,
                  paddingRight: width(1.5),
                  height: height(10),
                  width: width(60),
                },
              ]}>
              {detail}
            </SmallText>
          </Wrapper>
        </RowWrapperBasic>
      </Wrapper>
    </TouchableOpacity>
  );
};

export const CreditCard = props => {
  const {containerStyle, cardNumber, name, cardType, onPress} = props;
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <LinearGradient
        colors={colors.creditCardGradiant}
        style={[styles.CreditCard, containerStyle]}>
        <MediumText style={[appStyles.textBold]}>{cardNumber}</MediumText>
        <Spacer height={sizes.smallMargin} />
        <CustomIcon
          icon={cardType === 'master' ? appImages.masterCard : appImages.visa}
          size={totalSize(10)}
        />
        <Spacer height={sizes.smallMargin} />
        <RowWrapperBasic style={{justifyContent: 'space-between'}}>
          <RegularText style={[{fontSize: fontSize.h6}]}>{name}</RegularText>
          <Icon name="delete-forever" type="material-community" />
        </RowWrapperBasic>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const NotificationCard = props => {
  const {containerStyle, onPress, title, time, detail, status} = props;
  console.log('status', status);
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Wrapper
        // animation="fadeInRight"
        style={[
          containerStyle,
          {
            backgroundColor:
              status === 'order'
                ? '#FFFFE4'
                : status === 'payment'
                ? '#e4ffe4'
                : status === 'cancelled'
                ? '#FFE4E4'
                : status === 'message'
                ? '#E4FFFC'
                : null,
          },
        ]}>
        <Spacer height={sizes.baseMargin} />
        <RowWrapper>
          <Wrapper flex={8} justifyContent={'center'}>
            <TinyTitle
              style={{
                fontSize: totalSize(2),
                fontFamily: fontFamily.appTextRegular,
              }}>
              {title}
            </TinyTitle>
          </Wrapper>
          <Wrapper flex={2} style={[{alignItems: 'flex-end'}]}>
            <TinyText style={[appStyles.textGray]}>{time}</TinyText>
          </Wrapper>
        </RowWrapper>
        <Spacer height={totalSize(0.5)} />
        <ComponentWrapper>
          <RegularText
            style={[
              appStyles.textGray,
              {fontSize: totalSize(1.4), marginLeft: totalSize(0.2)},
            ]}>
            {detail}
          </RegularText>
        </ComponentWrapper>
        <Spacer height={sizes.baseMargin} />
        <LineHorizontal />
      </Wrapper>
    </TouchableOpacity>
  );
};

///////////////////////////////////////////////////////////////////// Provider Cards /////////////////////////////////////////////////////////////////////////

export const ProviderServiceCard = props => {
  const {
    containerStyle,
    image,
    name,
    rating,
    id,
    distance,
    title,
    location,
    date,
    timeSlot,
    price,
    showActionButtons,
    onPress,
    showButtons,
    onPressConfirm,
    onPressReject,
    onPressCall,
    onPressChat,
    onPressMessage,
    onPressLocation,
    isStarted,
    status,
    onPressStart,
    onPressComplete,
  } = props;
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Wrapper
        style={[
          styles.ProviderServiceCard,
          containerStyle,
          {backgroundColor: isStarted ? '#89cff0' : colors.appTextColor6},
        ]}>
        {/* <Image
                    source={{ uri: image }}
                    style={styles.clientServiceImage}
                /> */}
        <RowWrapperBasic style={[{alignItems: 'flex-start'}]}>
          <Wrapper
            // animation="fadeInRight"
            flex={7.5}
            style={[appStyles.rowView]}>
            <ImageRound source={{uri: image}} size={totalSize(7.7)} />
            <Spacer width={sizes.baseMargin} />
            <Wrapper>
              <Text
                style={{
                  fontFamily: fontFamily.appTextBold,
                  color: colors.black,
                }}>
                {name}
              </Text>
              <Spacer height={height(1.4)} />
              <IconWithText
                text={'(' + rating + ')'}
                iconName="star"
                iconSize={sizes.appIcons.tiny}
                tintColor={colors.rating}
                textStyle={[appStyles.textTiny]}
              />
            </Wrapper>
          </Wrapper>
          <Wrapper
            flex={2.5}
            // animation="zoomIn"
            style={[{alignItems: 'flex-end'}]}>
            <ButtonColoredSmall
              text="Hair Cut"
              textStyle={[
                appStyles.h7,
                appStyles.textWhite,
                appStyles.textBold,
              ]}
              buttonStyle={{
                paddingVertical: height(0.5),
                paddingHorizontal: width(2.5),
              }}
            />
            <Spacer height={sizes.baseMargin} />
            {status === 'rejected' ? (
              <SmallText style={[appStyles.textBold, {color: colors.alert}]}>
                Rejected
              </SmallText>
            ) : price ? (
              <MediumTitle
                style={[
                  {
                    color:
                      status === 'completed' ? colors.success : colors.black,
                  },
                ]}>
                ${price}
              </MediumTitle>
            ) : null}
          </Wrapper>
        </RowWrapperBasic>
        <LineHorizontal style={{marginVertical: sizes.smallMargin}} />

        <Wrapper>
          <TitleWithInfo
            title="ID"
            info={'#######'}
            titleStyle={[styles.scheduledServiceTitle]}
            infoStyle={styles.infooStyles}
          />
          {/* <Spacer height={sizes.TinyMargin} /> */}
        </Wrapper>

        <TitleWithInfo
          title="Time Slot"
          info={timeSlot}
          titleStyle={[styles.scheduledServiceTitle]}
          infoStyle={styles.infooStyles}
        />
        {/* <Spacer height={sizes.TinyMargin} /> */}
        <TitleWithInfo
          title="Date"
          info={date}
          titleStyle={[styles.scheduledServiceTitle]}
          infoStyle={styles.infooStyles}
        />

        {/* <Spacer height={sizes.smallMargin} /> */}

        <TitleWithInfo
          title="Location"
          info={location}
          titleStyle={[styles.scheduledServiceTitle]}
          infoStyle={styles.infooStyles}
        />
        {/* <Spacer height={sizes.TinyMargin} /> */}
        <TitleWithInfo
          title="Distance"
          info={distance}
          titleStyle={[styles.scheduledServiceTitle]}
          infoStyle={styles.infooStyles}
        />
        {/* <Spacer height={sizes.smallMargin} /> */}
        {showActionButtons ? (
          <RowWrapperBasic
            style={[
              {
                justifyContent: 'space-around',
                marginVertical: sizes.smallMargin,
              },
            ]}>
            <TouchableOpacity>
              <Wrapper style={[appStyles.center]}>
                <IconButton onPress={onPressChat} iconName="chat" />
                <Spacer height={sizes.smallMargin} />
                <SmallText>Chat</SmallText>
              </Wrapper>
            </TouchableOpacity>
            <TouchableOpacity>
              <Wrapper style={[appStyles.center]}>
                <IconButton iconName="phone" onPress={onPressCall} />
                <Spacer height={sizes.smallMargin} />
                <SmallText>Call</SmallText>
              </Wrapper>
            </TouchableOpacity>
            <TouchableOpacity>
              <Wrapper style={[appStyles.center]}>
                <IconButton
                  iconName="chatbubble"
                  iconType="ionicon"
                  onPress={onPressMessage}
                />
                <Spacer height={sizes.smallMargin} />
                <SmallText>Message</SmallText>
              </Wrapper>
            </TouchableOpacity>
            <TouchableOpacity>
              <Wrapper style={[appStyles.center]}>
                <IconButton
                  iconName="location-arrow"
                  iconType="font-awesome"
                  onPress={onPressLocation}
                />
                <Spacer height={sizes.smallMargin} />
                <SmallText>Location</SmallText>
              </Wrapper>
            </TouchableOpacity>
          </RowWrapperBasic>
        ) : null}
        {showButtons ? (
          <Wrapper>
            <Spacer height={sizes.smallMargin} />
            <ButtonColored
              text="Confirm"
              buttonStyle={[{marginHorizontal: width(2.5)}]}
              onPress={onPressConfirm}
            />
            <Spacer height={sizes.smallMargin} />
            <ButtonColored
              text="Reject"
              buttonStyle={[
                {marginHorizontal: width(2.5), backgroundColor: colors.alert},
              ]}
              onPress={onPressReject}
            />
            <Spacer height={sizes.smallMargin} />
          </Wrapper>
        ) : null}
      </Wrapper>
    </TouchableOpacity>
  );
};

export const ChatCard = props => {
  const {containerStyle, image, name, rating, lastMessage, time, onPress} =
    props;
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Wrapper
        // animation="fadeInRight"
        style={[styles.chatCard, containerStyle]}>
        <RowWrapper style={[{}]}>
          <ImageRound source={{uri: image}} size={totalSize(7)} />
          <Spacer width={totalSize(1.3)} />
          <Wrapper flex={1}>
            {/* <Spacer height={sizes.smallMargin} /> */}
            <RowWrapperBasic style={[{justifyContent: 'space-between'}]}>
              <MediumText style={[appStyles.textRegular, fontSize.small]}>
                {name}
              </MediumText>
              <TinyText style={[appStyles.textGray]}>{time}</TinyText>
            </RowWrapperBasic>
            <Spacer style={{height: totalSize(0.5)}} />
            <RegularText numberOfLines={1} style={[appStyles.textGray]}>
              {lastMessage}
            </RegularText>
          </Wrapper>
        </RowWrapper>
      </Wrapper>
      <LineHorizontal />
    </TouchableOpacity>
  );
};
export const HomeScheduleCard = props => {
  const {
    containerStyle,
    image,
    name,
    rating,
    bgimage,
    onPress,
    serviceName,
    price,
    buttonViewStyle,
    chatPress,
    cancelPress,
    location,
    date,
    time,
    imagedata,
    lastname,
  } = props;
  return (
    <Wrapper
      // animation="fadeInRight"
      style={[styles.schedeleCard, containerStyle]}>
      {/* <FlatList
        data={imagedata}
        horizontal={true}

        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <ImageBackground style={{ width: width(100), marginRight: -35, height: 90, borderRadius: 15 }} source={item.images} imageStyle={{ borderRadius: 15 }}
              resizeMode={'cover'}>
              <View
                style={{
                  backgroundColor: colors.snow,

                  borderRadius: 10,

                  flex: 1,
                  marginTop: height(20),
                  // elevation: 2,
                }}></View>
            </ImageBackground>
          );
        }}
      /> */}
      <Pressable onPress={onPress} >
      <ImageBackground source={{uri: bgimage}} imageStyle={{borderRadius: 15}}>
        <Pressable
        // onPress={onPress}
          style={{
            backgroundColor: colors.snow,
            // paddingHorizontal: width(1),
            borderRadius: 10,
            paddingVertical: height(1.4),
            flex: 1,
            marginTop: height(20),
            elevation: 2,
          }}>
          <View style={{flexDirection: 'row', paddingHorizontal: width(2)}}>
            <View style={{flex: 0.2}}>
              <ImageRound source={{uri: image}} size={totalSize(6.2)} />
            </View>
            <View
              style={{
                flex: 0.8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: width(1.7),
              }}>
              <View style={{justifyContent: 'flex-start'}}>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.5),
                    fontFamily: fontFamily.appTextBold,
                    marginTop: height(0),
                    width: width(25),
                    // backgroundColor:'red'
                  }}>
                  {name}{" "}{lastname}
                </Text>
                <Text>
                  <SmallText
                    style={{
                      color: '#000000',
                      fontSize: totalSize(1.1),
                      fontFamily: fontFamily.gothicRegular,
                    }}>
                    4.55{' '}
                  </SmallText>
                  <Image
                    source={appIcons.star}
                    resizeMode="cover"
                    style={{
                      height: 11,
                      width: 12,
                      marginTop:2
                    }}
                  />
                </Text>

                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.1),
                    fontFamily: fontFamily.appTextRegular,
                    marginTop: height(0.2),
                  }}>
                  {serviceName}
                </Text>
              </View>
              <View style={{alignItems: 'center', marginLeft: width(11)}}>
                <ButtonGradient
                  text="Hair Cut"
                  textStyle={{
                    fontSize: totalSize(1.1),
                    fontFamily: fontFamily.appTextBold,
                  }}
                  buttonStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: width(6),
                    borderRadius: 100,
                    height: height(3),
                  }}
                  // onPress={() => }
                />
                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.65),
                    fontFamily: fontFamily.appTextBold,
                    marginTop: height(0.7),
                  }}>
                  ${price}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#00000029',
              borderTopWidth: 1,
              borderTopColor: '#00000029',
              paddingHorizontal: width(5),
              marginHorizontal: width(4),
              justifyContent: 'space-between',
              paddingVertical: height(1),
              marginVertical: height(1),
              justifyContent:'center',
              // backgroundColor:'red'
            }}>
            <View style={{alignItems: 'center',marginRight:width(5)}}>
              <Text
                style={{
                  color: colors.appColor1,
                  fontSize: totalSize(1.25),
                  fontFamily: fontFamily.appTextBold,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.appColor1,
                }}>
                Location
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: totalSize(1.1),
                  fontFamily: fontFamily.gothicRegular,
                  marginTop: height(0.3),
                  marginTop: height(1.5),
                  textAlign: 'center',
                  lineHeight: height(2),
                  width: width(30),
                }}
                numberOfLines={2}>
                {/* 17 Johnson Ave,{'\n'} New York, NY 10018 */}
                {location}
              </Text>
              {/* <Text
                style={{
                  color: colors.black,
                  fontSize: totalSize(1.1),
                  fontFamily: fontFamily.appTextRegular,
                  marginTop: height(0.3),
                }}>
                New York, NY 10018
              </Text> */}
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: colors.appColor1,
                  fontSize: totalSize(1.25),
                  fontFamily: fontFamily.appTextBold,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.appColor1,
                }}>
                Scheduled Date & Time
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: totalSize(1.1),
                  fontFamily: fontFamily.gothicRegular,
                  marginTop: height(0.3),
                  marginTop: height(1.5),
                }}>
                {/* Sat,Jul 3,2022 */}
                {date}
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: totalSize(1.1),
                  fontFamily: fontFamily.gothicRegular,
                  marginTop: height(0.3),
                }}>
                {/* 12:00 AM - 12:00 PM */}
                {time}
              </Text>
            </View>
          </View>

          <View style={buttonViewStyle}>
            <ButtonColoredss
              text="Chat"
              textStyle={{fontSize: 12, fontFamily: fontFamily.gothicRegular}}
              buttonStyle={{
                marginHorizontal: 0,
                borderRadius: 8,
                height: height(4),
                width: width(27),
              }}
              onPress={chatPress}
            />

            <ButtonColoredss
              text="CANCEL"
              textStyle={{fontSize: 12, fontFamily: fontFamily.gothicRegular}}
              buttonStyle={{
                marginHorizontal: 0,
                borderRadius: 8,
                height: height(4),
                width: width(27),
                backgroundColor: '#D40000',
              }}
              onPress={cancelPress}
            />
          </View>
        </Pressable>
      </ImageBackground>
      </Pressable>
    </Wrapper>
  );
};
export const BookingRequestCard = props => {
  const {
    containerStyle,
    image,
    name,
    rating,
    bgimage,
    onPress,
    serviceName,
    price,
    buttonViewStyle,
    chatPress,
    cancelPress,
    location,
    date,
    time,
    imagedata,
    lastname,
  } = props;
  return (
    <Wrapper
      // animation="fadeInRight"
      style={[styles.schedeleCardBooking, containerStyle]}>
      {/* <FlatList
        data={imagedata}
        horizontal={true}

        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <ImageBackground style={{ width: width(100), marginRight: -35, height: 90, borderRadius: 15 }} source={item.images} imageStyle={{ borderRadius: 15 }}
              resizeMode={'cover'}>
              <View
                style={{
                  backgroundColor: colors.snow,

                  borderRadius: 10,

                  flex: 1,
                  marginTop: height(20),
                  // elevation: 2,
                }}></View>
            </ImageBackground>
          );
        }}
      /> */}
      <ImageBackground source={{uri: bgimage}} imageStyle={{borderRadius: 15}}>
        <View
          style={{
            backgroundColor: colors.snow,
            // paddingHorizontal: width(1),
            borderRadius: 10,
            paddingVertical: height(1.4),
            flex: 1,
            marginTop: height(20),
            elevation: 2,
          }}>
          <View style={{flexDirection: 'row', paddingHorizontal: width(2)}}>
            <View style={{flex: 0.2}}>
              <ImageRound source={{uri: image}} size={totalSize(6.2)} />
            </View>
            <View
              style={{
                flex: 0.8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: width(1.7),
              }}>
              <View style={{justifyContent: 'flex-start'}}>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.5),
                    fontFamily: fontFamily.appTextBold,
                    marginTop: height(0),
                    width: width(25),
                    // backgroundColor:'red'
                  }}>
                  {name}{" "}{lastname}
                </Text>
                <Text>
                  <SmallText
                    style={{
                      color: '#000000',
                      fontSize: totalSize(1.1),
                      fontFamily: fontFamily.gothicRegular,
                    }}>
                    4.55{' '}
                  </SmallText>
                  <Image
                    source={appIcons.star}
                    resizeMode="cover"
                    style={{
                      height: 11,
                      width: 12,
                      marginTop:2
                    }}
                  />
                </Text>

                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.1),
                    fontFamily: fontFamily.appTextRegular,
                    marginTop: height(0.2),
                  }}>
                  {serviceName}
                </Text>
              </View>
              <View style={{alignItems: 'center', marginLeft: width(11)}}>
                <ButtonGradient
                  text="Hair Cut"
                  textStyle={{
                    fontSize: totalSize(1.1),
                    fontFamily: fontFamily.appTextBold,
                  }}
                  buttonStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: width(6),
                    borderRadius: 100,
                    height: height(3),
                  }}
                  // onPress={() => }
                />
                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.65),
                    fontFamily: fontFamily.appTextBold,
                    marginTop: height(0.7),
                  }}>
                  ${price}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#00000029',
              borderTopWidth: 1,
              borderTopColor: '#00000029',
              paddingHorizontal: width(5),
              marginHorizontal: width(4),
              justifyContent: 'space-between',
              paddingVertical: height(1),
              marginVertical: height(1),
              justifyContent:'center',
              // backgroundColor:'red'
            }}>
            <View style={{alignItems: 'center',marginRight:width(5)}}>
              <Text
                style={{
                  color: colors.appColor1,
                  fontSize: totalSize(1.25),
                  fontFamily: fontFamily.appTextBold,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.appColor1,
                }}>
                Location
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: totalSize(1.1),
                  fontFamily: fontFamily.gothicRegular,
                  marginTop: height(0.3),
                  marginTop: height(1.5),
                  textAlign: 'center',
                  lineHeight: height(2),
                  width: width(30),
                }}
                numberOfLines={2}>
                {/* 17 Johnson Ave,{'\n'} New York, NY 10018 */}
                {location}
              </Text>
              {/* <Text
                style={{
                  color: colors.black,
                  fontSize: totalSize(1.1),
                  fontFamily: fontFamily.appTextRegular,
                  marginTop: height(0.3),
                }}>
                New York, NY 10018
              </Text> */}
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: colors.appColor1,
                  fontSize: totalSize(1.25),
                  fontFamily: fontFamily.appTextBold,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.appColor1,
                }}>
                Scheduled Date & Time
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: totalSize(1.1),
                  fontFamily: fontFamily.gothicRegular,
                  marginTop: height(0.3),
                  marginTop: height(1.5),
                }}>
                {/* Sat,Jul 3,2022 */}
                {date}
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: totalSize(1.1),
                  fontFamily: fontFamily.gothicRegular,
                  marginTop: height(0.3),
                }}>
                {/* 12:00 AM - 12:00 PM */}
                {time}
              </Text>
            </View>
          </View>

          <View style={buttonViewStyle}>
            <ButtonColoredss
              text="Confirm"
              textStyle={{fontSize: 13, fontFamily: fontFamily.gothicRegular}}
              buttonStyle={{
                marginHorizontal: 0,
                borderRadius: 8,
                height: height(3.5),
                width: width(27),
              }}
              onPress={chatPress}
            />

            <ButtonColoredss
              text="CANCEL"
              textStyle={{fontSize: 12, fontFamily: fontFamily.gothicRegular}}
              buttonStyle={{
                marginHorizontal: 0,
                borderRadius: 8,
                height: height(3.5),
                width: width(27),
                backgroundColor: '#D40000',
              }}
              onPress={cancelPress}
            />
          </View>
        </View>
      </ImageBackground>
    </Wrapper>
  );
};
export const BusinessReviewCard = props => {
  const {
    containerStyle,
    image,
    name,
    rating,
    bgimage,
    onPress,
    detail,
    title,
    containerStyle2,
    backwordPress,
    forwordPress,
    lastname,
  } = props;
  return (
    <Wrapper
      // animation="fadeInRight"
      style={[styles.businessschedeleCard, containerStyle]}>
      <Pressable onPress={onPress}>
        <ImageBackground
          source={{uri: bgimage}}
          imageStyle={{borderRadius: 15}}>
          <View
          // style={{
          //   backgroundColor: colors.snow,
          //   paddingHorizontal: width(1),
          //   borderRadius: 10,
          //   paddingVertical: height(1.4),
          //   flex: 1,
          //   marginTop: height(20),
          //   elevation: 2,
          // }}
          >
            <Wrapper style={[styles.providerReviewCard, containerStyle2]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  position: 'absolute',
                  width: width(91),
                  marginLeft: -5,
                }}>
                <Pressable onPress={backwordPress}>
                  <Image
                    source={appIcons.backword}
                    resizeMode="center"
                    style={{
                      height: 22,
                      width: 24,
                    }}
                  />
                </Pressable>
                <Pressable onPress={forwordPress}>
                  <Image
                    source={appIcons.forword}
                    resizeMode="center"
                    style={{
                      height: 22,
                      width: 24,
                    }}
                  />
                </Pressable>
              </View>
              <RowWrapperBasic style={[{}]}>
                <ImageRound source={{uri: image}} size={totalSize(7)} />
                <Spacer width={sizes.baseMargin} />
                <Wrapper flex={1}>
                  <RegularText
                    style={[
                      appStyles.textBold,
                      {fontSize: 16, fontFamily: fontFamily.gothicBold},
                    ]}>
                    {name}{" "}{lastname}
                  </RegularText>
                  {/* <Spacer height={sizes.TinyMargin} /> */}
                  <RowWrapperBasic>
                    {/* <Rating startingValue={rating} imageSize={totalSize(1.5)} /> */}
                    <Primary
                      fillIconName={'star'}
                      emptyIconName={'md-star-outline'}
                      iconType={'ionicon'}
                      value={rating}
                      // onPressIcon={}
                      iconSize={totalSize(1)}
                    />
                    <RegularText style={[]}>
                      <Text>(</Text>
                      {rating}
                      <Text>)</Text>
                    </RegularText>
                  </RowWrapperBasic>
                </Wrapper>
              </RowWrapperBasic>
              <Spacer height={sizes.smallMargin} />

              <Spacer height={sizes.smallMargin} />
              <SmallText
                style={[
                  appStyles.textGray,
                  {
                    fontSize: totalSize(1.9),
                    width: width(76),
                    fontFamily: fontFamily.appTextRegular,
                    marginRight: width(2),
                    height: height(14),
                  },
                ]}
                numberOfLines={5}>
                {detail}
              </SmallText>
            </Wrapper>
          </View>
        </ImageBackground>
      </Pressable>
    </Wrapper>
  );
};
export const ClientScheduleCard = props => {
  const {
    containerStyle,
    image,
    name,
    rating,
    bgimage,
    onPress,
    servicename,
    price,
    chatPress,
    cancelPress,
    date,
    time,
    lastname,
    location,
    starttime,
    endtime,
  } = props;
  return (
    <Wrapper
      // animation="fadeInRight"
      style={[styles.schedeleCard, containerStyle]}>
      <ImageBackground source={{uri: bgimage}} imageStyle={{borderRadius: 15}}>
        <View
          style={{
            backgroundColor: colors.snow,
            paddingHorizontal: width(1),
            borderRadius: 10,
            paddingVertical: height(1.4),
            flex: 1,
            marginTop: height(20),
            elevation: 2,
          }}>
          <View style={{flexDirection: 'row', paddingHorizontal: width(2)}}>
            <View style={{flex: 0.2}}>
              <ImageRound source={{uri: image}} size={totalSize(6.2)} />
            </View>
            <View
              style={{
                flex: 0.8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: width(1.7),
              }}>
              <View style={{justifyContent: 'flex-start'}}>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.5),
                    fontFamily: fontFamily.appTextBold,
                    marginTop: height(0),
                    width:width(28),
                    // backgroundColor:'red'
                  }}>
                  {/* John Doe */}
                  {name}{' '}{lastname}
                </Text>
                <Text>
                  <SmallText
                    style={{
                      color: '#000000',
                      fontSize: totalSize(1.1),
                      fontFamily: fontFamily.gothicRegular,
                    }}>
                    {rating}{' '}
                  </SmallText>
                  <Ionicons
                    name="star"
                    size={totalSize(1.3)}
                    color="#D5BB70"
                    style={{marginRight: 5}}
                  />
                </Text>

                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.1),
                    fontFamily: fontFamily.appTextRegular,
                    marginTop: height(0.2),
                  }}>
                  {/* Makeup */}
                  {servicename}
                </Text>
              </View>
              <View style={{alignItems: 'center', marginLeft: width(10)}}>
                <ButtonGradient
                  text="Hair Cut"
                  textStyle={{
                    fontSize: totalSize(1.1),
                    fontFamily: fontFamily.appTextBold,
                  }}
                  buttonStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: width(6),
                    borderRadius: 100,
                    height: height(3),
                  }}
                  // onPress={() => }
                />
                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.65),
                    fontFamily: fontFamily.appTextBold,
                    marginTop: height(0.7),
                  }}>
                  ${price}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#00000029',
              borderTopWidth: 1,
              borderTopColor: '#00000029',
              paddingHorizontal: width(5),
              marginHorizontal: width(4),
              justifyContent: 'space-between',
              paddingVertical: height(1),
              marginVertical: height(1),
            }}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: colors.appColor1,
                  fontSize: totalSize(1.25),
                  fontFamily: fontFamily.appTextBold,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.appColor1,
                }}>
                Location
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: totalSize(1.1),
                  fontFamily: fontFamily.appTextRegular,
                  marginTop: height(0.3),
                  marginTop: height(1.5),
                  textAlign: 'center',
                  lineHeight: height(2),
                  width: width(30),
                }}>
                {/* 17 Johnson Ave,{'\n'} New York, NY 10018 */}
                {location}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: colors.appColor1,
                  fontSize: totalSize(1.25),
                  fontFamily: fontFamily.appTextBold,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.appColor1,
                }}>
                Scheduled Date & Time
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: totalSize(1.1),
                  fontFamily: fontFamily.appTextRegular,
                  marginTop: height(0.3),
                  marginTop: height(1.5),
                }}>
                {/* Sat,Jul 3,2022 */}
                {date}
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: totalSize(1.1),
                  fontFamily: fontFamily.appTextRegular,
                  marginTop: height(0.3),
                }}>
                {/* 12:00 AM - 12:00 PM */}
                {starttime}
              
                {endtime}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: width(10),
            }}>
            <ButtonColoredss
              text="Chat"
              textStyle={{fontSize: 12, fontFamily: fontFamily.gothicRegular}}
              buttonStyle={{
                marginHorizontal: 0,
                borderRadius: 8,
                height: height(4),
                width: width(25),
              }}
              onPress={chatPress}
            />

            <ButtonColoredss
              text="CANCEL"
              textStyle={{fontSize: 12, fontFamily: fontFamily.gothicRegular}}
              buttonStyle={{
                marginHorizontal: 0,
                borderRadius: 8,
                height: height(4),
                width: width(25),
                backgroundColor: '#D40000',
              }}
              onPress={cancelPress}
            />
          </View>
        </View>
      </ImageBackground>
    </Wrapper>
  );
};
export const StylesPastCard = props => {
  const {
    containerStyle,
    image,
    name,
    rating,
    bgimage,
    onPress,
    price,
    serviceName,
    status,
    chatPress,
    reciptPress,
    cancelPress,
    date,
    time,
    starttime,
    endtime,
    location,
    buttonViewStyle,
    lastname
  } = props;
  return (
    <Wrapper
      // animation="fadeInRight"
      style={[styles.pastCard, containerStyle]}>
      <ImageBackground source={{uri: bgimage}} imageStyle={{borderRadius: 15}}>
        <View
          style={{
            backgroundColor: colors.snow,
            paddingHorizontal: width(1.5),
            borderRadius: 15,
            paddingVertical: height(1),
            flex: 1,
            marginTop: height(18.5),
            elevation: 2,
          }}>
          <View style={{flexDirection: 'row', paddingHorizontal: width(3)}}>
            <View style={{flex: 0.2}}>
              <ImageRound source={{uri: image}} size={totalSize(6.2)} />
            </View>
            <View
              style={{
                flex: 0.8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: width(1.7),
              }}>
              <View style={{justifyContent: 'flex-start'}}>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.5),
                    fontFamily: fontFamily.appTextBold,
                  }}>
                  {name}{" "}{lastname}
                </Text>
                <Text>
                  <SmallText
                    style={{color: '#000000', fontSize: totalSize(1.1)}}>
                    {' '}
                    {rating}{' '}
                  </SmallText>
                  <Image
                    source={appIcons.star}
                    resizeMode="cover"
                    style={{
                      height: 11,
                      width: 12,
                      marginTop:2
                    }}
                  />
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.1),
                    fontFamily: fontFamily.appTextRegular,
                    marginTop: height(0.7),
                  }}>
                  {serviceName}
                </Text>
              </View>
              <View style={{alignItems: 'flex-end', marginLeft: width(12)}}>
                <View
                  style={{
                    marginLeft: width(2.5),
                    marginBottom: height(1.5),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.appColor1,
                      fontSize: totalSize(0.9),
                      fontFamily: fontFamily.appTextBold,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.appColor1,
                    }}>
                    Final Cost
                  </Text>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: totalSize(0.9),
                      fontFamily: fontFamily.appTextBold,
                    }}>
                    ${price}
                  </Text>
                </View>
                <ButtonColoredss
                  text={status}
                  textStyle={{
                    fontSize: 7,
                    fontFamily: fontFamily.appTextRegular,
                  }}
                  buttonStyle={{
                    marginHorizontal: width(1),
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: width(2.5),
                    borderRadius: 50,
                    height: height(2.2),
                    backgroundColor: '#7ADC68',
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#00000029',
              borderTopWidth: 1,
              borderTopColor: '#00000029',
              paddingHorizontal: width(5),
              marginHorizontal: width(5.5),
              justifyContent: 'space-between',
              paddingVertical: height(1),
              marginVertical: height(0.7),
            }}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: colors.appColor1,
                  fontSize: totalSize(1.25),
                  fontFamily: fontFamily.appTextBold,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.appColor1,
                }}>
                Location
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: totalSize(1.1),
                  fontFamily: fontFamily.gothicRegular,
                  marginTop: height(0.3),
                  marginTop: height(1.5),
                  textAlign: 'center',
                  lineHeight: height(2),
                }}>
                {/* 17 Johnson Ave,{'\n'} New York, NY 10018 */}
                {location}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: colors.appColor1,
                  fontSize: totalSize(1.25),
                  fontFamily: fontFamily.appTextBold,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.appColor1,
                }}>
                Scheduled Date & Time
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: totalSize(1.1),
                  fontFamily: fontFamily.gothicRegular,
                  marginTop: height(0.3),
                  marginTop: height(1.5),
                }}>
                {/* Sat,Jul 3,2022 */}
                {date}
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: totalSize(1.1),
                  fontFamily: fontFamily.gothicRegular,
                  marginTop: height(0.3),
                }}>
                {/* 12:00 AM - 12:00 PM */}
                {time}
              </Text>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#00000029',
              marginHorizontal: width(5.5),
              justifyContent: 'space-between',
              paddingVertical: height(1),
              marginBottom: height(1),
            }}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: colors.appColor1,
                  fontSize: totalSize(1.25),
                  fontFamily: fontFamily.appTextBold,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.appColor1,
                  marginTop: -9,
                  marginBottom: totalSize(1.2),
                }}>
                Appointment
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.1),
                    fontFamily: fontFamily.appTextBold,
                    marginTop: height(0.3),
                  }}>
                  Start Time:
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.1),
                    fontFamily: fontFamily.appTextBold,
                    marginTop: height(0.3),
                  }}>
                  End Time:
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.1),
                    fontFamily: fontFamily.gothicRegular,
                    marginTop: height(0.3),
                  }}>
                  {/* Sat,Jul 3,2022 */}
                  {starttime}
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.1),
                    fontFamily: fontFamily.gothicRegular,
                    marginTop: height(0.3),
                  }}>
                  {/* Sat,Jul 3,2022 */}
                  {endtime}
                </Text>
              </View>
            </View>
          </View>
          <View style={buttonViewStyle}>
            <ButtonColoredss
              text="Chat"
              textStyle={{fontSize: 12, fontFamily: fontFamily.gothicRegular}}
              buttonStyle={{
                marginHorizontal: 0,
                borderRadius: 8,
                height: height(4),
                width: width(25),
              }}
              onPress={chatPress}
            />

            <ButtonColoredss
              text="CANCEL"
              textStyle={{fontSize: 12, fontFamily: fontFamily.gothicRegular}}
              buttonStyle={{
                marginHorizontal: 0,
                borderRadius: 8,
                height: height(4),
                width: width(25),
                backgroundColor: '#D40000',
              }}
              onPress={cancelPress}
            />
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: width(2),
            }}>
            <ButtonColoredss
              text="Chat"
              textStyle={{fontSize: 7, fontFamily: fontFamily.appTextRegular}}
              buttonStyle={{
                marginHorizontal: 0,
                borderRadius: 8,
                height: height(2.9),
                width: width(19.5),
                
              }}
              onPress={chatPress}
            />
            <ButtonBordered
              text="VIEW RECIPT"
              textStyle={{fontSize: 7, fontFamily: fontFamily.appTextRegular}}
              buttonStyle={{
                marginHorizontal: 0,
                borderRadius: 8,
                height: height(2.9),
                width: width(19.5),
              }}
              onPress={reciptPress}
            />
            <ButtonColoredss
              text="CANCEL"
              textStyle={{fontSize: 7, fontFamily: fontFamily.appTextRegular}}
              buttonStyle={{
                marginHorizontal: 0,
                borderRadius: 8,
                height: height(2.9),
                width: width(19.5),
                backgroundColor: '#D40000',
              }}
              onPress={cancelPress}
            />
          </View> */}
        </View>
      </ImageBackground>
    </Wrapper>
  );
};
export const ClientCompletedCard = props => {
  const {
    containerStyle,
    image,
    name,
    rating,
    bgimage,
    onPress,
    ReviewonPress,
    servicename,
    price,
    Status,
    date,
    time,
    location,
    starttime,
    endtime,
    cancelPress
  } = props;
  return (
    <Wrapper
      // animation="fadeInRight"
      style={[styles.pastCard, containerStyle]}>
      <ImageBackground source={{uri: bgimage}} imageStyle={{borderRadius: 15}}>
        <View
          style={{
            backgroundColor: colors.snow,
            paddingHorizontal: width(1.5),
            borderRadius: 15,
            paddingVertical: height(1),
            flex: 1,
            marginTop: height(18.5),
            elevation: 2,
          }}>
          <View style={{flexDirection: 'row', paddingHorizontal: width(3)}}>
            <View style={{flex: 0.2}}>
              <ImageRound source={{uri: image}} size={totalSize(6.2)} />
            </View>
            <View
              style={{
                flex: 0.8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: width(1.7),
              }}>
              <View style={{justifyContent: 'flex-start'}}>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.5),
                    fontFamily: fontFamily.appTextBold,
                  }}>
                  {/* John Doe */}
                  {name}
                </Text>
                <Text>
                  <SmallText
                    style={{color: '#000000', fontSize: totalSize(1.1)}}>
                    {' '}
                    4.55{' '}
                  </SmallText>
                  <Ionicons name="star" size={totalSize(1.3)} color="#D5BB70" />
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.1),
                    fontFamily: fontFamily.appTextRegular,
                    marginTop: height(0.7),
                  }}>
                  {/* Makeup */}
                  {servicename}
                </Text>
              </View>
              <View style={{alignItems: 'flex-end', marginLeft: width(12)}}>
                <View
                  style={{
                    marginLeft: width(2.5),
                    marginBottom: height(1.5),
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.appColor1,
                      fontSize: totalSize(0.9),
                      fontFamily: fontFamily.appTextBold,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.appColor1,
                    }}>
                    Final Cost
                  </Text>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: totalSize(0.9),
                      fontFamily: fontFamily.appTextBold,
                    }}>
                    ${price}
                  </Text>
                </View>
                <ButtonColoredss
                  text={Status}
                  textStyle={{
                    fontSize: 7,
                    fontFamily: fontFamily.appTextRegular,
                  }}
                  buttonStyle={{
                    marginHorizontal: width(1),
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: width(2.5),
                    borderRadius: 50,
                    height: height(2.2),
                    backgroundColor: '#7ADC68',
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#00000029',
              borderTopWidth: 1,
              borderTopColor: '#00000029',
              paddingHorizontal: width(2),
              marginHorizontal: width(5.5),
              justifyContent: 'space-between',
              paddingVertical: height(1),
              marginVertical: height(0.7),
            }}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: colors.appColor1,
                  fontSize: totalSize(1.25),
                  fontFamily: fontFamily.appTextBold,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.appColor1,
                }}>
                Location
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: totalSize(1.1),
                  fontFamily: fontFamily.appTextRegular,
                  marginTop: height(0.3),
                  marginTop: height(1.5),
                  textAlign: 'center',
                  lineHeight: height(2),
                  width:width(30),
                  // backgroundColor:'red'
                }}>
                {/* 17 Johnson Ave,New York, NY 10018ggjhghjsgjhghjghj */}
                {location}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: colors.appColor1,
                  fontSize: totalSize(1.25),
                  fontFamily: fontFamily.appTextBold,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.appColor1,
                }}>
                Scheduled Date & Time
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: totalSize(1.1),
                  fontFamily: fontFamily.appTextRegular,
                  marginTop: height(0.3),
                  marginTop: height(1.5),
                }}>
                {/* Sat,Jul 3,2022 */}
                {date}
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: totalSize(1.1),
                  fontFamily: fontFamily.appTextRegular,
                  marginTop: height(0.3),
                }}>
                {/* 12:00 AM - 12:00 PM */}
                {time}
              </Text>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#00000029',
              marginHorizontal: width(5.5),
              justifyContent: 'space-between',
              paddingVertical: height(1),
              marginBottom: height(1),
            }}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: colors.appColor1,
                  fontSize: totalSize(1.25),
                  fontFamily: fontFamily.appTextBold,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.appColor1,
                  marginTop: -9,
                  marginBottom: totalSize(1.2),
                }}>
                Appointment
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.1),
                    fontFamily: fontFamily.appTextBold,
                    marginTop: height(0.3),
                  }}>
                  Start Time:
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.1),
                    fontFamily: fontFamily.appTextBold,
                    marginTop: height(0.3),
                  }}>
                  End Time:
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.1),
                    fontFamily: fontFamily.appTextRegular,
                    marginTop: height(0.3),
                  }}>
                  {/* Sat,Jul 3,2022 */}
                  {starttime}
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: totalSize(1.1),
                    fontFamily: fontFamily.appTextRegular,
                    marginTop: height(0.3),
                  }}>
                  {/* Sat,Jul 3,2022 */}
                  {endtime}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: width(10),
            }}>
            <ButtonColoredss
              text="Share Review"
              onPress={ReviewonPress}
              textStyle={{fontSize: 12, fontFamily: fontFamily.gothicRegular}}
              buttonStyle={{
                marginHorizontal: 0,
                borderRadius: 8,
                height: height(4),
                width: width(27),
              }}
            />

            <ButtonColoredss
              text="CANCEL"
              textStyle={{fontSize: 12, fontFamily: fontFamily.gothicRegular}}
              buttonStyle={{
                marginHorizontal: 0,
                borderRadius: 8,
                height: height(4),
                width: width(27),
                backgroundColor: '#D40000',
              }}
              onPress={cancelPress}
            />
          </View>
        </View>
      </ImageBackground>
    </Wrapper>
  );
};
export const ClientCompletedCardnew = props => {
  const {
    containerStyle,
    image,
    name,
    lastname,
    reviews,
    completed_jobs,
    onPress,
    about,
    favorite_stylist,
    price,
    Status,
    date,
    time,
    location,
    rating,
    onPressHeart,
    onPressHeart2,
  } = props;
  return (
    <Wrapper
      // animation="fadeInDown"
      style={{
        backgroundColor: '#FFF',
        marginHorizontal: width(5),
        marginBottom: totalSize(1),
        borderRadius: 10,
        padding: totalSize(1.2),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 2,
      }}>
      <Pressable
        // onPress={() => { setstylistid(item.id), navigate(routes.client.stylistProfile, { stylistid: item.id, }) }}
        onPress={onPress}>
        <Pressable
          //  onPress={() => navigate(routes.client.jobDetail)}
          style={{
            flexDirection: 'row',
            borderBottomColor: colors.appColor1,
            borderBottomWidth: 2,
            paddingBottom: totalSize(1),
          }}>
          <View style={{justifyContent: 'center'}}>
            <Image
              source={{uri: image}}
              style={{
                height: totalSize(8),
                width: totalSize(8),
                resizeMode: 'cover',
                borderRadius: 100,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginLeft: totalSize(1),
            }}>
            <SmallTitle
              style={{
                color: '#000',
                fontFamily: fontFamily.gothicBold,
                marginBottom: height(1),
              }}>
              {/* {item.first_name} */}
              {name}{' '}{lastname}
            </SmallTitle>
            <Text>
              <SmallText style={{color: '#000000'}}>{rating} </SmallText>
              <Ionicons name="star" size={totalSize(1.5)} color="#D9C076" />
            </Text>
          </View>
          {!favorite_stylist ? (
            <TouchableOpacity
              style={{marginTop: height(1), width: width(7)}}
              onPress={onPressHeart}
            >
              <Image
                source={appIcons.hearto}
                resizeMode="cover"
                style={{
                  height: 23,
                  width: 25,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{marginTop: height(1), width: width(7)}}
              onPress={onPressHeart2}
              >
              <Image
                source={appIcons.heart}
                resizeMode="cover"
                style={{
                  height: 25,
                  width: 27,
                }}
              />
            </TouchableOpacity>
          )}
        </Pressable>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: colors.black,
              fontSize: 15,
              fontFamily: fontFamily.gothicBold,
              borderBottomWidth: 1,
              borderBottomColor: colors.black,
              marginVertical: totalSize(1),
            }}>
            ABOUT ME
          </Text>
        </View>

        <View style={{paddingHorizontal: width(3), height: height(13.5)}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: totalSize(1.79),
              fontFamily: fontFamily.gothicRegular,
              lineHeight: height(3.2),
              marginBottom: height(1),
              color: '#111111',
            }}>
            {about}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopWidth: 2,
            borderTopColor: colors.appColor1,
            paddingTop: height(0.7),
          }}>
          <View>
            <Text>
              <Ionicons
                name="star"
                size={totalSize(2.3)}
                color={colors.appColor1}
              />
              <SmallText
                style={{
                  color: '#111111',
                  fontSize: totalSize(1.65),
                  fontFamily: fontFamily.gothicRegular,
                }}>
                {' '}
                {reviews} Reviews
              </SmallText>
            </Text>
            <Text>
              <Image
                source={appIcons.complete}
                resizeMode="cover"
                style={{
                  height: 20,
                  width: 20,
                }}
              />
              <SmallText
                style={{
                  color: '#111111',
                  fontSize: totalSize(1.65),
                  fontFamily: fontFamily.gothicRegular,
                }}>
                {' '}
                {completed_jobs} Completed Styles
              </SmallText>
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: '#111111',
                fontFamily: fontFamily.gothicRegular,
                fontSize: totalSize(1.3),
              }}>
              Starting At
            </Text>
            <Text
              style={{
                color: colors.appColor1,
                fontFamily: fontFamily.gothicBold,
                fontSize: totalSize(2.55),
              }}>
              ${price}
            </Text>
          </View>
        </View>
      </Pressable>
    </Wrapper>
  );
};

export const SkillCard = props => {
  const {containerStyle, icon, price, title} = props;
  return (
    <CardWrapper style={[styles.skillCard, containerStyle]}>
      <RowWrapper>
        <RowWrapperBasic>
          <CustomIcon
            icon={icon}
            color={colors.appTextColor6}
            size={sizes.appIcons.medium}
          />
          <Spacer width={sizes.baseMargin} />
          <RegularText style={[appStyles.textWhite, appStyles.textBold]}>
            {title}
          </RegularText>
        </RowWrapperBasic>
        <SmallTitle style={[appStyles.textWhite]}>${price}</SmallTitle>
      </RowWrapper>
    </CardWrapper>
  );
};

export const SkillInfoCard = props => {
  const {containerStyle, icon, detail, price, title, iconPress, editPress} =
    props;
  return (
    <CardWrapper style={[styles.skillInfoCard, containerStyle]}>
      <RowWrapperBasic>
        <Wrapper flex={8}>
          <RowWrapperBasic>
            <CustomIcon
              icon={icon}
              color={colors.appTextColor6}
              size={sizes.appIcons.large}
            />
            <Spacer width={sizes.baseMargin} />
            <TinyTitle style={[appStyles.textWhite]}>{title}</TinyTitle>
          </RowWrapperBasic>
        </Wrapper>
        <Wrapper flex={2} style={[{alignItems: 'flex-end'}]}>
          <Icon
            name="delete"
            type="material-community"
            size={sizes.appIcons.medium}
            color={colors.appTextColor6}
            onPress={iconPress}
          />
          <Spacer height={sizes.baseMargin} />
          <Icon
            name="pen"
            type="material-community"
            size={sizes.appIcons.medium}
            color={colors.appTextColor6}
            onPress={editPress}
          />
        </Wrapper>
      </RowWrapperBasic>
      <Spacer height={sizes.baseMargin} />
      <RegularText style={[appStyles.textWhite]}>{detail}</RegularText>
      <Spacer height={sizes.baseMargin} />
      <MediumTitle style={[appStyles.textWhite, {textAlign: 'right'}]}>
        ${price}
      </MediumTitle>
    </CardWrapper>
  );
};

export const ScheduleInfoCard = props => {
  const {containerStyle, icon, detail, price, title, iconPress, editPress} =
    props;
  return (
    <CardWrapper style={[styles.skillInfoCard, containerStyle]}>
      <RowWrapperBasic>
        <Wrapper flex={2}>
          <RowWrapperBasic>
            <CustomIcon
              icon={icon}
              color={colors.appTextColor6}
              size={sizes.appIcons.large}
            />
            <Spacer width={sizes.baseMargin} />
            <TinyTitle style={[appStyles.textWhite]}>{title}</TinyTitle>
          </RowWrapperBasic>
        </Wrapper>
        <Wrapper flex={2} style={[{alignItems: 'flex-end'}]}>
          <Icon
            name="delete"
            type="material-community"
            size={sizes.appIcons.medium}
            color={colors.appTextColor6}
            onPress={iconPress}
          />
          <Spacer height={sizes.baseMargin} />
          {editPress && (
            <Icon
              name="pen"
              type="material-community"
              size={sizes.appIcons.medium}
              color={colors.appTextColor6}
              onPress={editPress}
            />
          )}
        </Wrapper>
      </RowWrapperBasic>
      <Spacer height={sizes.baseMargin} />
      <RegularText style={[appStyles.textWhite]}>{detail}</RegularText>
      <Spacer height={sizes.baseMargin} />
    </CardWrapper>
  );
};

export const ProviderReviewCard = props => {
  const {
    containerStyle,
    image,
    name,
    rating,
    title,
    detail,
    isLiked,
    onPress,
    onPressHeart,
  } = props;
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Wrapper style={[styles.providerReviewCard, containerStyle]}>
        <RowWrapperBasic style={[{}]}>
          <ImageRound source={{uri: image}} size={totalSize(7)} />
          <Spacer width={sizes.baseMargin} />
          <Wrapper flex={1}>
            <Spacer height={sizes.smallMargin} />
            <RegularText style={[appStyles.textBold, {fontSize: 15}]}>
              {name}
            </RegularText>
            <Spacer height={sizes.TinyMargin} />
            <SmallText style={{fontSize: 12}}>{title}</SmallText>
          </Wrapper>
        </RowWrapperBasic>
        <Spacer height={sizes.smallMargin} />
        <RowWrapperBasic>
          <Rating startingValue={rating} imageSize={totalSize(1.5)} />
          <RegularText style={[]}> {rating}</RegularText>
        </RowWrapperBasic>
        <Spacer height={sizes.smallMargin} />
        <SmallText style={[appStyles.textGray, {fontSize: 12}]}>
          {detail}
        </SmallText>
      </Wrapper>
    </TouchableOpacity>
  );
};

export const StylistQualifierCard = props => {
  const {containerStyle, title, subTitle, checks, onPress, type} = props;
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <LinearGradient
        colors={
          type === 'silver'
            ? colors.stylistQualifierSilverCardGradiant
            : type === 'gold'
            ? colors.stylistQualifierGoldCardGradiant
            : null
        }
        start={{x: 0.0, y: 0.05}}
        end={{x: 0.65, y: 1.0}}
        locations={[0.2, 0.8, 1]}
        style={[styles.stylistQualifierCard, containerStyle]}>
        <MediumTitle style={[appStyles.textWhite]}>{title}</MediumTitle>
        <Spacer height={sizes.smallMargin} />
        <SmallTitle style={[appStyles.textWhite]}>{subTitle}</SmallTitle>
        <Spacer height={sizes.doubleBaseMargin} />
        {checks.map((item, key) => {
          return (
            <RowWrapperBasic style={[{marginTop: sizes.smallMargin}]}>
              <Wrapper flex={8}>
                <RegularText style={[appStyles.textWhite]}>{item}</RegularText>
              </Wrapper>
              <Wrapper flex={2} style={[appStyles.center]}>
                <Icon
                  name="check-circle"
                  type="font-awesome"
                  size={sizes.appIcons.medium}
                  color={colors.appTextColor6}
                />
              </Wrapper>
            </RowWrapperBasic>
          );
        })}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  //FeaturedServiceCard styles
  FeaturedServiceCard: {
    ...appStyles.cardView,
    //...appStyles.shadow,
    borderRadius: sizes.cardRadius,
  },

  serviceImage: {
    borderRadius: sizes.cardRadius,
    width: null,
    height: height(15),
  },
  serviceTextContainer: {
    padding: sizes.smallMargin,
  },

  //serviceIconCard styles
  serviceIconCard: {
    ...appStyles.cardView,
    ...appStyles.center,
    borderRadius: sizes.cardRadius,
  },
  serviceIconCardSubContainer: {
    ...appStyles.center,
    marginVertical: sizes.marginVertical,
  },
  //ClientServiceCard
  clientServiceCard: {
    ...appStyles.cardView,
    padding: sizes.smallMargin,
    //...appStyles.shadow,
    borderRadius: sizes.cardRadius,
  },
  clientServiceImage: {
    borderRadius: 100,
    width: totalSize(10),
    height: height(10),
  },
  clientServiceTextContainer: {
    padding: sizes.smallMargin,
  },
  clientServiceButtonStyle: {
    marginHorizontal: width(5),
    alignItems: 'center',
    flex: 1,
  },
  //ClientStylerCard
  clientStylerCard: {
    // ...appStyles.cardView,
    // padding: sizes.smallMargin,
    backgroundColor: colors.snow,
    paddingHorizontal: width(4),
    borderRadius: 15,
    paddingVertical: height(2.5),
    flex: 1,
    marginTop: height(26),
    elevation: 5,
    // marginVertical:height(1)
  },
  //StylerReviewCard
  StylerReviewCard: {
    ...appStyles.cardView,
    padding: sizes.smallMargin,
    // ...appStyles.shadow,
    width: width(80),
    padding: 10,
    borderRadius: sizes.cardRadius,
  },

  //CreditCard
  CreditCard: {
    ...appStyles.cardView,
    padding: sizes.baseMargin,
    //...appStyles.shadow,
    borderRadius: sizes.cardRadius,
    width: width(80),
  },

  // ProviderServiceCard
  ProviderServiceCard: {
    ...appStyles.cardView,
    padding: sizes.smallMargin,
    //...appStyles.shadow,
    borderRadius: sizes.cardRadius,
  },
  scheduledServiceTitle: {
    ...appStyles.textGray,
    fontFamily: fontFamily.gothicRegular,
  },

  //ChatCard
  chatCard: {
    // ...appStyles.cardView,
    // padding: totalSize(0.3),
    paddingHorizontal: totalSize(0.3),
    paddingVertical: totalSize(1),
    //...appStyles.shadow,
    //width: width(80),
    // borderRadius: sizes.cardRadius
    // backgroundColor:'red'
  },
  schedeleCard: {
    // ...appStyles.cardView,
    // padding: totalSize(0.3),
    // marginHorizontal: width(1),
    // paddingHorizontal:totalSize(1),
    paddingVertical: height(2.1),
    //...appStyles.shadow,
    //width: width(80),
    // borderRadius: sizes.cardRadius
    // backgroundColor:'red'
  },
  schedeleCardBooking: {
    // ...appStyles.cardView,
    // padding: totalSize(0.3),
    // marginHorizontal: width(1),
    // paddingHorizontal:totalSize(1),
    paddingVertical: height(1),
    //...appStyles.shadow,
    //width: width(80),
    // borderRadius: sizes.cardRadius
    // backgroundColor:'red'
  },
  businessschedeleCard: {
    marginHorizontal: width(3),
    // paddingHorizontal:totalSize(1),
    paddingVertical: height(2.1),
    //...appStyles.shadow,
    //width: width(80),
    // borderRadius: sizes.cardRadius
    // backgroundColor:'red'
  },
  pastCard: {
    // ...appStyles.cardView,
    // padding: totalSize(0.3),

    paddingHorizontal: totalSize(2),
    paddingVertical: totalSize(1),
    //...appStyles.shadow,
    //width: width(80),
    // borderRadius: sizes.cardRadius
    // backgroundColor:'red'
  },

  //SkillCard
  skillCard: {
    backgroundColor: colors.appColor1,
    borderRadius: sizes.cardRadius,
    paddingVertical: sizes.baseMargin,
  },

  //SkillInfoCard
  skillInfoCard: {
    backgroundColor: colors.appColor1,
    borderRadius: sizes.cardRadius,
    paddingVertical: sizes.smallMargin,
    paddingHorizontal: sizes.baseMargin,
  },

  //ProviderReviewCard
  providerReviewCard: {
    backgroundColor: colors.snow,
    paddingHorizontal: width(5),
    borderRadius: 15,
    paddingVertical: height(2),
    flex: 1,
    marginTop: height(20),
    elevation: 2,
  },

  //StylistQualifierCard
  stylistQualifierCard: {
    ...appStyles.cardView,
    padding: sizes.baseMargin,
    //...appStyles.shadow,
    //width: width(80),
    borderRadius: sizes.modalRadius,
  },
  infooStyles: {
    fontFamily: fontFamily.gothicRegular,
    color: colors.black,
  },
});
