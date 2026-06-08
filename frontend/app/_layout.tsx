import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Text } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const textDefaultProps = (Text as any).defaultProps || {};
  const defaultTextStyle = textDefaultProps.style;

  // Keep system default fonts. Do not force a custom font here.
  (Text as any).defaultProps = {
    ...textDefaultProps,
    style: Array.isArray(defaultTextStyle) ? defaultTextStyle : defaultTextStyle ? [defaultTextStyle] : [],
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="fill_profile" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
