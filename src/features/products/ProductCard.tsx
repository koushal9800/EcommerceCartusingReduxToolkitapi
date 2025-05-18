import React from "react";
import { View,Text,Button,StyleSheet } from "react-native";
import {useDispatch} from 'react-redux'
import { addToCart } from "../cart/cartSlice";


interface Props {
    product: {
      id: number;
      title: string;
      price: number;
    };
  }

  const ProductCard = ({product}:Props) =>{
    const dispatch = useDispatch()

    const onAddToCart = () => {
        dispatch(addToCart({...product, quantity:1}))
    }
    return (
        <View style={styles.card}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Button title="Add to Cart" onPress={onAddToCart} />
        </View>
      );
  }

  export default ProductCard;

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: { fontSize: 16, marginBottom: 5 },
  price: { fontSize: 14, marginBottom: 10 },
});