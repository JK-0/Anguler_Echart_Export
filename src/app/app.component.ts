import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import * as ech from 'echarts';
import * as PptxGenJS  from 'pptxgenjs-angular'

// import { EChartOption } from 'echarts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  title = 'Echart image export base64 / base64 img to pptx';
  mychart: any;
  options: any = {};
  img: any;
  src: any;
  ngOnInit() {
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

  export_bas64(){
    
    this.img = new Image();
    this.img.src = this.mychart.getDataURL({
        type: 'png',
        pixelRatio: 2,
        backgroundColor: '#fff'
    });
    // image
    // console.log(this.img);

    // image base64 data
    // decode with https://codebeautify.org/base64-to-image-converter
    console.log(this.img.src);
    console.log(this.img.src.substring(22)); 

  }

  base64_to_ppt_single_slide(){
    
    const pptx = new PptxGenJS();
    const slide = pptx.addNewSlide();
    slide.addImage({ data: 'image/png;base64, ' + this.img.src + '', x: 1, y: 2, w: 3, h: 3 })
    // slide.addImage({ path: '/assets/mean.jpg', x: 1, y: 2, w: 3, h: 3 })
    slide.addText('Image Path!', { x: 1.5, y: 1.5, font_size: 18, color: '363636' });
    pptx.save('Sample Presentation');
  }

  base64_to_ppt_Multiple_slide(){

    console.log("multi slide");

    const pptx = new PptxGenJS();
    const slide_one = pptx.addNewSlide("TITLE_SLIDE");
    slide_one.addImage({ data: 'image/png;base64, ' + this.img.src + '', x: 1, y: 2, w: 3, h: 3 })
    slide_one.addText('Image Path!', { x: 1.5, y: 1.5, font_size: 18, color: '363636' });

    // The background color can be overridden on a per-slide basis:
    const slide_two = pptx.addNewSlide('Master_SLIDE', {bkgd:'FFFCCC'});
    slide_two.addImage({ data: 'image/png;base64, ' + this.img.src + '', x: 0.2, y: 0.2, w: 2, h: 2 })
    slide_two.addText('Image Path!', { x: 1.5, y: 1.5, font_size: 18, color: '363636' });
    pptx.save('Multi_Slide_Sample Presentation');

  }
}
