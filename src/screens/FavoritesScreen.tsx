import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import HeaderBar from "../components/HeaderBar";
import EmptyListAnimation from "../components/EmptyListAnimation";
import CartItem from "../components/CartItem";
import PaymentFooter from "../components/PaymentFooter";
import { COLORS, SPACING } from "../theme/theme";
import FavoritesItemCard from "../components/FavoritesItemCard";

const FavoritesScreen = ({ navigation }: any) => {
  const favoritesList = useStore((state: any) => state.FavoritesList);
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList
  );
  const ToggleFavorite = (favorite: boolean, type: string, id: string) => {
    favorite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };
  console.log("Favorite = ", favoritesList.length);

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <View
          style={[styles.scrollViewInnerView, { marginBottom: tabBarHeight }]}
        >
          <View style={styles.itemContainer}>
            <HeaderBar title="Favorites" />
            {favoritesList.length == 0 ? (
              <EmptyListAnimation title={"Favorites is Empty"} />
            ) : (
              <View style={styles.listItemContainer}>
                {favoritesList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push("Details", {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}
                  >
                    <FavoritesItemCard
                      id={data.id}
                      name={data.name}
                      type={data.type}
                      average_rating={data.average_rating}
                      imagelink_portrait={data.imagelink_portrait}
                      special_ingredient={data.special_ingredient}
                      ingredients={data.ingredients}
                      ratings_count={data.ratings_count}
                      roasted={data.roasted}
                      description={data.description}
                      favorite={data.favorite}
                      ToggleFavoriteItem={ToggleFavorite}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
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
  scrollViewInnerView: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemContainer: {
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});

export default FavoritesScreen;
