'use client'
import { createSlice } from '@reduxjs/toolkit';
import { getPropertyType } from '@/actions/PropertyActions';

const propertyTypesSlice = createSlice({
  name: 'propertyTypes',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ─── FETCH START ─────────────────────────
      .addCase(getPropertyType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ─── FETCH SUCCESS ───────────────────────
      .addCase(getPropertyType.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.data || []; // <- Assure qu'on récupère la liste
      })

      // ─── FETCH ERROR ─────────────────────────
      .addCase(getPropertyType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Erreur inattendue";
      });
  }
});

export default propertyTypesSlice.reducer;
