import { gql, useMutation } from "@apollo/client";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";

const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipeMutation($title: String!, $kind: String!) {
    createRecipe(input: { title: $title, kind: $kind }) {
      recipe {
        id
        kind
        title
      }
    }
  }
`;

export default function AddManually() {
  const [title, setTitle] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const router = useRouter();
  const [mutate, { data }] = useMutation(CREATE_RECIPE_MUTATION);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Curry on Mars" />
      </Appbar.Header>
      <View>
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
        <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
          <TextInput
            label="Ingredients"
            multiline
            mode="outlined"
            value={ingredients}
            onChangeText={(text) => setIngredients(text)}
            style={{ maxHeight: 150, height: 150 }}
          />
        </View>
        <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
          <TextInput
            label="Recipe"
            multiline
            mode="outlined"
            value={text}
            onChangeText={(text) => setText(text)}
            style={{ maxHeight: 200, height: 150 }}
          />
        </View>
        <View style={{ marginTop: 30, marginLeft: 10, marginRight: 10 }}>
          <Button
            mode="contained"
            onPress={() =>
              mutate({
                variables: { title, kind: "manual" },
                onCompleted: () => {
                  Alert.alert("Success", `${title} was created successfully!`, [
                    {
                      text: "Create another one",
                      onPress: () => router.replace("/add-manually"),
                      style: "cancel",
                    },
                    {
                      text: "Go back to index",
                      onPress: () => router.replace("/"),
                    },
                  ]);
                },
              })
            }
            disabled={title.trim().length === 0}
          >
            Add
          </Button>
        </View>
      </View>
    </>
  );
}
