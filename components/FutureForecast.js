import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import moment from "moment-timezone";
const FutureForecast = ({ data }) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {data && data.length > 0 ? (
        data.map(
          (data, idx) =>
            idx !== 0 && <FutureForecastItem key={idx} forecastItem={data} />
        )
      ) : (
        <View />
      )}
    </View>
  );
};

const FutureForecastItem = ({forecastItem}) => {
  const img = {uri: "http://openweathermap.org/img/wn/"+forecastItem.weather[0].icon+"@2x.png"}
  return (
    <View style={styles.container}>
      <Image source={img} style={styles.icons}></Image>
      <View style={styles.innerContainer}>
        <Text style={styles.dayText}>{moment(forecastItem.dt * 1000).format('ddd')}</Text>
        <Text style={styles.tempText}>Night - {forecastItem.temp.night}&#176;C</Text>
        <Text style={styles.tempText}>Day - {forecastItem.temp.day}&#176;C</Text>
      </View>
    </View>
  );
};

export default FutureForecast;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000055",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#FEF9FF",
    borderWidth: 1,
    marginHorizontal: 5,
    paddingHorizontal: 15,
  },
  icons: {
    width: 100,
    height: 100,
  },
  innerContainer: {
    alignItems: "center",
  },
  dayText: {
    fontSize: 17,
    color: "#736CED",
    backgroundColor: "#F2DFD7",
    padding: 10,
    textAlign: "center",
    borderRadius: 20,
    fontWeight: "400",
    marginBottom: 10,
  },
  tempText: {
    fontSize: 13,
    color: "#F2DFD7",
  },
});
