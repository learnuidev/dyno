import { useDescribeTable } from "@/hooks/use-describe-table";

export const useGetMandatoryAttributes = (tableName: string) => {
  const { data: tableInfo, isLoading: isInfoLoading } = useDescribeTable({
    TableName: tableName,
  });

  const mandatoryKeys = tableInfo?.Table?.AttributeDefinitions?.map(
    (attributeDefinition) => {
      return attributeDefinition?.AttributeName;
    }
  );

  return mandatoryKeys;
};
