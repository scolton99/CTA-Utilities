export type FontCharacter = [
    Array<0 | 1>,
    Array<0 | 1>,
    Array<0 | 1>,
    Array<0 | 1>,
    Array<0 | 1>,
    Array<0 | 1>,
    Array<0 | 1>
]

export type FontDefinition = Record<string, FontCharacter>;