export class Point {
    id?: number;
    start?: string;
    end?: string;
    lat: number;
    lng: number;
}

// just an interface for type safety.
export class Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}
