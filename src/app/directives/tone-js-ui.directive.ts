import { Directive, Input, ElementRef, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Equipment, EquipmentType } from '../layouts/rack.component';
import * as Tone from 'tone';

@Directive({
  selector: '[toneJsUi]'
})
export class ToneJsUIDirective implements OnInit, OnDestroy {

  @Input() public toneJsUi!: Equipment;
  @Output() public onEquipmentEvent: EventEmitter<any> = new EventEmitter();
  instance: any;

  constructor(private element: ElementRef) {
    (window as any).Tone = (window as any).Tone || Tone;
  }

  ngOnInit(): void {
    if (this.toneJsUi.equipmentType !== EquipmentType.ToneJsUI) {
      return;
    }

    if (this.toneJsUi.name) {
      const toneJsUiElement = document.createElement(this.toneJsUi.name) as HTMLElement;
      (this.element.nativeElement as HTMLElement).appendChild(toneJsUiElement);
      this.instance = this.toneJsUi.nativeInstance = toneJsUiElement;
      if (this.toneJsUi.events.length) {
        this.toneJsUi.events.forEach(eventName =>
          this.instance.addEventListener(eventName, $event => this.onEquipmentEvent.emit($event)));
      }

      if (this.instance.bind && this.toneJsUi.context) {
        // console.log(this.instance.bind);
        // console.dir(this.instance);
        setTimeout(() => {
          console.log(this.toneJsUi.context);
          this.instance.bind(this.toneJsUi.context);
        }, 100);
      }

      if (this.toneJsUi.properties) {
        Object.assign(this.instance, this.toneJsUi.properties);
        // console.dir(this.instance);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.toneJsUi.events.length) {
      this.toneJsUi.events.forEach(eventName =>
        this.instance.removeEventHandler(eventName, $event => this.onEquipmentEvent.emit($event)));
    }
  }
}
