import { Compare } from "./compare/compare";
import { Clear } from "./clear/clear";
import { Clone } from "./clone/clone";
import { ETL } from "./etl/etl";

export const Features = {
  clone: Clone,
  clear: Clear,
  compare: Compare,
  etl: ETL,
} as any;
