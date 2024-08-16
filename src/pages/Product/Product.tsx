import { Suspense } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@src/store/store";
import { cartActions } from "@src/store/cart.slice";
import styles from "./Product.module.css";
import { IProduct } from "@src/interfaces/product.interface";
import Headline from "@src/components/Headline/Headline";
import Button from "@src/components/Button/Button";
import backIcon from "@images/back-icon.svg";
import cartIcon from "@images/cart-button-icon.svg";
import starIcon from "@images/star-icon.svg";

export function Product() {
  const { data } = useLoaderData() as { data: IProduct };
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Suspense
        fallback={
          <div className="notification">
            <div>Загрузка...</div>
          </div>
        }
      >
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
                <Headline>{data.name}</Headline>
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
                      <img src={starIcon} alt="Иконка звезды" />
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
