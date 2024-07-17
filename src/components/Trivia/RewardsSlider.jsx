import { useState } from 'preact/hooks'

export default function RewardsSlider({ slidesImages, arrowsSlider, colors }) {
  const [slide, setSlide] = useState(0)

  function handleLeftSlide() {
    setSlide(slide === 0 ? 0 : slide - 1)
  }
  function handleRightSlide() {
    setSlide(
      slide === slidesImages.length - 1 ? slidesImages.length - 1 : slide + 1
    )
  }

  function handleIndicator(index) {
    setSlide(index)
  }

  return (
    <div className="wrapper-slider">
      {slidesImages.length > 1 && (
        <button
          className="arrow-container left-arrow"
          type="button"
          onClick={handleLeftSlide}
          disabled={slide === 0 ? true : false}
          style={{
            backgroundColor:
              slide === 0 ? colors?.disable : colors?.primaryLight,
          }}
        >
          <img src={arrowsSlider.left} alt="Left Golden Arrow" />
        </button>
      )}

      {slidesImages.map((image, index) => {
        return (
          <div
            className={
              slide === index
                ? 'wrapper-image'
                : 'wrapper-image wrapper-image-hidden'
            }
            key={`wrapper-image-${index}`}
          >
            <img src={image.src} alt={image.name} key={`image-${index}`} />
          </div>
        )
      })}
      {slidesImages.length > 1 && (
        <button
          className="arrow-container right-arrow"
          type="button"
          onClick={handleRightSlide}
          disabled={slide === slidesImages.length - 1 ? true : false}
          style={{
            backgroundColor:
              slide === slidesImages.length - 1
                ? colors?.disable
                : colors?.primaryLight,
          }}
        >
          <img src={arrowsSlider.right} alt="Right Golden Arrow" />
        </button>
      )}
      {slidesImages.length > 1 && (
        <span className="indicators-container">
          {slidesImages.map((_, index) => {
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleIndicator(index)}
                className="indicator"
                style={{
                  backgroundColor:
                    slide === index ? colors?.primaryLight : colors?.disable,
                }}
              ></button>
            )
          })}
        </span>
      )}
    </div>
  )
}
