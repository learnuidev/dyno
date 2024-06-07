import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

import {
  faBolt,
  faLambda,
  faLock,
  faMagnifyingGlass,
  faObjectIntersect,
  faRotate,
  faTable,
  faXmark,
} from "@fortawesome/pro-thin-svg-icons";

const createIcon = (icon: FontAwesomeIconProps["icon"]) => {
  const Icon = (props: any) => {
    return <FontAwesomeIcon icon={icon} {...props} />;
  };

  return Icon;
};

export const Icons = {
  magnifyingGlass: createIcon(faMagnifyingGlass),
  sync: createIcon(faRotate),
  join: createIcon(faObjectIntersect),
  table: createIcon(faTable),
  x: createIcon(faXmark),
  lock: createIcon(faLock),
  bolt: createIcon(faBolt),
  lambda: createIcon(faLambda),
};
