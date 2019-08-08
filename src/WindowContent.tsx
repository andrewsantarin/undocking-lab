import React, { FunctionComponent, Fragment } from 'react';


export interface WindowContentProps {
  loaded?: boolean;
}

export const WindowContent: FunctionComponent<WindowContentProps> = ({ loaded, children }) => {
  if (!loaded) {
    return (
      <div>
        OwO
      </div>
    );
  }

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};
