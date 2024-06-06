import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass } from "@fortawesome/pro-thin-svg-icons";

const createIcon = (icon: FontAwesomeIconProps["icon"]) => {
  const Icon = (props: any) => {
    return <FontAwesomeIcon icon={icon} {...props} />;
  };

  return Icon;
};

export const Icons = {
  magnifyingGlass: createIcon(faMagnifyingGlass),
};
