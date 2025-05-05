import { SLIDE_BORDER_RADIUS, SLIDE_HEIGHT } from "@/constants/Swip";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

type SwiperItemProps = {
  name: string;
  width: number;
};

const SwiperItem = (props: SwiperItemProps) => {
  const { name, width } = props;

  return (
    <View style={[styles.slide, { width }]}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

export default memo(SwiperItem);

const styles = StyleSheet.create({
  slide: {
    height: SLIDE_HEIGHT, 
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SLIDE_BORDER_RADIUS,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
