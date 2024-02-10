import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import { useStore } from "../store/store";
import ImageBackgroundInfo from "../components/ImageBackgroundInfo";
import PaymentFooter from "../components/PaymentFooter";

const DetailsScreen = ({ navigation, route }: any) => {
  console.log("route = ", route.params);
  const itemOfIndex = useStore((state: any) =>
    route.params.type == "Coffee" ? state.CoffeeList : state.BeanList
  )[route.params.index];

  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList
  );

  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const [fullDescription, setFullDescription] = useState(false);
  const [price, setPrice] = useState(itemOfIndex.prices[0]);

  const ToggleFavorite = (favorite: boolean, type: string, id: string) => {
    favorite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };

  const BackHandler = () => {
    navigation.pop();
  };

  const addToCartHandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{ ...price, quantity: 1 }],
    });
    calculateCartPrice();
    navigation.navigate("Cart");
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={itemOfIndex.imagelink_portrait}
          type={itemOfIndex.type}
          id={itemOfIndex.id}
          favorite={itemOfIndex.favorite}
          name={itemOfIndex.name}
          special_ingredient={itemOfIndex.special_ingredient}
          ingredients={itemOfIndex.ingredients}
          average_rating={itemOfIndex.average_rating}
          ratings_count={itemOfIndex.ratings_count}
          roasted={itemOfIndex.roasted}
          BackHandler={BackHandler}
          ToggleFavorite={ToggleFavorite}
        />

        <View style={styles.footerInfoArea}>
          <Text style={styles.infoTitle}>Description</Text>
          {fullDescription ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDescription((prev) => !prev);
              }}
            >
              <Text style={styles.descriptionText}>
                {itemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDescription((prev) => !prev);
              }}
            >
              <Text style={styles.descriptionText} numberOfLines={3}>
                {itemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.infoTitle}>Size</Text>
          <View style={styles.sizeOuterContainer}>
            {itemOfIndex.prices.map((data: any) => (
              <TouchableOpacity
                key={data.size}
                onPress={() => {
                  setPrice(data);
                }}
                style={[
                  styles.sizeBox,
                  {
                    borderColor:
                      data.size == price.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.sizeText,
                    {
                      fontSize:
                        itemOfIndex.type == "bean"
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_16,
                      color:
                        data.size == price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.secondaryLightGreyHex,
                    },
                  ]}
                >
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {
            addToCartHandler({
              id: itemOfIndex.id,
              index: itemOfIndex.index,
              name: itemOfIndex.name,
              roasted: itemOfIndex.roasted,
              imagelink_square: itemOfIndex.imagelink_square,
              special_ingredient: itemOfIndex.special_ingredient,
              type: itemOfIndex.type,
              price: price,
            });
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
    justifyContent: "space-between",
  },
  footerInfoArea: {
    padding: SPACING.space_20,
  },
  infoTitle: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  descriptionText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
    letterSpacing: 0.5,
  },
  sizeOuterContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.space_20,
  },
  sizeText: {},
  sizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: "center",
    justifyContent: "center",
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
});

export default DetailsScreen;
