import { View, StyleSheet , Text , TouchableOpacity } from "react-native"; 
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import listingsData from "@/assets/data/airbnb-listings.json";
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import Listings from "@/components/Listings";
import ListingsMaps from "@/components/ListingsMaps";
// import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router'



const page = () => {
  const items = useMemo(() => listingsData as any, []);
  const [category, setCategory] = useState<string>('Tiny homes');
  const getoItems = useMemo(() => listingsDataGeo, []);
  
  
    const onDataChanged = (category: string) => {
      setCategory(category);
    };
  return (
    <View style={{ flex: 1, marginTop: 90 }}>
    
    <Stack.Screen
      options={{
        header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
      }}
    />
    
    
    
    <Listings listings={items} category={category} refresh={false} />   
      {/* <ListingsMaps listings={listingsDataGeo} /> */}
      {/* <ListingsBottomSheet listings={items} category={category} /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  cardHeader: {
    fontFamily: 'mon-b',
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
    
  },
  cardPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    
  },

  searchSection: {
    height: 50,
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ABABAB',
    borderRadius: 8,
    marginBottom: 4,
  },
  searchIcon: {
    padding: 10,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  placesContainer: {
    flexDirection: 'row',
    gap: 25,
    paddingLeft: 20,
    marginBottom: 20,
   
  },
  placesContainer1: {
    flexDirection: 'row',
    gap: 25,
    
    
  },
  place: {
    width: 110,
    height: 110,
    borderRadius: 10,
    
  },
  placeSelected: {
    borderColor: Colors.grey,
    borderWidth: 2,
    borderRadius: 10,
    width: 110,
    height: 110,
    
  },
  previewText: {
    fontFamily: 'mon-sb',
    fontSize: 14,
    color: Colors.grey,
  },
  previewdData: {
    fontFamily: 'mon-sb',
    fontSize: 14,
    color: Colors.dark,
  },

  guestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
  },
})
export default page;