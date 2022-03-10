import { Injectable } from '@angular/core';
import {MqttService} from "ngx-mqtt";
import Measurement from "../typings/Measurement";
import {Observable, Subject} from "rxjs";
import MqttValue from "../typings/MqttValue";

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  private leoBoxMeasurement = new Map<string, Measurement>()
  private leoBoxMeasurementSubject = new Subject<Measurement[]>()

  constructor(private mqtt: MqttService) {
    this.mqtt.observeRetained('values/111/+/state')
      .subscribe(message => {
        const [floor, room, sensor, state] = message.topic.split('/')
        const mqttValue: MqttValue = JSON.parse(message.payload.toString())
        const value = mqttValue.value
        this.updateSensorMeasurement(message.topic,{
          sensor,
          value
        })
      })
  }

  get data(): Observable<Measurement[]> {
    return this.leoBoxMeasurementSubject
  }

  updateSensorMeasurement(topic: string, data: Measurement) {
    this.leoBoxMeasurement.set(topic, data)
    this.leoBoxMeasurementSubject.next(Array.from(this.leoBoxMeasurement.values()))
  }

}
