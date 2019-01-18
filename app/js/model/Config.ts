/**
 * Config Model
 * @author agimenez
 */

/**
 * Modelo del configuracion
 * @interface model.Config
 */
export interface Config {
    base_url: string;
    version: string;
    title: string;
    description: string;
    keywords: string;
    root_url: string;
    ga_id: string;
}
