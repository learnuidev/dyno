import React, { useEffect, useMemo, useState } from "react";

import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getExpandedRowModel,
  Row,
} from "@tanstack/react-table";

const constructParams = (params: any) => {
  const removeNull = function removeNull(obj: any) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != null)
    );
  };

  const filteredStep = removeNull(params.data);

  const updatedAt = new Date().toISOString();

  const initParam = {
    TableName: params.TableName,
    Key: params.Key,
    ExpressionAttributeNames: {
      // '#updatedAt': 'updatedAt',
    },
    UpdateExpression: "",
    ExpressionAttributeValues: {},
    ConditionExpression: `attribute_exists(${Object.keys(params.Key)[0]})`,
  };

  const updatedItemParams = Object.entries(filteredStep).reduce(
    (acc, [key, val]) => {
      return {
        ...acc,
        ExpressionAttributeNames: {
          ...acc.ExpressionAttributeNames,
          [`#${key}`]: key,
        },
        UpdateExpression: acc.UpdateExpression.includes("set")
          ? `${acc.UpdateExpression}, #${key} = :${key}`
          : `set #${key} = :${key}`,
        ExpressionAttributeValues: {
          ...acc.ExpressionAttributeValues,
          [`:${key}`]: val,
        },
      };
    },
    initParam
  );

  return updatedItemParams;
};

type UserAttribute = {
  Name: string;
  Value: string;
};

enum UserStatus {
  REGISTERED,
  CONFIRMED,
  PASSWORD_RESET_REQUIRED,
  FORCE_CHANGE_REQUIRED,
  DISABLED,
  EXTERNAL_PROVIDER,
}

type User = {
  Username: string;
  UserCreateDate: string;
  Enabled: boolean;
  UserStatus: UserStatus;
  Attributes: UserAttribute[];
};

type Props = {
  deleteItem: (id: string) => void;
  updateItem: (item: any) => void;
  TableName: string;
};

const renderSubComponent = ({ row }: { row: Row<User> }) => {
  console.log("ROW", row);
  return (
    <pre style={{ fontSize: "10px" }}>
      {/* <code>{JSON.stringify(row.original, null, 2)}</code> */}
      <code>{JSON.stringify(row.original)}</code>
    </pre>
  );
};

