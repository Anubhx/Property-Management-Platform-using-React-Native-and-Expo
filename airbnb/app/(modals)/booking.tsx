import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import { defaultStyles } from '@/constants/Styles'
import Animated, { FadeOut, SlideInDown, FadeIn } from 'react-native-reanimated' // Import FadeIn from react-native-reanimated
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { GestureHandlerRootView, ScrollView, TextInput } from 'react-native-gesture-handler'
import { places } from '@/assets/data/places';
import DatePicker from 'react-native-modern-datepicker';
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const guestsGropus = [
  {
    name: 'Adults',
    text: 'Ages 13 or above',
    count: 0,
  },
  {
    name: 'Children',
    text: 'Ages 2-12',
    count: 0,
  },
  {
    name: 'Infants',
    text: 'Under 2',
    count: 0,
  },
  {
    name: 'Pets',
    text: 'Pets allowed',
    count: 0,
  },
];

const Page = () => {
  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);

  const [groups, setGroups] = useState(guestsGropus);
  const router = useRouter();
  const today = new Date().toISOString().substring(0, 10);

  const onClearAll = () => {
    setSelectedPlace(0);
    setOpenCard(0);
  };
  return (
   <BlurView intensity={70} style={styles.container}  tint='light'>
    
    {/*  Where */}
    <View style={styles.card}>
        {openCard != 0 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(0)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}>
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewdData}>I'm flexible</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 0 && (
          <>
           <Animated.Text  entering={FadeIn} 
          style= {styles.cardHeader}>Where to ?
          </Animated.Text>

          <Animated.View style= {styles.cardBody}>
            <View style={styles.searchSection}>
            <Ionicons name='search' size={24} color={Colors.grey} />
              <GestureHandlerRootView>
              
              <TextInput style={styles.inputField} placeholder='Search destination' placeholderTextColor={Colors.grey} />
              </GestureHandlerRootView>
            </View>
          </Animated.View>
          <GestureHandlerRootView   >
            <ScrollView horizontal showsHorizontalScrollIndicator={true}  style={styles.placesContainer}>
             {places.map((item, index) => (
              <TouchableOpacity onPress={()=> setSelectedPlace(index)} >
                <Image source={item.img} style={selectedPlace === index ? styles.placeSelected : styles.place } />
                <Text 
                style={[{paddingTop:6 }, selectedPlace === index ? {fontFamily: 'mon-sb'} : {fontFamily: 'mon'}]
                }>{item.title}
                </Text>
              </TouchableOpacity>
             ))}
            </ScrollView>
            </GestureHandlerRootView>
          </>
        )}
        
    </View>
    {/*  When */}
    <View style={styles.card}>
        {openCard != 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}>
            <Text style={styles.previewText}>When</Text>
            <Text style={styles.previewdData}>Any week</Text>
          </AnimatedTouchableOpacity>
        )}
                {openCard === 1 && (
                  <>
                  <Animated.Text  entering={FadeIn} 
                  style= {styles.cardHeader}>When's your trip?
                  </Animated.Text>
                  <Animated.View style= {styles.cardBody}>
                    <DatePicker
                    current= {today}
                    selected= {today}
                    mode={'calendar'}
                    options={{
                      defaultFont: "mon",
                      headerFont: "mon-sb",
                      borderColor:'transparent',
                      mainColor: Colors.primary,


                    }}
                    
                    />

                  </Animated.View>
                  </>
         
        )}
        
        </View>
         {/* Guests */}
      <View style={styles.card}>
        {openCard != 2 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(2)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}>
            <Text style={styles.previewText}>Who</Text>
            <Text style={styles.previewdData}>Add guests</Text>
          </AnimatedTouchableOpacity>
        )}
               {openCard === 2 && (
          <>
          <Animated.Text  entering={FadeIn} 
         style= {styles.cardHeader}>Who's coming ?
         </Animated.Text>

         <Animated.View style= {styles.cardBody}>
          {groups.map((item, index) => (
            <View key= {index} style={[styles.guestItem , index +1 <guestsGropus.length ? styles.itemBorder:null ]} >
              <View>
                <Text style={{fontFamily: 'mon-sb', fontSize: 18}}>{item.name}</Text>
                <Text style={{fontFamily: 'mon', fontSize: 14, color: Colors.grey}}>{item.text}</Text>
              </View>
              <View style={{flexDirection: 'row', gap: 20}}>
                <TouchableOpacity onPress={() => setGroups(groups.map((group, i) => i === index ? 
                  {...group, count: group.count - 1} : group))}>
                  <Ionicons name='remove-circle-outline' size={26} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={{fontFamily: 'mon-sb', fontSize: 18 , minWidth:18,textAlign:'center'}}>{item.count}</Text>
                <TouchableOpacity onPress={() => setGroups(groups.map((group, i) => i === index ? {...group, count: group.count + 1} : group))}>
                  <Ionicons name='add-circle-outline' size={26} color={Colors.dark} />
                </TouchableOpacity>

            </View>

            </View>

          ))}
         </Animated.View>
         </>
        )}
        </View>


    <Animated.View style={defaultStyles.footer} entering= {SlideInDown.delay(200)}>
      <View 
      style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <TouchableOpacity
            style={{ height: '100%', justifyContent: 'center' }}
            onPress={onClearAll}>
            <Text
             style={{
              fontSize: 18,
              fontFamily: 'mon-sb',
              textDecorationLine: 'underline',
            }} >
              Clear all
            </Text>
          </TouchableOpacity>
          {/*  <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
            onPress={() => router.back()}>
            <Ionicons
              name="Map"
              size={24}
              style={defaultStyles.btnIcon}
              color={'#fff'}
            />
            <Text style={defaultStyles.btnText}>Map</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
            onPress={() => router.back()}>
            <Ionicons
              name="search"
              size={24}
              style={defaultStyles.btnIcon}
              color={'#fff'}
            />
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
      </View>
      </Animated.View>
   </BlurView>
  )
}

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
export default Page;