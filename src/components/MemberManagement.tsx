
import React, { useState } from 'react';
import { Users, UserX, UserMinus, Volume2, VolumeX, AlertTriangle, Search } from 'lucide-react';

interface Member {
  id: string;
  username: string;
  displayName: string;
  role: 'admin' | 'moderator' | 'member';
  status: 'active' | 'muted' | 'banned';
  warnings: number;
  joinDate: string;
}

const MemberManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const [members] = useState<Member[]>([
    {
      id: '1',
      username: '@ahmed_youuser',
      displayName: 'أحمد محمد',
      role: 'member',
      status: 'active',
      warnings: 0,
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      username: '@sara_creative',
      displayName: 'سارة الإبداعية',
      role: 'moderator',
      status: 'active',
      warnings: 0,
      joinDate: '2024-01-10'
    },
    {
      id: '3',
      username: '@mohammed_tech',
      displayName: 'محمد التقني',
      role: 'member',
      status: 'muted',
      warnings: 2,
      joinDate: '2024-01-20'
    }
  ]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-red-400';
      case 'moderator': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'banned': return 'bg-red-600';
      case 'muted': return 'bg-yellow-600';
      default: return 'bg-green-600';
    }
  };

  const handleMemberAction = (action: string, member: Member) => {
    setSelectedAction(action);
    setSelectedMember(member);
  };

  const filteredMembers = members.filter(member =>
    member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="w-6 h-6 text-green-400" />
        <h2 className="text-white text-xl font-bold">إدارة الأعضاء</h2>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث عن عضو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg py-3 pr-10 pl-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <div className="text-green-400 text-xl font-bold">{members.length}</div>
          <div className="text-gray-400 text-sm">إجمالي الأعضاء</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <div className="text-yellow-400 text-xl font-bold">
            {members.filter(m => m.warnings > 0).length}
          </div>
          <div className="text-gray-400 text-sm">أعضاء محذرون</div>
        </div>
      </div>

      {/* Members List */}
      <div className="space-y-3">
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {member.displayName.charAt(0)}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-white font-semibold">{member.displayName}</h3>
                    <span className={`text-sm ${getRoleColor(member.role)}`}>
                      {member.role === 'admin' ? 'مدير' : member.role === 'moderator' ? 'مشرف' : 'عضو'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{member.username}</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor(member.status)}`}></span>
                    <span className="text-gray-400 text-xs">انضم في {member.joinDate}</span>
                    {member.warnings > 0 && (
                      <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs">
                        {member.warnings} تحذير
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleMemberAction('warn', member)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-lg transition-colors"
                  title="تحذير"
                >
                  <AlertTriangle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleMemberAction('mute', member)}
                  className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-lg transition-colors"
                  title="كتم"
                >
                  <VolumeX className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleMemberAction('kick', member)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                  title="طرد"
                >
                  <UserMinus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleMemberAction('ban', member)}
                  className="bg-red-800 hover:bg-red-900 text-white p-2 rounded-lg transition-colors"
                  title="حظر"
                >
                  <UserX className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Modal */}
      {selectedAction && selectedMember && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-white text-lg font-bold mb-4">
              {selectedAction === 'warn' && 'تحذير العضو'}
              {selectedAction === 'mute' && 'كتم العضو'}
              {selectedAction === 'kick' && 'طرد العضو'}
              {selectedAction === 'ban' && 'حظر العضو'}
            </h3>
            
            <p className="text-gray-300 mb-4">
              هل أنت متأكد من {selectedAction === 'warn' ? 'تحذير' : selectedAction === 'mute' ? 'كتم' : selectedAction === 'kick' ? 'طرد' : 'حظر'} العضو "{selectedMember.displayName}"؟
            </p>

            <textarea
              placeholder="السبب (اختياري)"
              className="w-full bg-gray-700 text-white rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={3}
            />

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setSelectedAction(null);
                  setSelectedMember(null);
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  // Execute action logic here
                  setSelectedAction(null);
                  setSelectedMember(null);
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagement;
