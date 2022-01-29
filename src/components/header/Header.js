import classes from "./Header.module.css";
import video from "./video.mp4";

const Header = (props) => {
  return (
    <header>
      <div className={classes.header}>
        <div onClick={() => window.location.reload()} className={classes.logo}>
          <svg
            className={classes.logoimg}
            xmlns="http://www.w3.org/2000/svg"
            width="192"
            height="192"
            fill="#fff"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <path
              d="M184,184H69.8L41.9,30.6A8,8,0,0,0,34.1,24H16"
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></path>
            <circle
              cx="80"
              cy="204"
              r="20"
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></circle>
            <circle
              cx="184"
              cy="204"
              r="20"
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></circle>
            <path
              d="M62.5,144H188.1a15.9,15.9,0,0,0,15.7-13.1L216,64H48"
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            ></path>
          </svg>
          <h1>MarketList</h1>
        </div>
        <nav className={classes.nav}>
          <ul className={classes.navButtons}>
            {!props.showMain ? (
              <li onClick={props.showMainHandler} className={classes.navButton}>
                Alışverişe Başla
              </li>
            ) : (
              <li
                onClick={props.showFirstPageHandler}
                className={classes.navButton}
              >
                Anasayfaya Dön
              </li>
            )}
            {/* <li className={classes.navButton}>Yakındaki Marketler</li> */}
          </ul>
        </nav>
      </div>
      {!props.showMain && (
        <div className={classes.homePage}>
          <div className={classes.videoContainer}>
            <video
              className={classes.video}
              autoPlay
              loop
              muted
              playInBackground={true}
              playWhenInactive={true}
              ignoreSilentSwitch="ignores"
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
          <div className={classes.mainHeader}>
            <svg
              className={classes.mainimg}
              xmlns="http://www.w3.org/2000/svg"
              width="192"
              height="192"
              fill="#e68327"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none"></rect>
              <path
                d="M184,184H69.8L41.9,30.6A8,8,0,0,0,34.1,24H16"
                fill="none"
                stroke="#e68327"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></path>
              <circle
                cx="80"
                cy="204"
                r="20"
                fill="none"
                stroke="#e68327"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></circle>
              <circle
                cx="184"
                cy="204"
                r="20"
                fill="none"
                stroke="#e68327"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></circle>
              <path
                d="M62.5,144H188.1a15.9,15.9,0,0,0,15.7-13.1L216,64H48"
                fill="none"
                stroke="#e68327"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></path>
            </svg>
            <h1 className={classes.heading}>
              <strong>MarketList</strong> ile <br /> alışveriş listesi
              oluştururken
              <br /> hedefinizi belirleyebilir <br /> ve bütçenizi kontrol
              edebilirsiniz!
            </h1>
          </div>
          <div className={classes.btnDiv}>
            <button onClick={props.showMainHandler} className={classes.button}>
              Hadi!
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
