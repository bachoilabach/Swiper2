import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const SLIDE_WIDTH = width;
export const SWIPE_THRESHOLD = 10;
export const SWIPE_OFFSET = 50;
export const SWIPER_DATA = [
  { name: "Slide 1" },
  { name: "Slide 2" },
  { name: "Slide 3" },
  { name: "Slide 4" },
  { name: "Slide 5" },
];

export const SLIDE_HEIGHT = 200;
export const SLIDE_BORDER_RADIUS = 12;
export const SLIDE_BACKGROUND_COLOR = "#fff";
