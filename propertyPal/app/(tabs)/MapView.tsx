
import { View, StyleSheet } from "react-native"; 
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import listingsData from "@/assets/data/istings.json";
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import ListingsMaps from "@/components/ListingsMaps";
// import { TouchableOpacity } from "react-native-gesture-handler";

const page = () => {
  const items = useMemo(() => listingsData as any, []);
  const [category, setCategory] = useState<string>('Tiny homes');
  const getoItems = useMemo(() => listingsDataGeo, []);
  }
const MapView = () => {
  return (
    <View style={{ flex: 1, marginTop: -20 }}>
    
    <Stack.Screen
    />
     <ListingsMaps listings={listingsDataGeo} />
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
})
export default MapView;