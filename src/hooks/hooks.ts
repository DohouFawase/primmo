import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '@/stores/store';

// Utilisez le hook `useAppDispatch` au lieu de `useDispatch`
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Utilisez le hook `useAppSelector` pour une sélection typée de l'état
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;