import { createAsyncThunk } from '@reduxjs/toolkit';



import { toast } from 'sonner';
import { AxiosError } from 'axios';
import Api from '@/config/ApiCalls';

// ═══════════════════════════════════════════════════════════════════════
// INSCRIPTION (REGISTER)
// ═══════════════════════════════════════════════════════════════════════

export const getPropertyType = createAsyncThunk(
    'auth/getPropertyType',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Api.get('/propertyType');
     
            return response.data;

        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de l'inscription.";
                toast.error(errorMessage);
                return rejectWithValue({ message: errorMessage });
            }
            const errorMessage = "Une erreur inattendue est survenue.";
            toast.error(errorMessage);
            return rejectWithValue({ message: errorMessage });
        }
    }
);

