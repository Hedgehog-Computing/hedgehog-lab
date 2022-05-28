/* eslint-disable */
import { ComponentType } from 'react';

type LoaderDefaultOptions = {
  delay: number;
  minimumLoading: number;
};

type LoadComponent = () => Promise<{ default: ComponentType<any> }>;

type AnyProps = {
  [key: string]: any;
};

export type { LoaderDefaultOptions, LoadComponent, AnyProps };
