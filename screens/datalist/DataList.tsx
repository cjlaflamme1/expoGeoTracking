import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../../store/hooks';

interface Props {}

const DataList: React.FC<Props> = () => {
  const currentState = useAppSelector((state) => ({
    trackingState: state.trackingState,
  }));
  return (
    <View>
      {
        currentState.trackingState.allTracks &&
        currentState.trackingState.allTracks.length > 0 &&
        currentState.trackingState.allTracks.map((track) => (
          <Text>
            {JSON.stringify(track)}
          </Text>
        ))
      }
    </View>
  );
};

export default DataList;