import React from "react";
import { HMIFrame } from "../layout/hmi-frame";
import { ViewManager } from "@/lib/navigation/view-manager";

interface HMIRouteProps {
  initialView?: string;
}

/**
 * HMIRoute - Wrapper para rutas del sistema HMI
 * Mantiene las dimensiones fijas 800x480px y el View Manager
 */
export const HMIRoute: React.FC<HMIRouteProps> = ({ initialView = "splash-screen" }) => {
  return (
    <HMIFrame>
      <ViewManager initialView={initialView} />
    </HMIFrame>
  );
};