export interface Feature {
  id: string;
  title: string;
  description?: string;
}

export const features: Feature[] = [
  {
    id: "clone",
    title: "clone",
    description: "clone a dynamodb table",
  },
  {
    id: "compare",
    title: "compare",
    description: "compare multiple tables",
  },
  {
    id: "dql",
    title: "dynolog",
    description: "query across multiple tables",
  },
  {
    id: "etl",
    title: "etl",
    description: "exract, transform, load",
  },
  {
    id: "purge",
    title: "purge",
  },
];
