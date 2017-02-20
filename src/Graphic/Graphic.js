import React, {Component } from  'react'

import axios from 'axios'
import {Chart} from 'react-google-charts'
import {Form, Button, Container, Icon, Label,
  Input, Menu } from 'semantic-ui-react'
import Moment from 'moment';
import { extendMoment } from 'moment-range';

class Graphic extends Component{
  constructor(){
  super()
  this.state = {
    options:{
       title: new Date(),
       hAxis: {title: 'Data', minValue: 2, maxValue: 2},
       vAxis: {title: 'Cotação', minValue: 2, maxValue: 2},
       legend: 'none'
    },
    data:[['Data', 'Cotação']],
    sumAverage:[],
    highestValue:[],
    lowestValue:[],
    hValue:0,
    lValue:100,
    average:0
  };
  this.average = this.average.bind(this)
}

render() {
  return (
    <div>
    <Container>
      <Chart
        chartType="LineChart"
        data={this.state.data}
        options={this.state.options}
        graph_id="ScatterChart"
        width="100%"
        height="400px"
        legend_toggle
      />
      <br/>
      <br/>
       <Input placeholder='' label='Valor mais alto no período: ' value={this.state.highestValue[1]} />
       <Input placeholder='' label='Data do valor mais alto no período: ' value={this.state.highestValue[0]} />
      <br/>
       <Input placeholder='' label='Valor mais baixo no período: ' value={this.state.lowestValue[1]} />
       <Input placeholder='' label='Data do valor mais baixo no período: ' value={this.state.lowestValue[0]} />
       <br/>
       <Button label={<Label>{this.state.average}</Label>}  onClick={this.average} content='Clique para gerar média no período' />
    </Container>
    </div>
  )
 }
}

export default Graphic
