import styles from "./Headline.module.css";
import cn from "classnames";
import { HeadlineProps } from "./Headline.props";

function Headline({ children, className, ...props }: HeadlineProps) {
  return (
    <h1 className={cn(className, styles["h1"])} {...props}>
      {children}
    </h1>
  );
}

export default Headline;
