import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTSIZE, SPACING } from "../theme/theme";
import OrderItemCard from "./OrderItemCard";

interface OrderHistoryCardProps {
  navigationHandler: any;
  cartList: any;
  cartListPrice: string;
  orderDate: string;
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
  navigationHandler,
  cartList,
  cartListPrice,
  orderDate,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.headerTitle}>Order Time</Text>
          <Text style={styles.headerSubTitle}>{orderDate}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.headerTitle}>Total Amount</Text>
          <Text style={styles.headerPrice}>$ {cartListPrice}</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        {cartList.map((data: any, index: any) => (
          <TouchableOpacity
            key={index.toString() + data.id}
            onPress={() =>
              navigationHandler({
                index: data.index,
                id: data.id,
                type: data.type,
              })
            }
          >
            <OrderItemCard
              type={data.type}
              name={data.name}
              imagelink_square={data.imagelink_square}
              special_ingredient={data.special_ingredient}
              prices={data.prices}
              itemPrice={data.ItemPrice}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    gap: SPACING.space_10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.space_20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  headerSubTitle: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  headerPrice: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
  },
  listContainer: {
    gap: SPACING.space_20,
  },
});

export default OrderHistoryCard;
