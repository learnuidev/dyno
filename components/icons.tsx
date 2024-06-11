import { siteConfig } from "@/lib/site-config";
import { FontAwesomeIcons } from "./font-awesome-icons";

import { LucideIcons } from "./lucide-icons";

export const Icons = (() => {
  return siteConfig.iconsType === "lucide" ? LucideIcons : FontAwesomeIcons;
})();
