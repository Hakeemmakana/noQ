export type WaiterFilter = 'my-orders' | 'all';
export type DateFilter = 'today' | 'yesterday' | 'custom' | 'this-week';
export type OrderSort = 'latest' | 'oldest';

export interface GetWaiterOrdersQueryDTO {
    waiterFilter: WaiterFilter;
    dateFilter: DateFilter;
    sort: OrderSort;
    page: number;
    customFrom?: string;
    customTo?: string;
    startDate?: Date;
    endDate?: Date;
}

export function mapCompleateOrderFilterQuery(query: GetWaiterOrdersQueryDTO): GetWaiterOrdersQueryDTO {
    let startDate: Date | undefined;
    let endDate: Date | undefined;

    const now = new Date();

    switch (query.dateFilter) {
        case 'today':
        default: {
            startDate = new Date(now);
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date(now);
            endDate.setHours(23, 59, 59, 999);

            break;
        }

        case 'yesterday': {
            startDate = new Date(now);
            startDate.setDate(startDate.getDate() - 1);
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date(now);
            endDate.setDate(endDate.getDate() - 1);
            endDate.setHours(23, 59, 59, 999);

            break;
        }

        case 'this-week': {
            startDate = new Date(now);

            // Monday = start of week
            const day = startDate.getDay();
            const diff = day === 0 ? 6 : day - 1;

            startDate.setDate(startDate.getDate() - diff);
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date(now);
            endDate.setHours(23, 59, 59, 999);

            break;
        }

        case 'custom': {
            if (query.customFrom) {
                startDate = new Date(query.customFrom);
                startDate.setHours(0, 0, 0, 0);
            }

            if (query.customTo) {
                endDate = new Date(query.customTo);
                endDate.setHours(23, 59, 59, 999);
            }

            break;
        }


    }
    return {
        waiterFilter: query.waiterFilter,
        dateFilter: query.dateFilter,
        sort: query.sort,
        page: Number(query.page) || 1,
        startDate,
        endDate,
    }
}
