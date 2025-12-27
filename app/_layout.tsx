import { ActivityIndicator, View } from "react-native";

import { NotoSans_400Regular, NotoSans_700Bold } from "@expo-google-fonts/noto-sans";
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
  useFonts,
} from "@expo-google-fonts/space-grotesk";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { ThemeProvider, useTheme } from "../context/ThemeContext";

function RootLayoutContent() {
  const { theme } = useTheme();
  return (
    <>
      <StatusBar style={theme} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk: SpaceGrotesk_700Bold, // Defaulting display to bold for now or mapping specific weights
    SpaceGrotesk_Regular: SpaceGrotesk_400Regular,
    SpaceGrotesk_SemiBold: SpaceGrotesk_600SemiBold,
    SpaceGrotesk_Bold: SpaceGrotesk_700Bold,
    NotoSans: NotoSans_400Regular,
    NotoSans_Regular: NotoSans_400Regular,
    NotoSans_Bold: NotoSans_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
