import dotenv from 'dotenv'
dotenv.config()

// const environment = process.env.NODE_ENV || 'development'

// export const dbURI = environment === 'production'
//   ? process.env.MONGODB_URI
//   : `mongodb://localhost/pingpongdb-${environment}`


export const port = process.env.PORT || 8000


// export const secret = process.env.SECRET
// export const MapboxAccessToken = process.env.MAPBOX_TOKEN
// export const API_KEY = process.env.API_KEY