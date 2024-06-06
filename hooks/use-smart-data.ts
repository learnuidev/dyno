import { useAttributesList } from "@/hooks/use-attributes-list";
import { useDynamoDBScan } from "./use-scan";

export const useSmartData = (tableName: string) => {
  const { data: scannedData, isLoading } = useDynamoDBScan({
    TableName: tableName,
  });

  const attributesList = useAttributesList(scannedData);

  // const smartData = scannedData;
  const smartData = scannedData?.map((item: any) => {
    // const itemKeys = Object.keys(item);

    return attributesList.reduce((acc, key) => {
      const val = item?.[key];
      console.log("KEY", key);
      console.log("VAL", val);
      if (!val) {
        const findKey = scannedData?.find(
          (val: any) => val?.input === item?.input && val?.[key]
        );

        if (findKey) {
          return {
            ...acc,
            [key]: findKey?.[key],
          };
        }
        return {
          ...acc,
          // [key]: "",
        };
      } else {
        return {
          ...acc,
          [key]: item?.[key],
        };
      }
    }, {});
  });
};
