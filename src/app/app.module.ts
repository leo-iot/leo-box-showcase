import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {IMqttServiceOptions, MqttModule} from "ngx-mqtt";

const options: IMqttServiceOptions = {
  hostname: 'vm90.htl-leonding.ac.at',
  protocol: 'ws',
  port: 9001,
  username: 'student',
  password: 'passme',
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MqttModule.forRoot(options)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
