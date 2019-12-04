import { Component } from '@angular/core';
import { IGridsterOptions } from 'angular2gridster';
import { Nexus_Component_Padding, Nexus_Header_Height } from '../app.consts';
import * as Tone from 'tone';
export const padding: number = Nexus_Component_Padding;
export const headerHeight: number = Nexus_Header_Height;

@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.scss']
})
export class RackComponent {
  // POC TONE JS:
  envelope: {x:number, y:number}[] = [];
  synth: Tone.Synth = new Tone.Synth({
    envelope: {
      attack: 0.1,
      decay: 1,
      sustain: 1,
      release: 0.2,
      attackCurve: "linear"
    },
    oscillator: {
      modulationType: "amsine",
      modulationIndex: 1,
      harmonicity: 1
    }
  }).toMaster();

  nexus: string = 'Piano';
  nexusComponents: NexusComponent[] = [{
      name: 'Piano',
      configuration: {
        'size': [128, 64],
        'mode': 'button',
        'lowNote': 24,
        'highNote': 60
      },
      height: 2,
      width: 8,
      uid: 'pia'
    }, {
      name: 'Sequencer',
      configuration: {
        'size': [400, 200],
        'mode': 'toggle',
        'rows': 8,
        'columns': 8
      },
      height: 3,
      width: 3,
      uid: 'seq'
    },
    { name: 'Multislider', uid: 'Multislider', width: 3, height: 1 },
    { name: 'Envelope', uid: 'Envelope', width: 3, height: 1, configuration: { noNewPoints: false } },
    { name: 'Pan', uid: 'Pan', configuration: {}, maxWidth: 128, maxHeight: 32, width: 2, height: 1  },
    { name: 'Pan2D', uid: 'Pan2D' },
    { name: 'Meter', uid: 'Meter' },
    { name: 'Toggle', uid: 'Toggle', maxWidth: 128, maxHeight: 32 },
    { name: 'Dial', uid: 'Dial' },
    { name: 'Oscilloscope', uid: 'Osc' },
    { name: 'Spectrogram', uid: 'spec' },
    { name: 'Select', uid: 'Select' },
    { name: 'RadioButton', uid: 'rad', maxHeight: 32, width: 3, height: 1  },
    { name: 'Position', uid: 'pos' },
    { name: 'Number', uid: 'num', maxWidth: 128, maxHeight: 32 },
    { name: 'TextButton', uid: 'tbut', configuration: { text: 'TEXT' } },
  ];

  gridsterOptions = <IGridsterOptions> {
    lanes: 16, // how many lines (grid cells) dashboard has
    direction: 'vertical', // items floating direction: vertical/horizontal/none
    floating: false, // default=true - prevents items to float according to the direction (gravity)
    dragAndDrop: true, // possible to change items position by drag n drop
    resizable: true, // possible to resize items by drag n drop by item edge/corner
    useCSSTransforms: true, // Uses CSS3 translate() instead of position top/left - significant performance boost.
  };

  itemChanged($event: any, nexusComponent: NexusComponent, r: boolean = true): void {
    console.log('CHANGE');
    try {
      // Resize nexus ui component to grid item size
      // TODO: Find the proper element
      // const width = $event.item.itemComponent.$element.querySelector('.gridster-item-inner').clientWidth;
      // const height = $event.item.itemComponent.$element.querySelector('.gridster-item-inner').clientHeight;
      let width = $event.item.itemComponent.$element.clientWidth;
      let height = $event.item.itemComponent.$element.clientHeight;
      width = Math.min(width, (nexusComponent.maxWidth + (padding * 2) || 100000));
      height = Math.min(height, (nexusComponent.maxHeight + (padding * 2 + headerHeight) || 100000));
      nexusComponent.nexusInstance.resize(width - (padding * 2), height - (padding * 2) - headerHeight); // TODO: If const, use const.
      if (r) {
        setTimeout(() => this.itemChanged($event, nexusComponent, false)); // TODO. There's an "Apply-twice"-type of bug here. Otherwise the resizing is not applied until we move the widget again, and not apply vertically.
      }
    } catch {
      // dunno duncare
    }
  }

  handleNexusComponentEvent($event: any, nexusComponent: NexusComponent): void {
    console.log($event);

    if (nexusComponent.name === 'Piano') {
      if ($event.state) {
        this.synth.triggerAttack($event.note);
      } else {
        this.synth.triggerRelease();
      }
    }

    // The nexus envelop is not so appropriate. But it has velocity.
    // The envelop used in the tonejs examples would be interesting,
    // but the envelop in the tonejs engine seem to not have velocity. (The y / amplitude / velocity / whatever)
    // TODO: Check.
    // TODO: Integrate tonejs demo widget. tone-rack, etc.
    // OMG. https://github.com/Tonejs/ui
    if (nexusComponent.name === 'Envelope') {
      if ($event.length > 4) {
        this.synth.envelope.attack = $event[1].x - $event[0].x;
        this.synth.envelope.sustain = $event[2].x - $event[1].x;
        this.synth.envelope.decay = $event[3].x - $event[2].x;
        this.synth.envelope.release = $event[4].x - $event[3].x;
      }
    }
  }
}

export interface NexusComponent extends GridItem {
  name: string;
  uid: string;
  configuration?: {};
  nexusInstance?: any;
  state?: any;
  maxWidth?: number;
  maxHeight?: number;
}

export interface GridItem {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