export function DynamoDBTableV3(props: any) {
  // console.log('DYNAMODB', props);

  const { items } = props;
  const [activeData, setActiveData] = React.useState(null);

  const titles = [
    ...(new Set(...items.map((item: any) => Object.keys(item))) as any),
  ];

  function MyCell(props: any) {
    const value = props.getValue();
    console.log("CELL", props);
    return <div>{JSON.stringify(value)}</div>;
  }

  const makeColumns = (titles: any) => {
    const cols = titles.map((name: any) => {
      return {
        accessorFn: (row: any) => row[name],
        id: name,
        header: () => <span>{name}</span>,
        cell: MyCell,
        footer: (props: any) => props.column.id,
      };
    });

    console.log("CLOS", cols);

    return [
      {
        id: "Action",
        header: () => <span>...</span>,
        cell: ({ row }: any) => {
          console.log("ROW", row);
          return (
            <div className="opacity-0 transition-opacity hover:opacity-100 flex justify-around">
              <div>
                <div>
                  <button
                    className="dark:text-gray-200 dark:active:bg-zinc-700 dark:hover:bg-zinc-800"
                    onClick={() => {
                      // console.log('row', row);
                      // console.log('table.options.meta?.setActive', table.options.meta?.setActive);
                      setActiveData(row.original);
                      console.log("rowwww", row);
                    }}
                  >
                    edit
                    {/* <PencilIcon className="dark:text-gray-200 h-3 w-3 dark:bg-gray-900 text-gray-800 hover:text-pink-600 dark:hover:text-pink-600" /> */}
                  </button>
                </div>
              </div>

              <div>
                <div>
                  <button
                    className="dark:text-gray-200 dark:active:bg-zinc-700 dark:hover:bg-zinc-800"
                    onDoubleClick={() => {
                      console.log(
                        "table.options.meta?.setDelete"
                        // table.options.meta?.setDelete,
                      );
                      // table.options.meta?.setDelete(row.original);

                      props.deleteItem(row.original);
                      console.log("rowwww", row);
                    }}
                  >
                    delete
                    {/* <TrashIcon className="dark:text-gray-200 h-3 w-3 dark:bg-gray-900 text-gray-800 hover:text-pink-600 dark:hover:text-pink-600" /> */}
                  </button>
                </div>
              </div>
            </div>
          );
        },
      },
      ...cols,
    ];
  };

  const defaultColumns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: props.TableName.toLowerCase(),
        footer: (props) => props.column.id,
        columns: makeColumns(titles),
      },
    ],
    [props.TableName]
  );

  // console.log('tablev2', props);

  const calculateValue = (val: any) => {
    if (typeof val === "object" && !Array.isArray(val) && val !== null) {
      const [[key, value]] = Object.entries(val) as any;

      console.log("KEY", key);

      console.log("VALUE", value);
      switch (key) {
        case "S":
          return value;
        default:
          return value;
      }
    }

    return val;
  };

  const presView = useMemo(
    () =>
      [...items].map((item) => {
        const res = {};
        const keys = Object.keys(item);

        console.log("ITEM", item);

        for (const key of keys) {
          const val = item[key];

          console.log("VAL", val);
          // const presVal = typeof val === 'object' ? JSON.stringify(val) : val;
          const presVal = calculateValue(val);
          //   @ts-ignore
          res[key] = presVal;
        }

        console.log("RES", res);

        return res;
      }),
    [items]
  );

  // console.log('PRES VALUE', presView);

  const [data, setData] = React.useState(() => presView);

  const [columns, setColumns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ]);

  const table = useReactTable({
    // setActive: value => {
    //     // console.log('set active', value);
    //     setActiveData(value);
    // },
    data,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    getRowCanExpand: () => true,
  });

  useEffect(() => {
    setData([...items]);
  }, [items]);

  useEffect(() => {
    setColumns([...defaultColumns]);
  }, [items]);

  return (
    <div>
      {/* {activeData && (
        <DynamoDBEditorModal
          item={activeData}
          isOpen={Boolean(activeData)}
          onSubmit={(value) => {
            console.log("TODO: Submit data", value);

            // const filteredValue = Object.entries(value).reduce((acc, curr) => {
            //     const [key, val] = curr;

            //     return acc;
            // }, {});
            props.updateItem(value);
            setActiveData(null);
          }}
          onClose={() => setActiveData(null)}
        />
      )} */}
      <div className="overflow-x-auto overflow-y-auto h-[700px] shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mt-4">
        <table
          {...{
            className:
              "min-w-full divide-y divide-gray-300 dark:divide-gray-900",
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead className="bg-gray-50 dark:bg-gray-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="divide-x divide-gray-200 dark:divide-gray-900"
              >
                {headerGroup.headers.map((header) => (
                  //   eslint-disable-next-line
                  <th
                    {...{
                      key: header.id,
                      colSpan: header.colSpan,
                      className:
                        "py-2.5 pl-4 pr-4 text-left text-xs font-semibold text-gray-900 sm:pl-6 dark:text-gray-200",
                      style: {
                        width: header.getSize(),
                      },
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${
                          header.column.getIsResizing() ? "isResizing" : ""
                        }`,
                        style: {
                          transform: "",
                        },
                      }}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:bg-[#0f1117] dark:divide-gray-900">
            {table.getRowModel().rows.map((row) => {
              return (
                //   eslint-disable-next-line
                <React.Fragment>
                  <tr
                    key={row.id}
                    className="divide-x divide-gray-200 dark:divide-gray-800"
                  >
                    {row.getVisibleCells().map((cell) => {
                      // console.log('CELl', cell.column.columnDef.cell);
                      // console.log('CELLCONT', cell.getContext());

                      const val = calculateValue(
                        // @ts-ignore
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                          // @ts-ignore
                        ).props.getValue()
                      );

                      console.log("BLABLA", val);

                      // console.log(
                      //     'CELL',
                      //    ,
                      // );
                      return (
                        //   eslint-disable-next-line
                        <td
                          {...{
                            key: cell.id,
                            className:
                              "whitespace-nowrap p-2 text-xs text-gray-500 dark:text-gray-300",
                            style: {
                              width: cell.column.getSize(),
                            },
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                          {/* {JSON.stringify(val)} */}
                        </td>
                      );
                    })}
                  </tr>

                  {row.getIsExpanded() && (
                    <tr>
                      {/* 2nd row is a custom 1 cell row */}
                      <td colSpan={row.getVisibleCells().length}>
                        {renderSubComponent({ row })}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="h-4" />
      {/* <pre>
                {JSON.stringify(
                    {
                        columnSizing: table.getState().columnSizing,
                        columnSizingInfo: table.getState().columnSizingInfo,
                    },
                    null,
                    2,
                )}
            </pre> */}
    </div>
  );
}

export function DynamoDBTable(props: any) {
  const { tableDescription, Items, isLoading } = props;

  // const setCurrentProfile = useProfileState((state: ProfileState) => state.setCurrentProfile);
  // const { data: awsIntegrations } = useListUserExtensionsQuery(
  //     {
  //         extensionId: 'AWS',
  //     },
  //     {},
  // );

  // const { data: Items, isLoading } = useScanQuery(
  //     { TableName: props.TableName, region, profile: currentProfile },
  //     {
  //         enabled: Boolean(props?.TableName) && Boolean(region) && Boolean(currentProfile),
  //     },
  // );

  //   const { data: Items, isLoading } = useScanQueryV2(
  //     { TableName: props.TableName, region, profile: currentProfile },
  //     {
  //       enabled:
  //         Boolean(props?.TableName) && Boolean(region) && Boolean(currentProfile),
  //     }
  //   );

  //   const { data: tableDescription, isLoading: isTableDescriptionLoading } =
  //     useDescribeTableQuery(
  //       { TableName: props?.TableName, region, profile: currentProfile },
  //       {
  //         enabled:
  //           Boolean(props?.TableName) &&
  //           Boolean(region) &&
  //           Boolean(currentProfile),
  //       }
  //     );

  const [queryState, setQueryState] = useState(null);
  const [queryResult, setQueryResult] = useState(null);

  //   const updateItem = useUpdateItemMutation(
  //     { TableName: props?.TableName, region, profile: currentProfile },
  //     {}
  //   );

  //   const deleteItem = useDeleteItemMutation(
  //     { TableName: props?.TableName, region, profile: currentProfile },
  //     {}
  //   );

  const keyAttribute = useMemo(
    () =>
      tableDescription?.Table?.KeySchema.find(
        (ks: any) => ks.KeyType === "HASH"
      )?.AttributeName,
    [tableDescription]
  );

  //   if (!props.TableName) {
  //     return (
  //       <div className="dark:text-gray-200 text-center">
  //         {" "}
  //         Please select a table{" "}
  //       </div>
  //     );
  //   }

  if (isLoading) {
    return <div> Loading items...</div>;
  }

  if (!Items) {
    return (
      <div className="dark:text-gray-200 text-center">
        {" "}
        Nothing found for: {props.TableName}{" "}
      </div>
    );
  }

  if (!Items.length || !keyAttribute) {
    return <div> Nothing here </div>;
  }

  const runQuery = (args: any) => {
    if (Boolean(args.trim())) {
      //   const res = window.query(args);
      //   setQueryResult({});
    } else {
      setQueryResult(Items);
    }
  };

  //   const EdnUI = window.ReplSimple;

  return (
    <div className="h-screen">
      <DynamoDBTableV3
        // items={Items}
        items={
          Boolean(queryResult)
            ? Array.isArray(queryResult)
              ? queryResult
              : [queryResult]
            : Items
        }
        TableName={props.TableName}
        updateItem={(data: any) => {
          const clonedData = JSON.parse(JSON.stringify(data));
          const keyVal = clonedData[keyAttribute];

          delete clonedData[keyAttribute];

          // updateItem.mutate(
          //   constructParams({
          //     Key: {
          //       [keyAttribute]: keyVal,
          //     },
          //     data: {
          //       ...clonedData,
          //     },
          //   })
          // );
        }}
        deleteItem={(item: any) => {
          const keyVal = item[keyAttribute];
          console.log("DELETEEEE");
          // deleteItem.mutate({
          //   Key: {
          //     [keyAttribute]: keyVal,
          //   },
          // });
        }}
      />
    </div>
  );
}
