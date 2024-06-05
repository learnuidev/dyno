type CloneStepStatus =
  | "select-table"
  | "new-table-name"
  | "select-attributes"
  | "preview"
  | "creating-table"
  | "checking-table-status"
  | "populating-table"
  | "done";

type IClone = {
  step: CloneStepStatus;
  targetTableName: string;
  newTableName: string;
  tableAttributes: string[];
  createTableParams: {
    TableName: any;
    KeySchema: any;
    AttributeDefinitions: any;
    BillingMode: any;
    Tags: any;
    StreamSpecification: any;
    GlobalSecondaryIndexes: any;
  };
};
