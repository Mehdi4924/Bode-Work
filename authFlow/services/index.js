import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {
  ServiceIconCard,
  MainWrapperMatrial,
  Wrapper,
  TextInputBordered,
  Spacer,
  ComponentWrapper,
  TinyTitle,
  FeaturedServiceCard,
  SmallText,
  RegularText,
  ModalColored,
  MainWrapper,
  AbsoluteWrapper,
  ButtonColored,
  ServiceIconCardNew,
} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors, appStyles, sizes, appImages, appIcons} from '../../../themes';
import {width, height} from 'react-native-dimension';
import {routes} from '../../../services';
import {appData} from '../../../services/stores';
import {getAllOfCollection, saveData} from '../../../backend/firebase/utility';
import {getCurrentUserId} from '../../../backend/firebase/auth';

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Data for our modal
      isSubServicesModalVisible: false,
      subServicesModalTitle: '',
      subServicesModalData: null,
      selectedCategory: '',
      selectedSubCategory: '',
      FeaturedServices: [],
      regularServices: [],
      loading: true,
      // myObj: this.props.route.params.myObj,
    };
  }

  async componentDidMount() {
    // const {featuredServices, otherServices} = appData;
    let allData = await getAllOfCollection('ServicesCollection');
    let feature = await getAllOfCollection('FeaturedServices');
    let regular = await getAllOfCollection('RegularServices');
    console.log(allData);
    this.setState({
      FeaturedServices: feature,
      regularServices: regular,
      // FeaturedServices: allData[0].Services,
      // regularServices: allData[1].Services,
      loading: false,
    });
    // await saveData('ServicesCollection', 'Regular', {
    //   Services: otherServices,
    // }).then(() => {
    //   alert('Data saved successfully');
    // });
  }

  //Sub Services Modal
  toggleSubservicesModal = () => {
    this.setState({
      isSubServicesModalVisible: !this.state.isSubServicesModalVisible,
    });
  };

  //// Set Sub Services Modal Title and Data
  setModalTitleNdata = item => {
    const {navigate} = this.props.navigation;
    console.log('Subservices title is===>' + item.subServices);
    if (item.subServices.length) {
      this.setState({
        subServicesModalTitle: item.title,
        subServicesModalData: item.subServices,
      });
      this.toggleSubservicesModal();
    } else {
      navigate(routes.priceList, {
        service: 'Common',
        subService: item.title,
        mainService: this.state.subServicesModalTitle,
        // myObj: this.state.myObj,
      });
    }
  };

  //On Press Sub Service
  onPressSubService = (item, index) => {
    const {subServicesModalTitle, subServicesModalData} = this.state;
    // console.log("Selected Sub Service title is====>", item.title)
    if (subServicesModalTitle === 'Braiding') {
      this.onPressBraidingSubService(item, index);
    } else if (subServicesModalTitle === 'Nail Artist') {
      this.onPressNailSubService(item, index);
    } else if (subServicesModalTitle === 'Barber') {
      this.onPressBarberSubService(item, index);
    } else if (subServicesModalTitle === 'Makeup Artist') {
      this.onPressMakeupArtistSubService(item, index);
    } else if (subServicesModalTitle === 'Hair Stylist') {
      this.onPressHairStylistSubService(item, index);
    } else if (subServicesModalTitle === 'Faux Locs') {
      this.onPressFluxLocsSubService(item, index);
    } else if (subServicesModalTitle === 'Dreadlocks') {
      this.onPressDreadlocksSubService(item, index);
    } else if (subServicesModalTitle === 'Piercing') {
      this.onPressPiercingSubService(item, index);
    } else if (subServicesModalTitle === 'Tattoo') {
      this.onPressTattooSubService(item, index);
    } else if (subServicesModalTitle === 'Eyelashes') {
      this.onPressEyelashesSubService(item, index);
    } else if (subServicesModalTitle === 'Waxing') {
      this.onPressWaxingSubService(item, index);
    } else if (subServicesModalTitle === 'Twist Hair') {
      this.onPressTwistHairSubService(item, index);
    } else if (subServicesModalTitle === 'Skincare') {
      this.onPressSkincareSubService(item, index);
    } else if (subServicesModalTitle === 'Massages') {
      this.onPressMassageSubService(item, index);
    } else if (subServicesModalTitle === 'Crochet Braiding') {
      this.onPressCrochetBraidingSubService(item, index);
    } else if (subServicesModalTitle === 'Laser Hair Removal') {
      this.onPressLaserHairRemovalSubService(item, index);
    } else {
    }

    this.toggleSubservicesModal();
  };

  ////////////////Feature Services
  onPressFeaturedService = (item, index) => {
    console.log(item);
    this.setModalTitleNdata(item);
  };

  onPressBraidingSubService = (item, index) => {
    const {navigate} = this.props.navigation;
    navigate(routes.priceList, {
      service: 'Braiding',
      subService: item.title,
      mainService: 'Braiding',
      // myObj: this.state.myObj,
    });
  };

  onPressNailSubService = (item, index) => {
    const {navigate} = this.props.navigation;
    navigate(routes.priceList, {
      service: 'Nails',
      subService: item.title,
      mainService: 'Nails',
      // myObj: this.state.myObj,
    });
  };
  onPressBarberSubService = (item, index) => {
    const {navigate} = this.props.navigation;
    navigate(routes.priceList, {
      service: 'Common',
      subService: item.title,
      mainService: this.state.subServicesModalTitle,
      // myObj: this.state.myObj,
    });
  };
  onPressMakeupArtistSubService = (item, index) => {
    const {navigate} = this.props.navigation;
    navigate(routes.priceList, {
      service: 'Makeup Artist',
      subService: item.title,
      mainService: 'Makeup Artist',
      // myObj: this.state.myObj,
    });
  };

  ///////////Other services
  onPressOtherService = (item, index) => {
    this.setModalTitleNdata(item);
  };

  onPressHairStylistSubService = (item, index) => {
    const {navigate} = this.props.navigation;
    if (
      item.title === 'Hair Extensions' ||
      item.title === 'Clip-In Hair Extension' ||
      item.title === 'Coloring or Bleach' ||
      item.title === 'Full head sewn-in'
    ) {
      navigate(routes.priceList, {
        service: item.title,
        subService: item.title,
        mainService: item.title,
        // myObj: this.state.myObj,
      });
    } else {
      navigate(routes.priceList, {
        service: 'Common',
        subService: item.title,
        mainService: this.state.subServicesModalTitle,
        // myObj: this.state.myObj,
      });
    }
  };
  onPressTattooSubService = (item, index) => {
    const {navigate} = this.props.navigation;
    navigate(routes.priceList, {
      service: 'Tattoo',
      subService: item.title,
      mainService: 'Tattoo',
      // myObj: this.state.myObj,
    });
  };

  onPressDreadlocksSubService = (item, index) => {
    const {navigate} = this.props.navigation;
    if (
      item.title === 'Dreaded' ||
      item.title === 'Permanent dreadlock Extensions'
    ) {
      navigate(routes.priceList, {
        service: item.title,
        mainService: item.title,
        // myObj: this.state.myObj,
      });
    } else {
      navigate(routes.priceList, {
        service: 'Common',
        subService: item.title,
        mainService: this.state.subServicesModalTitle,
        // myObj: this.state.myObj,
      });
    }
  };
  onPressFluxLocsSubService = (item, index) => {
    const {navigate} = this.props.navigation;
    if (item.title === 'Faux Locs/ Retouch') {
      navigate(routes.priceList, {
        service: 'Common',
        subService: item.title,
        mainService: this.state.subServicesModalTitle,
        // myObj: this.state.myObj,
      });
    } else {
      navigate(routes.priceList, {
        service: item.title,
        mainService: item.title,
        // myObj: this.state.myObj,
      });
    }
  };
  onPressTwistHairSubService = (item, index) => {
    const {navigate} = this.props.navigation;
    navigate(routes.priceList, {
      service: 'Twist Hair',
      subService: item.title,
      mainService: 'Twist Hair',
      // myObj: this.state.myObj,
    });
  };
  onPressCrochetBraidingSubService = (item, index) => {
    const {navigate} = this.props.navigation;
    navigate(routes.priceList, {
      service: 'Crochet Braiding',
      subService: item.title,
      mainService: 'Crochet Braiding',
      // myObj: this.state.myObj,
    });
  };
  onPressWaxingSubService = (item, index) => {
    const {navigate} = this.props.navigation;
    navigate(routes.priceList, {
      service: 'Common',
      subService: item.title,
      mainService: this.state.subServicesModalTitle,
      // myObj: this.state.myObj,
    });
  };
  onPressPiercingSubService = (item, index) => {
    const {navigate} = this.props.navigation;
    navigate(routes.priceList, {
      service: 'Piercing',
      subService: item.title,
      mainService: 'Piercing',
      // myObj: this.state.myObj,
    });
  };
  onPressEyelashesSubService = (item, index) => {
    const {navigate} = this.props.navigation;
    navigate(routes.priceList, {
      service: 'Common',
      subService: item.title,
      mainService: this.state.subServicesModalTitle,
      // myObj: this.state.myObj,
    });
  };
  onPressSkincareSubService = (item, index) => {
    const {navigate} = this.props.navigation;
    navigate(routes.priceList, {
      service: 'Common',
      subService: item.title,
      mainService: this.state.subServicesModalTitle,
      // myObj: this.state.myObj,
    });
  };
  onPressLaserHairRemovalSubService = (item, index) => {
    const {navigate} = this.props.navigation;
    navigate(routes.priceList, {
      service: 'Common',
      subService: item.title,
      mainService: this.state.subServicesModalTitle,
      // myObj: this.state.myObj,
    });
  };
  onPressMassageSubService = (item, index) => {
    const {navigate} = this.props.navigation;
    navigate(routes.priceList, {
      service: 'Common',
      subService: item.title,
      mainService: this.state.subServicesModalTitle,
      // myObj: this.state.myObj,
    });
  };

  renderFeaturedServices = ({navigate}) => {
    // const {featuredServices} = appData;
    const {FeaturedServices, loading} = this.state;
    return (
      <Wrapper animation="fadeInUpBig">
        <ComponentWrapper style={{marginHorizontal: width(2.5)}}>
          {loading ? (
            <ActivityIndicator size={'large'} />
          ) : FeaturedServices && FeaturedServices.length > 0 ? (
            <FlatList
              data={FeaturedServices}
              numColumns={2}
              renderItem={({item, index}) => {
                return (
                  <Wrapper style={{flex: 1 / 2}}>
                    <FeaturedServiceCard
                      onPress={() => this.onPressFeaturedService(item, index)}
                      containerStyle={{
                        marginHorizontal: width(2.5),
                        marginVertical: height(1),
                      }}
                      image={item.image}
                      title={item.title}
                      providers={item.providers}
                    />
                  </Wrapper>
                );
              }}
            />
          ) : null}
        </ComponentWrapper>
      </Wrapper>
    );
  };
  renderOtherServices = ({data, title, onPress, numColumns}) => {
    const {otherServices, regularServices, loading} = this.state;
    return (
      <Wrapper flex={1}>
        {title ? (
          <ComponentWrapper style={{marginBottom: sizes.smallMargin}}>
            <TinyTitle>{title}</TinyTitle>
          </ComponentWrapper>
        ) : null}
        <ComponentWrapper style={{marginHorizontal: width(2.5)}}>
          {loading ? null : regularServices && regularServices.length > 0 ? (
            <FlatList
              data={regularServices}
              numColumns={numColumns}
              renderItem={({item, index}) => {
                return (
                  <Wrapper style={{flex: 1 / numColumns}}>
                    <ServiceIconCardNew
                      onPress={() => onPress(item, index)}
                      containerStyle={{
                        marginHorizontal: width(2.5),
                        marginVertical: height(1),
                        backgroundColor: "white",
                      }}
                      icon={item.image ? item.image : item.icon}
                    title={item.title}
                    iconcolor={item.image? "": ""}
                      //providers={item.providers}
                    />
                  </Wrapper>
                );
              }}
            />
          ) : null}
        </ComponentWrapper>
      </Wrapper>
    );
  };
  renderSubServices = ({data, title, onPress, numColumns}) => {
    const {otherServices, regularServices, loading} = this.state;
    return (
      <Wrapper flex={1}>
        {title ? (
          <ComponentWrapper style={{marginBottom: sizes.smallMargin}}>
            <TinyTitle>{title}</TinyTitle>
          </ComponentWrapper>
        ) : null}
        <ComponentWrapper style={{marginHorizontal: width(2.5)}}>
          {/* {loading ? (
            <ActivityIndicator size={'large'} />
          ) : regularServices && regularServices.length > 0 ? ( */}
          <FlatList
            data={data}
            numColumns={numColumns}
            renderItem={({item, index}) => {
              return (
                <Wrapper style={{flex: 1 / numColumns}}>
                  <ServiceIconCardNew
                    onPress={() => onPress(item, index)}
                    containerStyle={{
                      marginHorizontal: width(2.5),
                      marginVertical: height(1),
                      backgroundColor: "white",
                    }}
                    // icon={item.icon}
                    // title={item.title}
                    icon={item.image ? item.image : item.icon}
                    title={item.title}
                    iconcolor={item.image? "": ""}
                    //providers={item.providers}
                  />
                </Wrapper>
              );
            }}
          />
          {/* ) : null} */}
        </ComponentWrapper>
      </Wrapper>
    );
  };
  render() {
    const {navigation} = this.props;
    const {navigate} = navigation;
    const {
      //Sub Services Modal
      isSubServicesModalVisible,
      subServicesModalTitle,
      subServicesModalData,
      regularServices,
    } = this.state;

    // data in arrays
    const {otherServices} = appData;
    return (
      <MainWrapper>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Spacer height={sizes.baseMargin} />
          <this.renderFeaturedServices navigate={navigate} />
          <Spacer height={sizes.baseMargin} />
          <this.renderOtherServices
            data={regularServices}
            //  title={'Other Services'}
            numColumns={3}
            onPress={(item, index) => this.onPressOtherService(item, index)}
          />

          {/* <AbsoluteWrapper style={[{ bottom: 0, right: 0, left: 0 }]}>
           <ButtonColored
             text={'Skip'}
             onPress={this.onPressNext}
           />
           <Spacer height={sizes.baseMargin} />
        </AbsoluteWrapper> */}
          <Spacer height={sizes.baseMargin} />
        </KeyboardAwareScrollView>

        {/* Sub Services Modal */}
        <ModalColored
          isVisible={isSubServicesModalVisible}
          title={subServicesModalTitle}
          toggleModal={this.toggleSubservicesModal}
          content={
            <this.renderSubServices
              data={subServicesModalData}
              onPress={(item, index) => this.onPressSubService(item, index)}
              numColumns={2}
            />
          }
        />
      </MainWrapper>
    );
  }
}

