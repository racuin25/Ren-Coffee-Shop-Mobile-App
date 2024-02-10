import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import { Ionicons } from "@expo/vector-icons";
import BGIcon from "./BGIcon";

const CARD_WIDTH = Dimensions.get("window").width * 0.32;

interface CoffeeCardProps {
  id: string;
  index: number;
  type: string;
  roasted: string;
  imagelink_square: ImageProps;
  name: string;
  special_ingredient: string;
  average_rating: number;
  price: any;
  buttonPressHandler: any;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({
  id,
  index,
  type,
  roasted,
  imagelink_square,
  name,
  special_ingredient,
  average_rating,
  price,
  buttonPressHandler,
}) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardLinearGradientContainer}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
    >
      <ImageBackground
        source={imagelink_square}
        style={styles.cardImageBG}
        resizeMode="cover"
      >
        <View style={styles.cardRatingContainer}>
          <Ionicons
            name={"star"}
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_18}
          />
          <Text style={styles.cardRatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.cardTitle}>{name}</Text>
      <Text style={styles.cardSubTitle}>{special_ingredient}</Text>
      <View style={styles.cardFooterRow}>
        <Text style={styles.cardPriceCurrency}>
          $ <Text style={styles.cardPrice}>{price.price}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            buttonPressHandler({
              id,
              index,
              type,
              roasted,
              imagelink_square,
              name,
              special_ingredient,
              prices: [{ ...price, quantity: 1 }],
            });
          }}
        >
          <BGIcon
            name={"add"}
            color={COLORS.primaryWhiteHex}
            BGColor={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_10}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default CoffeeCard;

const styles = StyleSheet.create({
  cardLinearGradientContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: "hidden",
  },
  cardRatingContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    position: "absolute",
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderBottomRightRadius: BORDERRADIUS.radius_20,
    top: 0,
    right: 0,
  },
  cardRatingText: {
    color: COLORS.primaryWhiteHex,
    lineHeight: 22,
    fontSize: FONTSIZE.size_14,
  },
  cardFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.space_15,
  },
  cardTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
  },
  cardSubTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
  },
  cardPriceCurrency: {
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
  },
  cardPrice: {
    color: COLORS.primaryWhiteHex,
  },
});
