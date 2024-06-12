interface IDynoSchema {}

interface IDynoTable {
  id: string;
  name: string;
  schema: IDynoSchema;

  metadata: {
    dynamo: {
      TableName: string;
      KeySchema: any;
      AttributeDefinitions: any;
      BillingMode: any;
      Tags: any;
      StreamSpecification: any;
      GlobalSecondaryIndexes: any;
    };
  };
}

const DynoTableExample = {
  id: "random-uuid",
  name: "Components-clone",

  schema: [
    {
      key: "id",
      type: "string",
      primary: true,
    },
    {
      key: "input",
      type: "string",
    },
  ],

  metadata: {
    dynamo: {},
  },
};
