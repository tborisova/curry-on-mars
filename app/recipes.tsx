import { Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { styles } from "../styles";

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

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="black" />
          <Link href={{ pathname: "/" }}>Back</Link>
        </View>
        <Text>You are searching for {local.text}</Text>
        <FlatList
          data={RECIPES}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      </SafeAreaView>
    </>
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
