import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Highlight } from '../../shared/highlight';
import { Chart } from 'chart.js';
import 'chartjs-plugin-zoom';
import { ChartConfig } from '../../pages/home/constants/chart-config';

const chartData = [
  {
    x: 12,
    y: 1
  },
  {
    x: 24,
    y: 1
  },
  {
    x: 36,
    y: 1
  }
];

@Component({
  selector: 'app-highlight-reel',
  templateUrl: './highlight-reel.component.html',
  styleUrls: ['./highlight-reel.component.scss']
})
export class HighlightReelComponent implements OnInit {
  @Input() highlights: Highlight[];
  @Output() highlightClicked: EventEmitter<Highlight> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
    // console.log(this.highlights)
  }

  onHighlightClick(highlight: Highlight) {
    this.highlightClicked.emit(highlight)
  }

  createChart() {
    let canvas = document.getElementById('myChart') as HTMLCanvasElement;
    let ctx = canvas.getContext('2d');

    // Get episode duration
    let dur = this.wave.getDuration();

    // Build chart
    let chart = new ChartConfig(dur, chartData);
    this.chart = new Chart(ctx, chart.config);
  }

  onResetChartZoom() {
    this.chart.resetZoom();
  }

}
