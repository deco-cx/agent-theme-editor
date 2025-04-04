export interface Theme {
  id: string;
  name: string;
  siteName?: string;
  colorScheme?: string;
  _filePath?: string;
  isDefault?: boolean;
  colors?: {
    main?: {
      base?: string;
      primary?: string;
      secondary?: string;
      tertiary?: string;
      quaternary?: string;
      accent?: string;
      neutral?: string;
      success?: string;
      warning?: string;
      error?: string;
      info?: string;
    };
    complementary?: {
      base200?: string;
      base300?: string;
      baseContent?: string;
      primaryContent?: string;
      secondaryContent?: string;
      accentContent?: string;
      neutralContent?: string;
      successContent?: string;
      warningContent?: string;
      errorContent?: string;
      infoContent?: string;
    };
  };
  button?: {
    borderWidth?: string;
    borderRadius?: string;
    radius?: string;
    clickScale?: string;
    clickDuration?: string;
  };
  styles?: {
    borderRadius?: string;
    roundedBox?: string;
    roundedBadge?: string;
    animationInput?: string;
    tabBorder?: string;
    tabRadius?: string;
  };
  font?: {
    googleFonts?: string[];
  };
  typography?: {
    fonts?: {
      primary?: {
        family?: string;
        weights?: string[];
      };
      secondary?: {
        family?: string;
        weights?: string[];
      };
    };
    fontSize?: {
      desktop?: string;
      tablet?: string;
      mobile?: string;
    };
    lineHeight?: string;
    letterSpacing?: string;
  };
  spacing?: {
    unit?: string;
    scale?: string;
  };
  borders?: {
    width?: {
      thin?: string;
      medium?: string;
      thick?: string;
    };
    style?: {
      solid?: string;
      dashed?: string;
      dotted?: string;
    };
    radius?: {
      none?: string;
      sm?: string;
      md?: string;
      lg?: string;
      full?: string;
    };
  };
  shadows?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    inner?: string;
  };
  breakpoints?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    "2xl"?: string;
    maxWidths?: {
      container?: string;
      content?: string;
    };
  };
  animations?: {
    duration?: {
      fast?: string;
      normal?: string;
      slow?: string;
    };
    easing?: {
      linear?: string;
      ease?: string;
      easeIn?: string;
      easeOut?: string;
    };
  };
  images?: {
    aspectRatios?: {
      [key: string]: string;
    };
    optimization?: {
      formats?: string[];
      quality?: number;
      sizes?: string[];
    };
  };
  grid?: {
    container?: {
      maxWidth?: string;
      padding?: {
        desktop?: string;
        tablet?: string;
        mobile?: string;
      };
    };
    columns?: {
      desktop?: number;
      tablet?: number;
      mobile?: number;
    };
    gap?: {
      desktop?: string;
      tablet?: string;
      mobile?: string;
    };
  };
  sections?: {
    hero?: {
      height?: {
        desktop?: string;
        tablet?: string;
        mobile?: string;
      };
      padding?: {
        desktop?: string;
        tablet?: string;
        mobile?: string;
      };
      background?: {
        type?: string;
        value?: string;
        overlay?: {
          color?: string;
          opacity?: string;
        };
      };
    };
    features?: {
      layout?: string;
      columns?: {
        desktop?: number;
        tablet?: number;
        mobile?: number;
      };
      gap?: {
        desktop?: string;
        tablet?: string;
        mobile?: string;
      };
    };
    cta?: {
      background?: {
        type?: string;
        value?: string;
      };
      padding?: {
        desktop?: string;
        tablet?: string;
        mobile?: string;
      };
      backgroundColor?: string;
    };
  };
  effects?: {
    transition?: {
      duration?: string;
      timing?: string;
    };
    opacity?: {
      hover?: string;
      disabled?: string;
    };
    blur?: {
      sm?: string;
      md?: string;
      lg?: string;
    };
  };
}

export interface ValidationError {
  message: string;
  path: string[];
} 