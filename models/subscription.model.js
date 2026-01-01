import mongoose from "mongoose";

const  SubscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription Name is required"],
        trim: true,
        maxLength: [50, "Subscription Name cannot exceed 50 characters"],
        minLength: [3, "Subscription Name should have at least 3 characters"],
    },
    price: {
        type: Number,
        required: [true, "Subscription Price  is required"],
        min: [0, "Price must be greater than 0   "],
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'INR', 'KSH'],
        default: 'KSH',
    },
    frequency: {
        type: String,
        enum: ['Daily', 'Monthly', 'Yearly', 'Weekly'],
    },
    category: {
        type: String,
        enum: ['entertainment', 'lifestyle', 'sports', 'news','technology','finance','politics', 'Other'],
        required: [true, "Subscription Category is required"],
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment Method is required"],
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'canceled', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, "Start Date is required"],
        validate: {
            validator:(value)=>value <= new Date(),
            message: "Start Date must be in the past",
        },
    },
    renewalDate: {
        type: Date,
        required: [true, "Renewal Date is required"],
        validate: {
            validator: function(value) {
                return value> this.startDate;
            },
            message: "Renewal Date must be after Start Date",
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"],
        index: true,
    },
}, {
    timestamps: true,
});

//auto calculate renewalDate
SubscriptionSchema.pre('save', function(next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            'Daily': 1,
            'Weekly': 7,
            'Monthly': 30,
            'Yearly': 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate
        .setDate(this.startDate.getDate() + renewalPeriods[this.frequency]);
    }
    //auto update status if renewalDate has passed
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;