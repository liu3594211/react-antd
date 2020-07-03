import React, { Component } from 'react'
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap'
import store from './../../sotre/index'
import {mapCity} from './../../sotre/actionCreators'
const { BMap } = window
const citys = ''
export default class map extends Component {
  componentDidMount(){
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);
    map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
    var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == 0){
      var mk = new BMap.Marker(r.point);	
      map.addOverlay(mk);
			map.panTo(r.point);	
      this.citys = r.address.city
      console.log(r);		
      const action = mapCity(r.address.city)
      store.dispatch(action)
		}
		else {
			alert('failed'+this.getStatus());
		}        
	},{enableHighAccuracy: true})
    

  }
  render() {
    return (
      <div>
         <div id='allmap' style={{width:'100%',height:'100vh'}}>

         </div>
      </div>
    )
  }
}
