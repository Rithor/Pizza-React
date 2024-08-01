import styles from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store/store";
import { cartActions } from "@src/store/cart.slice";
import { CartItemProps } from "./CartItem.props";
import minusIcon from "@images/minus-icon.svg";
import plusIcon from "@images/plus-icon.svg";
import deleteIcon from "@images/delete-icon.svg";

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const increase = () => {
    dispatch(cartActions.add(props.id));
  };

  const decrease = () => {
    dispatch(cartActions.remove(props.id));
  };

  const remove = () => {
    dispatch(cartActions.delete(props.id));
  };

  return (
    <div className={styles["item"]}>
      <div
        className={styles["image"]}
        style={{
          background: `url('${props.image}') center no-repeat`,
        }}
      ></div>
      <div className={styles["description"]}>
        <div className={styles["name"]}>{props.name}</div>
        <div className={styles["price"]}>{props.price}&nbsp;₽</div>
      </div>
      <div className={styles["actions"]}>
        <button className={styles["minus"]} onClick={decrease}>
          <img src={minusIcon} alt="Удалить из корзины" />
        </button>
        <div className={styles["number"]}>{props.count}</div>
        <button className={styles["plus"]} onClick={increase}>
          <img src={plusIcon} alt="Добавить в корзину" />
        </button>
        <button className={styles["remove"]} onClick={remove}>
          <img src={deleteIcon} alt="Удалить все" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
