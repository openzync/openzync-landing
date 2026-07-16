// src/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/spinner.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Spinner({ size = 16, className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: cn("animate-spin text-current", className),
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx(
          "circle",
          {
            className: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            strokeWidth: "4"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            className: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          }
        )
      ]
    }
  );
}

// src/components/button.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var variantStyles = {
  primary: "bg-brand-500 text-white hover:bg-brand-600 shadow-sm",
  secondary: "bg-transparent text-surface-100 border border-surface-700 hover:bg-surface-800 hover:text-white",
  ghost: "bg-transparent text-surface-300 hover:bg-surface-800 hover:text-white",
  danger: "bg-error text-white hover:bg-[#d32f2f] shadow-sm hover:shadow-[0_0_20px_rgba(239,83,80,0.3)]"
};
var sizeStyles = {
  sm: "text-xs px-2.5 py-1.5 rounded-md gap-1.5",
  md: "text-sm px-4 py-2 rounded-md gap-1.5",
  lg: "text-sm px-5 py-2.5 rounded-lg gap-2"
};
function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  disabled,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs2(
    "button",
    {
      className: cn(
        "inline-flex items-center justify-center font-medium transition-all duration-150",
        "focus-visible:outline-2 focus-visible:outline-accent-300 focus-visible:outline-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "cursor-pointer active:scale-[0.97]",
        variantStyles[variant],
        sizeStyles[size],
        className
      ),
      disabled: disabled || loading,
      ...props,
      children: [
        loading ? /* @__PURE__ */ jsx2(Spinner, { size: 14 }) : icon ? icon : null,
        children
      ]
    }
  );
}

// ../../node_modules/class-variance-authority/dist/index.mjs
import { clsx as clsx2 } from "clsx";
var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
var cx = clsx2;
var cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};

// src/components/badge.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var badgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-surface-700 text-surface-300",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        error: "bg-error/10 text-error",
        info: "bg-accent-300/10 text-accent-300",
        brand: "bg-brand-500/10 text-brand-300"
      },
      size: {
        sm: "text-[10px] px-1.5 py-0.5",
        md: "text-xs px-2 py-0.5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
function Badge({
  className,
  variant,
  size,
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    "span",
    {
      className: cn(badgeVariants({ variant, size }), className),
      ...props
    }
  );
}
export {
  Badge,
  Button,
  Spinner,
  cn
};
