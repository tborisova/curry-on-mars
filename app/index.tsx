import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, List, MD3Colors, Menu, Text } from "react-native-paper";

import { gql, useQuery } from "@apollo/client";
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

const RECIPES_QUERY = gql`
  query {
    recipes {
      edges {
        node {
          id
          kind
          title
        }
      }
    }
  }
`;

export default function Index() {
  const [text, setText] = useState<string>("");
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const { data, loading, error } = useQuery(RECIPES_QUERY);

  if (loading) return <Text>"Loading..."</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;

  if (data) {
    console.log(data.recipes.edges.map((edge) => edge.node));
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Curry on Mars" />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              color={MD3Colors.primary30}
              icon="plus-circle"
              onPress={() => openMenu()}
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
        <Text variant="titleMedium">
          Hello, what do you have in your fridge?
        </Text>
        <Searchbar
          placeholder="Search"
          onChangeText={setText}
          value={text}
          mode="bar"
        />

        {data !== undefined && (
          <ScrollView>
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
        )}
        {(data === undefined || data.recipes.edges.length === 0) && (
          // TODO: add buttons to create recipe
          <Text style={{ alignSelf: "center", marginTop: 20 }}>
            You don't have any recipes
          </Text>
        )}
        <StatusBar style="auto" />
      </View>
    </>
  );
}
