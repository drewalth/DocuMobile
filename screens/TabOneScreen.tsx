import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import axios from "axios"
import { Text, View } from '../components/Themed';



export default function TabOneScreen() {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {

    const getRecentlyViewed = async () => {
      try {
        setLoading(true)
        const result = await axios.get('http://192.168.86.36/api/recent/viewed?limit=8', {
          headers: {
            Accept: 'application/json',
            // Cookie: 'turbo_auth_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhdGxhcy5jb20iLCJzaGFyZWQiOmZhbHNlLCJ0aXRsZSI6IiIsImxvY2FsZSI6ImVuLVVTIiwidGVuYW50LWlkIjo0LCJ0ZW5hbnQta2V5IjoiQVRMQVNDT1BDT0NSIiwiZXJwLWVuYWJsZWQiOmZhbHNlLCJzdXBlcmFkbWluIjpmYWxzZSwiZXhwIjoxNjA3NjAwNjM4LCJpYXQiOjE2MDc1NzE4MzgsImp0aSI6IjVkN2UyMTNkLWNjMGQtNDA1Ny1hZjRhLTBjYjQ5MjM5MTk2OSIsImVtYWlsIjoibWVsaXNzYS5icnVja25lckBkaWdhYml0LmNvbSIsImxvY2FsZS1pZCI6MSwibGFzdC1uYW1lIjoiYXRsYXMiLCJncm91cC1pZHMiOlszXSwidXNlci1pZCI6NCwiZmlyc3QtbmFtZSI6ImFkbWluIiwiZ2VuZXJpYyI6ZmFsc2UsIm9yZ2FuaXphdGlvbi1rZXkiOiJRdXdKcGsiLCJtZWRpYS1jYXRlZ29yeS1pZHMiOlsxMywxNCwxNV0sImF1ZCI6ImRldiIsInVzdDpyZWRpcmVjdCI6WyIvYWRtaW4vZGFzaGJvYXJkIl0sIm5iZiI6MTYwNzU3MTgzOCwicHJpdmlsZWdlLWlkcyI6WzAsMSwyLDMsNCw4LDksMTIsMTMsMTQsMTUsMTYsMjEsMjIsMjQsMjUsMjYsMjksMzAsMzMsMzQsMzUsMzYsMzcsMzgsMzksNDYsNDcsNDgsNDksNTEsNTQsNTUsNjAsNjEsNzZdLCJvcmdhbml6YXRpb24taWQiOjYsInVzZXJuYW1lIjoiYWRtaW5AYXRsYXMuY29tIn0.UDASC98qYwGnwr4Stm7H05_w8SHDpEV5x-P5ICkl-gs'
          }
        }).then(res => res.data)

        setData(result.items)
      } catch (error) {
        console.log('error :>> ', JSON.stringify(error));
      } finally {
        setLoading(false)
      }
    }

    getRecentlyViewed()
  }, [])

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator />}
      <Text style={styles.title}>Recently Viewed</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        data={data}
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
    paddingTop: 32
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
