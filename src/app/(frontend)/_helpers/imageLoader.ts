type imageLoaderProps = {
  src: string | number;
  width: string | number;
  quality?: string | number;
};

export const imageLoader = ({ src, width, quality = 75 }: imageLoaderProps) => {
  return `${src}?w=${width}&q=${quality}`;
};
