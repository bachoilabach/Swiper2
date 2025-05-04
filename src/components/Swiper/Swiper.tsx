import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SwiperItem from "./SwiperItem";
import { SLIDE_WIDTH, useSwiper } from "../../hooks/useSwiper";

const slides = [
  { name: "Slide 1" },
  { name: "Slide 2" },
  { name: "Slide 3" },
  { name: "Slide 4" },
  { name: "Slide 5" },
];

export default function Swiper() {
  const {
    currentSlideIndex,
    updateSlideIndex,
    translateX,
    initialPositionX,
    currentSlideIndexRef,
    goToNextSlide,
    goToPrevSlide,
  } = useSwiper(slides.length);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 10,

      onPanResponderGrant: () => {
        initialPositionX.current = -currentSlideIndexRef.current * SLIDE_WIDTH;
      },

      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(initialPositionX.current + gestureState.dx);
      },

      onPanResponderRelease: (_, gestureState) => {
        const { dx } = gestureState;
        const currentIndex = currentSlideIndexRef.current;

        if (dx < -50 && currentIndex < slides.length - 1) {
          updateSlideIndex(currentIndex + 1);
        } else if (dx > 50 && currentIndex > 0) {
          updateSlideIndex(currentIndex - 1);
        } else {
          Animated.spring(translateX, {
            toValue: -currentIndex * SLIDE_WIDTH,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carouselWrapper}>
        <Animated.View
          style={[styles.slidesWrapper, { transform: [{ translateX }] }]}
          {...panResponder.panHandlers}
        >
          {slides.map((slide, index) => (
            <SwiperItem key={index} {...slide} width={SLIDE_WIDTH} />
          ))}
        </Animated.View>

        <TouchableOpacity
          onPress={goToPrevSlide}
          style={[styles.arrow, styles.leftArrow]}
        >
          <Text
            style={{
              fontSize: 30,
              color: currentSlideIndex === 0 ? "#ccc" : "#007bff",
            }}
          >
            {"<"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goToNextSlide}
          style={[styles.arrow, styles.rightArrow]}
        >
          <Text
            style={{
              fontSize: 30,
              color:
                currentSlideIndex === slides.length - 1 ? "#ccc" : "#007bff",
            }}
          >
            {">"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
  },
  carouselWrapper: {
    width: "100%",
    height: 220,
    justifyContent: "center",
    position: "relative",
  },
  slidesWrapper: {
    flexDirection: "row",
    position: "absolute",
    width: SLIDE_WIDTH * slides.length,
  },
  arrow: {
    position: "absolute",
  },
  leftArrow: {
    left: 10,
  },
  rightArrow: {
    right: 10,
  },
});
