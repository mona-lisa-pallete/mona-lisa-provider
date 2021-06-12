import React from 'react';

interface ImageContentProps {
  value?: any;
  onChange?: (data: any) => void;
}

const ImageContent: React.FC<ImageContentProps> = (props) => {
  const { value } = props;

  // useEffect(() => {
  //   console.log(value);
  // }, [value]);

  return (
    <div>
      <img
        style={{
          margin: '0 auto',
          display: 'block',
          maxWidth: '287px',
        }}
        src={value}
      />
    </div>
  );
};
export default ImageContent;
