import React from "react";
import { useEffect, useState } from "react";

const [latitude, setLatitude] = React.useState('');
const [longitude, setLongitude] = React.useState('');
React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude)
    })
}, [])