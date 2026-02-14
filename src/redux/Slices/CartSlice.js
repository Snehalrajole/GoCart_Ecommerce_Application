import { createSlice } from "@reduxjs/toolkit";


export const CartSlice = createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        add:(state,action) => {
            // Check if item already exists in cart
            const existingItem = state.find(item => item.id === action.payload.id);
            
            if (existingItem) {
                // If item exists, update its quantity
                existingItem.quantity = action.payload.quantity || existingItem.quantity + 1;
                // Update other properties if provided
                if (action.payload.color) existingItem.color = action.payload.color;
                if (action.payload.size) existingItem.size = action.payload.size;
            } else {
                // Ensure quantity is set if not provided
                const newItem = {
                    ...action.payload,
                    quantity: action.payload.quantity || 1
                };
                state.push(newItem);
            }
        },
        remove:(state,action) => {
            return state.filter((item) => item.id !== action.payload);
        },
        clearCart: () => {
            return [];
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
        }
    }
});

export const { add, remove, clearCart, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;