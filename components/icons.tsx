import { siteConfig } from "@/lib/site-config";
import { FontAwesomeIcons } from "./font-awesome-icons";

import { LucideIcons } from "./lucide-icons";

// Note to self: use dynamic imports when you figure out how to
export const Icons = (() => {
  return siteConfig.iconsType === "lucide" ? LucideIcons : FontAwesomeIcons;
})();
