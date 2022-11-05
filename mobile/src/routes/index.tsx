import { NavigationContainer } from "@react-navigation/native";
import { Box } from "native-base";

import useAuth from "../hooks/useAuth";
import SignIn from "../screens/SignIn";
import { AppRoutes } from "./app.routes";

// FIXME: Routes, rnder signIn page
export function Routes() {
  const { signed } = useAuth();

  return (
    <Box flex={1} bg="gray.900">
      <NavigationContainer>
        {signed ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </Box>
  );
}