export default Services;

// import React, { Component } from 'react';
// import { View, Text, FlatList } from 'react-native';
// import {
//   ServiceIconCard,
//   MainWrapperMatrial,
//   Wrapper,
//   TextInputBordered,
//   Spacer,
//   ComponentWrapper,
//   TinyTitle,
//   FeaturedServiceCard,
//   SmallText,
//   RegularText,
//   ModalColored,
//   MainWrapper,
//   AbsoluteWrapper,
//   ButtonColored,
// } from '../../../components';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { colors, appStyles, sizes, appImages, appIcons } from '../../../themes';
// import { width, height } from 'react-native-dimension';
// import { routes } from '../../../services';
// import { appData } from '../../../services/stores';
// import { getAllOfCollection } from '../../../backend/firebase/utility';

// class Services extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedService: null,
//       category: '',
//       subCategory: [],
//       subservice: '',
//       myObj: this.props.route.params.myObj,
//       //Data for our modal
//       isSubServicesModalVisible: false,
//       subServicesModalTitle: '',
//       subServicesModalData: null,
//     };
//   }

//   //Sub Services Modal
//   toggleSubservicesModal = () => {
//     this.setState({
//       isSubServicesModalVisible: !this.state.isSubServicesModalVisible,
//     });
//   };

