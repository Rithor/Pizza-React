import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import logoIcon from "@images/logo.svg";

export function AuthLayout() {
  return (
    <div className={styles["layout"]}>
      <div className={styles["logo"]}>
        <img src={logoIcon} alt="Логотип компании" />
      </div>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
}
