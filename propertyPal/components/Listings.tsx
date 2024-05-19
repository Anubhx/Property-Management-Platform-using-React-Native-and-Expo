import React, { useEffect, useRef, useState } from 'react';
import { router, useRouter } from 'expo-router';
import { View, Text, ListRenderItem, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontDisplay, processFontFamily } from 'expo-font';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import ListingsMap from './ListingsMaps';
import ListingsMaps from './ListingsMaps';
import { defaultStyles } from '@/constants/Styles';

interface ListingItem {
    name: string;
    id: string;
    title: string;
    image: string;
    medium_url: string;
    review_scores_rating : number;
    room_type: string;
    price: number;
    number_of_reviews: number;
    smart_location: string;
    
    // Assuming each ListingItem has an image property
}

interface Props {
    listings: ListingItem[];
    category: string;
    refresh : boolean;

}

const Listings = ({ listings: items, category }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const listRef = useRef<FlatList<ListingItem>>(null);

    useEffect(() => {
        console.log('RELOADING LISTINGS:', items.length);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, [category]);

    const renderRow: ListRenderItem<ListingItem> = ({ item }) => (
      
      
        <><Link href={`/listing/${item.id}`} asChild>

        <TouchableOpacity>
  
          <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
            <Animated.Image source={{ uri: item.medium_url }} style={styles.image} />
            <TouchableOpacity style={{ position: 'absolute', right: 30, top: 30 }}>
              <Ionicons name="heart-outline" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
            // Goes to map view
            onPress={() => router.navigate('MapView')}>
            <Ionicons
              name="locate-outline"
              size={24}
              style={defaultStyles.btnIcon}
              color={'#fff'}
            />
            <Text style={defaultStyles.btnText}>{item.smart_location}</Text>
          </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, fontFamily: 'mon-sb' }}>{item.name}</Text>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                <Ionicons name="star" size={16} />
                <Text style={{ fontFamily: 'mon-sb' }}>{item.review_scores_rating / 20}</Text>
              </View>
            </View>

            <Text style={{ fontFamily: 'mon' }}>{item.room_type}</Text>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Text style={{ fontFamily: 'mon-sb' }}>€ {item.price}</Text>
              <Text style={{ fontFamily: 'mon' }}>night</Text>
              
            </View>

          </Animated.View>


        </TouchableOpacity>

      </Link>

        </>
      
    );

    return (
        <View>
            <FlatList
                renderItem={renderRow}
                ref={listRef}
                data={loading ? [] : items}
                keyExtractor={item => item.id} // Added keyExtractor for unique identification
            />
          
        </View>
    );
};

const styles = StyleSheet.create({
    listing: {
        padding: 16,
        marginTop: 34,
        gap:10,
        marginVertical :16,
       // paddingBottom: 0,
    },
    btn: {
      backgroundColor: '#fff',
      padding: 14,
      alignContent: 'center',
      fontSize: 16,
      height: 50,
      borderRadius: 30,
      flexDirection: 'row',
      marginHorizontal: 'auto',
      alignItems: 'center',
   },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        //aspectRatio: 1, 
    },

});

export default Listings;
