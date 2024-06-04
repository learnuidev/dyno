import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableInfo } from "./table-info";
import { TableData } from "./table-data";

export const SelectedTable = ({ selectedTable }: { selectedTable: string }) => {
  return (
    <section className={""}>
      <Tabs defaultValue="table" className="p-0">
        <div className="pt-8 flex justify-between items-center ">
          <TabsList className="space-x-8 dark:bg-black flex justify-center w-full">
            <TabsTrigger
              value="info"
              className="px-0 data-[state=active]:text-white data-[state=active]:bg-black"
            >
              Info
              {/* <Icons.info className="text-2xl" /> */}
            </TabsTrigger>
            <TabsTrigger
              value="table"
              className="px-0 data-[state=active]:text-white data-[state=active]:bg-black"
            >
              Table
              {/* <Icons.table className="text-2xl" /> */}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="info" className="py-8">
          <TableInfo selectedTable={selectedTable} />
        </TabsContent>
        <TabsContent value="table" className="h-screen">
          <TableData selectedTable={selectedTable} />
        </TabsContent>
      </Tabs>
    </section>
  );
};
