import { zipThemes } from '@table-library/react-table-library/theme/index';

type Configuration = {
  isVirtualized?: boolean;
};

type ConfigurationSound = {
  isVirtualized: boolean;
};

type Options = {
  horizontalSpacing?: number;
  verticalSpacing?: number;
  striped?: boolean;
  highlightOnHover?: boolean;
};

type OptionsSound = {
  horizontalSpacing: number;
  verticalSpacing: number;
  striped: boolean;
  highlightOnHover: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCommonTheme = (options: OptionsSound, _: ConfigurationSound) => ({
  Table: `
    .caption-container {
      padding: 10px 22px;
      display: flex;
      justify-content: flex-start;
      width: 100%;

      border-top: 1px solid #e0e0e0;
    }

    caption {
      font-size: 14px;
      color: #868e96;
    }

    .tr-footer {
      border-top: 1px solid #e0e0e0;
      border-bottom: 1px solid transparent;
    }
  `,
  BaseRow: `
    height: 54px;

    font-size: 14px;
  `,
  HeaderRow: `
    font-weight: bold;
    border-bottom: 1px solid #e0e0e0;
  `,
  Row: `
    &.row-select.row-select-single-selected, &.row-select.row-select-selected {
      background-color: #bddffd;
    }
  `,
  BaseCell: `
    padding: ${options.verticalSpacing}px ${options.horizontalSpacing}px;

    border-right: 1px solid transparent;
    border-bottom: 1px solid transparent;

    &:focus {
      outline: dotted;
      outline-width: 1px;
      outline-offset: -1px;
    }
  `,
});

const getVirtualizedHighlight = (highlightOnHover: boolean) =>
  highlightOnHover
    ? `
      & > div:hover > .tr {
        background-color: #f1f3f5;
      }
    `
    : '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getVirtualizedTheme = (options: OptionsSound, configuration: ConfigurationSound) => ({
  Body: `
    & > div:not(:last-child) > .tr {
      border-bottom: 1px solid #e2e8f0;
    }

    & > div:nth-child(odd) > .tr {
      background-color: ${options.striped ? '#f5f5f5' : '#ffffff'};
    }

    & > div:nth-child(even) > .tr {
      background-color: #ffffff;
    }

    ${getVirtualizedHighlight(options.highlightOnHover)}
  `,
});

const getNoneVirtualizedHighlight = (highlightOnHover: boolean) =>
  highlightOnHover
    ? `
      &:hover {
        background-color: #f1f3f5;
      }
    `
    : '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNoneVirtualizedTheme = (options: OptionsSound, configuration: ConfigurationSound) => ({
  Row: `
    &.tr:not(:last-child) {
      border-bottom: 1px solid #e2e8f0;
    }

    &:nth-child(odd) {
      background-color: ${options.striped ? '#f5f5f5' : '#ffffff'};
    }

    &:nth-child(even) {
      background-color: #ffffff;
    }

    ${getNoneVirtualizedHighlight(options.highlightOnHover)}
  `,
});

const getZipTheme = (options: OptionsSound, configuration: ConfigurationSound) => {
  const commonTheme = getCommonTheme(options, configuration);

  const specificTheme = configuration.isVirtualized
    ? getVirtualizedTheme(options, configuration)
    : getNoneVirtualizedTheme(options, configuration);

  return zipThemes([commonTheme, specificTheme]);
};

export const DEFAULT_OPTIONS = {
  horizontalSpacing: 16,
  verticalSpacing: 16,
  striped: false,
  highlightOnHover: false,
};

export const DEFAULT_CONFIGURATION = {
  isVirtualized: false,
};

export const getTheme = (options?: Options, configuration?: Configuration) => {
  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...(options ? options : {}),
  };

  const mergedConfiguration = {
    ...DEFAULT_CONFIGURATION,
    ...(configuration ? configuration : {}),
  };

  return getZipTheme(mergedOptions, mergedConfiguration);
};