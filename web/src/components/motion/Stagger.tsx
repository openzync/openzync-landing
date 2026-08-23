import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

type StaggerProps = {
  children: ReactNode;
  /** Base delay between direct children in ms; consumed by <Reveal> siblings. */
  step?: number;
};

/** Stamps --stagger-index/--stagger-step onto each direct child for <Reveal>. */
export function Stagger({ children, step = 80 }: StaggerProps) {
  let index = 0;
  const indexed = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const element = child as ReactElement<{ style?: CSSProperties }>;
    return cloneElement(element, {
      style: {
        ...element.props.style,
        "--stagger-index": index++,
        "--stagger-step": `${step}ms`,
      } as CSSProperties,
    });
  });
  return <>{indexed}</>;
}
