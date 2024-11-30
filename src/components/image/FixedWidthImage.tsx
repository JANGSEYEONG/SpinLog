type FixedWidthImageProps = {
  src: string;
  alt: string;
  width: number; // 고정할 너비
  height: number; // 고정할 높이
};
const FixedWidthImage = ({ src, alt, width, height }: FixedWidthImageProps) => {
  // 파일명에서 확장자 제거
  const basePath = src.substring(0, src.lastIndexOf('.'));
  return (
    <picture>
      <source type="image/avif" srcSet={`${basePath}.avif`} />
      <source type="image/webp" srcSet={`${basePath}.webp`} />
      <img src={`${basePath}.png`} width={width} height={height} alt={alt} />
    </picture>
  );
};

export default FixedWidthImage;
