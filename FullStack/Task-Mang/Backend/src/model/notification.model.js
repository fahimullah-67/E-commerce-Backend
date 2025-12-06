const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    recipient: { // The user who should receive this notification
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender: { // Optional: User who triggered the notification (e.g., teacher assigning task)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: { // e.g., 'task_assigned', 'comment_added', 'task_submitted', 'task_completed'
        type: String,
        required: true,
        enum: [
            'task_assigned', 'task_unassigned', 'task_updated', 'task_deleted',
            'comment_added', 'project_invite', 'project_removed',
            'task_submitted', 'task_reviewed', 'task_revisions_requested', 'task_completed',
            'user_role_changed' // For admin
        ]
    },
    message: { // A human-readable message for the notification
        type: String,
        required: true
    },
    link: { // Optional: URL path to the related resource (e.g., '/projects/123/tasks/456')
        type: String
    },
    read: {
        type: Boolean,
        default: false
    },
    relatedEntity: { // Optional: Store _id of related entity (card, project, etc.)
        id: { type: mongoose.Schema.Types.ObjectId },
        type: String // e.g., 'Card', 'Project', 'Comment'
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;