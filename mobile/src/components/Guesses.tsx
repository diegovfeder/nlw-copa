import { FlatList, useToast } from "native-base";
import { useEffect, useState } from "react";

import { Game, type GameProps } from "./Game";
import { Loading } from "./Loading";
import { api } from "../services/api";

interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamScore, setFirstTeamScore] = useState<string>("");
  const [secondTeamScore, setSecondTeamScore] = useState<string>("");

  async function fetchGames() {
    try {
      setIsLoading(true);
      const response = await api.get(`/pools/${poolId}/games`);
      setGames(response.data.games);
    } catch (err) {
      console.error(err);
      toast.show({
        title: "Não foi possível carregar os jogos",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamScore.trim() || !secondTeamScore.trim()) {
        return toast.show({
          title: "Informe o placar de ambos os times",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamScore: Number(firstTeamScore),
        secondTeamScore: Number(secondTeamScore),
      });

      toast.show({
        title: "Palpite realizado com sucesso",
        placement: "top",
        bgColor: "green.500",
      });
      fetchGames();
    } catch (err) {
      console.error(err?.response?.data);
      toast.show({
        title: "Não foi possível enviar o palpite",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  useEffect(() => {
    fetchGames();
  }, [poolId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamScore={setFirstTeamScore}
          setSecondTeamScore={setSecondTeamScore}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
    />
  );
}
