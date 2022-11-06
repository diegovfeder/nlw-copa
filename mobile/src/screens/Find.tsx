import { useState } from "react";
import { Heading, useToast, VStack } from "native-base";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { Loading } from "../components/Loading";

const Find = () => {
  const { navigate } = useNavigation();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  async function handlePoolJoin() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: "Informe o código do bolão",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post("/pools/join", { code });
      setIsLoading(false);
      navigate("pools");
    } catch (err) {
      console.error(err);
      setIsLoading(false);

      if (err.response?.data?.message === "Pool not found") {
        return toast.show({
          title: "Bolão não encontrado... 😔",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (err.response?.data?.message === "Pool already joined by user") {
        return toast.show({
          title: "Você já está participando deste bolão",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "Não foi possível entrar no bolão. Tente novamente mais tarde.",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  return (
    <VStack flex={1} bgColor={"gray.900"}>
      <Header title={"Encontrar bolão"} showBackButton />
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
        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
          value={code}
        />
        <Button
          title="BUSCAR BOLÃO"
          onPress={handlePoolJoin}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
};

export default Find;
