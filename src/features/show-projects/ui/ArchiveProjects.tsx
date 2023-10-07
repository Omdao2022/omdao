import { FC, useMemo } from 'react';
import { IProjectProps, Project } from './Project';

import { useTranslation } from 'react-i18next';
import { COMMON_ARA_DATA } from '../../../shared/constants/blockchain';
import { TFunction } from 'i18next';

const getArchiveProjects = (t: TFunction) => {
  const projects: IProjectProps[] = [
    {
      title: COMMON_ARA_DATA.title,
      symbol: COMMON_ARA_DATA.symbol,
      href: COMMON_ARA_DATA.herf,
      buttonName: t('common.show'),
    },
  ];

  return projects;
};

export const ArchiveProjects: FC = () => {
  const { t } = useTranslation();

  const archiveProjects = useMemo(() => getArchiveProjects(t), [t]);

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {archiveProjects.map((project) => (
        <Project key={project.symbol} {...project} />
      ))}
    </div>
  );
};
