import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { AppDispatch, RootState } from "@src/store/store";
import { getProfile, userActions } from "@src/store/user.slice";
import Button from "@src/components/Button/Button";
import styles from "./Layout.module.css";
import avatarImg from "@images/avatar.png";
import menuIcon from "@images/menu-icon.svg";
import cartIcon from "@images/cart-icon.svg";
import exitIcon from "@images/exit-icon.svg";

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((s: RootState) => s.user.profile);
  const items = useSelector((s: RootState) => s.cart.items);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const logout = () => {
    dispatch(userActions.logout());
    navigate("/auth/login");
  };

  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["user"]}>
          <img
            className={styles["avatar"]}
            src={avatarImg}
            alt="Аватар пользователя"
          />
          <div className={styles["name"]}>{profile?.name}</div>
          <div className={styles["email"]}>{profile?.email}</div>
        </div>
        <div className={styles["menu"]}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles.active]: isActive,
              })
            }
          >
            <img src={menuIcon} alt="Иконка меню" />
            Меню
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles.active]: isActive,
              })
            }
          >
            <img src={cartIcon} alt="Иконка корзины" />
            Корзина{" "}
            <span className={styles["cart-count"]}>
              {items.reduce((acc, item) => (acc += item.count), 0)}
            </span>
          </NavLink>
        </div>
        <Button className={styles["exit"]} onClick={logout}>
          <img src={exitIcon} alt="Иконка выхода" />
          Выход
        </Button>
      </div>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
}
