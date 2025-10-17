import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import {
  ChartConstructorType,
  HighchartsChartComponent,
} from 'highcharts-angular';

@Component({
  selector: 'app-chart',
  imports: [HighchartsChartComponent],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Chart implements OnInit {
  chartConstructor: ChartConstructorType = 'chart';
  private readonly _chartOptions = signal<Highcharts.Options>({});
  public readonly chartOptions = this._chartOptions.asReadonly();

  ngOnInit(): void {
    this.initializeChart();
  }

  private async initializeChart() {
    // Load drilldown module dynamically to avoid Templating dependency issues
    await import('highcharts/modules/drilldown');

    // Set chart options after module is loaded
    this._chartOptions.set({
      accessibility: {
        enabled: true,
      },
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Browser Market Shares',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
          point: {
            events: {
              mouseOver: (e) => {
                const point = (e.currentTarget ??
                  e.target) as unknown as Highcharts.Point & {
                  legendItem?: {
                    label: { element: HTMLElement };
                    symbol: { element: HTMLElement };
                    group: { element: HTMLElement };
                  };
                  series?: {
                    chart?: {
                      legend?: {
                        allItems?: Array<{
                          legendItem?: {
                            label: { element: HTMLElement };
                            symbol: { element: HTMLElement };
                            group: { element: HTMLElement };
                          };
                        }>;
                      };
                    };
                  };
                };

                // Get all legend items
                const chart = point.series?.chart;
                const legendItems = chart?.legend?.allItems || [];

                // Fade out all legend items first
                legendItems.forEach(
                  (item: {
                    legendItem?: {
                      label: { element: HTMLElement };
                      symbol: { element: HTMLElement };
                      group: { element: HTMLElement };
                    };
                  }) => {
                    if (item.legendItem?.label?.element) {
                      item.legendItem.label.element.style.opacity = '0.3';
                    }
                    if (item.legendItem?.symbol?.element) {
                      item.legendItem.symbol.element.style.opacity = '0.3';
                    }
                    if (item.legendItem?.group?.element) {
                      item.legendItem.group.element.style.opacity = '0.3';
                    }
                  }
                );

                // Highlight the corresponding legend item
                if (point.legendItem?.label?.element) {
                  point.legendItem.label.element.style.opacity = '1';
                }
                if (point.legendItem?.symbol?.element) {
                  point.legendItem.symbol.element.style.opacity = '1';
                }
                if (point.legendItem?.group?.element) {
                  point.legendItem.group.element.style.opacity = '1';
                }
              },
              mouseOut: (e) => {
                const point = (e.currentTarget ??
                  e.target) as unknown as Highcharts.Point & {
                  legendItem?: {
                    label: { element: HTMLElement };
                    symbol: { element: HTMLElement };
                    group: { element: HTMLElement };
                  };
                  series?: {
                    chart?: {
                      legend?: {
                        allItems?: Array<{
                          legendItem?: {
                            label: { element: HTMLElement };
                            symbol: { element: HTMLElement };
                            group: { element: HTMLElement };
                          };
                        }>;
                      };
                    };
                  };
                };

                // Get all legend items and restore their opacity
                const chart = point.series?.chart;
                const legendItems = chart?.legend?.allItems || [];

                legendItems.forEach(
                  (item: {
                    legendItem?: {
                      label: { element: HTMLElement };
                      symbol: { element: HTMLElement };
                      group: { element: HTMLElement };
                    };
                  }) => {
                    if (item.legendItem?.label?.element) {
                      item.legendItem.label.element.style.opacity = '1';
                    }
                    if (item.legendItem?.symbol?.element) {
                      item.legendItem.symbol.element.style.opacity = '1';
                    }
                    if (item.legendItem?.group?.element) {
                      item.legendItem.group.element.style.opacity = '1';
                    }
                  }
                );

                const legendElement = point.legendItem?.label?.element;
                if (legendElement) {
                  legendElement.dispatchEvent(
                    new MouseEvent('mouseout', {
                      bubbles: true,
                      cancelable: true,
                    })
                  );
                }
              },
            },
          },
        },
      },
      series: [
        {
          type: 'pie', // Specify series type
          name: 'Browsers',
          data: [
            {
              name: 'Chrome',
              y: 61.41,
              drilldown: 'chrome', // Link to drilldown series
            },
            {
              name: 'Firefox',
              y: 11.84,
              drilldown: 'firefox',
            },
            {
              name: 'Edge',
              y: 4.67,
              drilldown: 'edge',
            },
            {
              name: 'Safari',
              y: 4.18,
              drilldown: 'safari',
            },
            {
              name: 'Other',
              y: 7.05,
            },
          ],
        },
      ],
      drilldown: {
        series: [
          {
            type: 'column',
            id: 'chrome',
            name: 'Chrome Versions',
            data: [
              ['v65.0', 0.1],
              ['v64.0', 1.3],
              ['v63.0', 53.02],
              ['v62.0', 1.4],
              ['v61.0', 0.88],
              ['v60.0', 0.56],
              ['v59.0', 0.45],
              ['v58.0', 0.49],
              ['v57.0', 0.32],
              ['v56.0', 0.29],
              ['v55.0', 0.79],
              ['v54.0', 0.18],
              ['v51.0', 0.13],
              ['v49.0', 2.16],
              ['v48.0', 0.13],
              ['v47.0', 0.11],
              ['v46.0', 0.1],
              ['v45.0', 0.12],
              ['v44.0', 0.11],
              ['v43.0', 0.17],
              ['v42.0', 0.2],
              ['v41.0', 0.22],
              ['v40.0', 0.17],
              ['v39.0', 0.18],
              ['v36.0', 0.1],
              ['v35.0', 0.11],
              ['v34.0', 0.1],
              ['v33.0', 0.11],
              ['v32.0', 0.1],
              ['v9.0', 0.11],
            ],
          },
          {
            type: 'column',
            id: 'firefox',
            name: 'Firefox Versions',
            data: [
              ['v58.0', 1.02],
              ['v57.0', 7.36],
              ['v56.0', 0.36],
              ['v55.0', 0.11],
              ['v54.0', 0.1],
              ['v52.0', 0.95],
              ['v51.0', 0.15],
              ['v50.0', 0.1],
              ['v48.0', 0.11],
              ['v47.0', 0.12],
            ],
          },
          {
            type: 'column',
            id: 'edge',
            name: 'Edge Versions',
            data: [
              ['v16', 2.6],
              ['v15', 0.92],
              ['v14', 0.4],
              ['v13', 0.1],
            ],
          },
          {
            type: 'column',
            id: 'safari',
            name: 'Safari Versions',
            data: [
              ['v11.0', 3.39],
              ['v10.1', 0.96],
              ['v10.0', 0.36],
              ['v9.1', 0.54],
              ['v9.0', 0.13],
              ['v5.1', 0.2],
            ],
          },
        ],
      },
    });
  }
}
