import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator, Alert} from 'react-native';
import {
  MainWrapper,
  ButtonWithTextArrow,
  Spacer,
  CreditCard,
  Wrapper,
  MediumTitle,
  ButtonColored,
  TextInputBordered,
  RowWrapperBasic,
} from '../../../components';
import {sizes} from '../../../themes';
import {routes} from '../../../services';
import {height, totalSize, width} from 'react-native-dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getData, saveData} from '../../../backend/firebase/utility';
import Toast from 'react-native-simple-toast';
import GlobalConst from '../../../services/navigation/providerAppNavigation/GlobalConst';
import Stripe from 'react-native-stripe-api';
import moment from 'moment';

class PayNow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      index: null,
      Tip: 0,
      myCards: [
        // {
        //     name: 'Jackob Black',
        //     number: '4561 5672 5685 9915',
        //     type: 'master'
        // },
        // {
        //     name: 'Jackob Black',
        //     number: '4561 5672 5685 1253',
        //     type: 'visa'
        // }
      ],
    };
  }

  async componentDidMount() {
    await AsyncStorage.getItem('Token').then(async token => {
      if (token) {
        let UserData = await getData('Users', token);
        if (UserData.CardList !== undefined) {
          this.setState({
            myCards: UserData.CardList,
            isLoading: false,
            UserData: UserData,
          });
        }
        console.log(UserData.CardList);
      }
    });
    this.setState({
      isLoading: false,
    });

    console.log(GlobalConst.paymentObject);
  }

  async handleOpenURL(event) {
    console.log(event.url);
    if (event.url == 'myapp://') {
      console.log('Done');
    }

    await AsyncStorage.getItem('User').then(async value => {
      console.log(value);
      let UserData = JSON.parse(value);
      var today = moment();

      // // var endDate = moment();
      if (this.state.selectedPlan === 1) {
        UserData.subscribeType = 'Month';
        // var endDate = moment(today).add(30, 'days');
        UserData.subscribe = true;
        UserData.PaidAmount = '2';
        // UserData.subscribeEndDate = endDate;
        await AsyncStorage.setItem('User', JSON.stringify(UserData));
        await saveData('Users', UserData.Id, UserData);
      } else {
        UserData.subscribeType = 'Year';
        // var endDate = moment(today).add(1, 'year');
        UserData.subscribe = true;
        UserData.PaidAmount = '20';
        // UserData.subscribeEndDate = endDate;
        await AsyncStorage.setItem('User', JSON.stringify(UserData));
        await saveData('Users', UserData.Id, UserData);
      }

      let msg = 'Amount Paid';
      Alert.alert(
        'Success',
        msg,
        [
          {
            text: 'OK',
            onPress: () => {
              this.props.navigation.navigate('PaymentDone');
            },
          },
        ],
        {cancelable: false},
      );
    });
  }

  //This is my test publishable key.
  //pk_test_51I6dweKHiGnIIR4Ts0a3A4yLb4USv9SmhRnPH5cofIgBZRpkGdbut5IgO6h4eZOD4LVGUbR6We0HIYouqEpIotv600ZIvjPXqV

  //Secret key
  //sk_test_51I6dweKHiGnIIR4TCtNbyjwzvGAfcXdb7A8loSnBeqFF5CHe7IdcSqBUMrA46jcVSuIQD9ZYTS199lbodw33GIq200q5PgnHGZ

  async PrceedNextCard() {
    this.setState({loader: true});
    // const apiKey = 'pk_test_jxYXrX34BJY3AMBe2y9Rq54c00kAxVmJRr';
    const apiKey =
      'pk_test_51I6dweKHiGnIIR4Ts0a3A4yLb4USv9SmhRnPH5cofIgBZRpkGdbut5IgO6h4eZOD4LVGUbR6We0HIYouqEpIotv600ZIvjPXqV';
    const client = new Stripe(apiKey);
    let cardObject = this.state.myCards[this.state.index];
    const token = await client
      .createToken({
        number: cardObject.card_number,
        exp_month: cardObject.card_exp_month,
        exp_year: cardObject.card_exp_year,
        cvc: cardObject.card_cvc,
        // address_zip: obj.postalCode,
        address_zip: '12345',
      })
      .then(i => {
        if (i.error) {
          alert(i.error.message);
        } else {
          // console.log(i)
          console.log('Call Charge');
          this.charge(i);
        }
      })
      .catch(err => {
        alert(err.error.message);
      });
  }
  async onCollectCard(id) {
    let nextPart = 'charges/' + id + '/capture';
    let data = await fetch('https://api.stripe.com/v1/' + nextPart, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer sk_test_51I6dweKHiGnIIR4TCtNbyjwzvGAfcXdb7A8loSnBeqFF5CHe7IdcSqBUMrA46jcVSuIQD9ZYTS199lbodw33GIq200q5PgnHGZ`,
        // Authorization: `Bearer sk_test_tdrmbdINYjC5jQd2qPEUl2mH00Y5zHImYf`,
        // Authorization: `Bearer sk_test_jbVThMJnytG859dT7o8AvBc500oeMZcOo0`
      },
      // Use a proper HTTP method
      method: 'post',
      // Format the credit card data to a string of key-value pairs
      // divided by &
    });

    let comments = data
      .json()
      .then(async response => {
        console.log('Capture ', response);
        // alert('amount collected');

        await getData(
          'Payment',
          GlobalConst.paymentObject.UserId,
          'Details',
        ).then(async data => {
          if (data) {
            //   let newData =
            data[0].Paymentstatus = 'paid';
            let ProviderId = data[0].ProviderId;
            let ProviderData= await getData("Provider",ProviderId);
            let Tip = this.state.Tip;
            if(ProviderData.Tip!==undefined){
              Tip=ProviderData.Tip+Tip;
            }
            await saveData("Provider",ProviderId,{Tip:Tip});
            await saveData('Payment', GlobalConst.paymentObject.UserId, {
              Details: data,
            }).then(async () => {
              Toast.show(
                'Your payment has been processed successfully',
                Toast.LONG,
              );
              this.props.navigation.navigate(routes.provider.postReview, {
                item: GlobalConst.paymentObject,
              });
            });
          }
        });

        // await AsyncStorage.getItem('User').then(async value => {
        //   console.log(value);
        //   let UserData = JSON.parse(value);
        //   var today = moment();

        //   // // var endDate = moment();
        //   if (this.state.selectedPlan === 1) {
        //     UserData.subscribeType = 'Month';
        //     // var endDate = moment(today).add(30, 'days');
        //     UserData.subscribe = true;
        //     UserData.PaidAmount = '2';
        //     // UserData.subscribeEndDate = endDate;
        //     await AsyncStorage.setItem('User', JSON.stringify(UserData));
        //     await saveData('Users', UserData.Id, UserData);
        //   } else {
        //     UserData.subscribeType = 'Year';
        //     // var endDate = moment(today).add(1, 'year');
        //     UserData.subscribe = true;
        //     UserData.PaidAmount = '20';
        //     // UserData.subscribeEndDate = endDate;
        //     await AsyncStorage.setItem('User', JSON.stringify(UserData));
        //     await saveData('Users', UserData.Id, UserData);
        //   }

        //   let msg = 'Amount Paid';
        //   Alert.alert(
        //     'Success',
        //     msg,
        //     [
        //       {
        //         text: 'OK',
        //         onPress: () => {
        //           this.props.navigation.navigate('PaymentDone');
        //         },
        //       },
        //     ],
        //     {cancelable: false},
        //   );
        // });
      })
      .catch(err => {
        // console.log("Capture error ",err)
        // alert(err.error.message)
      });
  }
  async charge(i) {
    let TotalPrise =
      Number(GlobalConst.paymentObject.Price + this.state.Tip) * 100;
    const body = {};
    (body['amount'] = TotalPrise),
      (body['currency'] = 'usd'),
      (body['source'] = i.id);
    body['capture'] = false;

    let data = await fetch('https://api.stripe.com/v1/' + 'charges', {
      headers: {
        // Use the correct MIME type for your server
        Accept: 'application/json',
        // Use the correct Content Type to send data in request body
        'Content-Type': 'application/x-www-form-urlencoded',
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer sk_test_tdrmbdINYjC5jQd2qPEUl2mH00Y5zHImYf`,
        // Authorization: `Bearer sk_test_jbVThMJnytG859dT7o8AvBc500oeMZcOo0`
      },
      // Use a proper HTTP method
      method: 'post',
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(body)
        .map(key => key + '=' + body[key])
        .join('&'),
    });

    let commits = await data
      .json()
      .then(response => {
        console.log(response);
        try {
          console.log('Call Collect');
          this.onCollectCard(response.id);
          // this.setState({ loader: false });
          // console.log("Normal Booking", Booking);
          // let msg = 'Your request has been sent! Please wait while the technician confirms your appointment. You will be notified via app and e-mail. Your card is not charged until the technician confirms your appointment.';
          // Alert.alert('Success', msg, [{ text: 'OK', onPress: () => { this.props.navigation.navigate('clientTab'); } }], { cancelable: false });
        } catch (e) {
          console.log(e);
          Alert.alert('Failure', 'Failed to checkout. Please try again.', [
            {
              text: 'OK',
              onPress: () => {
                this.setState({loader: false});
              },
            },
          ]);
        } finally {
          // this.loader.hide();
          this.setState({loader: false});
        }
      })
      .catch(err => {
        alert(err.error.message);
        this.setState({loader: false});
      });
  }

  renderCards = ({navigate}) => {
    const {myCards} = this.state;
    return (
      <Wrapper animation="fadeInRightBig">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={myCards}
          renderItem={({item, index}) => {
            return (
              <CreditCard
                containerStyle={{marginVertical: sizes.marginVertical}}
                cardNumber={this.formateCardNumber(item.card_number)}
                cardType={item.type}
                name={item.card_name}
                onPress={() => {
                  Alert.alert(
                    'Card Select',
                    'Are you sure you select this card?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'Select',
                        onPress: async () => {
                          this.setState({index});
                          //   let Obj = this.state.UserData;
                          //   let OldList = Obj.CardList;
                          //   OldList.splice(index, 1);
                          //   Obj.CardList = OldList;
                          //   await saveData('Users', Obj.Id, Obj);
                          //   this.setState({myCards: OldList});
                          //   Toast.show('Card selected Successfully', Toast.SHORT);
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                }}
              />
            );
          }}
        />
      </Wrapper>
    );
  };
  formateCardNumber = number => {
    let str = number.replace(/\d{4}(?= \d{4})/g, '****');
    return str;
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <MainWrapper>
        {this.state.isLoading ? (
          <View
            style={{
              marginVertical: '40%',
              alignItems: 'center',
              width: '100%',
            }}>
            <ActivityIndicator color={'black'} size={'large'} />
          </View>
        ) : (
          <>
            {GlobalConst.paymentObject.isClientCompleteJob ? (
              <>
                <Spacer height={sizes.doubleBaseMargin} />
                <this.renderCards />
                <Spacer height={sizes.baseMargin} />
                <MediumTitle style={{alignSelf: 'center', textAlign: 'center'}}>
                  {
                    'Your service has been completed by provider. Please pay the bill now.'
                  }
                </MediumTitle>
                <Spacer height={sizes.doubleBaseMargin} />
                <MediumTitle style={{alignSelf: 'center'}}>
                  {`Provider Name : ${GlobalConst.paymentObject.ProviderName}`}
                </MediumTitle>
                <Spacer height={sizes.baseMargin} />
                <MediumTitle style={{alignSelf: 'center'}}>
                  {`Service Name : ${GlobalConst.paymentObject.Service}`}
                </MediumTitle>
                <Spacer height={sizes.baseMargin} />
                <MediumTitle style={{alignSelf: 'center'}}>
                  {`Total Bill : ${GlobalConst.paymentObject.Price} $`}
                </MediumTitle>
                <Spacer height={sizes.baseMargin} />

                <TextInputBordered
                  title="Tip (Optional)"
                  placeholder="0"
                  keyboardType={'numeric'}
                  // secureTextEntry
                  animation="fadeInRight"
                  onChangeText={val => {
                    this.setState({Tip: val});
                  }}
                  value={this.state.Tip}
                />
                <Spacer height={sizes.doubleBaseMargin} />
                <ButtonColored
                  text="Pay Now"
                  onPress={() => {
                    this.state.index == null
                      ? alert('Please select card first')
                      : this.PrceedNextCard();
                  }}
                />
                <Spacer height={sizes.doubleBaseMargin} />
              </>
            ) : (
              <>
                {/* <Spacer height={sizes.doubleBaseMargin} />
                <this.renderCards />
                <Spacer height={sizes.baseMargin} /> */}

                <Spacer height={sizes.doubleBaseMargin} />
                <MediumTitle style={{alignSelf: 'center'}}>
                  {`Provider Name : ${GlobalConst.paymentObject.ProviderName}`}
                </MediumTitle>
                <Spacer height={sizes.baseMargin} />
                <MediumTitle style={{alignSelf: 'center'}}>
                  {`Service Name : ${GlobalConst.paymentObject.Service}`}
                </MediumTitle>
                <Spacer height={sizes.baseMargin} />
                <MediumTitle style={{alignSelf: 'center'}}>
                  {`Total Bill : ${GlobalConst.paymentObject.Price} $`}
                </MediumTitle>
                <Spacer height={sizes.baseMargin} />
                <MediumTitle
                  style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                    fontSize: totalSize(2),
                  }}>
                  {
                    'Your service has been completed by provider. Was the job completed to their liking?'
                  }
                </MediumTitle>
                <Spacer height={sizes.baseMargin} />
                <TextInputBordered
                  title="Comment (Optional)"
                  placeholder=""
                  // keyboardType={'numeric'}
                  // secureTextEntry
                  animation="fadeInRight"
                  onChangeText={val => {
                    this.setState({JobCompleteComment: val});
                  }}
                  value={this.state.JobCompleteComment}
                />
                <Spacer height={sizes.doubleBaseMargin} />
                {/* <RowWrapperBasic> */}
                <View style={{flexDirection: 'row'}}>
                  <ButtonColored
                    text="Yes"
                    buttonStyle={{
                      marginHorizontal: width(5),
                      alignItems: 'center',
                      flex: 1,
                    }}
                    onPress={async() => {
                      await getData(
                        'Payment',
                        GlobalConst.paymentObject.UserId,
                        'Details',
                      ).then(async data => {
                        if (data) {
                          //   let newData =
                          data[0].isClientCompleteJob = true;
                          await saveData('Payment', GlobalConst.paymentObject.UserId, {
                            Details: data,
                          }).then(async () => {
                            GlobalConst.paymentObject.isClientCompleteJob = true;
                      this.forceUpdate();
                            Toast.show(
                              'Thanks',
                              Toast.LONG,
                            );
                            // this.props.navigation.navigate(routes.provider.postReview, {
                            //   item: GlobalConst.paymentObject,
                            // });
                          });

                        }
                      
                      // this.state.index == null
                      //   ? alert('Please select card first')
                      //   : this.PrceedNextCard();
                    })}}
                  />
                  <ButtonColored
                    text="No"
                    buttonStyle={{
                      marginHorizontal: width(5),
                      alignItems: 'center',
                      flex: 1,
                    }}
                    onPress={() => {
                      this.props.navigation.goBack();
                      // this.state.index == null
                      //   ? alert('Please select card first')
                      //   : this.PrceedNextCard();
                    }}
                  />
                </View>
                {/* </RowWrapperBasic> */}
                <Spacer height={sizes.doubleBaseMargin} />
              </>
            )}
          </>
        )}
      </MainWrapper>
    );
  }
}

export default PayNow;
