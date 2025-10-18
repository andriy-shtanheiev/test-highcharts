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

  async ngOnInit(): Promise<void> {
    await this.initializeChart();
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
              mouseOver() {
                // Get all legend items
                const chart = this.series?.chart;
                const legendItems = chart?.legend?.allItems || [];
                const series = this as unknown as Highcharts.Series;
                // Fade out all legend items first
                legendItems.forEach((item: Highcharts.Series) => {
                  if (
                    item.legendItem?.label?.element &&
                    !item.legendItem?.label?.element.isEqualNode(
                      series.legendItem?.label?.element
                    )
                  ) {
                    item.legendItem.label.element.style.opacity = '0.3';
                  }
                  if (
                    item.legendItem?.symbol?.element &&
                    !item.legendItem?.symbol?.element.isEqualNode(
                      series.legendItem?.symbol?.element
                    )
                  ) {
                    item.legendItem.symbol.element.style.opacity = '0.3';
                  }
                });

                // Highlight the corresponding legend item
                if (series.legendItem?.label?.element) {
                  series.legendItem.label.element.style.opacity = '1';
                }
                if (series.legendItem?.symbol?.element) {
                  series.legendItem.symbol.element.style.opacity = '1';
                }
              },
              mouseOut() {
                // Get all legend items and restore their opacity
                const chart = this.series?.chart;
                const legendItems = chart?.legend?.allItems || [];

                legendItems.forEach((item: Highcharts.Series) => {
                  if (item.legendItem?.label?.element) {
                    item.legendItem.label.element.style.opacity = '1';
                  }
                  if (item.legendItem?.symbol?.element) {
                    item.legendItem.symbol.element.style.opacity = '1';
                  }
                });
              },
            },
          },
          center: ['50%', '50%'], // Position the pie to the center
        },
      },
      legend: {
        align: 'center', // Center the legend horizontally
        verticalAlign: 'middle', // Vertically center the legend
        layout: 'vertical', // Arrange legend items vertically
        x: 250, // Adjust this value to position it next to the pie
        y: 0, // No vertical offset needed if 'verticalAlign' is 'middle',
        itemMarginBottom: 10, // Space between legend items
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
