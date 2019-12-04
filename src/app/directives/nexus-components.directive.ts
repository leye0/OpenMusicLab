import { Directive, Input, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import * as Nexus from 'nexusui';
import { NexusComponent } from '../layouts/rack.component';

@Directive({
  selector: '[nexusComponent]'
})
export class NexusComponentsDirective implements OnInit {
  @Input() public nexusComponent!: NexusComponent;
  @Input() public nexusColorFill!: string;
  @Output() public onNexusComponentEvent: EventEmitter<any> = new EventEmitter();
  instance: any;

  constructor(private element: ElementRef) { (window as any).Nexus = Nexus; }

  ngOnInit(): void {
    const method = Nexus[this.nexusComponent.name];
    if (method) {
      this.nexusComponent.nexusInstance = this.instance = new method(this.element.nativeElement, this.nexusComponent.configuration);
      (this.element.nativeElement as HTMLElement).classList.add(`nexus-${this.nexusComponent.name}`);
      // TODO: Not reacting to changes for now. And only using fill.
      if (this.nexusColorFill) {
        this.instance.colorize('fill', this.nexusColorFill);
      }
      this.instance.on('change', event => this.onNexusComponentEvent.emit(event));
    } else {
      console.debug(`The specified method [${this.nexusComponent.name}] doesn't exist`);
    }
  }
}
