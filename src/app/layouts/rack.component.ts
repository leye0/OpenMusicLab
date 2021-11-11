import { Component, AfterViewInit } from '@angular/core';
import { IGridsterOptions } from 'angular2gridster';
import { Equipment_Grid_Padding, Equipment_Header_Height } from '../app.consts';
import * as Tone from 'tone';
import * as ToneUI from '@tonejs/ui'
export const padding: number = Equipment_Grid_Padding;
export const headerHeight: number = Equipment_Header_Height;

@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.scss']
})
export class RackComponent implements AfterViewInit {
  // POC TONE JS:
  envelope: { x: number, y: number }[] = [];
  freeverb: Tone.Freeverb = new Tone.Freeverb().toMaster();
  synth: Tone.PolySynth = new Tone.PolySynth(<Tone.PolySynthOptions>{
    oscillator: { type: 'sine' },
    envelope: {
      attack: 0.4,
      decay: 0.2,
      sustain: 0.5,
      release: 1,
      releaseCurve: 'linear'
    }
  }).connect(this.freeverb);

  equipment: string = 'Piano';
  equipments: Equipment[] = [
    // {
    //   name: 'tone-envelope',
    //   events: [],
    //   equipmentType: EquipmentType.ToneJsUI,
    //   configuration: {
    //     attack : 0.4,
    // 		decay : 0.2,
    // 		sustain : 0.5,
    // 		release : 1,
    // 		releaseCurve : 'linear'
    //   },
    //   height: 5,
    //   width: 8,
    //   uid: 't-ui-env'
    // },
    {
      name: 'tone-synth',
      events: [],
      equipmentType: EquipmentType.ToneJsUI,
      context: this.synth,
      height: 5,
      width: 8,
      uid: 't-ui-monosynth'
    },
    {
      name: 'tone-piano',
      events: [],
      equipmentType: EquipmentType.ToneJsUI,
      context: this.synth,
      properties: { polyphonic: true },
      height: 2,
      width: 8,
      uid: 't-ui-keyboard'
    },
    {
      name: 'tone-freeverb',
      events: [],
      equipmentType: EquipmentType.ToneJsUI,
      context: this.freeverb,
      height: 4,
      width: 4,
      uid: 't-ui-freeverb'
    },
    // {
    //   name: 'Piano',
    //   events: ['change'],
    //   equipmentType: EquipmentType.Nexus,
    //   context: {
    //     'size': [128, 64],
    //     'mode': 'button',
    //     'lowNote': 48,
    //     'highNote': 84
    //   },
    //   height: 2,
    //   width: 8,
    //   uid: 'pia'
    // },
    //  {
    //   name: 'Sequencer',
    //   events: ['change'],
    //   equipmentType: EquipmentType.Nexus,
    //   context: {
    //     'size': [400, 200],
    //     'mode': 'toggle',
    //     'rows': 8,
    //     'columns': 8
    //   },
    //   height: 3,
    //   width: 3,
    //   uid: 'seq'
    // },
    { name: 'Multislider', events: ['change'], uid: 'Multislider', width: 3, height: 1, equipmentType: EquipmentType.Nexus },
    { name: 'Envelope', events: ['change'], uid: 'Envelope', width: 3, height: 1, context: { noNewPoints: false }, equipmentType: EquipmentType.Nexus },
    { name: 'Pan', events: ['change'], uid: 'Pan', context: {}, maxWidth: 128, maxHeight: 32, width: 2, height: 1, equipmentType: EquipmentType.Nexus },
    { name: 'Pan2D', events: ['change'], uid: 'Pan2D', equipmentType: EquipmentType.Nexus },
    { name: 'Meter', events: ['change'], uid: 'Meter', equipmentType: EquipmentType.Nexus },
    { name: 'Toggle', events: ['change'], uid: 'Toggle', maxWidth: 128, maxHeight: 32, equipmentType: EquipmentType.Nexus },
    { name: 'Dial', events: ['change'], uid: 'Dial', equipmentType: EquipmentType.Nexus },
    { name: 'Oscilloscope', events: ['change'], uid: 'Osc', equipmentType: EquipmentType.Nexus },
    { name: 'Spectrogram', events: ['change'], uid: 'spec', equipmentType: EquipmentType.Nexus },
    { name: 'Select', events: ['change'], uid: 'Select', equipmentType: EquipmentType.Nexus },
    { name: 'RadioButton', events: ['change'], uid: 'rad', maxHeight: 32, width: 3, height: 1, equipmentType: EquipmentType.Nexus },
    { name: 'Position', events: ['change'], uid: 'pos', equipmentType: EquipmentType.Nexus },
    { name: 'Number', events: ['change'], uid: 'num', maxWidth: 128, maxHeight: 32, equipmentType: EquipmentType.Nexus },
    { name: 'TextButton', events: ['change'], uid: 'tbut', context: { text: 'TEXT' }, equipmentType: EquipmentType.Nexus },
  ];

