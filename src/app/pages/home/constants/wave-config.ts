import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';

export class WaveConfig {

    constructor(regionData: any[]) {
        let regions = this.createRegions(regionData);
        this.waveformConfig.plugins.push(regions);
    }

    get config() {
        return this.waveformConfig;
    }

    createRegions(data: any[]) {
        return RegionsPlugin.create({
            regions: data
        });
    }

    waveformConfig = {
        container: '#waveform',
        progressColor: '#57a260',
        waveColor: '#8e8e8e',
        cursorColor: '#ec407a',
        cursorWidth: 2,
        barWidth: 3,
        barRadius: 3,
        barGap: 2,
        responsive: true,
        height: 0,
        scrollParent: true,
        autoCenterRate: 1,
        plugins: [
            CursorPlugin.create({
                container: '#waveform',
                opacity: 1,
                /**
                 * hide cursor time until wavesurfer v3.3.0 release
                 * github issue #1802
                 */
                // showTime: true,
                // followCursorY: true,
                // customShowTimeStyle: {
                //   'background-color': '#000',
                //   'color': '#fff',
                //   'font-size': '12px',
                //   'padding': '0.25em 0.5em'
                // },
                // formatTimeCallback: (sec: number) => {
                //   return this.formatCursorTime(sec);
                // }
            }),
            MinimapPlugin.create({
                container: '#wave-minimap',
                progressColor: '#57a260',
                waveColor: '#8e8e8e',
                cursorWidth: 2,
                barWidth: 1,
                barRadius: 1,
                barGap: 0.5,
                height: 50,
            })
        ]
    }
    
}