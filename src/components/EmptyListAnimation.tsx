import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { COLORS, FONTSIZE } from "../theme/theme";

interface EmptyListAnimationProps {
  title: string;
}

const EmptyListAnimation: React.FC<EmptyListAnimationProps> = ({ title }) => {
  return (
    <View style={styles.emptyCartContainer}>
      <LottieView
        style={styles.lottieStyle}
        source={require("../lottie/coffeecup.json")}
        autoPlay
        loop
      />
      <Text style={styles.lottieText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
  },
  lottieStyle: {
    height: 500,
  },
  lottieText: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: "center",
  },
});

export default EmptyListAnimation;
