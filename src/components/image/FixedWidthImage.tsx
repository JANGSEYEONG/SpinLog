import { type ForwardedRef, type ImgHTMLAttributes, forwardRef } from 'react';

type FixedWidthImageProps = {
  src: string;
  alt: string;
  width: number; // 고정 값
  height: number;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'>;

const FixedWidthImage = forwardRef(
  (
    { src, alt, width, height, ...imgProps }: FixedWidthImageProps,
    ref: ForwardedRef<HTMLImageElement>,
  ) => {
    // 파일명에서 확장자 제거
    const basePath = src.substring(0, src.lastIndexOf('.'));
    return (
      <picture>
        <source type="image/avif" srcSet={`${basePath}.avif`} />
        <source type="image/webp" srcSet={`${basePath}.webp`} />
        <img
          ref={ref}
          src={`${basePath}.png`}
          width={width}
          height={height}
          alt={alt}
          {...imgProps}
        />
      </picture>
    );
  },
);
FixedWidthImage.displayName = 'FixedWidthImage';
export default FixedWidthImage;
