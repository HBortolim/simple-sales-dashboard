export type Store = {
    id: number;
    name: string;
}

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type FilterData = {
    store?: Store;
};

export type SalesSummaryData = {
    sum: number;
    min: number;
    max: number;
    avg: number;
    count: number;
}

export type SalesByGenderData = {
    gender: string;
    sum: number;
}

export type PieChartConfig = {
    labels: string[];
    series: number[];
};