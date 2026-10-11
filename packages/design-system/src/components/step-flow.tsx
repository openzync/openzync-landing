import { cn } from "../cn";
import { MonoMeta } from "./mono-meta";

export interface StepFlowStep {
  index: string;
  title: string;
  body: string;
  frame?: React.ReactNode;
  mono?: string;
}

export interface StepFlowProps {
  steps: StepFlowStep[];
  className?: string;
}

export function StepFlow({ steps, className }: StepFlowProps) {
  return (
    <ol className={cn("flex max-w-2xl flex-col gap-12", className)}>
      {steps.map((step, i) => (
        <li key={step.index} className="relative pl-12 sm:pl-14">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface-900 font-mono text-xs text-dim"
          >
            {step.index}
          </span>
          {i < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute bottom-[-3rem] left-[17px] top-10 w-px bg-line"
            />
          ) : null}
          <h3 className="text-base font-semibold text-text">
            {step.title}
          </h3>
          {step.mono ? (
            <MonoMeta className="mt-1 block">{step.mono}</MonoMeta>
          ) : null}
          <p className="mt-3 text-muted">{step.body}</p>
          {step.frame ? <div className="mt-6">{step.frame}</div> : null}
        </li>
      ))}
    </ol>
  );
}
