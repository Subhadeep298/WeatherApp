import { StatusBar } from "expo-status-bar";
import React,{useEffect,useState} from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import * as Location from 'expo-location';

const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

import DateTime from "./components/DateTime";
import Forecast from "./components/Forecast";

const img = require("./assets/background3.png");

export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("22.4660", "88.3928")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, [])

  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      console.log(data)
      setData(data)
      })
    }
    
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.backgroundimg}>
        <DateTime timezone={data.timezone} lat={data.lat} lon={data.lon} current={data.current}/>
        <Forecast weatherData={data.daily}/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundimg: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
  },
});
