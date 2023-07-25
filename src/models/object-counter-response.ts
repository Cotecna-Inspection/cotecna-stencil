export interface ObjectCounterResponse {
    predictions: Prediction[];
    totalDetected: number;
}

export interface Prediction {
    probability: number;
    objectName: string;
    coordX: number;
    coordY: number;
}