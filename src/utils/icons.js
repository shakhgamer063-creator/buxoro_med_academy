import {
  Award, HeartPulse, Layers, Microscope, Sparkles, Stethoscope, TrendingUp, Users,
} from "lucide-react";

/** Admin paneldagi ikonka nomlarini haqiqiy komponentga bog'laydi. */
export const ICON_MAP = {
  users: Users,
  award: Award,
  trending: TrendingUp,
  layers: Layers,
  stethoscope: Stethoscope,
  microscope: Microscope,
  heart: HeartPulse,
  sparkles: Sparkles,
};

export function iconFor(name, fallback = Sparkles) {
  return ICON_MAP[name] || fallback;
}
