'use client'
import { createSlice } from '@reduxjs/toolkit';
import { getEquipement } from '@/actions/EquipementsActions';

const EquipementSlice = createSlice({
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
      .addCase(getEquipement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ─── FETCH SUCCESS ───────────────────────
      .addCase(getEquipement.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.data || []; // <- Assure qu'on récupère la liste
      })

      // ─── FETCH ERROR ─────────────────────────
      .addCase(getEquipement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Erreur inattendue";
      });
  }
});

export default EquipementSlice.reducer;
