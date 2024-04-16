import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Appbar, Button, PaperProvider, TextInput } from "react-native-paper";

export default function RecipeFromPhoto() {
  const local = useLocalSearchParams<{ uri: string }>();
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  console.log(local.uri);

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.replace("/")} />
        <Appbar.Content title="Curry on Mars" />
      </Appbar.Header>

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          marginTop: 10,
          gap: 10,
        }}
      >
        <View
          style={{
            flex: 6,
            marginLeft: 10,
            marginRight: 10,
            gap: 10,
          }}
        >
          <TextInput
            mode="outlined"
            onChangeText={(text) => setTitle(text)}
            value={title}
            label="Title of the recipe"
          />
          <TextInput
            mode="outlined"
            onChangeText={(text) => setKeywords(text)}
            value={keywords}
            label="Keywords"
          />
          <Image source={{ uri: local.uri }} style={{ flex: 1 }}></Image>
        </View>
        <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
          <Button
            mode="contained"
            onPress={() => {}}
            disabled={title.trim().length === 0}
          >
            Add
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transperant",
  },
  stepContainer: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    gap: 100,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    width: 300,
    marginBottom: 30,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
});
