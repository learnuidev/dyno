import {
  Bolt,
  FileStack,
  FunctionSquare,
  Layers2,
  Library,
  LibraryBig,
  Lock,
  MonitorPause,
  MonitorPlay,
  RefreshCcw,
  Search,
  Table,
  X,
} from "lucide-react";
import { IconTypes } from "../icons.types";

export const LucideIcons: IconTypes = {
  magnifyingGlass: Search,
  sync: RefreshCcw,
  join: FileStack,
  table: Table,
  x: X,
  lock: Lock,
  bolt: Bolt,
  lambda: FunctionSquare,
  verticalStack: Layers2,
  verticalStackSolid: Layers2,
  photoFilmSolid: MonitorPlay,
  photoFilm: MonitorPause,
  docs: Library,
  docsSolid: LibraryBig,
};
