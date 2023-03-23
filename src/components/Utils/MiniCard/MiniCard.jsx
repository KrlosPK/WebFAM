import './MiniCard.css'

// ? Libraries
import { useEffect, useRef } from 'react'
import 'aos/dist/aos.css'
import AOS from 'aos'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const MiniCard = ({
  src,
  alt,
  header,
  text,
  isSecoundaryText = false,
  secoundaryText,
  animation,
  textColor = 'black',
  borderRadius = '0',
  isVideo = false,
  controls = false
}) => {
  AOS.init({ duration: 700 })

  const videoRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current.play()
          } else {
            videoRef.current.pause()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [])

  return (
    <div className='mini-card flex' data-aos={animation}>
      {isVideo
        ? (
          <video
            ref={videoRef}
            controls={controls}
            className='mini-card__image'
            width={64}
            height={64}
            style={{ borderRadius }}
          >
            <source src={src} type='video/mp4' />
          </video>
        )
        : (
          <LazyLoadImage
            className='mini-card__image'
            width={64}
            height={64}
            src={src}
            effect='blur'
            loading='lazy'
            alt={alt}
            style={{ borderRadius }}
          />
        )}
      <div className='mini-card__header'>{header}</div>
      <div className='mini-card__text' style={{ color: textColor, userSelect: 'all' }}>
        {text}
      </div>
      {isSecoundaryText && (
        <div className='mini-card__text' style={{ color: textColor, userSelect: 'all' }}>
          {secoundaryText}
        </div>
      )}
    </div>
  )
}

export { MiniCard }
