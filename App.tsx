import { StatusBar } from "expo-status-bar";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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

function Item({ item }: { item: Recipe }) {
  return (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );
}
export default function App() {
  const [text, onChangeText] = useState<string>("");
  const [showList, setShowLit] = useState<boolean>(false);

  if (showList) {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={RECIPES}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />

          <Pressable onPress={() => setShowLit(false)}>
            <Text>Back</Text>
          </Pressable>
        </SafeAreaView>
      </>
    );
  } else {
    return (
      <InitialScreen
        text={text}
        onChangeText={onChangeText}
        setShowList={setShowLit}
      />
    );
  }
}

function InitialScreen({
  text,
  onChangeText,
  setShowList,
}: {
  text: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  setShowList: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <View style={styles.container}>
      <Text>Hello, what do you have in your fridge?</Text>
      <SafeAreaView>
        <TextInput
          onChangeText={onChangeText}
          value={text}
          style={styles.input}
        />
      </SafeAreaView>

      <SafeAreaView>
        <Pressable
          onPress={() => setShowList(true)}
          style={[styles.buttonLabel]}
        >
          <Text style={[styles.searchText]}>Search for recipes</Text>
        </Pressable>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300,
  },
  buttonLabel: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 6,
  },
  searchText: {
    color: "white",
  },
  list: {
    borderColor: "red",
    borderWidth: 12,
  },
});
