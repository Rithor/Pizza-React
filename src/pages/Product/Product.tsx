import { Await, Link, useLoaderData } from "react-router-dom";
import { IProduct } from "../../interfaces/product.interface";
import { Suspense } from "react";
import backIcon from "../../../public/back-icon.svg";
import Headling from "../../components/Headling/Headling";
import styles from "./Product.module.css";
import Button from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import cartIcon from "../../../public/cart-button-icon.svg";

export function Product() {
  const { data } = useLoaderData() as { data: IProduct };
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Suspense fallback={"Загружаю..."}>
        <Await resolve={data}>
          {({ data }: { data: IProduct }) => (
            <section className={styles.wrapper}>
              <div className={styles.head}>
                <Link to={"/"}>
                  <img
                    className={styles.backIcon}
                    src={backIcon}
                    alt="В Меню"
                  />
                </Link>
                <Headling>{data.name}</Headling>
                <Button
                  className={styles["addToCart"]}
                  onClick={() => {
                    dispatch(cartActions.add(data.id));
                  }}
                >
                  <img src={cartIcon} alt="Иконка добавить в корзину" />В
                  Корзину
                </Button>
              </div>
              <div className={styles.body}>
                <div className={styles.image}>
                  <img src={data.image} />
                </div>
                <div className={styles.text}>
                  <div className={styles["price-wr"]}>
                    <div className={styles.price}>Цена</div>
                    <div className={styles["price-value"]}>
                      {data.price}&nbsp;
                      <span className={styles["currency"]}>₽</span>
                    </div>
                  </div>
                  <div className={styles["rating-wr"]}>
                    <div className={styles.price}>Рейтинг</div>
                    <div className={styles["rating-value"]}>
                      {data.rating}&nbsp;
                      <img src="/star-icon.svg" alt="Иконка звезды" />
                    </div>
                  </div>
                  <div className={styles["ingredients-wr"]}>
                    <div className={styles["ingredients-title"]}>Состав:</div>
                    <ul>
                      {data.ingredients.map((ingredient) => {
                        return <li>{ingredient}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}
        </Await>
      </Suspense>
    </>
  );
}
