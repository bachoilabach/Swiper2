import { useRef, useState, useEffect } from "react";
import { Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export const SLIDE_WIDTH = width;

export const useSwiper = (slidesLength: number) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const initialPositionX = useRef(0);
  const currentSlideIndexRef = useRef(currentSlideIndex);

  const updateSlideIndex = (newIndex: number) => {
    currentSlideIndexRef.current = newIndex;
    setCurrentSlideIndex(newIndex);
  };

  useEffect(() => {
    currentSlideIndexRef.current = currentSlideIndex;
    Animated.spring(translateX, {
      toValue: -currentSlideIndex * SLIDE_WIDTH,
      useNativeDriver: true,
    }).start();
  }, [currentSlideIndex]);

  const goToNextSlide = () => {
      if (currentSlideIndex < slidesLength - 1) {
        updateSlideIndex(currentSlideIndex + 1);
      }
    };
  
    const goToPrevSlide = () => {
      if (currentSlideIndex > 0) {
        updateSlideIndex(currentSlideIndex - 1);
      }
    };

  return {
    currentSlideIndex,
    updateSlideIndex,
    translateX,
    initialPositionX,
    currentSlideIndexRef,
    goToNextSlide,
    goToPrevSlide
  };
};
