import { useContext } from 'preact/hooks';
import { Link, useLocation } from 'react-router-dom';
import { ConfigContext } from '../../ConfigProvider';

export default function LogoHeader() {
  const { images, imagesByLang } = useContext(ConfigContext);
  const location = useLocation().pathname;

  return (
    <div className="logo-header">
      {location.includes('category') || location.includes('question') ? (
        <>
          <div className="logo-img-wrapper">
            <Link to="/">
              <img src={imagesByLang?.logoHeader} alt="Icon Logo LxLC Trivia" />
            </Link>
          </div>

          {images?.idolImage && (
            <div className="idol-container">
              <img
                className="idol-image"
                src={images?.idolImage}
                alt="Image Diego Maradona Cartoon"
              />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="logo-img-wrapper">
            <Link to="/">
              <img
                className="img-logo"
                src={imagesByLang?.logoHeader}
                alt="Icon Logo Trivia Diego Maradona"
              />
              {/* <img
                className="img-made-by"
                src={images?.madeBy}
                alt="Image Made By MediaMoob"
              /> */}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
