import { TripAdvisorRestaurant, YelpRestaurant } from '@/util/restaurantTypes';
import { Schema, model, models } from 'mongoose';

export type IFavorite = TripAdvisorRestaurant | YelpRestaurant

export const favoriteSchema = new Schema<IFavorite>({
    apiRespOrigin: {
        type: String,
        required: true
    },
    id: {
        type: Schema.Types.Mixed,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    restaurantImageUrl: {
        type: String,
        required: false
    },
    latitudeAndLongitude: {
        type: String,
        required: false
    },
    ratingImageUrl: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    tripAdvisorUrl: {
        type: String,
        required: false
    },
    hours: {
        type: [String],
        required: false
    },
    rating: {
        type: Schema.Types.Mixed,
        required: false
    },
    reviewCount: {
        type: Schema.Types.Mixed,
        required: false
    },
    cuisine: {
        type: [{ name: String, localized_name: String }],
        required: false
    },
    yelpWebsiteUrl: {
        type: String,
        required: false
    },
    categories: {
        type: [{ alias: String, title: String }],
        required: false
    },
    distance: {
        type: Number,
        required: false
    }
})
