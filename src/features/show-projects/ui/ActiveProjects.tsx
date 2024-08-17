import { FC, useMemo } from "react";
import { IProjectProps, Project } from "./Project";

import { useTranslation } from "react-i18next";
import {
   //COMMON_AG_DATA,
    COMMON_TIGR_DATA,
    COMMON_EpGam_DATA,
    COMMON_FBlocks_DATA,
    
} from "../../../shared/constants/blockchain";
import { TFunction } from "i18next";

const getActiveProjects = (t: TFunction) => {
    const projects: IProjectProps[] = [
       // {
            //title: COMMON_AG_DATA.title,
            //symbol: COMMON_AG_DATA.symbol,
            //href: COMMON_AG_DATA.herf,
            //buttonName: t("common.swap") + " omAra /",
        //},
        
        
        {
            title: COMMON_TIGR_DATA.title,
            symbol: COMMON_TIGR_DATA.symbol,
            href: COMMON_TIGR_DATA.herf,
            buttonName: t("common.swap"),
        },
        {
            title: COMMON_EpGam_DATA.title,
            symbol: COMMON_EpGam_DATA.symbol,
            href: COMMON_EpGam_DATA.herf,
            buttonName: t("common.swap"),
        },
        {
            title: COMMON_FBlocks_DATA.title,
            symbol: COMMON_FBlocks_DATA.symbol,
            href: COMMON_FBlocks_DATA.herf,
            buttonName: t("common.swap"),
        },
        
    ];

    return projects;
};

export const ActiveProjects: FC = () => {
    const { t } = useTranslation();

    const activeProjects = useMemo(() => getActiveProjects(t), [t]);

    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {activeProjects.map((project) => (
                <Project key={project.symbol} {...project} />
            ))}
        </div>
    );
};
