import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    name: { type: String }, 
    lastName: { type: String },
    surName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, hide: true },
    isActive: { type: Boolean, default: true, index: true },
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    phone: {type:String},
}, {
    timestamps: true,
    collection: 'users'
});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this['password'] = bcrypt.hashSync(this['password'], 10);
    next();
});

UserSchema.methods.comparePassword = function (plaintext: string): Promise<boolean> {
    return bcrypt.compare(plaintext, this['password']);
};