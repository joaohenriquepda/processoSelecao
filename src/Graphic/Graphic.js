import React, {Component } from  'react'

import axios from 'axios'
import DatePicker from 'react-datepicker'
import {Chart} from 'react-google-charts'
import {Button, Container, Label,
  Input } from 'semantic-ui-react'
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

serviceGetUSD(date){
  return axios.get('http://api.fixer.io/'+date+'?base=USD')
}

//This function searching data in API
getInfor(date){
  this.serviceGetUSD(date)
  .then(data => {
    this.setHighestValue(data.data)
    this.setLowestValue(data.data)
    this.addElements(data.data)
}).catch(error => {
    console.log('Error message: ' + error )
});
}

componentDidMount() {
  let moment = extendMoment(Moment);
  let range = moment.range('2009-08-07', '2011-11-17');
  let days = Array.from(range.by('day'));
  days.map(x =>{
        this.getInfor(x.format('YYYY-MM-DD'))
  })
}
setHighestValue(data){
  if(data.rates.BRL > this.state.hValue){
    this.setState({hValue: data.rates.BRL})
    let value = [data.date, data.rates.BRL]
    this.setState({highestValue:value})
  }
}


setLowestValue(data){
  if(data.rates.BRL < this.state.lValue){
    this.setState({lValue: data.rates.BRL})
    let value = [data.date, data.rates.BRL]
    this.setState({lowestValue:value})
  }
}

addElements(data){
  let array = this.state.data
  let sumArray = this.state.sumAverage
  let cotation = [data.date,data.rates.BRL]
  array.push(cotation)
  sumArray.push(cotation)
  this.setState({data:array})
  this.setState({sumAverage:sumArray})
}


average(){
  let qtd = this.state.sumAverage.length
  let sum = 0
  let list = this.state.sumAverage
  list.map(x=>{
    sum = sum +x[1]
  })
  let totalAverage = sum/qtd
  this.setState({average:totalAverage})
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
