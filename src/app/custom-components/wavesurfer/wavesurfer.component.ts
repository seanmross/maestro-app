import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { WaveConfig } from '../../pages/home/constants/wave-config';
import { Highlight } from '../../shared/highlight';
import { Episode } from 'src/app/shared/episode';
import { Region } from 'src/app/shared/region';

@Component({
  selector: 'app-wavesurfer',
  templateUrl: './wavesurfer.component.html',
  styleUrls: ['./wavesurfer.component.scss']
})
export class WavesurferComponent implements OnInit {
  wave: WaveSurfer;
  waveReady = false;
  duration: string;
  counter: string;
  // activeHlText: string;
  // activeHlTime: string;

  @Input() highlights: Highlight[];
  @Input() episode: Episode;

  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    let regionData = this.createRegions(this.highlights)
    let wave = new WaveConfig(regionData);
    this.wave = WaveSurfer.create(wave.config);

    /**
     * Manually detect changes using cdr
     * Angular won't update property bindings from waveform events
     */
    this.wave.on('ready', () => {
      this.waveReady = true;
      this.wave.setHeight(160);

      this.duration = this.getDuration();
      this.counter = '0:00';
      
      // TODO: emit to parent to show chart
      // this.createChart();
      this.cdr.detectChanges();
    });

    // Update play/pause button
    this.wave.on('finish', () => {
      this.cdr.detectChanges();
    });

    // Update counter every second
    this.wave.on('audioprocess', () => {
      this.counter = this.formatTime(this.wave.getCurrentTime());
      this.cdr.detectChanges();
    });

    // Update counter on seek
    this.wave.on('seek', () => {
      this.counter = this.formatTime(this.wave.getCurrentTime());
      this.cdr.detectChanges();
    });

    this.wave.load(this.episode.audio);
  }

  createRegions(highlights: Highlight[]): Region[] {
    let regions: Region[] = [];
    highlights.map( hl => {
      regions.push({
        start: hl.timeStart,
        end: hl.timeEnd,
        loop: false,
        color: 'hsla(200, 50%, 70%, 0.4)'
      })
    });
    return regions;
  }

  getDuration(): string {
    return this.formatTime(this.wave.getDuration());
  }

  onPlayPause() {
    this.wave.playPause();
  }

  onForward() {
    this.wave.skip(5);
  }

  onReplay() {
    this.wave.skip(-5);
  }

  isPlaying(): boolean {
    return this.wave.isPlaying();
  }

  formatTime(sec: number): string {
    /**
     * m:ss or h:mm:ss
     * e.g. 6:13, 1:06:13
     */

    let time = [];
    let h = sec > 3600 ? Math.floor(sec / 3600) : null;
    let m = Math.floor((sec % 3600) / 60);
    if (h) {
      time.push(h);
      let mm = ('00' + Math.floor((sec % 3600) / 60)).slice(-2);
      time.push(mm);
    } else {
      time.push(m);
    }
    let ss = ('00' + Math.floor(sec % 60)).slice(-2);
    time.push(ss);
    return time.join(':');
  }

}
