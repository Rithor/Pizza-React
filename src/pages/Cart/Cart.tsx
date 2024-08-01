import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Cart.module.css";
import Headline from "@src/components/Headline/Headline";
import CartItem from "@src/components/CartItem/CartItem";
import Button from "@src/components/Button/Button";
import { IProduct } from "@src/interfaces/product.interface";
import { PREFIX } from "@src/helpers/API";
import { AppDispatch, RootState } from "@src/store/store";
import { cartActions } from "@src/store/cart.slice";

const DELIVERY_FEE = 169;

export function Cart() {
  const [cartProducts, setCardProducts] = useState<IProduct[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const total = items
    .map((i) => {
      const product = cartProducts.find((p) => p.id === i.id);
      if (!product) {
        return 0;
      }
      return i.count * product.price;
    })
    .reduce((acc, i) => (acc += i), 0);

  const getItem = async (id: number) => {
    const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((i) => getItem(i.id)));
    setCardProducts(res);
  };

  const checkout = async () => {
    await axios.post(
      `${PREFIX}/order`,
      {
        products: items,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(cartActions.clean());
    navigate("/success");
  };

  useEffect(() => {
    loadAllItems();
  }, [items]);

  return (
    <>
      <Headline className={styles["headline"]}>Корзина</Headline>
      <section className={styles["cart-body"]}>
        {items.map((i) => {
          const product = cartProducts.find((p) => p.id === i.id);
          if (!product) {
            return;
          }
          return <CartItem key={product.id} count={i.count} {...product} />;
        })}
        {!items.length ? (
          <section className="notification">
            <div>Корзина пуста</div>
            <Button onClick={() => navigate("/")}>Начать покупки</Button>
          </section>
        ) : (
          <section className="amount">
            <div className={styles["line"]}>
              <div className={styles["text"]}>Итог</div>
              <div className={styles["price"]}>
                {total}&nbsp;<span>₽</span>
              </div>
            </div>
            <hr className={styles["hr"]} />
            <div className={styles["line"]}>
              <div className={styles["text"]}>Доставка</div>
              <div className={styles["price"]}>
                {DELIVERY_FEE}&nbsp;<span>₽</span>
              </div>
            </div>
            <hr className={styles["hr"]} />
            <div className={styles["line"]}>
              <div className={styles["text"]}>
                Итог{" "}
                <span className={styles["total-count"]}>({items.length})</span>
              </div>
              <div className={styles["price"]}>
                {total + DELIVERY_FEE}&nbsp;<span>₽</span>
              </div>
            </div>
            <div className={styles["checkout"]}>
              <Button appearance="big" onClick={checkout}>
                оформить
              </Button>
            </div>
          </section>
        )}
      </section>
    </>
  );
}
