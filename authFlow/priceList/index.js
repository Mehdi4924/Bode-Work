import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {
  MainWrapper,
  Wrapper,
  CustomIcon,
  TextInputBordered,
  RegularText,
  ComponentWrapper,
  LineHorizontal,
  Spacer,
  ButtonColored,
  TinyTitle,
  RowWrapperBasic,
  ButtonBorderedSmall,
  RowWrapper,
  ButtonColoredSmall,
  KeyboardAvoidingScrollView,
  ButtonBordered,
  MediumText,
} from '../../../components';
import NumericInput from 'react-native-numeric-input';
import Toast from 'react-native-simple-toast';
import {StyleSheet} from 'react-native';
import {appIcons, appStyles, colors, sizes, fontSize} from '../../../themes';
import {totalSize, width, height} from 'react-native-dimension';
import {routes} from '../../../services';
import {addToArray} from '../../../backend/firebase/utility';
import {getCurrentUserId} from '../../../backend/firebase/auth';
import {CommonActions} from '@react-navigation/native';

class PriceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // myObj: this.props.route.params.myObj,
      nailTypes: [
        'Mountain peak',
        'Almond',
        'Oval',
        'Flare',
        'Square/oval',
        'Edge',
        'Rounded',
        'Stiletto',
        'Ballerina/Coffin',
        'Lipstick',
        'Square',
        'Arrow head',
      ],
      length: ['Small', 'Regular', 'Long', 'Extar Long'],
      hairLength: [
        'Small (Shoulder)',
        'Regular (BraStrap)',
        'Long (Waist)',
        'Longer (Calf)',
      ],
      serviceSize: ['Micro', 'Small', 'Regular', 'Large', 'Jumbo'],
      coloringOrBleach: [
        'Full highlights',
        'Partial highlights',
        'Single process color',
      ],
      makeupArtistOptions: ['Minimal', 'Casual', 'Heavy', 'Cosplay'],
      piercingOptions: ['One', 'Two', 'Three'],
      tattooSizes: [
        'Extra Small (2sq”)',
        'Small (6sq”)',
        'Medium (20sq”)',
        'Large (35sq”)',
        'Extra Large (56sq”)',
        'Half Sleeve (60sq”)',
        'Full Sleeve (160sq”)',
      ],
      tattooCompaxity: ['Words', 'Simple', 'Detailed', 'Life Like'],
      tattooColors: ['Black Ink', 'Colored Ink'],

      BaseCost: 0,

      MountainPeak: '',
      Almond: '',
      Oval: '',

      SelectedserviceSize: '',
      SelectedcoloringOrBleach: '',
      SelectedmakeupArtistOptions: '',
      SelectedpiercingOptions: '',
      SelectedtattooSizes: '',
      SelectedtattooCompaxity: '',
      SelectedtattooColors: '',

      //Newww
      Mountainpeak: '',
      Almond: '',
      Oval: '',
      Flare: '',
      SquareOval: '',
      Edge: '',
      Rounded: '',
      Stiletto: '',
      BallerinaCoffin: '',
      Lipstick: '',
      Square: '',
      ArrowHead: '',
      Small: '',
      Regular: '',
      Long: '',
      ExtarLong: '',
      FullhigHlights: '',
      PartialHighlights: '',
      SingleProcessColor: '',
      Minimal: '',
      Casual: '',
      Heavy: '',
      Cosplay: '',
      One: '',
      Two: '',
      Three: '',
      Micro: '',
      SmallService: '',
      RegularService: '',
      Large: '',
      Jumbo: '',
      SmallShoulder: '',
      RegularBraStrap: '',
      LongWaist: '',
      LongerCalf: '',

      ExtraSmall2sq: '',
      Small6sq: '',
      Medium20sq: '',
      Large35sq: '',
      ExtraLarge56sq: '',
      HalfSleeve60sq: '',
      FullSleeve160sq: '',

      Words: '',
      Simple: '',
      Detailed: '',
      LifeLike: '',
      BlackInk: '',
      ColoredInk: '',

      // Time Cost
      MountainpeakTime: '',
      AlmondTime: '',
      OvalTime: '',
      FlareTime: '',
      SquareOvalTime: '',
      EdgeTime: '',
      RoundedTime: '',
      StilettoTime: '',
      BallerinaCoffinTime: '',
      LipstickTime: '',
      SquareTime: '',
      ArrowHeadTime: '',
      SmallTime: '',
      RegularTime: '',
      LongTime: '',
      ExtarLongTime: '',
      FullhigHlightsTime: '',
      PartialHighlightsTime: '',
      SingleProcessColorTime: '',
      MinimalTime: '',
      CasualTime: '',
      HeavyTime: '',
      CosplayTime: '',
      OneTime: '',
      TwoTime: '',
      ThreeTime: '',
      MicroTime: '',
      SmallServiceTime: '',
      RegularServiceTime: '',
      LargeTime: '',
      JumboTime: '',
      SmallShoulderTime: '',
      RegularBraStrapTime: '',
      LongWaistTime: '',
      LongerCalfTime: '',

      ExtraSmall2sqTime: '',
      Small6sqTime: '',
      Medium20sqTime: '',
      Large35sqTime: '',
      ExtraLarge56sqTime: '',
      HalfSleeve60sqTime: '',
      FullSleeve160sqTime: '',

      WordsTime: '',
      SimpleTime: '',
      DetailedTime: '',
      LifeLikeTime: '',
      BlackInkTime: '',
      ColoredInkTime: '',

      BaseCostTime: 0,

      MountainPeakTime: '',
      AlmondTime: '',
      OvalTime: '',

      SelectedserviceSizeTime: '',
      SelectedcoloringOrBleachTime: '',
      SelectedmakeupArtistOptionsTime: '',
      SelectedpiercingOptionsTime: '',
      SelectedtattooSizesTime: '',
      SelectedtattooCompaxityTime: '',
      SelectedtattooColorsTime: '',
    };
  }
  async componentDidMount() {
    let token = await getCurrentUserId();
    console.log('Token : ', token);
  }

  async handleAddSkills() {
    const {
      BaseCost,
      Mountainpeak,
      Almond,
      Oval,
      Flare,
      SquareOval,
      Edge,
      Rounded,
      Stiletto,
      BallerinaCoffin,
      Lipstick,
      Square,
      ArrowHead,
      Small,
      Regular,
      Long,
      ExtarLong,
      FullhigHlights,
      PartialHighlights,
      SingleProcessColor,
      Minimal,
      Casual,
      Heavy,
      Cosplay,
      One,
      Two,
      Three,
      Micro,
      SmallService,
      RegularService,
      Large,
      Jumbo,
      SmallShoulder,
      RegularBraStrap,
      LongWaist,
      LongerCalf,
      ExtraSmall2sq,
      Small6sq,
      Medium20sq,
      Large35sq,
      ExtraLarge56sq,
      HalfSleeve60sq,
      FullSleeve160sq,
      Words,
      Simple,
      Detailed,
      LifeLike,
      BlackInk,
      ColoredInk,
      //time states
      BaseCostTime,
      MountainpeakTime,
      AlmondTime,
      OvalTime,
      FlareTime,
      SquareOvalTime,
      EdgeTime,
      RoundedTime,
      StilettoTime,
      BallerinaCoffinTime,
      LipstickTime,
      SquareTime,
      ArrowHeadTime,
      SmallTime,
      RegularTime,
      LongTime,
      ExtarLongTime,
      FullhigHlightsTime,
      PartialHighlightsTime,
      SingleProcessColorTime,
      MinimalTime,
      CasualTime,
      HeavyTime,
      CosplayTime,
      OneTime,
      TwoTime,
      ThreeTime,
      MicroTime,
      SmallServiceTime,
      RegularServiceTime,
      LargeTime,
      JumboTime,
      SmallShoulderTime,
      RegularBraStrapTime,
      LongWaistTime,
      LongerCalfTime,
      ExtraSmall2sqTime,
      Small6sqTime,
      Medium20sqTime,
      Large35sqTime,
      ExtraLarge56sqTime,
      HalfSleeve60sqTime,
      FullSleeve160sqTime,
      WordsTime,
      SimpleTime,
      DetailedTime,
      LifeLikeTime,
      BlackInkTime,
      ColoredInkTime,
    } = this.state;
    this.setState({loading: true});
    const {mainService, subService, service} = this.props.route.params;
    if (BaseCost == '') {
      alert('Please add Base cost');
    } else {
      let token = await getCurrentUserId();

      if (service === 'Nails') {
        let SaveObject = {
          Service: mainService,
          SubService: subService,
          Price: [
            {BaseCost, Time: BaseCostTime, Value: Number(BaseCost)},
            {Mountainpeak, Time: MountainpeakTime, Value: Number(Mountainpeak)},
            {Almond, Time: AlmondTime, Value: Number(Almond)},
            {Oval, Time: OvalTime, Value: Number(Oval)},
            {Flare, Time: FlareTime, Value: Number(Flare)},
            {SquareOval, Time: SquareOvalTime, Value: Number(SquareOval)},
            {Edge, Time: BaseCostTime, Value: Number(Edge)},
            {Rounded, Time: EdgeTime, Value: Number(Rounded)},
            {Stiletto, Time: StilettoTime, Value: Number(Stiletto)},
            {
              BallerinaCoffin,
              Time: BallerinaCoffinTime,
              Value: Number(BallerinaCoffin),
            },
            {Lipstick, Time: LipstickTime, Value: Number(Lipstick)},
            {Square, Time: SquareTime, Value: Number(Square)},
            {ArrowHead, Time: ArrowHeadTime, Value: Number(ArrowHead)},
            {Small, Time: SmallTime, Value: Number(Small)},
            {Regular, Time: RegularTime, Value: Number(Regular)},
            {Long, Time: LongTime, Value: Number(Long)},
            {ExtarLong, Time: ExtarLongTime, Value: Number(ExtarLong)},
          ],
          Id: token,
        };
        await addToArray('services', token, 'Details', SaveObject);
        this.setState({loading: false});
      } else if (service === 'Coloring or Bleach') {
        let SaveObject = {
          Service: mainService,
          SubService: subService,
          Price: [
            {BaseCost, Time: BaseCostTime, Value: Number(BaseCost)},
            {
              FullhigHlights,
              Time: FullhigHlightsTime,
              Value: Number(FullhigHlights),
            },
            {
              PartialHighlights,
              Time: PartialHighlightsTime,
              Value: Number(PartialHighlights),
            },
            {
              SingleProcessColor,
              Time: SingleProcessColorTime,
              Value: Number(SingleProcessColor),
            },
          ],
          Id: token,
        };
        await addToArray('services', token, 'Details', SaveObject);
        this.setState({loading: false});
      } else if (service === 'Makeup Artist') {
        let SaveObject = {
          Service: mainService,
          SubService: subService,
          Price: [
            {BaseCost, Time: BaseCostTime, Value: Number(BaseCost)},
            {Minimal, Time: MinimalTime, Value: Number(Minimal)},
            {Casual, Time: CasualTime, Value: Number(Casual)},
            {Heavy, Time: HeavyTime, Value: Number(Heavy)},
            {Cosplay, Time: CosplayTime, Value: Number(Cosplay)},
          ],
          Id: token,
        };
        await addToArray('services', token, 'Details', SaveObject);
        this.setState({loading: false});
      } else if (service === 'Piercing') {
        let SaveObject = {
          Service: mainService,
          SubService: subService,
          Price: [
            {BaseCost, Time: BaseCostTime, Value: Number(BaseCost)},
            {One, Time: OneTime, Value: Number(One)},
            {Two, Time: TwoTime, Value: Number(Two)},
            {Three, Time: ThreeTime, Value: Number(Three)},
          ],
          Id: token,
        };
        await addToArray('services', token, 'Details', SaveObject);
        this.setState({loading: false});
      } else if (
        service === 'Dreaded' ||
        service === 'Permanent dreadlock Extensions' ||
        service === 'Faux Locs Bob' ||
        service === 'Goddess Faux Locs' ||
        service === 'Straight Faux Locs' ||
        service === 'Twist Hair' ||
        service === 'Braiding' ||
        service === 'Crochet Braiding'
      ) {
        let SaveObject = {
          Service: mainService,
          SubService: subService,
          Price: [
            {BaseCost, Time: BaseCostTime, Value: Number(BaseCost)},
            {Micro, Time: MicroTime, Value: Number(Micro)},
            {SmallService, Time: SmallServiceTime, Value: Number(SmallService)},
            {
              RegularService,
              Time: RegularServiceTime,
              Value: Number(RegularService),
            },
            {Large, Time: LargeTime, Value: Number(Large)},
            {Jumbo, Time: JumboTime, Value: Number(Jumbo)},
            {
              SmallShoulder,
              Time: SmallShoulderTime,
              Value: Number(SmallShoulder),
            },
            {
              RegularBraStrap,
              Time: RegularBraStrapTime,
              Value: Number(RegularBraStrap),
            },
            {LongWaist, Time: LongWaistTime, Value: Number(LongWaist)},
            {LongerCalf, Time: LongerCalfTime, Value: Number(LongerCalf)},
          ],
          Id: token,
        };
        await addToArray('services', token, 'Details', SaveObject);
        this.setState({loading: false});
      } else if (
        service === 'Full head sewn-in' ||
        service === 'Hair Extensions' ||
        service === 'Clip-In Hair Extension'
      ) {
        let SaveObject = {
          Service: mainService,
          SubService: subService,
          Price: [
            {BaseCost, Time: BaseCostTime, Value: Number(BaseCost)},
            {
              SmallShoulder,
              Time: SmallServiceTime,
              Value: Number(SmallShoulder),
            },
            {
              RegularBraStrap,
              Time: RegularBraStrapTime,
              Value: Number(RegularBraStrap),
            },
            {LongWaist, Time: LongWaistTime, Value: Number(LongWaist)},
            {LongerCalf, Time: LongerCalfTime, Value: Number(LongerCalf)},
          ],
          Id: token,
        };
        await addToArray('services', token, 'Details', SaveObject);
        this.setState({loading: false});
      } else if (service === 'Tattoo') {
        let SaveObject = {
          Service: mainService,
          SubService: subService,
          Price: [
            {BaseCost, Time: BaseCostTime, Value: Number(BaseCost)},
            {
              ExtraSmall2sq,
              Time: ExtraSmall2sqTime,
              Value: Number(ExtraSmall2sq),
            },
            {Small6sq, Time: Small6sqTime, Value: Number(Small6sq)},
            {Medium20sq, Time: Medium20sqTime, Value: Number(Medium20sq)},
            {Large35sq, Time: Large35sqTime, Value: Number(Large35sq)},
            {
              ExtraLarge56sq,
              Time: ExtraLarge56sqTime,
              Value: Number(ExtraLarge56sq),
            },
            {
              HalfSleeve60sq,
              Time: HalfSleeve60sqTime,
              Value: Number(HalfSleeve60sq),
            },
            {
              FullSleeve160sq,
              Time: FullSleeve160sqTime,
              Value: Number(FullSleeve160sq),
            },
            {Words, Time: WordsTime, Value: Number(Words)},
            {Simple, Time: SimpleTime, Value: Number(Simple)},
            {Detailed, Time: DetailedTime, Value: Number(Detailed)},
            {LifeLike, Time: LifeLikeTime, Value: Number(LifeLike)},
            {BlackInk, Time: BlackInkTime, Value: Number(BlackInk)},
            {ColoredInk, Time: ColoredInkTime, Value: Number(ColoredInk)},
          ],
          Id: token,
        };
        await addToArray('services', token, 'Details', SaveObject);
        this.setState({loading: false});
      } else if (service === 'Common') {
        let SaveObject = {
          Service: mainService,
          SubService: subService,
          Price: [{BaseCost, Time: BaseCostTime, Value: Number(BaseCost)}],
          Id: token,
        };
        await addToArray('services', token, 'Details', SaveObject);
        this.setState({loading: false});
      }
      Toast.show('Your skill has been saved');

      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: routes.providerApp}],
        }),
      );

      // this.props.navigation.navigate(routes.workLicense, {
      //   myObj: this.state.myObj,
      // });

      // Alert.alert('Done', 'Your Skill is uploaded.', [
      //   {
      //     text: 'OK',
      //     onPress: () => this.props.navigation.push(routes.provider.skills),
      //   },
      // ]);
    }
  }

  async saveCost(title, key, text) {
    console.log(title, key, text);

    if (title == 'Nails type cost') {
      switch (key) {
        case 0:
          this.setState({MountainPeak: text});
          break;
        case 1:
          this.setState({Almond: text});
          break;
        case 2:
          this.setState({Oval: text});
          break;
        case 3:
          this.setState({Flare: text});
          break;
        case 4:
          this.setState({SquareOval: text});
          break;
        case 5:
          this.setState({Edge: text});
          break;
        case 6:
          this.setState({Rounded: text});
          break;
        case 7:
          this.setState({Stiletto: text});
          break;
        case 8:
          this.setState({BallerinaCoffin: text});
          break;
        case 9:
          this.setState({Lipstick: text});
          break;
        case 10:
          this.setState({Square: text});
          break;
        case 11:
          this.setState({ArrowHead: text});
          break;
      }
    } else if (title == 'length cost') {
      switch (key) {
        case 0:
          this.setState({Small: text});
          break;
        case 1:
          this.setState({Regular: text});
          break;
        case 2:
          this.setState({Long: text});
          break;
        case 3:
          this.setState({ExtarLong: text});
          break;
      }
    } else if (title == 'Coloring or Bleach type cost?') {
      switch (key) {
        case 0:
          this.setState({FullhigHlights: text});
          break;
        case 1:
          this.setState({PartialHighlights: text});
          break;
        case 2:
          this.setState({SingleProcessColor: text});
          break;
      }
    } else if (title == 'Makeup type cost') {
      switch (key) {
        case 0:
          this.setState({Minimal: text});
          break;
        case 1:
          this.setState({Casual: text});
          break;
        case 2:
          this.setState({Heavy: text});
          break;
        case 3:
          this.setState({Cosplay: text});
          break;
      }
    } else if (title == 'Piercing cost') {
      switch (key) {
        case 0:
          this.setState({One: text});
          break;
        case 1:
          this.setState({Two: text});
          break;
        case 2:
          this.setState({Three: text});
          break;
      }
    } else if (title == 'Size cost') {
      switch (key) {
        case 0:
          this.setState({Micro: text});
          break;
        case 1:
          this.setState({SmallService: text});
          break;
        case 2:
          this.setState({RegularService: text});
          break;
        case 3:
          this.setState({Large: text});
          break;
        case 4:
          this.setState({Jumbo: text});
          break;
      }
    } else if (title == 'Length cost') {
      switch (key) {
        case 0:
          this.setState({SmallShoulder: text});
          break;
        case 1:
          this.setState({RegularBraStrap: text});
          break;
        case 2:
          this.setState({LongWaist: text});
          break;
        case 3:
          this.setState({LongerCalf: text});
          break;
      }
    } else if (title == 'Tattoo size cost') {
      switch (key) {
        case 0:
          this.setState({ExtraSmall2sq: text});
          break;
        case 1:
          this.setState({Small6sq: text});
          break;
        case 2:
          this.setState({Medium20sq: text});
          break;
        case 3:
          this.setState({Large35sq: text});
          break;
        case 4:
          this.setState({ExtraLarge56sq: text});
          break;
        case 5:
          this.setState({HalfSleeve60sq: text});
          break;
        case 6:
          this.setState({FullSleeve160sq: text});
          break;
      }
    } else if (title == 'Tattoo complexity (detail) cost') {
      switch (key) {
        case 0:
          this.setState({Words: text});
          break;
        case 1:
          this.setState({Simple: text});
          break;
        case 2:
          this.setState({Detailed: text});
          break;
        case 3:
          this.setState({LifeLike: text});
          break;
      }
    } else if (title == 'Tattoo color cost') {
      switch (key) {
        case 0:
          this.setState({BlackInk: text});
          break;
        case 1:
          this.setState({ColoredInk: text});
          break;
      }
    }
  }

  async saveTime(title, key, text) {
    console.log(title, key, text);

    if (title == 'Nails type cost') {
      switch (key) {
        case 0:
          this.setState({MountainPeakTime: text});
          break;
        case 1:
          this.setState({AlmondTime: text});
          break;
        case 2:
          this.setState({OvalTime: text});
          break;
        case 3:
          this.setState({FlareTime: text});
          break;
        case 4:
          this.setState({SquareOvalTime: text});
          break;
        case 5:
          this.setState({EdgeTime: text});
          break;
        case 6:
          this.setState({RoundedTime: text});
          break;
        case 7:
          this.setState({StilettoTime: text});
          break;
        case 8:
          this.setState({BallerinaCoffinTime: text});
          break;
        case 9:
          this.setState({LipstickTime: text});
          break;
        case 10:
          this.setState({SquareTime: text});
          break;
        case 11:
          this.setState({ArrowHeadTime: text});
          break;
      }
    } else if (title == 'length cost') {
      switch (key) {
        case 0:
          this.setState({SmallTime: text});
          break;
        case 1:
          this.setState({RegularTime: text});
          break;
        case 2:
          this.setState({LongTime: text});
          break;
        case 3:
          this.setState({ExtarLongTime: text});
          break;
      }
    } else if (title == 'Coloring or Bleach type cost?') {
      switch (key) {
        case 0:
          this.setState({FullhigHlightsTime: text});
          break;
        case 1:
          this.setState({PartialHighlightsTime: text});
          break;
        case 2:
          this.setState({SingleProcessColorTime: text});
          break;
      }
    } else if (title == 'Makeup type cost') {
      switch (key) {
        case 0:
          this.setState({MinimalTime: text});
          break;
        case 1:
          this.setState({CasualTime: text});
          break;
        case 2:
          this.setState({HeavyTime: text});
          break;
        case 3:
          this.setState({CosplayTime: text});
          break;
      }
    } else if (title == 'Piercing cost') {
      switch (key) {
        case 0:
          this.setState({OneTime: text});
          break;
        case 1:
          this.setState({TwoTime: text});
          break;
        case 2:
          this.setState({ThreeTime: text});
          break;
      }
    } else if (title == 'Size cost') {
      switch (key) {
        case 0:
          this.setState({MicroTime: text});
          break;
        case 1:
          this.setState({SmallServiceTime: text});
          break;
        case 2:
          this.setState({RegularServiceTime: text});
          break;
        case 3:
          this.setState({LargeTime: text});
          break;
        case 4:
          this.setState({JumboTime: text});
          break;
      }
    } else if (title == 'Length cost') {
      switch (key) {
        case 0:
          this.setState({SmallShoulderTime: text});
          break;
        case 1:
          this.setState({RegularBraStrapTime: text});
          break;
        case 2:
          this.setState({LongWaistTime: text});
          break;
        case 3:
          this.setState({LongerCalfTime: text});
          break;
      }
    } else if (title == 'Tattoo size cost') {
      switch (key) {
        case 0:
          this.setState({ExtraSmall2sqTime: text});
          break;
        case 1:
          this.setState({Small6sqTime: text});
          break;
        case 2:
          this.setState({Medium20sqTime: text});
          break;
        case 3:
          this.setState({Large35sqTime: text});
          break;
        case 4:
          this.setState({ExtraLarge56sqTime: text});
          break;
        case 5:
          this.setState({HalfSleeve60sqTime: text});
          break;
        case 6:
          this.setState({FullSleeve160sqTime: text});
          break;
      }
    } else if (title == 'Tattoo complexity (detail) cost') {
      switch (key) {
        case 0:
          this.setState({WordsTime: text});
          break;
        case 1:
          this.setState({SimpleTime: text});
          break;
        case 2:
          this.setState({DetailedTime: text});
          break;
        case 3:
          this.setState({LifeLikeTime: text});
          break;
      }
    } else if (title == 'Tattoo color cost') {
      switch (key) {
        case 0:
          this.setState({BlackInkTime: text});
          break;
        case 1:
          this.setState({ColoredInkTime: text});
          break;
      }
    }
  }

  // renderCostInputs = ({data, selectedIndex, onPress, title}) => {
  //   return (
  //     <Wrapper>
  //       <Spacer height={sizes.baseMargin * 2} />
  //       <ComponentWrapper>
  //         <TinyTitle>{title}</TinyTitle>
  //       </ComponentWrapper>
  //       {data.map((item, key) => {
  //         return (
  //           <Wrapper>
  //             <Spacer height={sizes.smallMargin} />
  //             <TextInputBordered
  //               title={item}
  //               iconName="dollar"
  //               iconType="font-awesome"
  //               iconSize={sizes.appIcons.small}
  //               iconColor={colors.appTextColor1}
  //               keyboardType="number-pad"
  //               onChangeText={val => {
  //                 let {myObj} = this.state;
  //                 myObj[item] = val;
  //                 this.setState({myObj});
  //               }}
  //             />
  //           </Wrapper>
  //         );
  //       })}
  //     </Wrapper>
  //   );
  // };

  renderCostInputs = ({data, selectedIndex, onPress, title}) => {
    return (
      <Wrapper>
        <Spacer height={sizes.baseMargin * 2} />
        <ComponentWrapper>
          <TinyTitle>{title + ' Added to Base Cost'}</TinyTitle>
        </ComponentWrapper>
        {data.map((item, key) => {
          return (
            <Wrapper>
              {/* <Spacer height={sizes.smallMargin} />
              <TextInputBordered
                title={item}
                iconName="dollar"
                iconType="font-awesome"
                iconSize={sizes.appIcons.small}
                iconColor={colors.appTextColor1}
                keyboardType="number-pad"
                // onChangeText={text => this.setState({})}
                onChangeText={text => this.saveCost(title, key, text)}
              /> */}
              <RowWrapper>
                <Wrapper>
                  <Spacer height={sizes.smallMargin} />
                  <MediumText style={{color: colors.appColor1}}>
                    {item + ' Cost $'}
                  </MediumText>
                  <Spacer height={sizes.smallMargin} />
                  <NumericInput
                    value={this.state.value}
                    // onChange={value => this.setState({value})}
                    onChange={value => this.saveCost(title, key, value)}
                    onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                    totalWidth={180}
                    totalHeight={40}
                    iconSize={25}
                    step={5}
                    valueType="real"
                    rounded
                    textColor={colors.appTextColor1}
                    iconStyle={{color: 'white'}}
                    rightButtonBackgroundColor={colors.appColor1}
                    leftButtonBackgroundColor={colors.appColor1}
                  />
                </Wrapper>
                <Wrapper>
                  <Spacer height={sizes.smallMargin} />
                  <MediumText style={{color: colors.appColor1}}>
                    {'Time (mins)'}
                  </MediumText>
                  <Spacer height={sizes.smallMargin} />
                  <NumericInput
                    value={this.state.value}
                    // onChange={value => this.setState({value})}
                    onChange={value => this.saveTime(title, key, value)}
                    onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                    totalWidth={180}
                    totalHeight={40}
                    iconSize={25}
                    step={15}
                    valueType="real"
                    rounded
                    textColor={colors.appTextColor1}
                    iconStyle={{color: 'white'}}
                    rightButtonBackgroundColor={colors.appColor1}
                    leftButtonBackgroundColor={colors.appColor1}
                  />
                </Wrapper>
              </RowWrapper>
            </Wrapper>
          );
        })}
      </Wrapper>
    );
  };

  render() {
    const {navigation} = this.props;
    const {navigate} = navigation;
    const {
      nailTypes,
      hairLength,
      serviceSize,
      length,
      coloringOrBleach,
      makeupArtistOptions,
      piercingOptions,
      tattooSizes,
      tattooCompaxity,
      tattooColors,
      loading,
    } = this.state;
    // let {myObj} = this.state;
    // let service = myObj.service;
    // let subservice = myObj.subService;
    // console.log(service);
    const {mainService, subService, service} = this.props.route.params;

    return (
      <MainWrapper>
        <Wrapper flex={1} style={[{}]}>
          <ComponentWrapper>
            <TinyTitle style={[appStyles.textGray]}>
              {mainService} {'>'} {subService}
            </TinyTitle>
          </ComponentWrapper>
          <Spacer height={sizes.smallMargin} />
          <KeyboardAvoidingScrollView>
            <Wrapper flex={1}>
              <Spacer height={sizes.baseMargin} />
              <ComponentWrapper>
                <TinyTitle>Base cost</TinyTitle>
              </ComponentWrapper>
              <Spacer height={sizes.smallMargin} />
              {/* Normal / Common Service const */}
              {service === 'Common' ? (
                // <TextInputBordered
                //   title="Base cost"
                //   iconName="dollar"
                //   iconType="font-awesome"
                //   iconSize={sizes.appIcons.small}
                //   iconColor={colors.appTextColor1}
                //   keyboardType="number-pad"
                //   onChangeText={val => {
                //     let {myObj} = this.state;
                //     myObj.baseCost = val;
                //     this.setState({myObj});
                //   }}
                // />
                <RowWrapper>
                  <Wrapper>
                    <Spacer height={sizes.smallMargin} />
                    <MediumText style={{color: colors.appColor1}}>
                      {'Base Cost $'}
                    </MediumText>
                    <Spacer height={sizes.smallMargin} />
                    <NumericInput
                      value={this.state.value}
                      // onChange={value => this.setState({value})}
                      onChange={value => this.setState({BaseCost: value})}
                      onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                      totalWidth={180}
                      totalHeight={40}
                      iconSize={25}
                      step={5}
                      valueType="real"
                      rounded
                      textColor={colors.appTextColor1}
                      iconStyle={{color: 'white'}}
                      rightButtonBackgroundColor={colors.appColor1}
                      leftButtonBackgroundColor={colors.appColor1}
                    />
                  </Wrapper>
                  <Wrapper>
                    <Spacer height={sizes.smallMargin} />
                    <MediumText style={{color: colors.appColor1}}>
                      {'Time (mins)'}
                    </MediumText>
                    <Spacer height={sizes.smallMargin} />
                    <NumericInput
                      value={this.state.value}
                      // onChange={value => this.setState({value})}
                      onChange={value => this.setState({BaseCostTime: value})}
                      onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                      totalWidth={180}
                      totalHeight={40}
                      iconSize={25}
                      step={15}
                      valueType="real"
                      rounded
                      textColor={colors.appTextColor1}
                      iconStyle={{color: 'white'}}
                      rightButtonBackgroundColor={colors.appColor1}
                      leftButtonBackgroundColor={colors.appColor1}
                    />
                  </Wrapper>
                </RowWrapper>
              ) : (
                // <TextInputBordered
                //   title="Base cost"
                //   iconName="dollar"
                //   iconType="font-awesome"
                //   iconSize={sizes.appIcons.small}
                //   iconColor={colors.appTextColor1}
                //   keyboardType="number-pad"
                //   onChangeText={val => {
                //     let {myObj} = this.state;
                //     myObj.baseCost = val;
                //     this.setState({myObj});
                //   }}
                // />
                <RowWrapper>
                  <Wrapper>
                    <Spacer height={sizes.smallMargin} />
                    <MediumText style={{color: colors.appColor1}}>
                      {'Base Cost $'}
                    </MediumText>
                    <Spacer height={sizes.smallMargin} />
                    <NumericInput
                      value={this.state.value}
                      // onChange={value => this.setState({value})}
                      onChange={value => this.setState({BaseCost: value})}
                      onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                      totalWidth={180}
                      totalHeight={40}
                      iconSize={25}
                      step={5}
                      valueType="real"
                      rounded
                      textColor={colors.appTextColor1}
                      iconStyle={{color: 'white'}}
                      rightButtonBackgroundColor={colors.appColor1}
                      leftButtonBackgroundColor={colors.appColor1}
                    />
                  </Wrapper>
                  <Wrapper>
                    <Spacer height={sizes.smallMargin} />
                    <MediumText style={{color: colors.appColor1}}>
                      {'Time (mins)'}
                    </MediumText>
                    <Spacer height={sizes.smallMargin} />
                    <NumericInput
                      value={this.state.value}
                      // onChange={value => this.setState({value})}
                      onChange={value => this.setState({BaseCostTime: value})}
                      onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                      totalWidth={180}
                      totalHeight={40}
                      iconSize={25}
                      step={15}
                      valueType="real"
                      rounded
                      textColor={colors.appTextColor1}
                      iconStyle={{color: 'white'}}
                      rightButtonBackgroundColor={colors.appColor1}
                      leftButtonBackgroundColor={colors.appColor1}
                    />
                  </Wrapper>
                </RowWrapper>
              )}

              {/* Type of your Nails */}
              {service === 'Nails' ? (
                <this.renderCostInputs
                  data={nailTypes}
                  title="Nails type cost"
                />
              ) : null}
              {/* Length */}
              {service === 'Nails' ? (
                <this.renderCostInputs data={length} title="length cost" />
              ) : null}

              {/* Coloring or Bleach */}
              {service === 'Coloring or Bleach' ? (
                <this.renderCostInputs
                  data={coloringOrBleach}
                  title="Coloring or Bleach type cost?"
                />
              ) : null}
              {/* Makeup Artist Options */}
              {service === 'Makeup Artist' ? (
                <this.renderCostInputs
                  data={makeupArtistOptions}
                  title="Makeup type cost"
                />
              ) : null}
              {/* Piercing Options */}
              {service === 'Piercing' ? (
                <this.renderCostInputs
                  data={piercingOptions}
                  title="Piercing cost"
                />
              ) : null}

              {/* Size of your service */}
              {service === 'Dreaded' ||
              service === 'Permanent dreadlock Extensions' ||
              service === 'Faux Locs Bob' ||
              service === 'Goddess Faux Locs' ||
              service === 'Straight Faux Locs' ||
              service === 'Twist Hair' ||
              service === 'Braiding' ||
              service === 'Crochet Braiding' ? (
                <this.renderCostInputs data={serviceSize} title="Size cost" />
              ) : null}

              {/* Length of your Hair */}
              {service === 'Dreaded' ||
              service === 'Permanent dreadlock Extensions' ||
              service === 'Faux Locs Bob' ||
              service === 'Goddess Faux Locs' ||
              service === 'Straight Faux Locs' ||
              service === 'Twist Hair' ||
              service === 'Braiding' ||
              service === 'Crochet Braiding' ||
              service === 'Full head sewn-in' ||
              service === 'Hair Extensions' ||
              service === 'Clip-In Hair Extension' ? (
                <this.renderCostInputs data={hairLength} title="Length cost" />
              ) : null}

              {service === 'Tattoo' ? (
                <Wrapper>
                  <this.renderCostInputs
                    title="Tattoo size cost"
                    data={tattooSizes}
                  />
                  <this.renderCostInputs
                    title="Tattoo complexity (detail) cost"
                    data={tattooCompaxity}
                  />
                  <this.renderCostInputs
                    title="Tattoo color cost"
                    data={tattooColors}
                  />
                </Wrapper>
              ) : null}
            </Wrapper>
            <Spacer height={sizes.doubleBaseMargin} />
            {loading ? (
              <Wrapper>
                <ActivityIndicator size={'large'} />
              </Wrapper>
            ) : (
              <ButtonColored
                text="Next"
                onPress={
                  () =>
                    // console.log(this.state.myObj)
                    this.handleAddSkills()
                  // navigate(routes.workLicense, {
                  //   myObj: this.state.myObj,
                  // })
                }
              />
            )}
            <Spacer height={sizes.doubleBaseMargin} />
          </KeyboardAvoidingScrollView>
        </Wrapper>
      </MainWrapper>
    );
  }
}

export default PriceList;

const styles = StyleSheet.create({});
