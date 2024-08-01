import { ChangeEvent, useEffect, useRef, useState } from "react";
import Headline from "@src/components/Headline/Headline";
import Search from "@src/components/Search/Search";
import { PREFIX } from "@src/helpers/API";
import { IProduct } from "@src/interfaces/product.interface";
import styles from "./Menu.module.css";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";

export function Menu() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`, {
        params: {
          name,
        },
      });
      setProducts(data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        setError(e.message);
      }
      setIsLoading(false);
      return;
    }
  };

  function useDebounce(callback: (data: string) => void, delay: number) {
    const timer = useRef<number | NodeJS.Timeout | null>(null);

    useEffect(() => {
      return () => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
      };
    }, []);

    const debouncedCallback = (data: string) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(data);
      }, delay);
    };

    return debouncedCallback;
  }
  const debouncedFetchData = useDebounce(getMenu, 500);

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedFetchData(e.target.value);
  };

  return (
    <>
      <div className={styles["head"]}>
        <Headline>Меню</Headline>
        <Search
          placeholder="Введите блюдо или состав"
          onChange={updateFilter}
        />
      </div>
      <div>
        {error && (
          <div className="notification">
            <div>{error}</div>
          </div>
        )}
        {!isLoading && products.length > 0 && <MenuList products={products} />}
        {isLoading && (
          <div className="notification">
            <div>Загружаем продукты...</div>
          </div>
        )}
        {!isLoading && products.length === 0 && (
          <div className="notification">
            <div>Не найдено блюд по запросу</div>
          </div>
        )}
      </div>
    </>
  );
}

export default Menu;
