import React, {useEffect} from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./src/app/store";
import AppNavigator from './src/navigation/AppNavigator'
import { loadCart } from "./src/features/cart/cartSlice";


const Init= () => {
  const dispatch = useDispatch()
  React.useEffect(()=>{
    dispatch(loadCart())
  },[dispatch])
  
  return <AppNavigator />
}

export default function App() {
  return (
    <Provider store={store}>
      <Init />
    </Provider>
  );
}
