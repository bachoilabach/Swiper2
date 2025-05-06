import React, { useRef } from "react";
import {
  Animated,
  PanResponder,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  SLIDE_WIDTH,
  SWIPE_OFFSET,
  SWIPE_THRESHOLD,
  SWIPER_DATA,
} from "@/constants/Swip";
import { useSwiper } from "@/hooks/useSwiper";

import SwiperItem from "./SwiperItem";

export default function Swiper() {
  const {
    activeIndex,
    translateX,
    panStartX,
    activeIndexRef,
    setSlide,
    goToNextSlide,
    goToPrvSlide,
  } = useSwiper(SWIPER_DATA.length);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > SWIPE_THRESHOLD,
      onPanResponderGrant: () => {
        panStartX.current = -activeIndexRef.current * SLIDE_WIDTH;
      },
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(panStartX.current + gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx } = gestureState;
        const currentIndex = activeIndexRef.current;
        if (dx < -SWIPE_OFFSET && currentIndex < SWIPER_DATA.length - 1) {
          setSlide(currentIndex + 1);
        } else if (dx > SWIPE_OFFSET && currentIndex > 0) {
          setSlide(currentIndex - 1);
        } else {
          Animated.spring(translateX, {
            toValue: -currentIndex * SLIDE_WIDTH,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carouselWrapper}>
        <Animated.View
          style={[styles.slidesWrapper, { transform: [{ translateX }] }]}
          {...panResponder.panHandlers}
        >
          {SWIPER_DATA.map((slide, index) => (
            <SwiperItem key={index} {...slide} width={SLIDE_WIDTH} />
          ))}
        </Animated.View>

        <TouchableOpacity
          onPress={goToPrvSlide}
          style={[styles.arrow, styles.leftArrow]}
        >
          <Text
            style={[
              styles.arrowText,
              activeIndex === 0 && styles.arrowTextDisabled,
            ]}
          >
            {"<"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goToNextSlide}
          style={[styles.arrow, styles.rightArrow]}
        >
          <Text
            style={[
              styles.arrowText,
              activeIndex === SWIPER_DATA.length - 1 &&
                styles.arrowTextDisabled,
            ]}
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
    width: SLIDE_WIDTH * SWIPER_DATA.length,
  },

  arrow: {
    position: "absolute",
    padding: 10,
  },
  leftArrow: {
    left: 10,
  },
  rightArrow: {
    right: 10,
  },
  arrowText: {
    fontSize: 30,
    color: "#007bff",
  },
  arrowTextDisabled: {
    color: "#ccc",
  },
});
