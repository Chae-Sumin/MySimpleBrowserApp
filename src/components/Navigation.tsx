import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from './Icon';
import Colors from '../constants/colors';
import { WebView, WebViewNavigation } from 'react-native-webview';

type NavigationProps = {
  webview: WebView<{}> | null;
  webviewNaviState: WebViewNavigation | null;
};

function Navigation({webview, webviewNaviState}: NavigationProps): React.JSX.Element {
  const [canGoBack, setCanGoBack] = React.useState(false);
  const [canGoForward, setCanGoForward] = React.useState(false);

  const goHome = () => {
    if (webview) {
      webview.injectJavaScript('window.location.href = "https://www.google.com";');
    }
  }

  React.useEffect(() => {if (webviewNaviState) {
      setCanGoBack(webviewNaviState.canGoBack);
      setCanGoForward(webviewNaviState.canGoForward);
    }
  }, [webviewNaviState]);

  return (
    <View style={styles.container}>
      <Pressable style={({pressed}) => [{backgroundColor: pressed ? '#0001' : 'transparent'}, styles.button]} onPress={webview?.goBack}>
        <Icon name={canGoBack ? 'PrevOn' : 'PrevOff'} />
      </Pressable>
      <Pressable style={({pressed}) => [{backgroundColor: pressed ? '#0001' : 'transparent'}, styles.button]} onPress={webview?.goForward}>
        <Icon name={canGoForward ? 'NextOn' : 'NextOff'} />
      </Pressable>
      <Pressable style={({pressed}) => [{backgroundColor: pressed ? '#0001' : 'transparent'}, styles.button]} onPress={goHome}>
        <Icon name="Home" />
      </Pressable>
      <Pressable style={({pressed}) => [{backgroundColor: pressed ? '#0001' : 'transparent'}, styles.button]} onPress={() => Alert.alert('준비중입니다.')} onLongPress={() => Alert.alert('준비중입니다!')}>
        <Icon name="Tabs" />
      </Pressable>
      <Pressable style={({pressed}) => [{backgroundColor: pressed ? '#0001' : 'transparent'}, styles.button]} onPress={() => Alert.alert('준비중입니다.')} onLongPress={() => Alert.alert('준비중입니다!')}>
        <Icon name="More" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: Colors.lightGray,
    borderTopWidth: 1,
    backgroundColor: Colors.white,
  },
  button: {
    paddingHorizontal: 21,
    paddingVertical: 4,
  },
});

export default Navigation;
