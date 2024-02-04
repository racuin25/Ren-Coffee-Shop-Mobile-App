import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";
import { StatusBar } from "expo-status-bar";
import HeaderBar from "../components/HeaderBar";
import { Ionicons } from "@expo/vector-icons";
import CoffeeCard from "../components/CoffeeCard";

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) temp[data[i].name] = 1;
    else temp[data[i].name]++;
  }
  let categories = Object.keys(temp);
  categories.unshift("All");
  return categories;
};

const getCoffeeList = (category: string, data: any) => {
  if (category == "All") return data;
  else {
    let coffeeList = data.filter((item: any) => item.name == category);
    return coffeeList;
  }
};

const HomeScreen = ({ navigation }: any) => {
  const coffeeList = useStore((state: any) => state.CoffeeList);
  const beanList = useStore((state: any) => state.BeanList);
  console.log(beanList);

  const [categories, setCategories] = useState(
    getCategoriesFromData(coffeeList)
  );
  const [searchText, setSearchText] = useState("");
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, coffeeList)
  );

  const listRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  const searchCoffee = (search: string) => {
    if (search != "") {
      listRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({ index: 0, category: categories[0] });
      setSortedCoffee([
        ...coffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        ),
      ]);
    }
  };

  const resetSearchCoffee = () => {
    listRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({ index: 0, category: categories[0] });
    setSortedCoffee([...coffeeList]);
    setSearchText("");
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        {/* {AppHeader} */}
        <HeaderBar title="Home Screen" />

        <Text style={styles.screenTitle}>
          Find the best{"\n"}coffee for you
        </Text>

        {/* {Search Input} */}

        <View style={styles.inputContainerComponent}>
          <TouchableOpacity
            onPress={() => {
              searchCoffee(searchText);
            }}
          >
            <Ionicons
              style={styles.inputIcon}
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Find your Coffee...."
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              searchCoffee(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.textInputContainer}
          />
          {searchText.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                resetSearchCoffee();
              }}
            >
              <Ionicons
                style={styles.inputIcon}
                name="close"
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>

        {/* {CategoryScroller} */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollViewStyle}
        >
          {categories.map((data, index) => (
            <View
              key={index.toString()}
              style={styles.categoryScrollViewContainer}
            >
              <TouchableOpacity
                style={styles.categoryScrollViewItem}
                onPress={() => {
                  listRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                  setCategoryIndex({
                    index: index,
                    category: categories[index],
                  });
                  setSortedCoffee([
                    ...getCoffeeList(categories[index], coffeeList),
                  ]);
                }}
              >
                <Text
                  style={[
                    styles.categoryText,
                    categoryIndex.index == index
                      ? { color: COLORS.primaryOrangeHex }
                      : {},
                  ]}
                >
                  {data}
                </Text>
                {categoryIndex.index == index ? (
                  <View style={styles.activeCategory} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* {Coffee List} */}
        <FlatList
          ref={listRef}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.categoryText}>No Coffee Found</Text>
            </View>
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push("Details");
                }}
              >
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  rosted={item.rosted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={() => {}}
                />
              </TouchableOpacity>
            );
          }}
        />

        {/* {Bean List} */}
        <Text style={styles.coffeeBeansTitle}>Coffee Beans</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={beanList}
          contentContainerStyle={[
            styles.flatListContainer,
            { marginBottom: tabBarHeight },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => {}}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  rosted={item.rosted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={() => {}}
                />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  screenTitle: {
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  inputContainerComponent: {
    flexDirection: "row",
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: "center",
  },
  inputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  textInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  categoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  categoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  categoryScrollViewItem: {
    alignItems: "center",
  },
  categoryText: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  activeCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  flatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  coffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    color: COLORS.secondaryLightGreyHex,
  },
  emptyListContainer: {
    width: Dimensions.get("window").width - SPACING.space_30 * 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.space_36 * 3.6,
  },
});

export default HomeScreen;
