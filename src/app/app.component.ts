import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {MqttService} from "ngx-mqtt";
import Measurement from "./typings/Measurement";
import MqttValue from "./typings/MqttValue";
import {MeasurementService} from "./services/measurement.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  leoBoxMeasurement: Measurement[] = []

  constructor(private sensorMeasurements: MeasurementService) {}

  ngOnInit(): void {
    this.sensorMeasurements.data.subscribe(value => {
      this.leoBoxMeasurement = value
    })
  }
}
