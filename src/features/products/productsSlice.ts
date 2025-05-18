import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'


export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
  }

  interface ProductsState {
    items: Product[];
    loading: boolean;
    error: string | null;
  }

  const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
  };

  export const fetchProducts = createAsyncThunk(
    '/products/fetchProducts',
    async ()=> {
        const response = await fetch('https://fakestoreapi.com/products')
        if(!response.ok) throw new Error('Failed to fetch Products')
            const data : Product[] = await response.json()
        return data
    }
  )

  const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null
        } )
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.items = action.payload;
            state.loading = false
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.error = action.error.message || 'Something went wrong';
            state.loading = false
        } )
    }
  })


  export default productsSlice.reducer