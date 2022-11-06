import { useCallback, useEffect, useState } from "react";
import { Icon, VStack, useToast, FlatList } from "native-base";
import { Octicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Button } from "../components/Button";
import { EmptyPoolList } from "../components/EmptyPoolList";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import {
  PoolCard,
  type PoolCardProps as PoolProps,
} from "../components/PoolCard";
import { api } from "../services/api";

const Pools = () => {
  const { navigate } = useNavigation();
  const toast = useToast();

  const [pools, setPools] = useState<PoolProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchPools() {
    try {
      setIsLoading(true);
      const response = await api.get("/pools");
      setPools(response.data.pools);
    } catch (err) {
      console.error(err);
      toast.show({
        title:
          "Não foi possível carregar os bolões. Tente novamente mais tarde.",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPools();
    }, [])
  );

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
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          px={5}
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() =>
                navigate("details", {
                  id: item.id,
                })
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPoolList />}
        />
      )}
    </VStack>
  );
};

export default Pools;
