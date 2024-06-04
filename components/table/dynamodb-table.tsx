import React, { useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Checkbox } from "@/components/ui/checkbox";

import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getExpandedRowModel,
  Row,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";

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
  return (
    <pre style={{ fontSize: "10px" }}>
      <code>{JSON.stringify(row.original)}</code>
    </pre>
  );
};

export function DynamoDBTableV3(props: any) {
  const [attribute, setAttribute] = useState("level");
  const [predicate, setPredicate] = useState(">");
  const [value, setValue] = useState("100");
  //   const { items } = props;

  const onUpdate = (queryStr: string) => {
    if (queryStr) {
      const newItems = props?.items?.filter((item: any) => {
        return JSON.stringify(item)
          ?.toLowerCase()
          ?.includes(queryStr?.toLowerCase());
      });

      setItems(newItems);
    } else {
      setItems(props?.items?.slice(0, 200));
    }
  };

  const debouncedSearch = useDebouncedCallback(
    // function
    (value) => {
      onUpdate?.(value);
    },
    // delay in ms
    400
  );

  const [items, setItems] = useState(props.items?.slice(0, 200));
  const [activeData, setActiveData] = React.useState(null);

  const runSearch = () => {
    const newItems = props?.items?.filter((item: any) => {
      const itemVal = item?.[attribute] as any;

      if (["contains", "cont", "inc", "includes"]?.includes(predicate)) {
        return itemVal?.includes(value);
      }

      if (["eq", "equals", "="]?.includes(predicate)) {
        return itemVal === value;
      }
      if (["neq", "not equals", "not="]?.includes(predicate)) {
        return itemVal !== value;
      }
      if (["<", "lt"]?.includes(predicate)) {
        return parseInt(itemVal) < parseInt(value);
      }
      if (["<=", "lte"]?.includes(predicate)) {
        return parseInt(itemVal) <= parseInt(value);
      }
      if ([">", "gt"]?.includes(predicate)) {
        return parseInt(itemVal) > parseInt(value);
      }
      if ([">=", "gte"]?.includes(predicate)) {
        return parseInt(itemVal) >= parseInt(value);
      }

      return false;
    });

    setItems(newItems);
  };

  const clearSearch = () => {
    setItems(props?.items);
  };

  const titles = [
    ...(new Set(items.map((item: any) => Object.keys(item)).flat()) as any),
  ]?.filter((item) => !Number.isFinite(parseInt(item)));

  function MyCell(props: any) {
    const value = props.getValue();
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

    return [
      //   {
      //     id: "Action",
      //     header: () => <span>...</span>,
      //     cell: ({ row }: any) => {
      //       return (
      //         <div className="opacity-0 transition-opacity hover:opacity-100 flex justify-around">
      //           <div>
      //             <div>
      //               <button
      //                 className="dark:text-gray-200 dark:active:bg-zinc-700 dark:hover:bg-zinc-800"
      //                 onClick={() => {
      //                   setActiveData(row.original);
      //                 }}
      //               >
      //                 edit
      //                 {/* <PencilIcon className="dark:text-gray-200 h-3 w-3 dark:bg-gray-900 text-gray-800 hover:text-pink-600 dark:hover:text-pink-600" /> */}
      //               </button>
      //             </div>
      //           </div>

      //           <div>
      //             <div>
      //               <button
      //                 className="dark:text-gray-200 dark:active:bg-zinc-700 dark:hover:bg-zinc-800"
      //                 onDoubleClick={() => {
      //                   // table.options.meta?.setDelete(row.original);

      //                   props.deleteItem(row.original);
      //                 }}
      //               >
      //                 delete
      //                 {/* <TrashIcon className="dark:text-gray-200 h-3 w-3 dark:bg-gray-900 text-gray-800 hover:text-pink-600 dark:hover:text-pink-600" /> */}
      //               </button>
      //             </div>
      //           </div>
      //         </div>
      //       );
      //     },
      //   },
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

  const calculateValue = (val: any) => {
    if (typeof val === "object" && !Array.isArray(val) && val !== null) {
      const [[key, value]] = Object.entries(val) as any;

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

        for (const key of keys) {
          const val = item[key];

          // const presVal = typeof val === 'object' ? JSON.stringify(val) : val;
          const presVal = calculateValue(val);
          //   @ts-ignore
          res[key] = presVal;
        }

        return res;
      }),
    [items]
  );

  const [data, setData] = React.useState(() => presView);

  const [columns, setColumns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ]);

  const table = useReactTable({
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
  }, [defaultColumns, items]);

  return (
    <div className="mx-4">
      <div className="grid grid-cols-12 gap-4 m-4">
        {table.getAllLeafColumns().map((column) => {
          return (
            <div key={column.id} className="flex space-x-2">
              {/* <Checkbox
                checked={column.getIsVisible()}
                onInput={() => {
                  column.getToggleVisibilityHandler();
                }}
              /> */}
              <input
                className={cn(
                  "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
                  ""
                )}
                {...{
                  type: "checkbox",
                  checked: column.getIsVisible(),
                  onChange: column.getToggleVisibilityHandler(),
                }}
              />
              <label className="truncate">{column.id}</label>
            </div>
          );
        })}
      </div>
      <div className="mb-4 space-x-4">
        <input
          //   value={attribute}
          onChange={(e) => {
            debouncedSearch(e.target.value);
          }}
          placeholder="Search table"
          className="h-10 px-2 w-1/2 placeholder:text-gray-400"
        />
      </div>
      <div className="mb-4 space-x-4">
        <input
          value={attribute}
          onChange={(e) => {
            setAttribute(e.target.value);
          }}
          placeholder="attribute"
          className="h-10 px-2"
        />
        <input
          placeholder="predicate"
          value={predicate}
          onChange={(e) => {
            setPredicate(e.target.value);
          }}
          className="h-10 px-2"
        />
        <input
          placeholder="value"
          className="h-10 px-2"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />

        <button onClick={runSearch}>Run ⌘</button>
        <button onClick={clearSearch}>Clear</button>
      </div>
      <div className="overflow-x-auto overflow-y-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
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
                      const val = calculateValue(
                        // @ts-ignore
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                          // @ts-ignore
                        ).props.getValue()
                      );

                      const originalVal = cell.row.original;

                      const stringifiedCellValue = JSON.stringify(val);

                      const cellValueFormatted =
                        stringifiedCellValue?.length > 54
                          ? `${stringifiedCellValue?.slice(0, 54)}...`
                          : stringifiedCellValue;

                      return (
                        //   eslint-disable-next-line
                        <td
                          {...{
                            key: cell.id,
                            className:
                              "whitespace-nowrap p-2 text-xs text-gray-500 dark:text-gray-300 truncate",
                            style: {
                              width: cell.column.getSize(),
                            },
                          }}
                          onClick={() => {
                            console.log(originalVal);
                            alert(JSON.stringify(originalVal));
                          }}
                        >
                          {/* {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )} */}
                          {/* {JSON.stringify(val)?.slice(0, 54)} */}
                          {cellValueFormatted}
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

  const [queryState, setQueryState] = useState(null);
  const [queryResult, setQueryResult] = useState(null);

  const keyAttribute = useMemo(
    () =>
      tableDescription?.Table?.KeySchema.find(
        (ks: any) => ks.KeyType === "HASH"
      )?.AttributeName,
    [tableDescription]
  );

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
    return (
      <div className="text-center pt-32">
        <h2 className="text-3xl"> Nothing here </h2>

        <p className="text-xl text-gray-400 font-extralight mt-4">
          Please select a different table and try again
        </p>
      </div>
    );
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
