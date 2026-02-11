import { ComponentProps } from "react";

const SectionTitle = ({ children, ...props }: ComponentProps<"p">) => {
  return (
    <p className="mb-2 font-bold uppercase tracking-wide text-sm" {...props}>
      {children}
    </p>
  );
};

export default SectionTitle;
