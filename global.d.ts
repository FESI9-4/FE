// global.d.ts
/// <reference types="google.maps" />

declare namespace google.maps.marker {
    class AdvancedMarkerElement extends google.maps.MVCObject {
        constructor(options?: google.maps.marker.AdvancedMarkerElementOptions);
        position: google.maps.LatLng | google.maps.LatLngLiteral;
        map: google.maps.Map | null;
        title?: string;
    }

    interface AdvancedMarkerElementOptions {
        position?: google.maps.LatLng | google.maps.LatLngLiteral;
        map?: google.maps.Map | null;
        title?: string;
        content?: HTMLElement | string;
    }
}

declare namespace google.maps {
    function importLibrary(name: 'marker'): Promise<typeof google.maps.marker>;
}
