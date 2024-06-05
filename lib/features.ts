export interface Feature {
  id: string;
  title: string;
}

export const features: Feature[] = [
  {
    id: "clone",
    title: "Clone",
  },
  {
    id: "dql",
    title: "Dynolog",
  },
  {
    id: "etl",
    title: "ETL",
  },
  {
    id: "purge",
    title: "Purge",
  },
];
