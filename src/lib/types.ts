import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

export type CategoryId =
  | "format"
  | "encode"
  | "crypto"
  | "text"
  | "time"
  | "network"
  | "devops";

export interface UtilityMeta {
  /** URL slug, must be unique */
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  keywords: string[];
  icon: LucideIcon;
}

export interface Utility extends UtilityMeta {
  component: ComponentType;
}

/** Shape every utility module must export. */
export interface UtilityModule {
  meta: UtilityMeta;
  default: ComponentType;
}

export interface Category {
  id: CategoryId;
  title: string;
  description: string;
  icon: LucideIcon;
}
