
export interface Movie {
    id: string,
    title: string,
    year: string,
    genres: string[],
    runtime: string,
    plot: string,
    originalLanguage: string,
    director: string,
    writer: string,
    mainCast: string,
    rating: string,
    nuniReview: string,
    funFact: string,
    seen: string,
    images: string[],
}

export interface movieSchema {
    id: string,
    title: string,
    year: string,
    genres: string[],
    runtime: string,
    plot: string,
    originalLanguage: string,
    director: string,
    writer: string[],
    mainCast: string[],
    rating: string,
    consensus: string,
    nuniReview: string,
    funFact: string,
    seen: string,
    images: string[],
}

export interface MovieOption {
    value: string;
    text: string;
}