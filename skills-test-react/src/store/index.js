import { configureStore } from "@reduxjs/toolkit";

import { Slices, Actions } from "./slices";

const store = configureStore({
  reducer: Slices,
});

export { Actions };

// export store
export default store;
