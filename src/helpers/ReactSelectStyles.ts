// Original Credits: https://gist.github.com/ilkou/7bf2dbd42a7faf70053b43034fc4b5a4

import { cn } from "@/lib/utils";

const controlStyles = {
  base: "flex !min-h-9 w-full rounded-md border border-input bg-transparent pl-3 py-1 pr-1 gap-1 text-sm transition-colors hover:cursor-pointer",
  focus: "outline-none ring-1 ring-ring",
  disabled: "cursor-not-allowed opacity-50",
};
const placeholderStyles = "text-sm text-muted-foreground";
const valueContainerStyles = "gap-1";
const multiValueStyles =
  "inline-flex items-center gap-2 rounded-md border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 px-1.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
const indicatorsContainerStyles = "gap-1";
const clearIndicatorStyles = "p-1 rounded-md";
const indicatorSeparatorStyles = "bg-border";
const dropdownIndicatorStyles = "p-1 rounded-md";
const menuStyles =
  "p-1 mt-1 border bg-popover shadow-md rounded-md text-popover-foreground";
const groupHeadingStyles =
  "py-2 px-1 text-secondary-foreground text-sm font-semibold";
const optionStyles = {
  base: "hover:cursor-pointer hover:bg-accent hover:text-accent-foreground px-2 py-1.5 rounded-sm !text-sm !cursor-default !select-none !outline-none font-sans",
  focus: "active:bg-accent/90 bg-accent text-accent-foreground",
  disabled: "pointer-events-none opacity-50",
  selected: "",
};
const noOptionsMessageStyles =
  "text-muted-foreground p-2";
const loadingIndicatorStyles =
  "flex items-center justify-center h-5 w-5 opacity-50";
const loadingMessageStyles = "text-muted-foreground p-2";

export const createClassNames = (classNames: any) => {
  return {
    clearIndicator: (state: any) =>
      cn(clearIndicatorStyles, classNames?.clearIndicator?.(state)),

    container: (state: any) => cn(classNames?.container?.(state)),

    control: (state: any) =>
      cn(
        controlStyles.base,
        state.isDisabled && controlStyles.disabled,
        state.isFocused && controlStyles.focus,
        classNames?.control?.(state)
      ),

    dropdownIndicator: (state: any) =>
      cn(dropdownIndicatorStyles, classNames?.dropdownIndicator?.(state)),

    group: (state: any) => cn(classNames?.group?.(state)),

    groupHeading: (state: any) =>
      cn(groupHeadingStyles, classNames?.groupHeading?.(state)),

    indicatorsContainer: (state: any) =>
      cn(indicatorsContainerStyles, classNames?.indicatorsContainer?.(state)),

    indicatorSeparator: (state: any) =>
      cn(indicatorSeparatorStyles, classNames?.indicatorSeparator?.(state)),

    input: (state: any) => cn(classNames?.input?.(state)),

    loadingIndicator: (state: any) =>
      cn(loadingIndicatorStyles, classNames?.loadingIndicator?.(state)),

    loadingMessage: (state: any) =>
      cn(loadingMessageStyles, classNames?.loadingMessage?.(state)),

    menu: (state: any) => cn(menuStyles, classNames?.menu?.(state)),

    menuList: (state: any) => cn(classNames?.menuList?.(state)),

    menuPortal: (state: any) => cn(classNames?.menuPortal?.(state)),

    multiValue: (state: any) =>
      cn(multiValueStyles, classNames?.multiValue?.(state)),

    multiValueLabel: (state: any) => cn(classNames?.multiValueLabel?.(state)),

    multiValueRemove: (state: any) => cn(classNames?.multiValueRemove?.(state)),

    noOptionsMessage: (state: any) =>
      cn(noOptionsMessageStyles, classNames?.noOptionsMessage?.(state)),

    option: (state: any) =>
      cn(
        optionStyles.base,
        state.isFocused && optionStyles.focus,
        state.isDisabled && optionStyles.disabled,
        state.isSelected && optionStyles.selected,
        classNames?.option?.(state)
      ),

    placeholder: (state: any) =>
      cn(placeholderStyles, classNames?.placeholder?.(state)),

    singleValue: (state: any) => cn(classNames?.singleValue?.(state)),

    valueContainer: (state: any) =>
      cn(valueContainerStyles, classNames?.valueContainer?.(state)),
  };
};

export const defaultStyles = {
  input: (base: any) => ({
    ...base,
    "input:focus": {
      boxShadow: "none",
    },
  }),

  multiValueLabel: (base: any) => ({
    ...base,
    whiteSpace: "normal",
    overflow: "visible",
  }),

  control: (base: any) => ({
    ...base,
    transition: "none",
  }),

  menuList: (base: any) => ({
    ...base,
    "::-webkit-scrollbar": {
      background: "transparent",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      background: "hsl(var(--border))",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "transparent",
    },
  }),
};

export const defaultClassNames = createClassNames({});
