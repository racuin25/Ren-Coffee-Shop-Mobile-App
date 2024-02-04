import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useStore } from "../store/store";

const HomeScreen = () => {
  const coffeeList = useStore((state: any) => state.CoffeeList);
  const beanList = useStore((state: any) => state.BeanList);

  const [categories, setCategories] = useState(undefined);
  const [searchText, setSearchText] = useState(undefined);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
