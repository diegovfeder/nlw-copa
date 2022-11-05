import { NativeBaseProvider, StatusBar } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { AuthProvider } from "./src/contexts/AuthContext";
import { Loading } from "./src/components/Loading";
import { THEME } from "./src/styles/theme";
import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={"white.500"}
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthProvider>
    </NativeBaseProvider>
  );
}
