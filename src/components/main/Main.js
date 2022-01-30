import { useEffect, useState } from "react";
import classes from "./Main.module.css";
import NumberFormat from "react-number-format";
import editIconImg from "./pencil.svg";
import deleteIcon from "./trash.png";

const Main = () => {
  const [listItem, setListItem] = useState("");
  const [targetInput, setTargetInput] = useState("");
  const [target, setTarget] = useState("");
  const [showTarget, setShowTarget] = useState(false);
  const [priceList, setPriceList] = useState(false);
  const [editIcon, setEditIcon] = useState(false);
  const [predict, setPredict] = useState("");
  const [marketList, setMarketList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("marketList")) {
      setMarketList(JSON.parse(localStorage.getItem("marketList")));
    }
  }, []);

  let priceArray = [];
  if (marketList.length > 0) {
    marketList.map((item) => priceArray.push(item.price));
  }

  let sum = 0;

  priceArray.map((el) => (sum += +el));

  const listItemHandler = (e) => {
    setListItem(e.target.value.toLowerCase());
  };

  const targetInputHandler = (e) => {
    setTargetInput(e.target.value);
  };

  const submitTargetHandler = (e) => {
    e.preventDefault();
    setTarget(targetInput);
    setPriceList(true);
    setShowTarget(true);
    setEditIcon(false);
  };

  const submitWithoutPredict = () => {
    setPriceList(true);
    setShowTarget(true);
    setEditIcon(false);
    setTarget("");
  };

  const deleteItem = (e) => {
    const newList = marketList.filter((item) => item.name !== e);
    setMarketList(newList);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setMarketList((prev) => [...prev, { name: listItem, price: "" }]);

    setListItem("");
  };

  const clearList = () => {
    localStorage.removeItem("marketList");
    setMarketList([]);
    setTargetInput("");
  };

  const goBackHandler = () => {
    setPriceList(false);
    setShowTarget(false);

    setEditIcon(false);
    setTarget("");
  };

  useEffect(() => {
    localStorage.setItem("marketList", JSON.stringify(marketList));
  }, [marketList]);

  const yesPredictHandler = () => {
    setPredict(true);
  };

  const noPredictHandler = () => {
    setPredict(false);
  };

  const finishHandler = () => {
    localStorage.removeItem("marketList");
    setMarketList([]);
    setTargetInput("");
    setPredict(false);
    setPriceList(false);
    setShowTarget(false);
    setEditIcon(false);
  };

  return (
    <section className={classes.mainSection}>
      <div className={classes.container}>
        {!priceList && (
          <div className={classes.addToListContainer}>
            <h1 className={classes.heading}>
              Öncelikle alışveriş listeni oluşturabilirsin
            </h1>
            <div className={classes.inputs}>
              <form
                onSubmit={submitHandler}
                className={classes.productNameInput}
              >
                <label htmlFor="name">ürün adı</label>
                <input
                  className={classes.listInput}
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
            {marketList.length > 1 && (
              <button className={classes.button} onClick={clearList}>
                tüm listeyi sil
              </button>
            )}
            {marketList.length > 1 && (
              <div>
                <div className={classes.predictQuestion}>
                  <h1 className={classes.heading}>
                    Alışverişin toplam tutarını şimdiden tahmin etmek ister
                    misin?
                  </h1>
                  <div className={classes.predictButtons}>
                    <button
                      className={`${classes.button} ${
                        predict ? classes.active : ""
                      }`}
                      onClick={yesPredictHandler}
                    >
                      {predict ? "👍" : "Evet!"}
                    </button>
                    <button
                      className={`${classes.button} ${
                        !predict ? classes.active : ""
                      }`}
                      onClick={noPredictHandler}
                    >
                      {!predict ? "👎" : "Hayır!"}
                    </button>
                  </div>
                </div>
                {predict && (
                  <h1 className={classes.heading}>
                    Listeni tamamlayınca tahmini toplam tutarı girip devam
                    edebilirsin
                  </h1>
                )}
                {!predict && (
                  <h1 className={classes.heading}>
                    Alışveriş listesi tamam mı?
                  </h1>
                )}
              </div>
            )}
            {predict && (
              <form
                onSubmit={submitTargetHandler}
                className={classes.productNameInput}
              >
                {!showTarget && !priceList && <label htmlFor="target">₺</label>}
                <input
                  type="number"
                  onChange={targetInputHandler}
                  className={classes.targetInput}
                  placeholder="ör: 500"
                  thousandSeparator={true}
                  thousandsGroupStyle="try"
                  prefix={"₺"}
                  value={targetInput}
                  required
                />
                <button className={classes.button}>
                  <div className={classes.targetIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="192"
                      height="192"
                      fill="#804916"
                      viewBox="0 0 256 256"
                    >
                      <rect width="256" height="256" fill="none"></rect>
                      <polyline
                        points="216 72 104 184 48 128"
                        fill="none"
                        stroke="#804916"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                      ></polyline>
                    </svg>
                  </div>
                </button>
              </form>
            )}
            {marketList.length > 1 && !predict && (
              <button
                onClick={submitWithoutPredict}
                className={`${classes.button} ${classes.okButton}`}
              >
                <div className={classes.targetIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="192"
                    height="192"
                    fill="#804916"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <polyline
                      points="216 72 104 184 48 128"
                      fill="none"
                      stroke="#804916"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></polyline>
                  </svg>
                </div>
              </button>
            )}
          </div>
        )}

        <div className={classes.listContainer}>
          {showTarget && priceList && (
            <h1 className={classes.heading}>
              Listendekileri alırken fiyatını yaz
            </h1>
          )}
          {showTarget && target && (
            <div className={classes.targetText}>
              <h1 className={classes.heading}>
                Belirlediğin tahmini toplam tutar:
              </h1>
              <p>₺{(+target).toLocaleString("tr-TR")}</p>
              {!editIcon && (
                <div
                  className={classes.deleteIcon}
                  onClick={() => setEditIcon(true)}
                >
                  <img
                    src={editIconImg}
                    alt="edit icon"
                    className={classes.deleteIcon}
                  />
                </div>
              )}
              {editIcon && (
                <form
                  onSubmit={submitTargetHandler}
                  className={classes.productNameInput}
                >
                  <label htmlFor="target">₺</label>
                  <input
                    onChange={targetInputHandler}
                    className={classes.targetInput}
                    placeholder="ör: 500"
                    thousandSeparator={true}
                    thousandsGroupStyle="try"
                    prefix={"₺"}
                    value={(+targetInput).toLocaleString("tr-TR")}
                    required
                  />
                  <button className={classes.button}>
                    <div className={classes.targetIcon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="192"
                        height="192"
                        fill="#804916"
                        viewBox="0 0 256 256"
                      >
                        <rect width="256" height="256" fill="none"></rect>
                        <polyline
                          points="216 72 104 184 48 128"
                          fill="none"
                          stroke="#804916"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="16"
                        ></polyline>
                      </svg>
                    </div>
                  </button>
                </form>
              )}
            </div>
          )}

          {!showTarget && !priceList && marketList.length > 0 && (
            <h1 className={classes.heading}>Alışveriş listesi</h1>
          )}
          <div className={classes.listandinput}>
            {marketList &&
              marketList.map((item, index) => {
                return (
                  <div key={index}>
                    <div className={classes.shopList}>
                      <p className={classes.itemNumber}>{index + 1}-</p>
                      <div>
                        <p className={classes.itemName}>{item.name}</p>
                      </div>

                      {marketList.length > 1 && priceList && showTarget && (
                        <div
                          className={classes.deleteIcon}
                          onClick={() => deleteItem(item.name)}
                        >
                          <img
                            src={deleteIcon}
                            alt="delete icon"
                            className={classes.deleteIcon}
                          />
                        </div>
                      )}

                      {!priceList && !showTarget && (
                        <div
                          className={classes.deleteIcon}
                          onClick={() => deleteItem(item.name)}
                        >
                          <img
                            src={deleteIcon}
                            alt="delete icon"
                            className={classes.deleteIcon}
                          />
                        </div>
                      )}

                      {showTarget && priceList && (
                        <div className={classes.productNameInput}>
                          <input
                            type="number"
                            className={classes.targetInput}
                            placeholder="ör: 50"
                            required
                            onBlur={(e) => {
                              const copyMarketList = [...marketList];
                              copyMarketList.map((el, ind) => {
                                if (index === ind) {
                                  el.price = e.target.value;
                                }
                              });
                              setMarketList(copyMarketList);
                            }}
                          />
                          {item.price !== "" && (
                            <p>{`₺${item.price.toLocaleString("tr-TR")}`}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            {showTarget && priceList && (
              <div className={classes.listInput}>
                <form
                  onSubmit={submitHandler}
                  className={classes.productNameInput}
                >
                  <label htmlFor="name">ürün adı</label>
                  <input
                    className={classes.listInput}
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
            )}
          </div>
          {showTarget && priceList && (
            <h1 className={classes.heading}>
              Toplam tutar: ₺{sum.toLocaleString("tr-TR")}
              <br />
              {target && (
                <h1 className={classes.heading}>
                  Tahmininden ₺{Math.abs(sum - +target).toLocaleString("tr-TR")}{" "}
                  daha {sum > +target ? "fazla" : "az"} harcadın!
                </h1>
              )}
              <div className={classes.btnContainer}>
                <button
                  onClick={finishHandler}
                  className={`${classes.button} ${classes.finishButton}`}
                >
                  alışverişimi tamamladım, silebiliriz!
                </button>
                <button
                  onClick={goBackHandler}
                  className={`${classes.button} ${classes.backButton}`}
                >
                  geri git
                </button>
              </div>
            </h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default Main;
