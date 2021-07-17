import { Config } from "./enum";

export default function (data: string) {
    const fetchUrl = (window as any)[Config.SERVER_URL.toString()]
    if (fetchUrl) fetch(fetchUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data }),
        mode: 'cors'
    })
}