//   //// Set Sub Services Modal Title and Data
//   setModalTitleNdata = item => {
//     const { navigate } = this.props.navigation;
//     // console.log('Subservices title is===>' + item.title)
//     if (item.subServices.length) {
//       this.setState({
//         subServicesModalTitle: item.title,
//         subServicesModalData: item.subServices,
//       });
//       this.toggleSubservicesModal();
//     } else {
//       // navigate(routes.priceList, { service: 'Common' })
//       this.setState({ selectedService: 'Common' });
//     }
//   };

//   //On Press Sub Service
//   onPressSubService = (item, index) => {
//     console.log('SUBSERVICE')
//     const { subServicesModalTitle, subServicesModalData } = this.state;
//     this.selectSubService(item, index);
//   };

//   ////////////////Feature Services
//   onPressFeaturedService = (item, index) => {
//     this.setModalTitleNdata(item);
//   };
//   selectSubService = (item, index) => {
//     const { subServicesModalTitle, subServicesModalData } = this.state;
//     console.log(item.title,subServicesModalTitle)

//     this.setState({selectedService:subServicesModalTitle, subservice:item.title},()=>{
//       let {myObj} = this.state
//       myObj.service = subServicesModalTitle,
//       myObj.subService = item.title
//     })
//     this.toggleSubservicesModal();
//   };

