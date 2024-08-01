import { HTMLAttributes, ReactNode } from "react";

export interface HeadlineProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}
