import { useState } from "react";
import { Text, Heading, VStack, useToast } from "native-base";

import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../services/api";

const New = () => {
  const toast = useToast();
  const [poolTitle, setPoolTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handlePoolCreation() {
    if (!poolTitle.trim()) {
      return toast.show({
        title: "Informe um nome para o seu bolão",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      setIsLoading(true);
      await api.post("/pools", {
        title: poolTitle,
      });
      toast.show({
        title: "Bolão criado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
      setPoolTitle("");
    } catch (err) {
      console.error(err);

      toast.show({
        title: "Não foi possível criar o bolão. Tente novamente mais tarde.",
        placement: "top",
        bgColor: "red.500",
      });

      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bgColor={"gray.900"}>
      <Header title={"Criar novo bolão"} />
      <VStack py={"8"} px={"5"} alignItems={"center"}>
        <Logo />
        <Heading
          fontFamily={"heading"}
          color={"white"}
          fontSize={"xl"}
          my={8}
          textAlign="center"
        >
          Crie o seu bolão da dos-bro e compartilhe entre amigos!
        </Heading>
        <Input
          mb={2}
          placeholder="Qual o nome do seu bolão?"
          onChangeText={setPoolTitle}
          value={poolTitle}
        />
        <Button
          title="CRIAR MEU BOLÃO"
          onPress={handlePoolCreation}
          isLoading={isLoading}
        />
        <Text color="gray.200" fontSize={"sm"} px={8} mt={4} textAlign="center">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
};

export default New;
