import * as React from 'react';
export declare type ProviderProps<Context> = {
  initialState?: Context;
  children: React.ReactNode;
};
export declare type ConsumerProps<Context> = {
  children: (props: Context) => React.ReactNode;
};
export declare type BuiltContext<Context> = {
  hook: () => Context;
  Provider: React.Provider<Context>;
  Consumer: React.Consumer<Context>;
};
export default function contextBuilder<Context>(
  initialContext?: Context
): BuiltContext<Context>;
