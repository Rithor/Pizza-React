import { forwardRef } from "react";
import styles from "./Search.module.css";
import cn from "classnames";
import { SearchProps } from "./Search.props";
import searchIcon from "@images/search-icon.svg";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input(
  { isValid = true, className, ...props },
  ref
) {
  return (
    <div className={styles["input-wrapper"]}>
      <input
        ref={ref}
        className={cn(styles["input"], className, {
          [styles["invalid"]]: isValid,
        })}
        {...props}
      />
      <img className={styles["icon"]} src={searchIcon} alt="Иконка лупы" />
    </div>
  );
});

export default Search;
