export interface Sensor {
    mac: string;
    bizLocation: string;
}
export interface Site {
    _id: string;
    company: string;
    siteName: string;
    countryCode: string;
    city: string;
    topic: string;
    sensors: Sensor[];
}