  gridsterOptions = <IGridsterOptions>{
    lanes: 16, // how many lines (grid cells) dashboard has
    direction: 'vertical', // items floating direction: vertical/horizontal/none
    floating: false, // default=true - prevents items to float according to the direction (gravity)
    dragAndDrop: true, // possible to change items position by drag n drop
    resizable: true, // possible to resize items by drag n drop by item edge/corner
    useCSSTransforms: true, // Uses CSS3 translate() instead of position top/left - significant performance boost.
  };

  itemChanged($event: any, equipment: Equipment): void {
    setTimeout(() => {
      try {
        // If Nexus instrument
        if (equipment.equipmentType === EquipmentType.Nexus) {
          let width = $event.item.itemComponent.$element.clientWidth;
          let height = $event.item.itemComponent.$element.clientHeight;
          width = Math.min(width, (equipment.maxWidth + (padding * 2) || 100000));
          height = Math.min(height, (equipment.maxHeight + (padding * 2 + headerHeight) || 100000));
          equipment.nativeInstance.resize(width - (padding * 2), height - (padding * 2) - headerHeight);
        }
      } catch (error) {
        console.debug(error);
      }
    });
  }

  handleEquipmentEvent($event: any, equipment: Equipment): void {
    console.log($event);

    // if (equipment.name === 'Piano') {
    //   if ($event.state) {
    //     this.synth.triggerAttack($event.note);
    //   } else {
    //     this.synth.triggerRelease($event.note);
    //   }
    // }

    // The nexus envelop is not so appropriate. But it has velocity.
    // The envelop used in the tonejs examples would be interesting,
    // but the envelop in the tonejs engine seem to not have velocity. (The y / amplitude / velocity / whatever)
    // if (equipment.name === 'Envelope') {
    //   if ($event.length > 4) {
    //     this.synth.envelope.attack = $event[1].x - $event[0].x;
    //     this.synth.envelope.sustain = $event[2].x - $event[1].x;
    //     this.synth.envelope.decay = $event[3].x - $event[2].x;
    //     this.synth.envelope.release = $event[4].x - $event[3].x;
    //   }
    // }
  }

  ngAfterViewInit(): void {
    console.log(ToneUI.Channel); // TODO: It forces import of ToneUI
  }
}

export interface Equipment extends GridItem {
  equipmentType?: EquipmentType;
  events: string[];
  name: string;
  uid: string;
  context?: {};
  properties?: {};
  nativeInstance?: any;
  state?: any;
  maxWidth?: number;
  maxHeight?: number;
}

export enum EquipmentType {
  Nexus = 0,
  ToneJsUI = 1
}

export interface GridItem {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export enum ToneJSUIEquipment {
  ToneAmSynth = 'tone-am-synth',
  ToneAutoFilter = 'tone-auto-filter',
  ToneAutoPanner = 'tone-auto-panner',
  ToneButton = 'tone-button',
  ToneChebyshev = 'tone-chebyshev',
  ToneChorus = 'tone-chorus',
  ToneCompressor = 'tone-compressor',
  ToneDistortion = 'tone-distortion',
  ToneDuoSynth = 'tone-duo-synth',
  ToneEnvelope = 'tone-envelope',
  ToneFmSynth = 'tone-fm-synth',
  ToneFreeverb = 'tone-freeverb',
  ToneGrainPlayer = 'tone-grain-player',
  ToneKeyboard = 'tone-keyboard',
  ToneMembraneSynth = 'tone-membrane-synth',
  ToneMetalSynth = 'tone-metal-synth',
  ToneMonoSynth = 'tone-mono-synth',
  ToneNoiseSynth = 'tone-noise-synth',
  ToneNoise = 'tone-noise',
  ToneOscillator = 'tone-oscillator',
  TonePingPongDelay = 'tone-ping-pong-delay',
  TonePlayToggle = 'tone-play-toggle',
  TonePlayer = 'tone-player',
  ToneReverb = 'tone-reverb',
  ToneSampler = 'tone-sampler',
  ToneSelectAttribute = 'tone-select-attribute',
  ToneSelect = 'tone-select',
  ToneSlider2d = 'tone-slider-2d',
  ToneSlider = 'tone-slider',
  ToneStepSequencer = 'tone-step-sequencer',
  ToneSynth = 'tone-synth',
  ToneToggle = 'tone-toggle',
  ToneTremolo = 'tone-tremolo',
  ToneUnmute = 'tone-unmute'
}
