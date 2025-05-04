import React, { memo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

type SwiperItemProps = {
  name: string;
  width: number;
};

const SwiperItem = (props: SwiperItemProps) => {
  const { name, width } = props;
  return (
    <View style={[styles.slide,{width: width}]}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

export default memo(SwiperItem);

const styles = StyleSheet.create({
  slide: {
    height: 200,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
