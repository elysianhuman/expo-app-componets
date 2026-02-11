import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function RandomPage() {
  const { width } = Dimensions.get('window');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleWebViewMessage = useCallback((event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'DATE_CHANGED') {
        const newDate = data.date;
        setSelectedDate(newDate);
        console.log('📅 Date selected:', newDate);
        console.log('📅 Formatted date:', new Date(newDate).toDateString());
      }
    } catch (error) {
      console.log('WebView message error:', error);
    }
  }, []);

  const injectedJavaScript = `
    (function() {
      const datePicker = document.getElementById('datePicker');
      datePicker.value = '${selectedDate}';
      
      datePicker.addEventListener('change', function(e) {
        const dateValue = e.target.value;
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'DATE_CHANGED',
          date: dateValue
        }));
      });
      
      // Set initial date
      datePicker.dispatchEvent(new Event('change'));
    })();
    true;
  `;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>RandomPage with WebView</Text>
          <Text style={styles.dateDisplay}>
            Selected Date: {new Date(selectedDate).toDateString()}
          </Text>
        </View>

        <View style={styles.webviewContainer}>
          <WebView
            style={[styles.webview, { width }]}
            source={{
              html: `
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                      body { 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        margin: 20px;
                        padding: 20px;
                        background: #f5f5f5;
                      }
                      h1 { 
                        color: #333;
                        font-size: 24px;
                        margin-bottom: 30px;
                      }
                      input[type="date"] {
                        padding: 12px 16px;
                        font-size: 16px;
                        border: 2px solid #ddd;
                        border-radius: 8px;
                        background: white;
                        width: 100%;
                        max-width: 300px;
                        box-sizing: border-box;
                      }
                      input:focus {
                        border-color: #007AFF;
                        outline: none;
                        box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
                      }
                    </style>
                  </head>
                  <body>
                    <h1>Hello WebView! 🎉</h1>
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #555;">
                      Pick a date:
                    </label>
                    <input type="date" id="datePicker" />
                  </body>
                </html>
              `
            }}
            originWhitelist={['*']}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator
                size="large"
                color="#007AFF"
                style={styles.loadingIndicator}
              />
            )}
            injectedJavaScript={injectedJavaScript}
            onMessage={handleWebViewMessage}
            scalesPageToFit={true}
            scrollEnabled={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  dateDisplay: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
