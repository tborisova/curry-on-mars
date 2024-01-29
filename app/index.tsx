import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Appbar, Button, Chip, PaperProvider, Text } from "react-native-paper";

import { Searchbar } from "react-native-paper";

const styles = StyleSheet.create({
  index: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 6,
    marginTop: 80,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  searchValues: {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    flexWrap: "wrap",
  },
});

export default function Index() {
  const [text, setText] = useState<string>("");
  const router = useRouter();

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Curry on Mars" />
      </Appbar.Header>
      <View style={[styles.index]}>
        <Text variant="titleMedium">
          Hello, what do you have in your fridge?
        </Text>

        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={setText}
            value={text}
            mode="bar"
          />
          <SafeAreaView style={[styles.searchValues]}>
            {text &&
              text.split(" ").map((value) => {
                if (value.length > 0) {
                  return (
                    <Chip
                      icon="check"
                      onPress={() => console.log("Pressed")}
                      onClose={() => {}}
                    >
                      {value}
                    </Chip>
                  );
                } else {
                  return null;
                }
              })}
          </SafeAreaView>
        </View>

        <View>
          <Button
            mode="contained"
            onPress={() =>
              router.push({ pathname: "/recipes", params: { text } })
            }
            compact
            disabled={!text}
          >
            Search for recipes
          </Button>
        </View>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}
