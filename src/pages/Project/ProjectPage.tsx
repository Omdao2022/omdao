import { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { useRootStore } from '../../app/use-root-store';
import { ARAFormSwap } from '../../features/swap-ara-launch';
import { ETokenSymbols } from '../../shared/constants/blockchain';
import { BaseOMDProjectForm } from './base-omd-project-form';
import {ZELYFormSwap} from "../../features/swap-zely-launch";

export const ProjectPage: FC = () => {
  const { refcode, symbol } = useParams<{
    symbol: ETokenSymbols;
    refcode: string;
  }>();
  const { updateRefCode } = useRootStore();

  useEffect(() => {
    if (refcode) {
      updateRefCode(refcode);
    }
  }, [refcode]);

  if (!symbol) {
    return <></>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {symbol === ETokenSymbols.ARAORIG ? (
        <ARAFormSwap />
      ) : symbol === ETokenSymbols.OMD ? (
        <ZELYFormSwap />
      ) : (
        <BaseOMDProjectForm symbol={symbol} />
      )}
    </div>
  );
};
