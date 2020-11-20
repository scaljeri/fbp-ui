import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { NgxsDispatchPluginModule } from "@ngxs-labs/dispatch-decorator";
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from 'src/environments/environment';

// import { MainComponent } from './components/main/main.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { NgxsModule } from '@ngxs/store';
import { FbpState } from './store/state';
import { NodeHeaderComponent } from './components/node-header/node-header.component';
import { NodeComponent } from './components/node/node.component';
import { RandomNumberGeneratorComponent } from './components/nodes/random-number-generator/random-number-generator.component';
import { LoggerComponent } from './components/nodes/logger/logger.component';
import { SocketsComponent } from './components/sockets/sockets.component';
import { GearComponent } from './components/gear/gear.component';
import { SocketComponent } from './components/socket/socket.component';
import { FbpInnerState } from './store/inner-state';
import { SocketPipe } from './pipes/socket.pipe';

@NgModule({
  declarations: [
    // MainComonent,
    NodeComponent,
    ConnectionComponent,
    NodeHeaderComponent,
    RandomNumberGeneratorComponent,
    LoggerComponent,
    SocketsComponent,
    GearComponent,
    SocketComponent,
    SocketPipe,
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([FbpState, FbpInnerState], {
      developmentMode: true,
    }),
    NgxsDispatchPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'NGXS store',
      disabled: environment.production
    })
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    // this.createCustomElement(MainComponent, 'main');
    this.createCustomElement(NodeComponent, 'node');
    this.createCustomElement(SocketsComponent, 'sockets');
    this.createCustomElement(SocketComponent, 'socket');
    this.createCustomElement(GearComponent, 'gear');
    this.createCustomElement(RandomNumberGeneratorComponent, 'random-number-generator');
    this.createCustomElement(LoggerComponent, 'logger');
  }

  createCustomElement(ClassRef: any, name: string): void {
    const fullName = `fbp-${name}`;

    if (!customElements.get(fullName)) {
      const custom = createCustomElement(ClassRef, { injector: this.injector });
      customElements.define(fullName, custom);
    }
  }
}

