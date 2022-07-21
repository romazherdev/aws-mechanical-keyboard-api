let container;

export function setupDIContainer(tokenPairs) {
    container = new WeakMap(tokenPairs);
}

export function resolve(token) {
    return container.get(token);
}
