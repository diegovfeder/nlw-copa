import { Row, Text, Pressable, useToast } from "native-base";
import { Share } from "react-native";

interface Props {
  code: string;
}

export function EmptyMyPoolList({ code }: Props) {
  const toast = useToast();

  async function handleCodeShare() {
    try {
      await Share.share({
        message: `Olha o código do meu bolão: ${code}`,
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

  return (
    <Row flexWrap="wrap" justifyContent="center" p={4}>
      <Text color="gray.200" fontSize="sm">
        Esse bolão ainda não tem participantes, que tal
      </Text>

      <Pressable onPress={() => handleCodeShare()}>
        <Text
          textDecorationLine="underline"
          color="yellow.500"
          textDecoration="underline"
        >
          compartilhar o código
        </Text>
      </Pressable>

      <Text color="gray.200" fontSize="sm" mx={1}>
        do bolão com alguém?
      </Text>

      <Text color="gray.200" mr={1}>
        Use o código
      </Text>

      <Text
        color="gray.200"
        fontSize="sm"
        textAlign="center"
        fontFamily="heading"
      >
        {code}
      </Text>
    </Row>
  );
}
