import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import ProfilePhoto from "./ProfilePhoto";
import GradientBGIcon from "./GradientBGIcon";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderBarProps {
  title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <GradientBGIcon
        name="grid"
        color={COLORS.primaryLightGreyHex}
        size={FONTSIZE.size_16}
      />
      <Text style={styles.headerText}>{title}</Text>
      <ProfilePhoto />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: SPACING.space_30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingTop: "15%",
  },
  headerText: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
});

export default HeaderBar;