//   onPressNailSubService = (item, index) => {
//     const { navigate } = this.props.navigation;
//     //navigate(routes.priceList, { service: 'Nails' })
//     this.setState({ selectedService: 'Nails', subservice: item.title }, () => {
//       console.log(this.state.subservice, item.title, this.state.category);
//     });

//     //this.toggleNailsModal();
//   };
//   onPressBarberSubService = (item, index) => {
//     const { navigate } = this.props.navigation;
//     // navigate(routes.priceList, { service: 'Common' })
//     this.setState({ selectedService: 'Common', subservice: item.title }, () => {
//       console.log(this.state.subservice, item.title, this.state.category);
//     });

//     //this.toggleBarberModal();
//   };
//   onPressMakeupArtistSubService = (item, index) => {
//     const { navigate } = this.props.navigation;
//     // navigate(routes.priceList, { service: 'Makeup Artist' })
//     this.setState(
//       { selectedService: 'Makeup Artist', subservice: item.title },
//       () => {
//         console.log(this.state.subservice, item.title, this.state.category);
//       },
//     );

//     //this.toggleMakeupArtistModal();
//   };

//   ///////////Other services
//   onPressOtherService = (item, index) => {
//     this.setModalTitleNdata(item);
//   };
//   onPressHairStylistSubService = (item, index) => {
//     const { navigate } = this.props.navigation;

