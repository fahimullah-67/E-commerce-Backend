import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'List title is required'],
        trim: true,
        minlength: [1, 'List title cannot be empty']
    },
    project: { // Which project this list belongs to
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    position: { // For ordering lists on the board
        type: Number,
        required: true
    }
}, { timestamps: true });

//  Add a pre-delete hook to clean up associated cards
ListSchema.pre('remove', async function(next) {
    await this.model('Card').deleteMany({ list: this._id });
    next();
});

const List = mongoose.model('List', ListSchema);
export default List;