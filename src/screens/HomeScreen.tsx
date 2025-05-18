import React, {useEffect} from 'react';
import {SafeAreaView, FlatList, ActivityIndicator, Text} from 'react-native';
import {useDispatch, UseDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../features/products/productsSlice';
import {RootState} from '../app/store';
import ProductCard from '../features/products/ProductCard';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {items, loading, error} = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <ActivityIndicator size="large" style={{flex: 1}} />;
  if (error)
    return (
      <Text style={{flex: 1, textAlign: 'center', marginTop: 20}}>{error}</Text>
    );

  return (
    <SafeAreaView>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ProductCard product={item} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
