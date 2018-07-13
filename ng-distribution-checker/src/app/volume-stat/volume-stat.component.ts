import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-volume-stat',
  templateUrl: './volume-stat.component.html',
  styleUrls: ['./volume-stat.component.css'],
})
export class VolumeStatComponent implements OnInit {
  @Input() project
  @Input() ksData
  @Input() averages

  constructor() {}

  ngOnInit() {}
}
