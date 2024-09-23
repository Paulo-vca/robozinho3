// import { useEffect } from "react";
// import { ActivityIndicator } from "react-native";
// import { router, Slot } from "expo-router";
// import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
// import { tokenCache } from "@/src/storage/tokenCache";

// const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

// function InitialLayout() {
//   const { isSignedIn, isLoaded } = useAuth();

//   useEffect(() => {
//     if (!isLoaded) return;

//     if (isSignedIn) {
//       // Redirecionar para a pasta "tabs" após o login
//       router.replace("/(auth)");
//     } else {
//       router.replace("/(public)/login");
//     }
//   }, [isSignedIn, isLoaded]);

//   return isLoaded ? <Slot /> : (
//     <ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
//   );
// }

// export default function Layout() {
//   return (
//     <ClerkProvider 
//       publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY} 
//       tokenCache={tokenCache}
//     >
//       <InitialLayout />
//     </ClerkProvider>
//   );
// }


import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}