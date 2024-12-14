import { Context } from "@devvit/public-api";
export default function responsiveResult<T>(context:Context, small: T, medium: T, large: T): T {

    if (!context.dimensions) {
      return large;
    }
  
    if (context.dimensions.width < 480) {
      return small;
    }
    if (context.dimensions.width < 620) {
      return medium;
    }
    return large;
  }
  
  