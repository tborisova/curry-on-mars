import { useRouter } from "expo-router";
import React, { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import {
  Appbar,
  Button,
  List,
  MD3Colors,
  Menu,
  Text,
} from "react-native-paper";

import { TypedDocumentNode, gql, useQuery } from "@apollo/client";
import { Searchbar } from "react-native-paper";
import { RecipesQuery, RecipesQueryVariables } from "./__generated__/graphql";

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

export const RECIPES_QUERY = gql`
  query Recipes($after: String) {
    recipes(after: $after) {
      edges {
        node {
          id
          kind
          title
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
` as TypedDocumentNode<RecipesQuery, RecipesQueryVariables>;

export default function Index() {
  const { data, loading, error, refetch } = useQuery(RECIPES_QUERY);

  if (loading) return <Text>"Loading..."</Text>;
  if (error || data === undefined)
    return <Text>`Error! ${error.message}`</Text>;

  if (data.recipes.edges.length !== 0) {
    return <RecipesList data={data} refetch={refetch} />;
  } else {
    return <EmpyRecipeList />;
  }
}

function RecipesList({
  data,
  refetch,
}: {
  data: RecipesQuery;
  refetch: (variables?: RecipesQueryVariables) => void;
}) {
  const [visible, setVisible] = React.useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [text, setText] = useState<string>("");
  const router = useRouter();

  function handleScroll(event) {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      if (
        data.recipes.pageInfo.endCursor &&
        data.recipes.pageInfo.hasNextPage
      ) {
        refetch({ after: data.recipes.pageInfo.endCursor });
      }
    }
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Curry on Mars" />
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Appbar.Action
              color={MD3Colors.primary30}
              icon="plus-circle"
              onPress={() => setVisible(true)}
            />
          }
        >
          <Menu.Item
            onPress={() => router.push({ pathname: "/add-from-photo" })}
            title="Take a photo"
          />
          <Menu.Item
            onPress={() => router.push({ pathname: "/add-from-url" })}
            title="Add from URL"
          />
          <Menu.Item
            onPress={() => router.push({ pathname: "/add-manually" })}
            title="Add manually"
          />
        </Menu>
      </Appbar.Header>
      <View style={[styles.index]}>
        <Searchbar
          placeholder="Search"
          onChangeText={setText}
          value={text}
          mode="bar"
        />
        <ScrollView
          style={{ marginBottom: 20, marginTop: 10 }}
          onScroll={(event) => handleScroll(event)}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refetch()}
            />
          }
        >
          <List.Section>
            {data.recipes.edges
              .map((edge) => edge.node)
              .map((node) => (
                <List.Item
                  title={node.title}
                  description={node.kind}
                  id={node.id}
                  key={node.id}
                />
              ))}
          </List.Section>
        </ScrollView>
      </View>
    </>
  );
}
function EmpyRecipeList() {
  const router = useRouter();

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Curry on Mars" />
      </Appbar.Header>
      <View style={[styles.index]}>
        <View
          style={{ flexDirection: "column", alignItems: "center", gap: 10 }}
        >
          <Text style={{ marginBottom: 10 }}>
            Hey, looks like you don't have any recipe, add one!
          </Text>
          <Button
            mode="contained"
            onPress={() => router.push("add-from-photo")}
          >
            Add from photo
          </Button>
          <Button mode="contained" onPress={() => router.push("add-from-url")}>
            Add from URL
          </Button>
          <Button mode="contained" onPress={() => router.push("add-manually")}>
            Add manually
          </Button>
        </View>
      </View>
    </>
  );
}
