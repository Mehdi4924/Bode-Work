import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { MainWrapper, Wrapper, CustomIcon, TextInputBordered, RegularText, ComponentWrapper, LineHorizontal, Spacer, ButtonColored, TinyTitle, RowWrapperBasic, ButtonBorderedSmall, RowWrapper, ButtonColoredSmall, KeyboardAvoidingScrollView, ButtonBordered } from '../../../components';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { appIcons, appStyles, colors, sizes, fontSize, fontFamily } from '../../../themes';
import { totalSize, width, height } from 'react-native-dimension';
import { routes } from '../../../services';
import ClientHeader from '../../../components/header/clientHeader';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SelectAddress = (props) => {
  const dispatch = useDispatch();
  const { latitude, longitude, address } = useSelector(state => state.user);
  // console.log("ye  ay",latitude, longitude, address);
  const { navigate, goBack } = props.navigation;
  const param =props.route.params
  console.log("ye aaya param",param);
  const [region, setRegion] = useState({
    // latitude: 51.5347,
    // longitude: 0.1246,
    latitude: latitude&&latitude!=null?latitude:37.78825,
    longitude: longitude&&longitude!=null?longitude:-122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });
  const [marker, setMarker] = useState({
    title: 'Your location',
    description: 'Description',
    cooards: {
      latitude: latitude&&latitude!=null?latitude:37.78825,
      longitude: longitude&&longitude!=null?longitude:-122.4324
      // latitude: 51.5447,
      // longitude: 0.1246
    }
  });
  useFocusEffect(
    React.useCallback(async() => {
      // getOneTimeLocation()
      // getLocationName()
      // getUserData();
      // getUserData2()
      const addresssss =await AsyncStorage.getItem("setloaction");
      console.log(">>>>>>>>>>>",addresssss);
      setaddresss(addresssss)
    }, [])
  );
  const [nailTypes, setNailTypes] = useState(['Mountain peak', 'Almond', 'Oval', 'Flare', 'Square/oval', 'Edge', 'Rounded', 'Stiletto', 'Ballerina/Coffin', 'Lipstick', 'Square', 'Arrow head']);
  const [length, setLength] = useState(['Small', 'Medium', 'Large', ]);
  const [hairLength, setHairLength] = useState(['Small (Shoulder)', 'Regular (BraStrap)', 'Long (Waist)', 'Longer (Calf)']);
  const [serviceSize, setServiceSize] = useState(['Micro', 'Small', 'Regular', 'Large', 'Jumbo']);
  const [coloringOrBleach, setColoringOrBleach] = useState(['Full highlights', 'Partial highlights', 'Single process color']);
  const [makeupArtistOptions, setMakeupArtistOptions] = useState(['Minimal', 'Casual', 'Heavy', 'Cosplay']);
  const [piercingOptions, setPiercingOptions] = useState(['One', 'Two', 'Three']);
  const [tattooSizes, setTattooSizes] = useState(['Extra Small (2sq”)', 'Small (6sq”)', 'Medium (20sq”)', 'Large (35sq”)', 'Extra Large (56sq”)', 'Half Sleeve (60sq”)', 'Full Sleeve (160sq”)']);
  const [tattooCompaxity, setTattooCompaxity] = useState(['Words', 'Simple', 'Detailed', 'Life Like']);
  const [tattooColors, setTattooColors] = useState(['Black Ink', 'Colored Ink']);
  const [selectedLengthIndex, setSelectedLengthIndex] = useState(null);
  console.log("ye aya slected index",selectedLengthIndex);
  const [selectedHairLengthIndex, setSelectedHairLengthIndex] = useState(null);
  const [selectedNailTypesIndex, setSelectedNailTypesIndex] = useState(null);
  const [selectedServiceSizeIndex, setSelectedServiceSizeIndex] = useState(null);
  const [selectedcoloringOrBleachIndex, setSelectedcoloringOrBleachIndex] = useState(null);
  const [selectedMakeupArtistIndex, setSelectedMakeupArtistIndex] = useState(null);
  const [selectedPiercingOptionsIndex, setSelectedPiercingOptionsIndex] = useState(null);
  const [selectedTattooSizeIndex, setSelectedTattooSizeIndex] = useState(null);
  const [selectedTattooCompaxityIndex, setSelectedTattooCompaxityIndex] = useState(null);
  const [selectedTattooColorsIndex, setSelectedTattooColorsIndex] = useState(null);
  const [selectedtitle, setselectedtitle] = useState(null);
  const [loader, setLoader] = useState(false);
  // const [addresss, setaddresss] = useState(address);
  const [addresss, setaddresss] = useState("");
  const onPressLength = (index) => {
    setSelectedLengthIndex(index);
  };
  const onPressHairLength = (index) => {
    setSelectedHairLengthIndex(index);
  };
  const onPressNailType = (index) => {
    setSelectedNailTypesIndex(index);
  };
  const onPressServiceSize = (index) => {
    setSelectedServiceSizeIndex(index);
  };
  const onPressColoringOrBleach = (index) => {
    setSelectedcoloringOrBleachIndex(index);
  };
  const onPressMakeupArtistOption = (index) => {
    setSelectedMakeupArtistIndex(index);
  };
  const onPressPiercingOption = (index) => {
    setSelectedPiercingOptionsIndex(index);
  };
  const onPressTattooSize = (index) => {
    setSelectedTattooSizeIndex(index);
  };
  const onPressTattooCompaxity = (index) => {
    setSelectedTattooCompaxityIndex(index);
  };
  const onPressTattooColor = (index) => {
    setSelectedTattooColorsIndex(index)
  };
  const RenderSelectableButtons = ({ data, selectedIndex, onPress, title }) => {
    
    return (
      <Wrapper>
        <Spacer height={sizes.baseMargin} />
        <ComponentWrapper>
          <TinyTitle>{title}</TinyTitle>
        </ComponentWrapper>
        <Spacer height={sizes.smallMargin} />
        <RowWrapper style={{ flexWrap: 'wrap',justifyContent: 'space-between', }}>
          {
            data.map((item, key) => {
              return (
                <Wrapper>
                  {
                    key === selectedIndex ?
                    
                      <ButtonColoredSmall
                        text={item}
                        buttonStyle={[styles.selectableButtonStyle]}
                        textStyle={[styles.selectableButtonTextStyle,{fontFamily:fontFamily.appTextBold}]}
                      />
                      
                      :
                      <ButtonBorderedSmall
                        text={item}
                        buttonStyle={[styles.selectableButtonStyle]}
                        onPress={() => onPress(key)}
                        textStyle={[styles.selectableButtonTextStyle]}
                      />
                  }
                </Wrapper>
              )
            })
          }
        </RowWrapper>
      </Wrapper>
    )
  };

  const service = props.route.params.serviceName;
  return (
    <MainWrapper>
      <StatusBar 
        backgroundColor={"#FFF"} 
        barStyle={'dark-content'} 
      />
      <ClientHeader
        backButton={true}
        goBack={() => goBack()}
        heading={"Address"} 
        notification={false}
        headingStyle={{color:colors.appColor1}}
        headerStyle={{backgroundColor:"#FFF"}}
      />
      <Wrapper flex={5}>
        <MapView
          region={region}
          style={styles.mapStyle}
        >
          <Marker
            // coordinate={marker.cooards}
            // title={marker.title}
            // description={marker.description}
            coordinate={{ 
              latitude: parseFloat(latitude&&latitude!=null?latitude:37.78825), 
              longitude: parseFloat( longitude&&longitude!=null?longitude:-122.4324) 
              // latitude: parseFloat(37.78825,), 
              // longitude: parseFloat(-122.4324) 
            }}
          >
            <CustomIcon
              icon={appIcons.mapMarker}
              serviceSize={totalSize(6)}
            />
          </Marker>
        </MapView>
      </Wrapper>
      <Wrapper flex={4.5} style={[{}]}>
        <KeyboardAvoidingScrollView>
          <Spacer height={sizes.baseMargin} />
          <TextInputBordered
              value={param?.locationAdress&&param?.locationAdress!=null?param?.locationAdress: addresss}
            onChangeText={val => {
              setaddresss(val);
            }}
            iconName="pencil"
            iconType="material-community"
            editable={false}
            title="Location"
            titleStyle={{color:colors.appColor1,fontFamily:fontFamily.appTextRegular}}
                inputStyle={{color: 'grey',fontFamily:fontFamily.appTextRegular}}
            right={
              <RegularText 
                onPress={() => navigate(routes.client.selectLocation,{ data:{adress:'adress'}})} 
                style={[appStyles.textBold, appStyles.textPrimaryColor]}>
                  Change   </RegularText>
            }
          />
          <Spacer height={sizes.baseMargin} />
          <ComponentWrapper>
            <LineHorizontal />
          </ComponentWrapper>
          <Spacer height={sizes.smallMargin} />
          <Wrapper>
            {/* Type of your Nails */}
            {/* { 
              service === "Nails" ?
                <RenderSelectableButtons
                  data={nailTypes}
                  title="Your nails types?"
                  selectedIndex={selectedNailTypesIndex}
                  onPress={(index) => onPressNailType(index)}
                />
                :
                null
            } */}
            {/* Length */}
            {
              service === "Nails"
                ?
                <RenderSelectableButtons
                  data={length}
                  title="Estimated size of your style?"
                  selectedIndex={selectedLengthIndex}
                  onPress={(index) => onPressLength(index)}
                //onPress={(index) => setState({selectedLengthIndex:index})}
                />
                :
                null
            }

            {/* Coloring or Bleach */}
            {/* {
              service === "Coloring or Bleach"
                ?
                <RenderSelectableButtons
                  data={coloringOrBleach}
                  title="Coloring or Bleach type?"
                  selectedIndex={selectedcoloringOrBleachIndex}
                  onPress={(index) => onPressColoringOrBleach(index)}
                //onPress={(index) => setState({selectedLengthIndex:index})}
                />
                :
                null
            } */}
            {/* Makeup Artist Options */}
            {/* {
              service === "Makeup Artist"
                ?
                <RenderSelectableButtons
                  data={makeupArtistOptions}
                  title="Your makeup type?"
                  selectedIndex={selectedMakeupArtistIndex}
                  onPress={(index) => onPressMakeupArtistOption(index)}
                //onPress={(index) => setState({selectedLengthIndex:index})}
                />
                :
                null
            } */}
            {/* Piercing Options */}
            {/* {
              service === "Piercing"
                ?
                <RenderSelectableButtons
                  data={piercingOptions}
                  title="Piercing?"
                  selectedIndex={selectedPiercingOptionsIndex}
                  onPress={(index) => onPressPiercingOption(index)}
                //onPress={(index) => setState({selectedLengthIndex:index})}
                />
                :
                null
            } */}

            {/* Size of your service */}
            {/* {
              service === "Dreaded"
                || service === "Permanent dreadlock Extensions"
                || service === "Faux Locs Bob"
                || service === "Goddess Faux Locs"
                || service === "Straight Faux Locs"
                || service === "Twist Hair"
                || service === "Braiding"
                || service === "Crochet Braiding"
                ?
                <RenderSelectableButtons
                  data={serviceSize}
                  title="Estimated Size of your style?"
                  selectedIndex={selectedServiceSizeIndex}
                  onPress={(index) => onPressServiceSize(index)}
                />
                :
                null
            } */}

            {/* Length of your Hair */}
            {/* {
              service === "Dreaded"
                || service === "Permanent dreadlock Extensions"
                || service === "Faux Locs Bob"
                || service === "Goddess Faux Locs"
                || service === "Straight Faux Locs"
                || service === "Twist Hair"
                || service === "Braiding"
                || service === "Crochet Braiding"
                || service === "Full head sewn-in"
                || service === "Hair Extensions"
                || service === "Clip-In Hair Extension"
                ?
                <RenderSelectableButtons
                  data={hairLength}
                  title="length of your style?"
                  selectedIndex={selectedHairLengthIndex}
                  onPress={(index) => onPressHairLength(index)}
                />
                :
                null
            } */}

            {/* {
              service === "Tattoo" ?
                <Wrapper>
                  <RenderSelectableButtons
                    title="Your Tattoo size?"
                    data={tattooSizes}
                    selectedIndex={selectedTattooSizeIndex}
                    onPress={(index) => onPressTattooSize(index)}
                  />
                  <RenderSelectableButtons
                    title="Your Tattoo complexity (Detail)?"
                    data={tattooCompaxity}
                    selectedIndex={selectedTattooCompaxityIndex}
                    onPress={(index) => onPressTattooCompaxity(index)}
                  />
                  <RenderSelectableButtons
                    title="Your Tattoo color?"
                    data={tattooColors}
                    selectedIndex={selectedTattooColorsIndex}
                    onPress={(index) => onPressTattooColor(index)}
                  />
                  <Spacer height={sizes.baseMargin} />
                  <ComponentWrapper>
                    <TinyTitle>Add Photo OR select for Artist Portfolio (optional)</TinyTitle>
                  </ComponentWrapper>
                  <Spacer height={sizes.smallMargin} />
                  <ButtonBordered
                    text="Tap to add photo"
                    iconName="camera"
                    buttonStyle={{ height: height(20) }}
                  />
                </Wrapper>

                :
                null
            } */}
          </Wrapper>
          <Spacer height={sizes.doubleBaseMargin} />
          <ButtonColored
            text="Continue"
            onPress={() => {navigate(routes.client.selectStylish,{data:param}),setLoader(true)}}
          />
          <Spacer height={sizes.doubleBaseMargin} />
        </KeyboardAvoidingScrollView>
      </Wrapper>
    </MainWrapper>
  );
}

export default SelectAddress;

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1
  },
  selectableButtonStyle: {
    // width: width(25),
    //...appStyles.center
    marginBottom: sizes.TinyMargin,
    // marginRight:sizes.TinyMargin
  },
  selectableButtonTextStyle: {
    fontSize: fontSize.regular,
    marginHorizontal:width(2),
    ...appStyles.textBold,
  }
})