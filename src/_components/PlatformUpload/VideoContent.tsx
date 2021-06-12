import React, { useMemo } from 'react';

interface VideoContentProps {
  value?: any;
  onChange?: (data: any) => void;
}

const VideoContent: React.FC<VideoContentProps> = (props) => {
  const { value } = props;

  const imgUrl = useMemo(() => {
    return `${value}?x-oss-process=video/snapshot,t_0,f_jpg,w_600,m_fast`;
  }, [value]);

  return (
    <div>
      <img
        style={{
          margin: '0 auto',
          display: 'block',
          maxWidth: '287px',
        }}
        src={imgUrl}
      />
    </div>
  );
};
export default VideoContent;
