import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sessionStorageHandler } from "@/lib/sessionStorage";
import { getVariant } from "@/lib/abTest";
import { Variant } from "@/types";
import { AB_TEST_VARIANT_KEY } from "@/consts";

interface ABTestState {
  variant: Variant;
}

const getInitialVariant = (): Variant => {
  const storedVariant = sessionStorageHandler.get<Variant>(AB_TEST_VARIANT_KEY);
  if (storedVariant) return storedVariant;

  const newVariant = getVariant();
  sessionStorageHandler.set(AB_TEST_VARIANT_KEY, newVariant);
  return newVariant;
};

const initialState: ABTestState = {
  variant: getInitialVariant(),
};

export const abTestSlice = createSlice({
  name: "abTest",
  initialState,
  reducers: {
    setVariant: (state, action: PayloadAction<Variant>) => {
      state.variant = action.payload;
      sessionStorageHandler.set(AB_TEST_VARIANT_KEY, action.payload);
    },
  },
});

export const { setVariant } = abTestSlice.actions;
export default abTestSlice.reducer;
