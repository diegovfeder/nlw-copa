import { Center, Icon, Text } from "native-base";
import { Fontisto } from "@expo/vector-icons";

import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";
import useAuth from "../hooks/useAuth";

const SignIn = () => {
  const { signIn } = useAuth();

  return (
    <Center p={"8"} flex={1} bgColor={"gray.900"}>
      <Logo width={212} height={40} />
      <Button
        mt={"12"}
        title={"Entrar com Google"}
        type="SECONDARY"
        onPress={signIn}
        leftIcon={
          <Icon as={Fontisto} name={"google"} color={"white"} size={"md"} />
        }
      />
      <Text color="white" textAlign={"center"} mt={"4"}>
        Não utilizamos nenhuma informação além{"\n"}do seu e-mail para criação
        de sua conta.
      </Text>
    </Center>
  );
};

export default SignIn;
