import { FC, useMemo } from "react";
import { IProjectProps, Project } from "./Project";

import { useTranslation } from "react-i18next";
import {
    COMMON_AG_DATA,
    COMMON_QNod_DATA,
    COMMON_CRB_DATA,
} from "../../../shared/constants/blockchain";
import { TFunction } from "i18next";

const getActiveProjects = (t: TFunction) => {
    const projects: IProjectProps[] = [
        {
            title: COMMON_AG_DATA.title,
            symbol: COMMON_AG_DATA.symbol,
            href: COMMON_AG_DATA.herf,
            buttonName: t("common.swap") + " omAra /",
        },
        
        {
            title: COMMON_QNod_DATA.title,
            symbol: COMMON_QNod_DATA.symbol,
            href: COMMON_QNod_DATA.herf,
            buttonName: t("common.swap"),
        },
        {
            title: COMMON_CRB_DATA.title,
            symbol: COMMON_CRB_DATA.symbol,
            href: COMMON_CRB_DATA.herf,
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
