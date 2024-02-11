import { ImageProps, StyleSheet, Text, View } from "react-native";
import React from "react";
import ImageBackgroundInfo from "./ImageBackgroundInfo";
import { LinearGradient } from "expo-linear-gradient";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";

interface FavoritesItemCardProps {
  id: string;
  name: string;
  type: string;
  average_rating: number;
  imagelink_portrait: ImageProps;
  special_ingredient: string;
  ingredients: string;
  ratings_count: string;
  roasted: string;
  description: string;
  favorite: boolean;
  ToggleFavoriteItem: any;
}

const FavoritesItemCard: React.FC<FavoritesItemCardProps> = ({
  id,
  name,
  type,
  average_rating,
  imagelink_portrait,
  special_ingredient,
  ingredients,
  ratings_count,
  roasted,
  description,
  favorite,
  ToggleFavoriteItem,
}) => {
  return (
    <View style={styles.cardContainer}>
      <ImageBackgroundInfo
        EnableBackHandler={false}
        imagelink_portrait={imagelink_portrait}
        type={type}
        id={id}
        favorite={favorite}
        name={name}
        special_ingredient={special_ingredient}
        ingredients={ingredients}
        average_rating={average_rating}
        ratings_count={ratings_count}
        roasted={roasted}
        ToggleFavorite={ToggleFavoriteItem}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.containerLinearGradient}
      >
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: "hidden",
  },
  containerLinearGradient: {
    gap: SPACING.space_10,
    padding: SPACING.space_20,
  },
  descriptionTitle: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
  },
  descriptionText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
});

export default FavoritesItemCard;
