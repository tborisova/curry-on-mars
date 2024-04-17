import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { Appbar, Button, PaperProvider, TextInput } from "react-native-paper";

export default function AddFromUrl() {
  const [title, setTitle] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");

  const router = useRouter();

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Curry on Mars" />
      </Appbar.Header>
      <View>
        <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
          <TextInput
            mode="outlined"
            onChangeText={(text) => setUrl(text)}
            value={url}
            label="URL"
            placeholder="Paste the URL here"
          />
        </View>
        <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
          <TextInput
            mode="outlined"
            onChangeText={(text) => setTitle(text)}
            value={title}
            label="Title of the recipe"
          />
        </View>
        <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
          <TextInput
            mode="outlined"
            onChangeText={(text) => setKeywords(text)}
            value={keywords}
            label="Keywords"
          />
        </View>
        <View style={{ marginTop: 30, marginLeft: 10, marginRight: 10 }}>
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
