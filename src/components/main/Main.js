import { useEffect, useState } from "react";
import classes from "./Main.module.css";

import deleteIcon from "./trash.png";

const Main = () => {
  const [listItem, setListItem] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("list")) {
      setList(JSON.parse(localStorage.getItem("list")));
    }
  }, []);

  const listItemHandler = (e) => {
    setListItem(e.target.value);
  };

  const deleteItem = (e) => {
    const newList = list.filter((item) => item !== e);
    setList(newList);
    console.log(newList);
    console.log(list);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setList((prev) => [...prev, listItem]);
    setListItem("");
  };

  const clearList = () => {
    localStorage.removeItem("list");
    setList([]);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  //   const shoppingCart = localStorage.getItem("list");

  return (
    <section className={classes.mainSection}>
      <div className={classes.container}>
        <div className={classes.addToListContainer}>
          <h1 className={classes.heading}>
            Öncelikle alışveriş listemizi oluşturalım
          </h1>
          <div className={classes.inputs}>
            <form onSubmit={submitHandler} className={classes.productNameInput}>
              <label htmlFor="name">ürün adı</label>
              <input
                type="text"
                id="name"
                placeholder="ör: çamaşır deterjanı"
                onChange={listItemHandler}
                value={listItem}
                required
              />
              <button className={classes.button}>ekle</button>
            </form>
          </div>
          {list.length > 1 && (
            <button className={classes.button} onClick={clearList}>
              tüm listeyi sil
            </button>
          )}
        </div>

        <div className={classes.listContainer}>
          {list &&
            list.map((item, index) => {
              return (
                <div className={classes.shopList} key={index}>
                  <p className={classes.itemNumber}>{index + 1}-</p>
                  <div>
                    <p className={classes.itemName}>{item}</p>
                  </div>

                  <div
                    className={classes.deleteIcon}
                    onClick={() => deleteItem(item)}
                  >
                    <img
                      src={deleteIcon}
                      alt=""
                      className={classes.deleteIcon}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Main;
