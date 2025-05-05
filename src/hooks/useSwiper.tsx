import { SLIDE_WIDTH } from "@/constants/Swip";
import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

export const useSwiper = (totalSlides: number) => {
  const [activeIndex, setActiveIndex] = useState(0); 
  const translateX = useRef(new Animated.Value(0)).current;
  const panStartX = useRef(0);
  const activeIndexRef = useRef(activeIndex); 

  const setSlide = (index: number) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  useEffect(() => {
    activeIndexRef.current = activeIndex;
    Animated.spring(translateX, {
      toValue: -activeIndex * SLIDE_WIDTH,
      useNativeDriver: true,
    }).start();
  }, [activeIndex]);

  const goToNextSlide = () => {
    if (activeIndex < totalSlides - 1) {
      setSlide(activeIndex + 1);
    }
  };

  const goToPrvSlide = () => {
    if (activeIndex > 0) {
      setSlide(activeIndex - 1);
    }
  };

  return {
    activeIndex,
    translateX,
    panStartX,
    activeIndexRef,
    setSlide,
    goToNextSlide,
    goToPrvSlide,
  };
};
