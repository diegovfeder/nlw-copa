import { Center, Spinner } from "native-base";

export const Loading = () => {
  return (
    <Center flex={1} bg="gray.900">
      <Spinner accessibilityLabel="Loading" color="yellow.500" />
    </Center>
  );
};
