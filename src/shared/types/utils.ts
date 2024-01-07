import React from 'react';

/** as: AliasElementType */
export type AliasElementType =
  | React.ComponentType<any>
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | keyof JSX.IntrinsicElements;

export type ElementOrArray<T> = T extends (infer U)[] ? U | U[] : T;
