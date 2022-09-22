import { ApexOptions } from 'apexcharts';
import { Gender, SalesByGenderData } from '../../types';

export const buildPieChartConfig = (labels: string[] = []) => {
    return {
        labels,
        noData: {
            text: 'Sem resultados',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: '#FFF',
                fontSize: '18px',
                fontFamily: 'Roboto, sans-serif'
            }
        },

        legend: {
            show: true,
            floating: false,
            position: 'bottom',
            offsetY: 5,
            labels: {
                colors: ['#b4bed2']
            },
            fontFamily: 'Ubuntu, sans-serif',
            fontSize: '16px',
            itemMargin: {
                vertical: 5,
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '12px'
            }

        },
        plotOptions: {
            pie: {
                size: 400,
                donut: {
                    size: '55%',
                    labels: {
                        show: true,
                        name: {
                            show: false,
                        },

                    }
                }
            }
        },
        chart: {
            height: '400px'
        }
    } as ApexOptions;
};

const formatGender = (gender: Gender) => {
    const textByGender = {
        MALE: "Masculino",
        FEMALE: "Feminino",
        OTHER: "Outros",
    };

    return textByGender[gender];
};


export const buildSalesByGenderChart = (sales: SalesByGenderData[]) => {
    const labels = sales.map((sale) => formatGender(sale.gender as Gender));
    const series = sales.map((sum) => sum.sum);

    return {
        labels,
        series
    };
};