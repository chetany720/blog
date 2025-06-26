import React, { useState } from 'react';
import { MessageCircle, User, Heart, Reply } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'John Doe',
      content: 'Great article! This really helped me understand the topic better. Thank you for sharing these insights.',
      date: '2025-01-14',
      likes: 5,
      replies: [
        {
          id: '1-1',
          author: 'Jane Smith',
          content: 'I completely agree! The examples were particularly helpful.',
          date: '2025-01-14',
          likes: 2
        }
      ]
    },
    {
      id: '2',
      author: 'Mike Johnson',
      content: 'I have a different perspective on this. While I appreciate the points made, I think there are other factors to consider...',
      date: '2025-01-13',
      likes: 3
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && userName.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: userName,
        content: newComment,
        date: new Date().toISOString().split('T')[0],
        likes: 0
      };
      setComments([comment, ...comments]);
      setNewComment('');
      setUserName('');
    }
  };

  const CommentItem: React.FC<{ comment: Comment; isReply?: boolean }> = ({ comment, isReply = false }) => (
    <div className={`${isReply ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''}`}>
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <User size={16} className="text-gray-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-gray-900">{comment.author}</span>
            <span className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
          </div>
          <p className="text-gray-700 mb-2">{comment.content}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
              <Heart size={14} />
              <span>{comment.likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
              <Reply size={14} />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
      {comment.replies && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900">Comments ({comments.length})</h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your name"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Post Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;