
declare var navigator;

export function hasNetworkConnection(): boolean {
    const networkState = navigator.connection.type;
    if (!networkState) {
        return window.navigator.onLine;
    }
    return networkState != 'none';
}