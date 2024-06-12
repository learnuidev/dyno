import { pluck } from "@/lib/utils";

export const listPreviewItems = ({ data, attributes, attributesV2 }: any) => {
  console.log("ATTRIBUTES", attributesV2);
  if (!attributesV2?.length) {
    const previewItems = data?.map((item: any) => {
      // return item;
      // return attributes;
      const init = pluck(item, attributes) as any;

      return {
        ...init,
        id: crypto.randomUUID(),
        // parentId: init?.[primaryKey],
      };
    });

    return previewItems;
  }

  const previewItems = data?.map((item: any) => {
    // return item;
    // return attributes;
    // const init = pluck(item, attributes) as any;

    const init = attributesV2?.reduce((acc: any, curr: any) => {
      if (curr?.includes("=")) {
        const [k, vals] = curr?.split("=");
        const values = vals
          ?.split("|")
          ?.map((val: any) => item?.[val])
          ?.filter(Boolean);
        return {
          ...acc,
          [k]: values?.[0],
        };
      } else {
        const val = pluck(item, [curr]);
        return {
          ...acc,
          ...val,
        };
      }
    }, {});

    return {
      ...init,
      id: crypto.randomUUID(),
      // parentId: init?.[primaryKey],
    };
  });

  return previewItems;
};
