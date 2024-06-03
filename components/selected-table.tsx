import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableInfo } from "./table-info";
import { TableData } from "./table-data";

export const SelectedTable = ({ selectedTable }: { selectedTable: string }) => {
  return (
    <section className={""}>
      <Tabs defaultValue="table" className="p-0">
        <div className="mt-8 flex justify-between items-center">
          <TabsList className="space-x-8">
            <TabsTrigger
              value="info"
              className="px-0 data-[state=active]:text-yellow-500"
            >
              Info
              {/* <Icons.info className="text-2xl" /> */}
            </TabsTrigger>
            <TabsTrigger
              value="table"
              className="px-0 data-[state=active]:text-yellow-500"
            >
              Table
              {/* <Icons.table className="text-2xl" /> */}
            </TabsTrigger>
            <TabsTrigger
              value="click"
              className="px-0 data-[state=active]:text-yellow-500"
            >
              Mouse
              {/* <Icons.computerMouse className="text-2xl" /> */}
            </TabsTrigger>
            <TabsTrigger
              // value="learned"
              value="discovered"
              className="px-0 data-[state=active]:text-yellow-500"
            >
              Bulb
              {/* <Icons.lightBulb className="text-2xl" /> */}
            </TabsTrigger>
          </TabsList>

          <div className="space-x-4"></div>
        </div>

        <TabsContent value="info" className="my-8">
          <TableInfo selectedTable={selectedTable} />
        </TabsContent>
        <TabsContent value="table" className="my-8">
          <TableData selectedTable={selectedTable} />
        </TabsContent>
        <TabsContent value="click" className="my-8">
          TODO
        </TabsContent>
        <TabsContent value="discovered" className="my-8">
          TODO
        </TabsContent>
      </Tabs>
    </section>
  );
};
