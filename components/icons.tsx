import { siteConfig } from "@/lib/site-config";
import { FontAwesomeIcons } from "./icons.font-awesome";

import { LucideIcons } from "./icons.lucide";

// Note to self: use dynamic imports when you figure out how to
export const Icons = (() => {
  return siteConfig.iconsType === "lucide" ? LucideIcons : FontAwesomeIcons;
})();
