const updateOpParser = (ops: string) => {
  const [clause, updateFn] = ops?.split(", ");

  const [predicateOp, predicateAttribute, comparisionOp, predicateValue] =
    clause?.trim()?.split(" ");

  const [setOp, attrAndValue] = updateFn.split(" ");

  const [updateAttr, updateVal] = attrAndValue?.split("=");

  return {
    predicate: {
      op: predicateOp,
      attribute: predicateAttribute,
      value: predicateValue,
      comparisionOp,
    },

    update: {
      op: "set",
      attribute: updateAttr,
      value: updateVal,
    },
  };
};

const primaryParser = (dqlQuery: string) => {
  try {
    const [attribute, predicate, value] = dqlQuery?.split(" ");

    return {
      attribute,
      predicate,
      value,
    };
  } catch (err) {
    return {};
  }
};

export const dqlParser = (dqlQuery: string) => {
  const queryExample = `u: when level < 3500, set lang=zh`;

  try {
    if (dqlQuery?.includes(":")) {
      const [opName, ops] = dqlQuery?.split(":");

      if (opName === "u") {
        return updateOpParser(ops);
      }
    } else {
      return updateOpParser(dqlQuery);
    }
  } catch (err) {
    return primaryParser(dqlQuery);
    return {};
  }
};

export const runOp = (props: {
  predicate: string;
  attribute: string;
  value: string;
  items: any;
}) => {
  const { predicate, attribute, value } = props;
  const newItems = props?.items?.filter((item: any) => {
    const itemVal = item?.[attribute] as any;

    if (["contains", "cont", "inc", "includes", "~"]?.includes(predicate)) {
      return itemVal?.includes(value);
    }

    if (["eq", "equals", "="]?.includes(predicate)) {
      return itemVal == value;
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

  return newItems;
};
