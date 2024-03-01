export const randomRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (min - max + 1)) + min;
} 