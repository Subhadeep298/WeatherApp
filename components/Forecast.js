import moment from "moment";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import FutureForecast from "./FutureForecast";

const Forecast = ({weatherData}) => {
  return (
    <ScrollView
      horizontal={true}
      decelerationRate={"fast"}
      style={styles.scrollContainer}
      style={styles.weatherScroll}
    >
      <CurrentTempEl data={weatherData && weatherData.length > 0 ? weatherData[0] : {}}/>
      <FutureForecast data={weatherData}/>
    </ScrollView>
  );
};

const CurrentTempEl = ({data}) => {
  if(data && data.weather){
    const img = {uri: 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'@4x.png'}
  return (
    <View style={styles.container}>
      <Image source={img} style={styles.icons}></Image>
      <View style={styles.innerContainer}>
        <Text style={styles.dayText}>{moment(data.dt * 1000).format('dddd')}</Text>
        <Text style={styles.tempText}>Night - {data.temp.night}&#176;C</Text>
        <Text style={styles.tempText}>Day - {data.temp.day}&#176;C</Text>
      </View>
    </View>
  );
  }else{
    return( 
        <View>

        </View>

    )   
}

};



const styles = StyleSheet.create({
  icons: {
    width: 150,
    height: 150,
  },
  weatherScroll: {
    backgroundColor: "#D4C1EC77",
    padding: 10,
    flex: 0.4,
  },
  dayText: {
    fontSize: 20,
    color: "#736CED",
    backgroundColor: "#F2DFD7",
    padding: 10,
    textAlign: "center",
    borderRadius: 50,
    fontWeight: "400",
    marginBottom: 15,
  },
  tempText: {
    fontSize: 15,
    color: "#F2DFD7",
  },
  container: {
    paddingHorizontal: 1,
    flexDirection: "row",
    backgroundColor: "#00000055",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#FEF9FF",
    borderWidth: 1,
  },
  innerContainer: {
    padding: 40,
  },
});

export default Forecast;