//     //navigate(routes.priceList, { service: item.title })
//     this.setState({ selectedService: item.title, subservice: item.title });
//     console.log(
//       this.state.selectedService,
//       this.state.category,
//       this.state.subservice,
//     );

//     // this.toggleHairStylistModal();
//   };
//   onPressTattooSubService = (item, index) => {
//     const { navigate } = this.props.navigation;
//     //  navigate(routes.priceList, { service: 'Tattoo' })
//     this.setState({ selectedService: 'Tattoo', subservice: item.title }, () => {
//       console.log(this.state.subservice, item.title, this.state.category);
//     });
//     //this.toggleTattooModal();
//   };

//   onPressDreadlocksSubService = (item, index) => {
//     const { navigate } = this.props.navigation;

//     // navigate(routes.priceList, { service: item.title })
//     this.setState({ selectedService: item.title, subservice: item.title }, () => {
//       console.log(this.state.subservice, item.title, this.state.category);
//     });

//     //this.toggleDreadlocksModal();
//   };
//   onPressFluxLocsSubService = (item, index) => {
//     const { navigate } = this.props.navigation;

//     //navigate(routes.priceList, { service: item.title })
//     this.setState({ selectedService: item.title, subservice: item.title }, () => {
//       console.log(this.state.subservice, item.title, this.state.category);
//     });

