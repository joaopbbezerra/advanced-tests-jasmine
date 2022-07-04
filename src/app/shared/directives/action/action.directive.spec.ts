import {ActionDirective} from './action.directive';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActionDirectiveModule} from './action.module';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';

describe(ActionDirective.name, () => {
  let fixture: ComponentFixture<ActionDirectiveTestComponent>;
  let component: ActionDirectiveTestComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionDirectiveTestComponent],
      imports: [ActionDirectiveModule]
    }).compileComponents();
    fixture = TestBed.createComponent(ActionDirectiveTestComponent);
    component = fixture.componentInstance;
  });

  it(`(D) (@Output AppAction) should emit event with payload when Enter key is pressed`, () => {
    // We can call debugElement and use By.directive to call the directive directly from the html
    const divDummy: HTMLElement = fixture.debugElement.query(By.directive(ActionDirective)).nativeElement;
    const event = new KeyboardEvent('keyup', {key: 'Enter'});
    divDummy.dispatchEvent(event);
    const componentEvent = component.hasEvent();
    fixture.detectChanges();
    expect(componentEvent).toBe(true);
  });

  it(`(D) (@Output AppAction) should emit event with payload when clicked`, () => {
    const divDummy: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    const event = new Event('click');
    divDummy.dispatchEvent(event);
    const componentEvent = component.hasEvent();
    fixture.detectChanges();
    expect(componentEvent).toBe(true);
  });


});

@Component({
  template: `<div class="dummy-component" (appAction)="actionHandler($event)"></div>`
})
class ActionDirectiveTestComponent {
  private event: Event = null;
  public actionHandler(event: Event): void{
    this.event = event;
  }
  public hasEvent(): boolean{
    return !!this.event;
  }
}
