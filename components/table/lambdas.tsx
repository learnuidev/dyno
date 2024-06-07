import { useListLatestLogs } from "@/hooks/use-list-latest-logs";

export const LambdaLogs = ({ lambda }: any) => {
  const { data: logs } = useListLatestLogs({
    logGroupName: lambda?.LoggingConfig?.LogGroup,
  });
  return (
    <div key={JSON.stringify(lambda)}>
      <h1>{lambda?.FunctionName}</h1>

      {/* <div>
        <code>
          <pre>{JSON.stringify(lambda, null, 2)}</pre>
        </code>
      </div> */}
      <div>
        <code>
          <pre>{JSON.stringify(logs, null, 2)}</pre>
        </code>
      </div>
    </div>
  );
};

export const Lambdas = ({ functions, tableName }: any) => {
  return (
    <div>
      {functions?.map((lambda: any) => {
        return <LambdaLogs key={JSON.stringify(lambda)} lambda={lambda} />;
      })}
    </div>
  );
};
