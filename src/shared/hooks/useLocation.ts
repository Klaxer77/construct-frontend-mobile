import { useEffect, useState } from "react";
import { Platform, PermissionsAndroid } from "react-native";
import Geolocation, { GeoPosition } from "react-native-geolocation-service";

export default function useLocation() {
  const [location, setLocation] = useState<GeoPosition | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const status = await Geolocation.requestAuthorization("whenInUse");
      return status === "granted";
    }
  };

  useEffect(() => {
    let watchId: number | null = null;

    const startWatch = async () => {
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        setError("Нет разрешения на использование геолокации");
        return;
      }

      watchId = Geolocation.watchPosition(
        (pos) => {
          setLocation(pos);
          setError(null);
        },
        (err) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 0,
          interval: 5000,
          fastestInterval: 2000,
        }
      );
    };

    startWatch();

    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return { location, error };
}