import { newsRoute } from "@/app/routes";

import { IUrlParams } from "@/shared/types";

export function useUrlParams(): IUrlParams {
    const urlParams: IUrlParams = newsRoute.useSearch();
    return urlParams;
}
