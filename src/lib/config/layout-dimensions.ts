/**
 * Layout Dimensions Configuration
 * Fixed dimensions for HMI interface at 800x480px
 */

export const LAYOUT_DIMENSIONS = {
  WIDTH: 800,
  HEIGHT: 480,
} as const;

export const HEADER_HEIGHT = 60;
export const FOOTER_HEIGHT = 40;
export const SIDEBAR_WIDTH = 60;

// Viewport background color (outside HMI frame)
export const VIEWPORT_BACKGROUND = "#1F2937";

// Calculate available content area
export const CONTENT_AREA = {
  WIDTH: LAYOUT_DIMENSIONS.WIDTH,
  HEIGHT: LAYOUT_DIMENSIONS.HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT,
} as const;