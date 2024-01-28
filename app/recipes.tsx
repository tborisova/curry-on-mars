import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { Appbar, List, PaperProvider } from "react-native-paper";

const RECIPES = [
  {
    title: "Eggs with olives",
    description: "Mix 1 egg with olives",
    id: "1",
  },
  {
    title: "Eggs with tomatoes",
    description: "Mix tomatoes with eggs",
    id: "2",
  },
  {
    title: "Eggs with parsley",
    description: "Mix eggs with parsley",
    id: "3",
  },
];

type Recipe = { title: string; description: string };

export default function Recipes({ text }: { text: string }) {
  const local = useLocalSearchParams<{ text: string }>();
  const router = useRouter();
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={`Results for ${local.text}`} />
      </Appbar.Header>
      <List.Section>
        {RECIPES.map((recipe) => (
          <List.Item
            title={recipe.title}
            description={recipe.description}
            id={recipe.id}
            key={recipe.id}
          />
        ))}
      </List.Section>
    </PaperProvider>
  );
}

function Item({ item }: { item: Recipe }) {
  return (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );
}
