import { FilterTablesInput } from "@/components/filter-tables-input";
import { TableItem } from "@/components/table-item";

import { useDynamoDBScan } from "@/hooks/use-scan";

import { SelectAttributes } from "./select-attributes";
import { PreviewClone } from "./preview-clone";
import { CloneTable } from "./clone-table";
import { CheckTableStatus } from "./check-table-status";
import { PopulateTable } from "./populate-table";
import { CloneSuccess } from "./clone-success";
import { StepItem } from "@/components/step-item";
import { SelectTable } from "../../table/select-table";
import { NewTableName } from "./new-table-name";

export const CloneSteps = (props: any) => {
  const { newTableName, selectedStepTable, attributes, preview } = props;

  const { data: scannedData, isLoading } = useDynamoDBScan({
    TableName: selectedStepTable,
  });

  // First step: Table Selection
  if (!selectedStepTable) {
    return <SelectTable {...props} />;
  }

  // Second Step: Naming
  if (!newTableName) {
    return <NewTableName {...props} />;
  }

  // Select Attributes
  if (!attributes?.length) {
    return <SelectAttributes {...props} />;
  }

  // Preview Step
  if (preview === "review") {
    return <PreviewClone {...props} />;
  }

  if (preview === "clone") {
    return <CloneTable {...props} scannedData={scannedData} />;
  }
  if (preview === "check-table") {
    return <CheckTableStatus {...props} scannedData={scannedData} />;
  }
  if (preview === "populate") {
    return <PopulateTable {...props} scannedData={scannedData} />;
  }
  if (preview === "done") {
    return <CloneSuccess {...props} scannedData={scannedData} />;
  }
};
