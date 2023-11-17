import 'react-native-gesture-handler';
import * as React from 'react';
import Scene from '@navigation/Scene';
import {Root} from 'native-base';
import {View, Platform} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from '@redux/store';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {fcmService} from './DS/FCMService';

const store = configureStore();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    console.disableYellowBox = true;
    SplashScreen.hide();

    fcmService.registerAppWithFCM();
    fcmService.register(
      this.onRegister,
      this.onNotification,
      this.onOpenNotification,
    );
  };

  onRegister = token => {
    AsyncStorage.setItem('fcmToken', token);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Root>
          <Provider store={store}>
            <Scene />
          </Provider>
        </Root>
      </View>
    );
  }
}

export default App;
