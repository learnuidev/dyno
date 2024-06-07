"use client";

export const LambdaClient = ({ functions, tables }: any) => {
  try {
    // @ts-ignore
    window.functions = functions;
    // @ts-ignore
    window.nmmFunctions = functions.Functions.filter((x) =>
      x.FunctionName?.includes("nomadmethod")
    );
    // @ts-ignore
    window.tables = tables;
  } catch (err) {}
  return (
    <code>
      <pre>{JSON.stringify(functions, null, 2)}</pre>
    </code>
  );
};
