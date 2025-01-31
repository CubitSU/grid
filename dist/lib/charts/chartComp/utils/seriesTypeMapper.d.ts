import { ChartType } from "ag-grid-community";
export declare type ChartSeriesType = 'cartesian' | 'column' | 'bar' | 'line' | 'area' | 'scatter' | 'histogram' | 'polar' | 'pie' | 'donut' | 'hierarchy' | 'bubble' | 'radial-column' | 'radial-bar' | 'radar-line' | 'radar-area' | 'nightingale' | 'range-bar' | 'range-area' | 'box-plot' | 'treemap' | 'sunburst' | 'heatmap' | 'waterfall' | 'common';
export declare const VALID_SERIES_TYPES: ChartSeriesType[];
export declare function isEnterpriseChartType(chartType: ChartType): boolean;
export declare function isHorizontal(chartType: ChartType): boolean;
export declare function isStacked(chartType: ChartType): boolean;
export declare function isPolar(chartType: ChartType): boolean;
export declare function isRadial(chartType: ChartType): boolean;
export declare function isHierarchical(chartType: ChartType): boolean;
export declare function hasGradientLegend(chartType: ChartType): boolean;
export declare function getCanonicalChartType(chartType: ChartType): Exclude<ChartType, 'doughnut'>;
export declare function getSeriesType(chartType: ChartType): ChartSeriesType;
export declare type PieChartSeriesType = Extract<ChartSeriesType, 'pie' | 'donut'>;
export declare function isPieChartSeries(seriesType: ChartSeriesType): seriesType is PieChartSeriesType;
