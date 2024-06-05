import { dynamoDocumentClient } from "./client";

export const maxDuration = 60;

const recursiveScan = async (
  tableName: string,
  res = [],
  key = null
): Promise<any> => {
  let resp;

  if (key) {
    resp = await dynamoDocumentClient
      .scan({
        TableName: tableName,
        Limit: 1000,
        ExclusiveStartKey: key,
      })
      ?.promise();
  } else {
    resp = (await dynamoDocumentClient
      .scan({
        TableName: tableName,
        Limit: 1000,
      })
      ?.promise()) as any;
  }

  if (resp?.LastEvaluatedKey) {
    return recursiveScan(
      tableName,
      res.concat(resp?.Items) as any,
      resp?.LastEvaluatedKey
    );
  }

  return res?.concat(resp?.Items);
};

export async function scan(
  { TableName }: { TableName: string },
  { transform }: { transform?: boolean }
) {
  const resp = await recursiveScan(TableName);

  return resp;
}
