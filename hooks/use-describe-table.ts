import { useQuery } from "@tanstack/react-query";

interface DescribeTableResponse {
  Table: {
    AttributeDefinitions: [
      {
        AttributeName: "hanzi";
        AttributeType: "S";
      },
      {
        AttributeName: "id";
        AttributeType: "S";
      },
    ];
    TableName: string;
    KeySchema: [
      {
        AttributeName: "id";
        KeyType: "HASH";
      },
    ];
    TableStatus: "ACTIVE" | "CREATING";
    CreationDateTime: "2023-11-07T21:05:35.292Z";
    ProvisionedThroughput: {
      NumberOfDecreasesToday: 0;
      ReadCapacityUnits: 0;
      WriteCapacityUnits: 0;
    };
    TableSizeBytes: 1561635;
    ItemCount: 3476;
    TableArn: "arn:aws:dynamodb:us-east-1:765302404291:table/nomadmethod-api-dev-ComponentsTable2-PVEY9E82WWT0";
    TableId: "fdba40f7-e631-4e9c-9264-aa1b4fcfdeec";
    BillingModeSummary: {
      BillingMode: "PAY_PER_REQUEST";
      LastUpdateToPayPerRequestDateTime: "2023-11-07T21:05:35.292Z";
    };
    GlobalSecondaryIndexes: [
      {
        IndexName: "byHanzi";
        KeySchema: [
          {
            AttributeName: "hanzi";
            KeyType: "HASH";
          },
          {
            AttributeName: "id";
            KeyType: "RANGE";
          },
        ];
        Projection: {
          ProjectionType: "ALL";
        };
        IndexStatus: "ACTIVE";
        ProvisionedThroughput: {
          NumberOfDecreasesToday: 0;
          ReadCapacityUnits: 0;
          WriteCapacityUnits: 0;
        };
        IndexSizeBytes: 1561635;
        ItemCount: 3476;
        IndexArn: "arn:aws:dynamodb:us-east-1:765302404291:table/nomadmethod-api-dev-ComponentsTable2-PVEY9E82WWT0/index/byHanzi";
      },
    ];
    DeletionProtectionEnabled: false;
  };
}

export const useDescribeTable = (
  { TableName }: { TableName: string },
  options = {}
) => {
  // const { data: authUser } = useCurrentAuthUser({});
  return useQuery({
    queryKey: ["describe-table", TableName],
    queryFn: async (): Promise<DescribeTableResponse> => {
      const tables = await fetch("/api/describe-table", {
        method: "POST",
        body: JSON.stringify({
          TableName: TableName,
        }),
        headers: {
          // authorization: authUser?.jwt,
          authorization: "",
        },
      });
      return tables.json();
    },
    ...options,
    // enabled: Boolean(authUser?.jwt),
  });
};
