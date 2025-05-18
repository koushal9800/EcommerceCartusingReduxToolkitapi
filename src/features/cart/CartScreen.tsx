import React from 'react';
import {View, Text, FlatList, Button, StyleSheet, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../app/store';
import {removeFromCart, clearCart} from './cartSlice';

const CartScreen = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClear = () => {
    Alert.alert('Clear Cart', 'Are ypou sure?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Clear', onPress: () => dispatch(clearCart())},
    ]);
  };

  const renderItem = ({item}: any) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Price: ${(item.price * item.quantity).toFixed(2)}</Text>
      <Button title="Remove" onPress={() => handleRemove(item.id)} />
    </View>
  );

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />
          <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
          <Button title="Clear Cart" onPress={handleClear} color="red" />
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  heading: {fontSize: 24, fontWeight: 'bold', marginBottom: 15},
  item: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
  title: {fontSize: 18, marginBottom: 5},
  empty: {fontSize: 16, textAlign: 'center', marginTop: 50},
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'right',
  },
});
