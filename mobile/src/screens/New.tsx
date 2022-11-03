import { Heading, VStack } from "native-base";

import { Header } from "../components/Header";
import Logo from "../assets/logo.svg";

const New = () => {
  return (
    <VStack p={"8"} flex={1} bgColor={"gray.900"}>
      <Header title={"Criar novo Bolão"} />
      <VStack alignItems={"center"}>
        <Logo />
        <Heading>Crie seu próprio bolão da copa e compartilhe entre amigos!</Heading>
      </VStack>
    </VStack>
  );
};

export default New;
