import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

import { faPhotoFilm as faPhotoFilmSolid } from "@fortawesome/sharp-solid-svg-icons";

import {
  faBolt,
  faLambda,
  faPhotoFilm,
  faLock,
  faMagnifyingGlass,
  faObjectIntersect,
  faRectangleVerticalHistory,
  faRotate,
  faTable,
  faXmark,
} from "@fortawesome/pro-thin-svg-icons";
import { faRectangleVerticalHistory as faRectangleVerticalHistorySolid } from "@fortawesome/pro-solid-svg-icons";

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
  verticalStack: createIcon(faRectangleVerticalHistory),
  verticalStackSolid: createIcon(faRectangleVerticalHistorySolid),
  photoFilmSolid: createIcon(faPhotoFilmSolid),
  photoFilm: createIcon(faPhotoFilm),
};