//     // this.toggleFluxLocsModal();
//   };
//   onPressTwistHairSubService = (item, index) => {
//     const { navigate } = this.props.navigation;
//     // navigate(routes.priceList, { service: 'Twist Hair' })
//     this.setState({ selectedService: item.title, subservice: item.title }, () => {
//       console.log(this.state.subservice, item.title, this.state.category);
//     });

//     this.toggleTwistHairModal();
//   };
//   onPressCrochetBraidingSubService = (item, index) => {
//     const { navigate } = this.props.navigation;
//     // navigate(routes.priceList, { service: 'Crochet Braiding' })
//     this.setState({ selectedService: item.title, subservice: item.title }, () => {
//       console.log(this.state.subservice, item.title, this.state.category);
//     });

//     // this.toggleCrochetBraidingModal();
//   };
//   onPressWaxingSubService = (item, index) => {
//     const { navigate } = this.props.navigation;
//     // navigate(routes.priceList, { service: 'Common' })
//     this.setState({ selectedService: item.title, subservice: item.title }, () => {
//       console.log(this.state.subservice, item.title, this.state.category);
//     });

//     // this.toggleWaxingModal();
//   };
//   onPressPiercingSubService = (item, index) => {
//     const { navigate } = this.props.navigation;
//     navigate(routes.priceList, { service: 'Piercing' });
//     this.setState({ selectedService: item.title, subservice: item.title }, () => {
//       console.log(this.state.subservice, item.title, this.state.category);
//     });

//     // this.togglePiercingModal();
//   };
//   onPressEyelashesSubService = (item, index) => {
//     const { navigate } = this.props.navigation;
//     // navigate(routes.priceList, { service: 'Common' })
//     this.setState({ selectedService: item.title, subservice: item.title }, () => {
//       console.log(this.state.subservice, item.title, this.state.category);
//     });

//     // this.toggleEyelashesModal();
//   };
//   onPressSkincareSubService = (item, index) => {
//     const { navigate } = this.props.navigation;
//     // navigate(routes.priceList, { service: 'Common' })
//     this.setState({ selectedService: item.title, subservice: item.title }, () => {
//       console.log(this.state.subservice, item.title, this.state.category);
//     });

//     // this.toggleSkincareModal();
//   };
//   onPressLaserHairRemovalSubService = (item, index) => {
//     const { navigate } = this.props.navigation;
//     // navigate(routes.priceList, { service: 'Common' })
//     this.setState({ selectedService: 'Common', subservice: item.title }, () => {
//       console.log(this.state.subservice, item.title, this.state.category);
//     });

//     // this.toggleLaserHairRemovalModal();
//   };
//   onPressMassageSubService = (item, index) => {
//     const { navigate } = this.props.navigation;
//     //  navigate(routes.priceList, { service: 'Common' })
//     this.setState({ selectedService: 'Common', subservice: item.title }, () => {
//       console.log(this.state.subservice, item.title, this.state.category);
//     });

//     // this.toggleMassageModal();
//   };

