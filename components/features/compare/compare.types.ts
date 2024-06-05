export type CompareStepStatus = "select-tables" | "done";

export interface ICompare {
  status: CompareStepStatus;
  table: string;
  targetTables: string[];
}
