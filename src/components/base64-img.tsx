// @flow
import * as React from 'react';

type Props = {
  base64: string;
  format?: 'png' | 'jpeg' | 'webp';
  alt?: string;
};
export const Base64Img = ({ base64, format = 'jpeg', alt = '' }: Props) => {
  return <img src={`data:image/${format};base64,${base64}`} alt={alt} />;
};
