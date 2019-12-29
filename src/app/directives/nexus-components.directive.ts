import { Directive, Input, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import * as Nexus from 'nexusui';
import { Equipment, EquipmentType } from '../layouts/rack.component';

@Directive({
  selector: '[nexusComponent]'
})
export class NexusComponentsDirective implements OnInit {
  @Input() public nexusComponent!: Equipment;
  @Input() public nexusColorFill!: string;
  @Output() public onEquipmentEvent: EventEmitter<any> = new EventEmitter();
  instance: any;

  constructor(private element: ElementRef) { (window as any).Nexus = Nexus; }

  ngOnInit(): void {
    console.log(this.nexusComponent.equipmentType);
    if (this.nexusComponent.equipmentType !== EquipmentType.Nexus) {
      return;
    }

    const nexusElement = Nexus[this.nexusComponent.name];
    if (nexusElement) {
      this.nexusComponent.nativeInstance = this.instance = new nexusElement(this.element.nativeElement, this.nexusComponent.context);
      (this.element.nativeElement as HTMLElement).classList.add(`nexus-${this.nexusComponent.name}`);
      // TODO: Not reacting to changes for now. And only using fill.
      if (this.nexusColorFill) {
        this.instance.colorize('fill', this.nexusColorFill);
      }
      this.instance.on('change', event => this.onEquipmentEvent.emit(event));
    } else {
      console.debug(`The specified method [${this.nexusComponent.name}] doesn't exist`);
    }
  }
}
