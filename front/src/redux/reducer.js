import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userActive: {},
    userAppointments: [],
};

export const userSlice = createSlice({
    name: "userData",
    initialState: initialState,
    reducers: {
        setUserActive: (state, action) => {
            state.userActive = action.payload;
        },
        setUserAppointments: (state, action) => {
            state.userAppointments = action.payload;
        },
        removeUser: (state, action) => {
            state.userActive = {};
        },
        removeAppointmentAction: (state, action) => {
            state.userAppointments = state.userAppointments.filter(
                (appointment) => appointment.id !== action.payload
            );
        },
    },
});

export const { setUserActive, setUserAppointments, removeUser, removeAppointmentAction } = userSlice.actions;
