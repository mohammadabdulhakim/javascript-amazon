import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";


export const formatted = (estimatedDeliveryTime) => dayjs(estimatedDeliveryTime).format("MMM, D")