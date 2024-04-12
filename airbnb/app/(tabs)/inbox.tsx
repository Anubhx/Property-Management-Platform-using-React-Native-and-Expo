import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; //using Expo

// Dummy notifications data
const notifications = [
  { id: '1', title: 'New message from John Doe', iconName: 'mail'  },
  { id: '2', title: 'Booking is done ', iconName: 'paper-plane' },
  { id: '3', title: 'New Update available', iconName: 'cloud-download' },
  { id: '4', title: 'New message from John Doe', iconName: 'mail' },
  { id: '5', title: 'Booking is done ', iconName: 'paper-plane' },
  { id: '6', title: 'New Update available', iconName: 'cloud-download' },
  { id: '7', title: 'New message from John Doe', iconName: 'mail' },
  { id: '8', title: 'Booking is done ', iconName: 'paper-plane' },
  { id: '9', title: 'New Update available', iconName: 'cloud-download' },
  { id: '10', title: 'New message from John Doe', iconName: 'mail' },
  { id: '11', title: 'Booking is done ', iconName: 'paper-plane' },
  { id: '12', title: 'New Update available', iconName: 'cloud-download' },
];

const InboxTab = () => {
  return (
    <View style={styles.container}>
      
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardPreview}>
            <Ionicons name='notifications-outline' size={24} color="#000" />
            <Text style={styles.notificationText}>{item.title}</Text>
            
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
 
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  notificationText: {
    marginLeft: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff',
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
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    
    justifyContent: 'space-between',
    
  },
});

export default InboxTab;
