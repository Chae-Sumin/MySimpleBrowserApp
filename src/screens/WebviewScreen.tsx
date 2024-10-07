import React from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';
import Navigation from '../components/Navigation';
import Colors from '../constants/colors';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';
import urlParser from '../utils/urlParser';

function WebviewScreen(): React.JSX.Element {
  const [url, setUrl] = React.useState('https://www.google.com');
  const [searchUrl, setSearchUrl] = React.useState(url);
  const inputRef = React.useRef<TextInput>(null);
  const webview = React.useRef<WebView>(null);
  const [webviewNaviState, setWebviewNaviState] = React.useState<WebViewNavigation | null>(null);

  const onSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const nativeEvent = e.nativeEvent;
    const parsedUrl = urlParser(nativeEvent.text);
    if (parsedUrl) {
      setSearchUrl(parsedUrl.href);
    } else {
      Alert.alert('Invalid URL', 'Please enter a valid URL');
      if (inputRef.current) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    }
  }
  const onShouldStartLoadWithRequest = (request: ShouldStartLoadRequest) => {
    if (Platform.OS === 'android' || request.isTopFrame) {
      setUrl(request.url);
    }
    return true;
  }

  const onNavigationStateChange: (event: WebViewNavigation) => void = setWebviewNaviState;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.inputBox}>
        <TextInput value={url} onChangeText={setUrl} onSubmitEditing={onSubmit} ref={inputRef}></TextInput>
      </View>
      <View style={{flex: 1}}>
        <WebView
          ref={webview}
          source={{ uri: searchUrl }}
          originWhitelist={['*']}
          style={styles.webview}
          onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
          onNavigationStateChange={onNavigationStateChange}
        />
      </View>
      <Navigation webview={webview.current} webviewNaviState={webviewNaviState}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
  },
  webview: {
    width: '100%',
    flex: 1,
    backgroundColor: Colors.white,
  }
});

export default WebviewScreen;
