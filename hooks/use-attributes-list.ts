export const useAttributesList = (scannedData: any) => {
  const attributesList = [
    ...(new Set(
      scannedData?.map((item: any) => Object.keys(item)).flat()
    ) as any),
  ]?.filter((item) => !Number.isFinite(parseInt(item)));

  return attributesList;
};
