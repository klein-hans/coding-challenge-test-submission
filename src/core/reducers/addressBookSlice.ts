import { Address } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define a type for the slice state
interface CounterState {
    addresses: Address[];
}

// Define the initial state using that type
const initialState: CounterState = {
    addresses: [],
};

export const addressBookSlice = createSlice({
    name: 'address',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addAddress: (state, action: PayloadAction<Address>) => {
            // Only add the address if it does not already exist
            const addressExists = state.addresses.some(
                (address) => address.id === action.payload.id
            );
            console.log(state.addresses);
            console.log(addressExists);
            if (!addressExists) {
                state.addresses.push(action.payload);
            }
        },
        removeAddress: (state, action: PayloadAction<string>) => {
            // Filter out the address that matches the given id
            state.addresses = state.addresses.filter(
                (address) => address.id !== action.payload
            );
        },
        updateAddresses: (state, action: PayloadAction<Address[]>) => {
            state.addresses = action.payload;
        },
    },
});

export const { addAddress, removeAddress, updateAddresses } =
    addressBookSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
export const selectAddress = (state: RootState) => state.addressBook.addresses;

export default addressBookSlice.reducer;