//   renderFeaturedServices = ({ navigate }) => {
//     const { featuredServices } = appData;
//     return (
//       <Wrapper animation="fadeInUpBig">
//         <ComponentWrapper style={{ marginHorizontal: width(2.5) }}>
//           <FlatList
//             data={featuredServices}
//             numColumns={2}
//             renderItem={({ item, index }) => {
//               return (
//                 <Wrapper style={{ flex: 1 / 2 }}>
//                   <FeaturedServiceCard
//                     onPress={() => this.onPressFeaturedService(item, index)}
//                     containerStyle={{
//                       marginHorizontal: width(2.5),
//                       marginVertical: height(1),
//                     }}
//                     image={item.image}
//                     title={item.title}
//                     providers={item.providers}
//                   />
//                 </Wrapper>
//               );
//             }}
//           />
//         </ComponentWrapper>
//       </Wrapper>
//     );
//   };
//   renderOtherServices = ({ data, title, onPress, numColumns }) => {
//     const { otherServices } = this.state;
//     return (
//       <Wrapper flex={1}>
//         {title ? (
//           <ComponentWrapper style={{ marginBottom: sizes.smallMargin }}>
//             <TinyTitle>{title}</TinyTitle>
//           </ComponentWrapper>
//         ) : null}
//         <ComponentWrapper style={{ marginHorizontal: width(2.5) }}>
//           <FlatList
//             data={data}
//             numColumns={numColumns}
//             renderItem={({ item, index }) => {
//               return (
//                 <Wrapper style={{ flex: 1 / numColumns }}>
//                   <ServiceIconCard
//                     onPress={() => onPress(item, index)}
//                     containerStyle={{
//                       marginHorizontal: width(2.5),
//                       marginVertical: height(1),
//                     }}
//                     icon={item.icon}
//                     title={item.title}
//                   //providers={item.providers}
//                   />
//                 </Wrapper>
//               );
//             }}
//           />
//         </ComponentWrapper>
//       </Wrapper>
//     );
//   };
//   onPressNext = () => {
//     const { selectedService, myObj } = this.state;
//     const { navigate } = this.props.navigation;
//     selectedService
//       ? navigate(routes.priceList, {
//         myObj:myObj
//       })
//       : null;
//   };

//   async componentDidMount() {
//     this.props.navigation.addListener('focus', async () => {
//       await getAllOfCollection('services').then(services => {
//         //   this.setState({ brands })
//         console.log(services);
//       });
//     });
//   }

//   render() {
//     const { navigation } = this.props;
//     const { navigate } = navigation;
//     const {
//       //Sub Services Modal
//       isSubServicesModalVisible,
//       subServicesModalTitle,
//       subServicesModalData,

//       selectedService,
//     } = this.state;

//     // data in arrays
//     const { otherServices } = appData;
//     return (
//       <MainWrapper>
//         <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
//           <Spacer height={sizes.baseMargin} />
//           <this.renderFeaturedServices navigate={navigate} />
//           <Spacer height={sizes.baseMargin} />
//           <this.renderOtherServices
//             data={otherServices}
//             //  title={'Other Services'}
//             numColumns={3}
//             onPress={(item, index) => this.onPressOtherService(item, index)}
//           />
//           <Spacer height={sizes.doubleBaseMargin * 2} />
//         </KeyboardAwareScrollView>

//         <AbsoluteWrapper style={[{ bottom: 0, right: 0, left: 0 }]}>
//           <ButtonColored
//             text={selectedService ? 'Next' : 'Skip'}
//             onPress={this.onPressNext}
//           />
//           <Spacer height={sizes.baseMargin} />
//         </AbsoluteWrapper>

//         {/* Sub Services Modal */}
//         <ModalColored
//           isVisible={isSubServicesModalVisible}
//           title={subServicesModalTitle}
//           toggleModal={this.toggleSubservicesModal}
//           content={
//             <this.renderOtherServices
//               data={subServicesModalData}
//               onPress={(item, index) => this.onPressSubService(item, index)}
//               numColumns={2}
//             />
//           }
//         />
//       </MainWrapper>
//     );
//   }
// }

// export default Services;
