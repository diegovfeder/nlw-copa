import { useState, useEffect } from "react";
import { Share } from "react-native";
import { HStack, useToast, VStack } from "native-base";
import { useRoute } from "@react-navigation/native";

import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PoolHeader } from "../components/PoolHeader";
import { type PoolCardProps as PoolDetailsProps } from "../components/PoolCard";
import { api } from "../services/api";

interface RouteParams {
  id: string;
}

const PoolDetails = () => {
  const toast = useToast();
  const route = useRoute();
  const { id } = route.params as RouteParams;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [poolDetails, setPoolDetails] = useState<PoolDetailsProps>();
  const [selectedOption, setSelectedOption] = useState<"guesses" | "ranking">(
    "guesses"
  );

  async function fetchPoolDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/pools/${id}`);
      setPoolDetails(response.data.pool);
    } catch (err) {
      console.error(err);
      toast.show({
        title: "Não foi possível carregar os detalhes do bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    try {
      await Share.share({
        message: `Olha o código do meu bolão: ${poolDetails?.code}`,
      });
    } catch (err) {
      console.error(err);
      toast.show({
        title: "Não foi possível compartilhar o código do bolão",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor={"gray.900"}>
      <Header
        title={poolDetails?.title || "Detalhes do bolão"}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />
      {poolDetails?._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails} />
          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={selectedOption === "guesses"}
              onPress={() => setSelectedOption("guesses")}
            />
            <Option
              title="Ranking do grupo"
              isSelected={selectedOption === "ranking"}
              onPress={() => setSelectedOption("ranking")}
            />
          </HStack>
          <Guesses poolId={poolDetails.id} />
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails?.code} />
      )}
    </VStack>
  );
};

export default PoolDetails;
