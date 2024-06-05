import { Clear } from "./clear/clear";
import { Clone } from "./clone/clone";
import { ETL } from "./etl/etl";

export const Features = {
  clone: Clone,
  clear: Clear,
  etl: ETL,
} as any;
