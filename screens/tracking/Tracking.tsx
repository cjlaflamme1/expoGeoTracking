import React, { useEffect, useRef, useState } from 'react';
import { Button, Linking, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { LocationGeocodedAddress, LocationObject } from 'expo-location';
import globalStyles from '../../styles/globalStyles';

interface Props {}

const Tracking: React.FC<Props> = () => {
  const [foreground, requestForeground] = Location.useForegroundPermissions();
  const [background, requestBackground] = Location.useBackgroundPermissions();
  const [currentPosition, setCurrentPosition] = useState<LocationObject>();
  const [geocode, setGeocode] = useState<LocationGeocodedAddress[]>();

  const foregroundPress = async () => {
    const res = await requestForeground();
    if (res && !res.granted) {
      Linking.openSettings();
    }
  };

  const backgroundPress = async () => {
    try {
      const res = await requestBackground();
      if (res && !res.granted) {
        Linking.openSettings();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getCurrentPosition = async () => {
    const currPos = await Location.getCurrentPositionAsync();
    setCurrentPosition(currPos);
    const currGeo = await Location.reverseGeocodeAsync(currPos.coords);
    setGeocode(currGeo);
  };
  return (
    <View style={globalStyles.container}>
      <Text>Tracking landing here</Text>
      <View>
        <View style={globalStyles.block}>
          <Text>Foreground permission:</Text>
          <Text>status: {foreground?.status || 'pending'}</Text>
          {foreground && !foreground.granted && foreground.canAskAgain && (
            // If the permission is not granted, but we can request again, show this
            <Button title="Grant permission" onPress={requestForeground} />
          )}
          {foreground && !foreground.granted && !foreground.canAskAgain && (
            // If the permission is not granted, and we can't request it again, show this.
            //
            // Unfortunately, we have to manually refresh the foreground status in this case.
            // When the user comes back from the app settings page, after manually granting permission,
            // the user has to press this button again, in order to update the state of that permission.
            // We use `requestXPermissionAsync` to update the scoped permission when running in Expo Go.
            // 
            // You could try to implement appState and auto-refreshes, but for this example 
            // I just check before sending people to the app settings.
            // NOTE: this is not a great scenario to be in, and Google will have some issues with this flow.
            <Button
              title="Grant permission through settings"
              onPress={foregroundPress}
            />
          )}
        </View>
        <View style={globalStyles.block}>
          <Button title='Get Position' onPress={getCurrentPosition} />
          <Text>
            {currentPosition && JSON.stringify(currentPosition)}
          </Text>
          <Text>
            {geocode && JSON.stringify(geocode)}
          </Text>
        </View>
        <View style={globalStyles.block}>
          <Text>Background permission:</Text>
          <Text>status: {background?.status || 'pending'}</Text>
          {!foreground?.granted && (
            // We don't have the foreground permission yet,
            // which is required for Android to use background location
            <Text>Grant foreground location permission first</Text>
          )}
          {foreground?.granted && background && !background.granted && background.canAskAgain && (
            // If the permission is not granted, but we can request again, show this.
            // This handles the permission status update automatically for you, when users are coming back from the app settings
            <Button title="Grant permission" onPress={requestBackground} />
          )}
          {foreground?.granted && background && !background.granted && !background.canAskAgain && (
            // If the permission is not granted, and we can't request it again, show this.
            // Same here, we have to manually refresh the background status in this case.
            // NOTE: this is not a great scenario to be in, and Google will have some issues with this flow.
            <Button
              title="Grant permission through settings"
              onPress={backgroundPress}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Tracking;