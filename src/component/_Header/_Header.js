import React, { Component } from 'react';
import { color } from '@values/colors';
import { View, Image, Platform, Text } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Header, Left, Body, Right, Button, Title } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { Theme } from '@values/Theme';
import { strings } from '@values/strings'


class _Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      showBack,
      showLogo,
      onSearchPress,
      onNotificationPress,
      onCallingPress,
      title,
      showSearch,
      showCalling,
      showNotification,
      headerColor
    } = this.props;

    return (
      <Header
        style={{
          width: wp(100),
          height: hp(7.5),
          paddingVertical: Platform.OS === 'ios' ? 5 : 2,
          marginLeft: -5,
          backgroundColor: headerColor ? '#' + headerColor : '#fff',
          alignItems: 'center'
        }}>
        <View>
          <Button transparent>
            {showBack ? (
              <Image
                style={{ height: hp(2.5), width: hp(2.5) }}
                source={require('../../assets/image/Account/back_button.png')}
              />
            ) : (
                <View style={{ flexDirection: 'row', }}>
                  {/* <Image
                    source={require('../../assets/swarna-Home-Icon.png')}
                    style={{ height: hp(5.5), top: Platform.OS == 'ios' ? -3 : 5 }}
                    resizeMode={'contain'}
                  /> */}
                  <View
                    style={{
                      width: wp(12.5),
                      //backgroundColor: 'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../../assets/MJ-Home-Icon.png')}
                      style={{
                        height: hp(5.5),
                        top: Platform.OS == 'ios' ? -3 : 0,
                        marginRight: 8,
                      }}
                      resizeMode={'contain'}
                    />
                  </View>
                  <View style={{ marginLeft: 5, marginTop: Platform.OS == 'ios' ? 0 : 2 }}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Bold',
                        color: '#fff',
                        fontSize: hp(2.5),
                        letterSpacing: 0.2,
                      }}>
                      {strings.appName}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Lato-Bold',
                        color: '#fff',
                        fontSize: hp(1.6),
                        letterSpacing: 1,
                      }}>
                      {strings.appSubName}
                    </Text>
                  </View>

                </View>

              )}
          </Button>
        </View>

        {/* right side operation */}

        <Right>
          {showSearch ? (
            <Button transparent onPress={onSearchPress}>
              <Image
                style={{ height: hp(3.2), width: hp(3.2) }}
                source={require('../../assets/image/BlueIcons/Search-White.png')}
              />
            </Button>
          ) : null}

          {showCalling ? (
            <Button transparent onPress={onCallingPress}>
              <Image
                style={{ height: hp(3.5), width: hp(3.5) }}
                source={require('../../assets/image/BlueIcons/Mobile.png')}
              />
            </Button>
          ) : null}

          {showNotification ? (
            <Button transparent onPress={onNotificationPress}>
              <Image
                resizeMode={'cover'}
                style={{ height: hp(3.6), width: hp(3.6), marginRight: wp(0) }}
                source={require('../../assets/image/BlueIcons/Notification-White.png')}
              />
            </Button>
          ) : null}
        </Right>
      </Header>
    );
  }
}

export default _Header;
