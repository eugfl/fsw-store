import { ComponentProps } from "react";

const SectionTitle = ({ children, ...props }: ComponentProps<"p">) => {
  return (
    <p className="text-lg font-bold uppercase tracking-tight" {...props}>
      {children}
    </p>
  );
};

export default SectionTitle;
