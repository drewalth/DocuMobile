import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { Text, View } from '../components/Themed';
import { getRecentlyViewed, getRecentlyEdited} from "../controllers"

export default function TabOneScreen() {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [edited, setEdited] = useState([])
  const [viewed, setViewed] = useState([])

  useEffect(() => {

    const loadData = async () => {

      try {
        const viewed = await getRecentlyViewed()
        const edited = await getRecentlyEdited()
        console.log('edited :>> ', edited);
        setViewed(viewed)
        setEdited(edited)
      } catch (error) {
        console.log('error :>> ', error);
      }

    }
    loadData()
  
  }, [])

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator />}
      <Text style={styles.title}>Recently Viewed</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        data={viewed}
        keyExtractor={({ entityId }, index) => entityId}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />
      <Text style={styles.title}>Recently Edited</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.subtitle}>Media</Text>
      <FlatList
        data={edited.media}
        keyExtractor={({ entityId }, index) => entityId}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />
      <Text style={styles.subtitle}>Parts</Text>
      <FlatList
        data={edited.parts}
        keyExtractor={({ entityId }, index) => entityId}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />
      <Text style={styles.subtitle}>Pages</Text>
      <FlatList
        data={edited.pages}
        keyExtractor={({ entityId }, index) => entityId}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 32,
    overflow: 'scroll'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
