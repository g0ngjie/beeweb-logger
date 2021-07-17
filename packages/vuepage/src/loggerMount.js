import { mount, listener } from "@beeweb/logger";
import { Base64 } from "./secret";

mount({
    mapURI:
        "http://api.map.baidu.com/location/ip?ak=RD3fQS8GA1UeR4Ig10ejdEkTg1OfwuV3",
    serverURL: "http://localhost:12345",
    encryptionFunc: 'useDefault'
});
listener(function ({ detail }) {
    // console.log("[debug]detail:", detail)
    const result = Base64.decode(detail);
    console.log("[debug]result:", JSON.parse(result));
});