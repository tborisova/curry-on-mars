import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache({}),
});

export default function HomeLayout() {
  return (
    <>
      <ApolloProvider client={client}>
        <PaperProvider>
          <Slot />
        </PaperProvider>
      </ApolloProvider>
    </>
  );
}
