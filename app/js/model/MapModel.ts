/**
 * Map Model
 * @author agimenez
 */

/**
 * Modelo del mapa
 * @interface model.Map
 */
export interface MapModel {
    name: string;
    extent: Array;
    wkid: number;
    service: string;
}