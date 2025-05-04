import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet, Alert, Text } from 'react-native';
import { firestore } from '../firebase/config';
//import { firestore } from './src/firebase/config';
import ProductItem from '../components/ProductItem';
//import ProductItem from './src/components/ProductItem';

const HomeScreen = () => {

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        let unsubscribe;

        if (searchTerm.trim() === '') {
            // If search term is empty, fetch all products
            unsubscribe = firestore()
                .collection('products')
                .onSnapshot(
                    (snapshot) => {
                        const productList = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setProducts(productList);
                    },
                    (error) => {
                        console.error('Error fetching products:', error);
                        Alert.alert('Error', 'Failed to fetch products');
                    }
                );
        } else {
            // Perform search query based on productDesc
            unsubscribe = firestore()
                .collection('products')
                .orderBy('productDesc') // Order by the field you're searching
                .startAt(searchTerm)
                .endAt(searchTerm + '\uf8ff') // Unicode trick for prefix search
                .onSnapshot(
                    (snapshot) => {
                        const productList = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setProducts(productList);
                    },
                    (error) => {
                        console.error('Error searching products:', error);
                        Alert.alert('Error', 'Failed to search products');
                    }
                );
        }

        return () => unsubscribe && unsubscribe();
    }, [searchTerm]); // Re-run effect when searchTerm changes

    const deleteProduct = async (id) => {
        try {
            await firestore().collection('products').doc(id).delete();
            Alert.alert('Success', 'Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
            Alert.alert('Error', 'Failed to delete product');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder="Search by product description..."
                autoCapitalize="none"
            />
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductItem product={item} onDelete={deleteProduct} />}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text>No products found</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});
 
export default HomeScreen;
