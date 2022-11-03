import { Heading, VStack } from "native-base";

import { Header } from "../components/Header";
import Logo from "../assets/logo.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

const New = () => {
  return (
    <VStack p={"8"} flex={1} bgColor={"gray.900"}>
      <Header title={"Criar novo Bolão"} />
      <VStack alignItems={"center"}>
        <Logo />
        <Heading
          fontFamily={"heading"}
          color={"white"}
          fontSize={"xl"}
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>
        <Input mb={2} placeholder="Qual o nome do seu bolão?"  />
        <Button title="Criar meu" />
      </VStack>
    </VStack>
  );
};

export default New;
