// import React, { useEffect, useState } from 'react';
// import { View, FlatList, TextInput, StyleSheet, Alert, Text } from 'react-native';
// // import { firestore } from '../firebase/config';
// import { firestore } from './src/firebase/config';
// // import ProductItem from '../components/ProductItem';
// import ProductItem from './src/components/ProductItem';

// // const HomeScreen = () => {
// const App = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     let unsubscribe;

//     if (searchTerm.trim() === '') {
//       // If search term is empty, fetch all products
//       unsubscribe = firestore()
//         .collection('products')
//         .onSnapshot(
//           (snapshot) => {
//             const productList = snapshot.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }));
//             setProducts(productList);
//           },
//           (error) => {
//             console.error('Error fetching products:', error);
//             Alert.alert('Error', 'Failed to fetch products');
//           }
//         );
//     } else {
//       // Perform search query based on productDesc
//       unsubscribe = firestore()
//         .collection('products')
//         .orderBy('productDesc') // Order by the field you're searching
//         .startAt(searchTerm)
//         .endAt(searchTerm + '\uf8ff') // Unicode trick for prefix search
//         .onSnapshot(
//           (snapshot) => {
//             const productList = snapshot.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }));
//             setProducts(productList);
//           },
//           (error) => {
//             console.error('Error searching products:', error);
//             Alert.alert('Error', 'Failed to search products');
//           }
//         );
//     }

//     return () => unsubscribe && unsubscribe();
//   }, [searchTerm]); // Re-run effect when searchTerm changes

//   const deleteProduct = async (id) => {
//     try {
//       await firestore().collection('products').doc(id).delete();
//       Alert.alert('Success', 'Product deleted successfully');
//     } catch (error) {
//       console.error('Error deleting product:', error);
//       Alert.alert('Error', 'Failed to delete product');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         value={searchTerm}
//         onChangeText={setSearchTerm}
//         placeholder="Search by product description..."
//         autoCapitalize="none"
//       />
//       <FlatList
//         data={products}
//         renderItem={({ item }) => <ProductItem product={item} onDelete={deleteProduct} />}
//         keyExtractor={(item) => item.id}
//         ListEmptyComponent={<Text>No products found</Text>}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10 },
//   searchInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
// });

// // export default HomeScreen;
// export default App;



/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import HelloScreen from './src/screens/HelloScreen';
import LoginScreen from './src/screens/LoginScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* <Header /> */}
        {/* <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View> */}
        <NavigationContainer>
        <HomeScreen />
        {/* <HelloScreen /> */}
        {/* <LoginScreen /> */}
          {/* <LoginScreen /> */}
        </NavigationContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
