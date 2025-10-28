import React from "react";

// import Material Ui :
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Loader } from "./Loader";
// import Components :
import { Prayer } from "./Prayer";

//import hooks :
import { useState, useEffect } from "react";

// import external librires :
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar-dz";
export default function MainContent() {
  moment.locale("ar-dz");
  const [selectedCity, setCity] = useState({
    displayName: "مكة المكرمة",
    apiName: "Makkah al Mukarramah",
    Sp: "SA",
  });
  const [today, settoday] = useState("");
  const [timer, setTimer] = useState(10);
  const [isLoading, setIsLoading] = useState(true); 
  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];
  const [timings, setTimings] = useState({
    Fajr: "04:32",
    Dhuhr: "11:39",
    Asr: "15:00",
    Maghrib: "17:28",
    Isha: "18:58",
  });
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  const [remainingTime, setReminingTime] = useState("");
  const getTimes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?country=${selectedCity.Sp}&city=${selectedCity.apiName}`
      );
      console.log("here ::", response.data.data.timings);
      setTimings(response.data.data.timings);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("API Error:", error);
    }
  };
  useEffect(() => {
    getTimes();
  }, [selectedCity]);
  useEffect(() => {
    let interval = setInterval(() => {
      console.log("hello there");
      setupCountdownTimer();
      const t = moment();
      console.log("the date is :::::", t.format("MMM Do YYYY| h:mm"));
      settoday(t.format("MMM Do YYYY| h:mm"));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timings]);
  const setupCountdownTimer = () => {
    const momentnNow = moment();

    let PrayerIndex = 2;

    if (
      momentnNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentnNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      console.log("next prayer is Dohr");
      PrayerIndex = 1;
    } else if (
      momentnNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentnNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      console.log("next prayer is Asr");
      PrayerIndex = 2;
    } else if (
      momentnNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentnNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ) {
      console.log("next prayer is Maghrib");
      PrayerIndex = 3;
    } else if (
      momentnNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      momentnNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      console.log("next prayer is Isha");
      PrayerIndex = 4;
    } else
      momentnNow.isAfter(moment(timings["Isha"], "hh:mm")) &&
        momentnNow.isBefore(moment(timings["Fajr"], "hh:mm"));
    {
      console.log("next prayer is Fajr");
      PrayerIndex = 0;
    }
    setNextPrayerIndex(PrayerIndex);

    const nextPrayerObject = prayersArray[PrayerIndex];
    const nextPrayerTimer = timings[nextPrayerObject.key];

    // const remainingTime = momentnNow.diff(moment(nextPrayerTimer, "hh:mm"));
    let remainingTime = moment(nextPrayerTimer, "hh:mm").diff(momentnNow);
    const nextPrayerTimeMoment = moment(nextPrayerTimer, "hh:mm");
    console.log(remainingTime);
    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentnNow);
      console.log(midnightDiff);
      const FajrDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );
      console.log("here ---", FajrDiff);
      const totalDiff = midnightDiff + FajrDiff;
      remainingTime = totalDiff;
    }
    const durationRemainingTime = moment.duration(remainingTime);
    setReminingTime(
      `${durationRemainingTime.hours()}:${durationRemainingTime.minutes()}:${durationRemainingTime.seconds()}`
    );
    console.log(
      "reset :::::::",
      durationRemainingTime.hours(),
      ":",
      durationRemainingTime.minutes(),
      ":",
      durationRemainingTime.seconds()
    );
  };

  function handelCityChange(event) {
    console.log("the new value is :", event.target.value);
    const cityObject = avilableCities.find((city) => {
      return city.apiName == event.target.value;
    });
    setCity(cityObject);
  }
  const avilableCities = [
    {
      displayName: "مكة المكرمة",
      apiName: "Makkah al Mukarramah",
      Sp: "SA",
    },
    {
      displayName: "المدينة المنورة",
      apiName: "Al-Madīna al-Munawwara",
      Sp: "SA",
    },
    {
      displayName: "وهران",
      apiName: "Oran",
      Sp: "DZ",
    },
    {
      displayName: "البليدة",
      apiName: "Blida",
      Sp: "DZ",
    },
  ];
  if (isLoading) {
    return <Loader />; 
  }
  return (
    <>
      {/* TOP ROW  */}
      <Grid
        container
        style={{
          width: "90vw",
          display: "flex",
          justifyContent: "space-evenly",
          // alignItems:"center"
        }}
      >
        <Grid xs={6} color={"white"}>
          <div>
            <h2>{today}</h2>
            <h2>{selectedCity.displayName}</h2>
            {/* <h2>{timer}</h2> */}
          </div>
        </Grid>
        <Grid xs={6} color={"white"}>
          <div>
            <h2>
              متبقي على صلاة العصر :{prayersArray[nextPrayerIndex].displayName}
            </h2>
            <h2>{remainingTime}</h2>
          </div>
        </Grid>
      </Grid>
      {/* TOP ROW  || */}
      <Divider style={{ borderColor: "white", opacity: "0.1" }} />
      {/* PRAYER CARDS */}
      <Stack
        direction="row"
        justifyContent={"space-around"}
        style={{ marginTop: "30px" }}
      >
        <Prayer
          name="الفجر"
          time={timings.Fajr}
          image="/assets/images.jpg"
        />
        <Prayer
          name="الظهر"
          time={timings.Dhuhr}
          image="/assets/téléchargement (1).jpg"
        />
        <Prayer
          name="العصر"
          time={timings.Asr}
          image="/assets/téléchargement (2).jpg"
        />
        <Prayer
          name="المغرب"
          time={timings.Maghrib}
          image="/assets/téléchargement (3).jpg"
        />
        <Prayer
          name="العشاء"
          time={timings.Isha}
          image="/assets/téléchargement (4).jpg"
        />
      </Stack>
      {/* PRAYER CARDS || */}

      {/* SELECT CITY */}
      <Stack
        direction={"row"}
        justifyContent={"center"}
        style={{ marginTop: "40px" }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel style={{ color: "white" }} id="demo-simple-select-label">
            المدينة
          </InputLabel>
          <Select
            style={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={selectedCity.apiName}
            onChange={handelCityChange}
          >
            {avilableCities.map((city) => {
              return (
                <MenuItem key={city.apiName} value={city.apiName}>
                  {city.displayName}{" "}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      {/* SELECT CITY || */}
    </>
  );
}
