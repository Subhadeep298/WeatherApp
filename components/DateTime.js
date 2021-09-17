import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View } from "react-native";
 

import moment from 'moment-timezone'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const WeatherItem = (props) => {
  return (
    <>
      <View style={styles.eachContainer}>
        <Text style={styles.weatherComponentText}>{props.title} :</Text>
        <Text style={styles.weatherComponentText}>
          {props.value}
          {props.unit}
        </Text>
      </View>
    </>
  );
};

const DateTime = (props) => {

  const [date,setDate]=useState('')
  const [time,setTime]=useState('')
  
  useEffect(() => {
    setInterval(() => {
      const time = new Date();
      const month = time.getMonth();
      const date = time.getDate();
      const day = time.getDay();
      const hour = time.getHours();
      const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
      const minutes = time.getMinutes();
      const ampm = hour >=12 ? 'pm' : 'am'
  
      setTime((hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes) +ampm) 
  
      setDate(days[day] + ', ' + date+ ' ' + months[month]) 
  
  }, 1000);
    
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.LeftSide}>
        <View style={styles.DateTimeComponent}>
          <Text style={styles.TimeText}>{time}</Text>
          <Text style={styles.DateText}>{date}</Text>
        </View>
        <View style={styles.WeatherItemContainer}>
          <WeatherItem title="Humidity" value={props.current? props.current.humidity:"" } unit="%" />
          <WeatherItem title="Pressure" value={props.current? props.current.pressure:"" }  unit="hPa" />
          <WeatherItem title="Sunrise" value={props.current?  moment.tz(props.current.sunrise * 1000, props.timezone ).format('HH:mm'):"" } unit="AM"/>
          <WeatherItem title="Sunset" value={props.current?  moment.tz(props.current.sunset * 1000, props.timezone ).format('HH:mm'):"" } unit="PM" />
        </View>
      </View>
      <View style={styles.RightSide}>
        <View style={styles.LocLatLong}>
          <Text style={styles.LocationText}>{props.timezone}</Text>
          <Text style={styles.CordinateText}>{props.lat}° N, {props.lon}° E</Text>
        </View>
      </View>
    </View>
  );
};

export default DateTime;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(115, 108, 237,0.20)",
    flex: 2,
    justifyContent: "space-between",
    paddingTop: 15,
  },
  LeftSide: {},
  RightSide: {},
  DateTimeComponent: {
    marginTop: 50,
    marginLeft:10,
    paddingHorizontal: 20,
    paddingVertical:10,
    backgroundColor: "#rgba(212, 193, 236,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#FEF9FF",
    borderWidth: 0.5,
  },
  TimeText: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#F2DFD7",
  },
  DateText: {
    fontSize: 17,
    color: "#F2DFD7",
  },
  LocLatLong: {
    paddingTop: 54,
    paddingHorizontal: 20,
  },
  LocationText: {
    fontSize: 17,
    color: "#F2DFD7",
  },
  CordinateText: {
    fontStyle: "italic",
    fontSize: 14,
    fontWeight: "300",
    paddingTop: 10,
    color: "#F2DFD7",
  },
  WeatherItemContainer: {
    backgroundColor: "rgba(212, 193, 236,0.2)",
    borderRadius: 10,
    padding: 10,
    marginTop: 180,
    marginLeft: 10,
  },
  eachContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  weatherComponentText: {
    color: "#F2DFD7",
    fontSize: 14,
    fontWeight: "100",
  },
});
