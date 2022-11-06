import { NavigationContainer } from "@react-navigation/native";
import { Box } from "native-base";

import useAuth from "../hooks/useAuth";
import SignIn from "../screens/SignIn";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { signed, user } = useAuth();
  console.log({ signed, user });

  return (
    <Box flex={1} bg="gray.900">
      <NavigationContainer>
        {signed ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </Box>
  );
}
