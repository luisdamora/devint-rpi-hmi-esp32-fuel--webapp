import React from "react";
import { NEXUS_COLORS } from "@/lib/config/theme";

interface PublicRouteProps {
  children: React.ReactNode;
  title?: string;
}

/**
 * PublicRoute - Wrapper para rutas públicas
 * Layout limpio y minimalista para páginas públicas
 */
export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  title = "Nexus POS"
}) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: NEXUS_COLORS.neutral.gray50 }}
    >
      <div className="w-full max-w-md">
        {/* Logo y Header */}
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 mx-auto rounded-xl flex items-center justify-center mb-4"
            style={{ backgroundColor: NEXUS_COLORS.primary.blue }}
          >
            <span className="text-white font-bold text-2xl">POS</span>
          </div>
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: NEXUS_COLORS.neutral.gray900 }}
          >
            {title}
          </h1>
          <p
            className="text-sm"
            style={{ color: NEXUS_COLORS.neutral.gray600 }}
          >
            Sistema de Punto de Venta
          </p>
        </div>

        {/* Content Card */}
        <div
          className="rounded-xl shadow-lg p-6"
          style={{
            backgroundColor: NEXUS_COLORS.white,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          }}
        >
          {children}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p
            className="text-xs"
            style={{ color: NEXUS_COLORS.neutral.gray500 }}
          >
            © 2024 Caprinosol Cloud. Todos los derechos reservados.
          </p>
          <div className="flex justify-center items-center space-x-4 mt-2">
            <span
              className="text-xs"
              style={{ color: NEXUS_COLORS.neutral.gray400 }}
            >
              v1.0.0
            </span>
            <span
              className="text-xs"
              style={{ color: NEXUS_COLORS.neutral.gray400 }}
            >
              •
            </span>
            <span
              className="text-xs"
              style={{ color: NEXUS_COLORS.neutral.gray400 }}
            >
              Nexus POS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};