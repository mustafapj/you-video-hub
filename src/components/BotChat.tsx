import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, ArrowLeft, Settings, Star } from 'lucide-react';
import BotCreationForm from './BotCreationForm';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  buttons?: Array<{ text: string; command: string }>;
}

interface BotChatProps {
  onBack: () => void;
}

const BotChat = ({ onBack }: BotChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState('welcome');
  const [showCreationForm, setShowCreationForm] = useState(false);
  const [selectedBotType, setSelectedBotType] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // رسالة الترحيب الأولى
    addBotMessage("مرحباً بك في بوت YOU! 🤖\n\nأنا مساعدك الذكي لإدارة المجموعات والقنوات.\n\nاضغط على /start للبدء!", [
      { text: "🚀 تفعيل البوت", command: "/start" },
      { text: "ℹ️ معلومات", command: "/info" }
    ]);
  }, []);

  const addBotMessage = (content: string, buttons?: Array<{ text: string; command: string }>) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date(),
      buttons
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleCommand = (command: string) => {
    addUserMessage(command);

    setTimeout(() => {
      switch (command) {
        case '/start':
          setCurrentStep('main_menu');
          addBotMessage("تم تفعيل البوت بنجاح! ✅\n\nاختر ما تريد فعله:", [
            { text: "🔧 إنشاء بوت جديد", command: "/create_bot" },
            { text: "⚙️ إدارة البوتات", command: "/manage_bots" },
            { text: "📊 الإحصائيات", command: "/stats" },
            { text: "🛠️ الإعدادات", command: "/settings" },
            { text: "❓ المساعدة", command: "/help" }
          ]);
          break;

        case '/create_bot':
          setCurrentStep('bot_creation');
          addBotMessage("ممتاز! دعنا ننشئ بوت جديد 🚀\n\nاختر نوع البوت:", [
            { text: "👮‍♂️ بوت إدارة مجموعات", command: "/create_group_bot" },
            { text: "📢 بوت قناة", command: "/create_channel_bot" },
            { text: "🎵 بوت موسيقى", command: "/create_music_bot" },
            { text: "🎮 بوت ألعاب", command: "/create_game_bot" },
            { text: "💰 بوت تجارة", command: "/create_business_bot" },
            { text: "🔙 العودة", command: "/start" }
          ]);
          break;

        case '/create_group_bot':
        case '/create_channel_bot':
        case '/create_music_bot':
        case '/create_game_bot':
        case '/create_business_bot':
          const botType = command.replace('/create_', '');
          setSelectedBotType(botType);
          setShowCreationForm(true);
          break;

        case '/setup_protection':
          addBotMessage("تم تفعيل نظام الحماية التلقائي! 🛡️\n\nالميزات المفعلة:\n✅ منع الروابط المشبوهة\n✅ حماية من الحسابات الوهمية\n✅ منع الرسائل المؤذية\n✅ نظام الكشف التلقائي\n\nهل تريد تخصيص الإعدادات؟", [
            { text: "⚙️ تخصيص الإعدادات", command: "/customize_protection" },
            { text: "📋 عرض التقرير", command: "/protection_report" },
            { text: "🔙 العودة للقائمة", command: "/create_group_bot" }
          ]);
          break;

        case '/manage_bots':
          addBotMessage("إدارة البوتات الخاصة بك 🤖\n\nالبوتات المتاحة:", [
            { text: "🟢 بوت مجموعة الأصدقاء (نشط)", command: "/manage_bot_1" },
            { text: "🟡 بوت قناة الأخبار (متوقف)", command: "/manage_bot_2" },
            { text: "🔴 بوت الموسيقى (خطأ)", command: "/manage_bot_3" },
            { text: "➕ إضافة بوت جديد", command: "/create_bot" },
            { text: "🔙 العودة", command: "/start" }
          ]);
          break;

        case '/stats':
          addBotMessage("📊 إحصائيات شاملة\n\n🤖 عدد البوتات: 3\n👥 إجمالي الأعضاء: 1,247\n📊 الرسائل اليوم: 156\n⚡ معدل الاستجابة: 99.2%\n🕒 وقت التشغيل: 24/7", [
            { text: "📈 إحصائيات مفصلة", command: "/detailed_stats" },
            { text: "📊 تقرير شهري", command: "/monthly_report" },
            { text: "🔙 العودة", command: "/start" }
          ]);
          break;

        case '/settings':
          addBotMessage("⚙️ إعدادات البوت\n\nاختر القسم المطلوب:", [
            { text: "👤 الملف الشخصي", command: "/profile_settings" },
            { text: "🔔 الإشعارات", command: "/notification_settings" },
            { text: "🛡️ الأمان", command: "/security_settings" },
            { text: "🌐 اللغة", command: "/language_settings" },
            { text: "💰 الاشتراك", command: "/subscription_settings" },
            { text: "🔙 العودة", command: "/start" }
          ]);
          break;

        case '/help':
          addBotMessage("❓ مركز المساعدة\n\nالأوامر المتاحة:", [
            { text: "📚 دليل الاستخدام", command: "/user_guide" },
            { text: "💬 الدعم الفني", command: "/support" },
            { text: "🎥 فيديوهات تعليمية", command: "/tutorials" },
            { text: "📝 الأسئلة الشائعة", command: "/faq" },
            { text: "🔙 العودة", command: "/start" }
          ]);
          break;

        case '/info':
          addBotMessage("ℹ️ معلومات البوت\n\n🤖 بوت YOU - الإصدار 2.0\n👨‍💻 المطور: فريق YOU\n🌟 التقييم: 5/5 نجوم\n📅 آخر تحديث: اليوم\n\n✨ ميزات متقدمة:\n• ذكاء اصطناعي\n• دعم متعدد اللغات\n• حماية متقدمة\n• إحصائيات شاملة", [
            { text: "🚀 البدء الآن", command: "/start" },
            { text: "⭐ تقييم البوت", command: "/rate_bot" }
          ]);
          break;

        default:
          addBotMessage("عذراً، لم أفهم هذا الأمر. جرب استخدام الأزرار أو /help للمساعدة.", [
            { text: "🏠 القائمة الرئيسية", command: "/start" },
            { text: "❓ المساعدة", command: "/help" }
          ]);
      }
    }, 500);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      handleCommand(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (showCreationForm) {
    return (
      <BotCreationForm 
        onBack={() => setShowCreationForm(false)} 
        botType={selectedBotType}
      />
    );
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center space-x-3">
        <button
          onClick={onBack}
          className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="bg-white/20 p-2 rounded-lg">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-white text-lg font-bold">بوت YOU</h1>
          <p className="text-white/80 text-sm">متصل الآن • نشط</p>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="text-white text-sm">5.0</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-white'
              }`}
            >
              <p className="whitespace-pre-line">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString('ar', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
              
              {/* Buttons */}
              {message.buttons && message.type === 'bot' && (
                <div className="mt-3 space-y-2">
                  {message.buttons.map((button, index) => (
                    <button
                      key={index}
                      onClick={() => handleCommand(button.command)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-colors"
                    >
                      {button.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-gray-900 p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="اكتب رسالة أو أمر..."
            className="flex-1 bg-gray-800 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        {/* Quick Commands */}
        <div className="flex items-center space-x-2 mt-3 text-xs">
          <span className="text-gray-400">أوامر سريعة:</span>
          <button
            onClick={() => handleCommand('/start')}
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded transition-colors"
          >
            /start
          </button>
          <button
            onClick={() => handleCommand('/help')}
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded transition-colors"
          >
            /help
          </button>
          <button
            onClick={() => handleCommand('/settings')}
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded transition-colors"
          >
            /settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotChat;
