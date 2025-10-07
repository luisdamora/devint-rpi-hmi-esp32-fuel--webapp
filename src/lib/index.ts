// Types
export type {
  ViewRegistryItem,
  ViewState,
  ModuleConfig,
  LayoutConfig,
  NavigationItem,
  HMIState,
  HMILayoutProps,
  ViewManagerProps,
} from "./types/modules";

// View Registry
export {
  VIEW_REGISTRY,
  getViewById,
  getViewsByModule,
  getAllModules,
  getNavigationViews,
} from "./config/view-registry";

// Layout Configuration
export {
  DEFAULT_LAYOUT_CONFIG,
  MODULE_CONFIGS,
  NAVIGATION_ITEMS,
  THEME_CONFIGS,
  SCREEN_CONFIGS,
  ANIMATION_CONFIGS,
  getModuleConfig,
  getNavigationItems,
  getThemeConfig,
} from "./config/layout-config";

// Components
export { HMILayout } from "../components/layouts/hmi-layout";
export { ViewManager, useViewNavigation } from "./navigation/view-manager";

// Module Components
export { SplashScreen } from "../components/modules/auth/splash-screen";
export { MainMenu } from "../components/modules/auth/main-menu";
export { LoginViewComponent } from "../components/modules/auth/login-view";
export { CloseTurnViewComponent } from "../components/modules/auth/close-turn-view";
export { KeypadViewComponent } from "../components/modules/sales/keypad-view";
export { PaymentMethods } from "../components/modules/sales/payment-methods";
export { PointsView } from "../components/modules/loyalty/points-view";