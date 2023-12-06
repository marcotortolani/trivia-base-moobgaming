import { useContext } from "preact/hooks";
import { Link, useLocation } from "react-router-dom";
import { ConfigContext } from "../../ConfigProvider";

export default function LogoHeader() {
  const { images, imagesByLang } = useContext(ConfigContext);
  //const { idolImage, madeBy } = images;
  const { logoHeader } = imagesByLang;
  const location = useLocation().pathname;

  return (
    <div className="logo-header">
      {location.includes("category") || location.includes("question") ? (
        <>
          <div className="logo-img-wrapper">
            <Link to="/">
              <img src={logoHeader} alt="Icon Logo LxLC Trivia" />
            </Link>
          </div>

          {/* <div className="idol-container">
            <img
              className="idol-image"
              src={idolImage}
              alt="Image Diego Maradona Cartoon"
            />
          </div> */}
        </>
      ) : (
        <>
          <div className="logo-img-wrapper">
            <Link to="/">
              <img
                className="img-logo"
                src={logoHeader}
                alt="Icon Logo Trivia Diego Maradona"
              />
              {/* <img
                className="img-made-by"
                src={madeBy}
                alt="Image Made By MediaMoob"
              /> */}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
