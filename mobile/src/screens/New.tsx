import { VStack } from "native-base";
import { Header } from "../components/Header";

const New = () => {
  return (
    <VStack p={"8"} flex={1} bgColor={"gray.900"}>
      <Header title={"Criar novo Bolão"} />
    </VStack>
  );
};

export default New;
