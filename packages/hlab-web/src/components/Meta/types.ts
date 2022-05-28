import { ReactNode } from 'react';

type MetaProps = {
  description?: string;
  meta?: Array<{ name: string; content: string }>;
  title?: string;
  image?: string;
  children?: ReactNode;
};

export type { MetaProps };
