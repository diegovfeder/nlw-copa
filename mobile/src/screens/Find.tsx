import { Heading, VStack } from "native-base";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

const Find = () => {
  return (
    <VStack flex={1} bgColor={"gray.900"}>
      <Header title={"Criar novo Bolão"} showBackButton />
      <VStack py={"8"} px={"5"} alignItems={"center"}>
        <Heading
          fontFamily={"heading"}
          color={"white"}
          fontSize={"xl"}
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de seu código único
        </Heading>
        <Input mb={2} placeholder="Qual o código do bolão?" />
        <Button title="BUSCAR BOLÃO" />
      </VStack>
    </VStack>
  );
};

export default Find;