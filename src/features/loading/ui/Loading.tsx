import React, { FC } from "react";
import './loading.sass';

export const Loading: FC = () => {
  return (
    <div className="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}