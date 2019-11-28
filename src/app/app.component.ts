import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import * as ech from 'echarts';
// import { EChartOption } from 'echarts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  title = 'Echart image export base64';
  mychart: any;
  options: any = {};

  ngOnInit() {
    console.log("init");
    this.ngAfterViewInit();  
  }

  ngAfterViewInit() {

    // init Echart by id
    this.mychart = ech.init(document.getElementById('main'));

    // Echart property or options
    this.options = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }],
    }
    this.mychart.setOption(this.options);
  }

  export(){
    
    var img = new Image();
    img.src = this.mychart.getDataURL({
        type: 'png',
        pixelRatio: 2,
        backgroundColor: '#fff'
    });
    // image
    console.log(img);

    // image base64 data
    // decode with https://codebeautify.org/base64-to-image-converter
    console.log(img.src);



  }
  
}
