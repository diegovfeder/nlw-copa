import { Icon, VStack } from "native-base";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";

const Pools = () => {
  const { navigate } = useNavigation();

  return (
    <VStack flex={1} bgColor={"gray.900"}>
      <Header title={"Meus bolões"} />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor={"gray.600"}
        pb={4}
        mb={4}
      >
        <Button
          onPress={() => navigate("find")}
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
        />
      </VStack>
    </VStack>
  );
};

export default Pools;
