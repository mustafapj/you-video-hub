
import React from 'react';
import { X, AlertTriangle, Shield, Users, Lock, Eye, UserCheck, Globe, Phone, Mail, Camera, MessageCircle } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy' | 'community';
}

const PolicyModal = ({ isOpen, onClose, type }: PolicyModalProps) => {
  if (!isOpen) return null;

  const getPolicyContent = () => {
    switch (type) {
      case 'terms':
        return {
          title: 'الشروط والأحكام',
          icon: Shield,
          content: (
            <div className="space-y-6 text-gray-300">
              <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="text-red-400 font-semibold">شروط العمر والهوية</span>
                </div>
                <ul className="text-sm space-y-1">
                  <li>• يجب أن تكون 18 سنة أو أكثر للاستخدام</li>
                  <li>• قد نطلب التحقق من الهوية في أي وقت</li>
                  <li>• استخدام هوية مزيفة يؤدي لحظر دائم</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Phone className="w-5 h-5 ml-2 text-pink-500" />
                  سياسة إيقاف المكالمات العشوائية
                </h3>
                <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="font-medium text-yellow-400">المخالفة الأولى:</p>
                    <p className="text-sm">منع من المكالمات العشوائية لمدة أسبوع واحد</p>
                  </div>
                  <div>
                    <p className="font-medium text-orange-400">المخالفة الثانية:</p>
                    <p className="text-sm">منع من المكالمات العشوائية لمدة أسبوعين</p>
                  </div>
                  <div>
                    <p className="font-medium text-red-400">المخالفة الثالثة:</p>
                    <p className="text-sm">منع من المكالمات العشوائية لمدة 6 أشهر</p>
                  </div>
                  <div>
                    <p className="font-medium text-red-500">المخالفة الرابعة:</p>
                    <p className="text-sm">حظر دائم من التطبيق</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">المحتوى المحظور تماماً</h3>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500">❌</span>
                    <span>العنف والإرهاب والمحتوى الضار</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500">❌</span>
                    <span>العري والمحتوى الجنسي</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500">❌</span>
                    <span>السب والشتم والتحرش</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500">❌</span>
                    <span>ترويج المواد المخدرة والكحول</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500">❌</span>
                    <span>محتوى إيذاء النفس والانتحار</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500">❌</span>
                    <span>انتحال الشخصية والحسابات المزيفة</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500">❌</span>
                    <span>الاحتيال والخداع المالي</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">حقوق الملكية الفكرية</h3>
                <ul className="space-y-2 text-sm">
                  <li>• عدم انتهاك حقوق الطبع والنشر</li>
                  <li>• عدم استخدام موسيقى أو محتوى محمي بدون إذن</li>
                  <li>• احترام العلامات التجارية</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">إنهاء الحساب</h3>
                <p className="text-sm">نحتفظ بالحق في إنهاء أي حساب ينتهك هذه الشروط دون إشعار مسبق. في حالة الحظر الدائم، لن يمكن استرداد البيانات أو المحتوى.</p>
              </div>
            </div>
          )
        };
      
      case 'privacy':
        return {
          title: 'سياسة الخصوصية',
          icon: Lock,
          content: (
            <div className="space-y-6 text-gray-300">
              <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 font-semibold">التزامنا بحماية خصوصيتك</span>
                </div>
                <p className="text-sm">نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية وفقاً لأعلى المعايير الدولية ولوائح حماية البيانات.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Eye className="w-5 h-5 ml-2 text-pink-500" />
                  البيانات التي نجمعها
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <h4 className="font-medium text-white mb-2">معلومات الملف الشخصي:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• الاسم الكامل واسم المستخدم</li>
                      <li>• البريد الإلكتروني ورقم الهاتف</li>
                      <li>• تاريخ الميلاد والدولة</li>
                      <li>• صورة الملف الشخصي</li>
                    </ul>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-3">
                    <h4 className="font-medium text-white mb-2">بيانات الاستخدام:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• المحتوى الذي تنشره (فيديوهات، تعليقات، رسائل)</li>
                      <li>• التفاعلات (إعجابات، مشاركات، متابعات)</li>
                      <li>• تاريخ البحث والتصفح</li>
                      <li>• وقت ومدة الاستخدام</li>
                    </ul>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-3">
                    <h4 className="font-medium text-white mb-2">معلومات الجهاز:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• نوع الجهاز ونظام التشغيل</li>
                      <li>• عنوان IP والموقع الجغرافي (إذا سمحت)</li>
                      <li>• معرفات الجهاز الفريدة</li>
                      <li>• بيانات الأداء والأخطاء</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Globe className="w-5 h-5 ml-2 text-green-500" />
                  كيف نستخدم بياناتك
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• تشغيل وتحسين الخدمة</li>
                  <li>• تخصيص المحتوى والإعلانات</li>
                  <li>• ضمان الأمان ومنع الاحتيال</li>
                  <li>• التواصل معك بخصوص الخدمة</li>
                  <li>• إجراء البحوث وتطوير ميزات جديدة</li>
                  <li>• الامتثال للقوانين والأنظمة</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <UserCheck className="w-5 h-5 ml-2 text-purple-500" />
                  مشاركة البيانات
                </h3>
                <div className="bg-green-900/30 border border-green-600 rounded-lg p-3 mb-3">
                  <p className="text-sm font-medium text-green-400">نحن لا نبيع بياناتك الشخصية أبداً!</p>
                </div>
                <p className="text-sm mb-3">قد نشارك البيانات فقط في الحالات التالية:</p>
                <ul className="space-y-1 text-sm">
                  <li>• مع موافقتك الصريحة</li>
                  <li>• مع مقدمي الخدمات الموثوقين (تحت اتفاقيات سرية)</li>
                  <li>• للامتثال للقوانين أو الأوامر القضائية</li>
                  <li>• لحماية حقوقنا وحقوق المستخدمين</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <MessageCircle className="w-5 h-5 ml-2 text-blue-500" />
                  التشفير من النهاية إلى النهاية
                </h3>
                <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-3">
                  <p className="text-sm">جميع الرسائل المباشرة والمكالمات محمية بتشفير من النهاية إلى النهاية. هذا يعني أن محتوى رسائلك ومكالماتك مخفي تماماً حتى عنا.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">حقوقك في البيانات</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>الوصول:</strong> طلب نسخة من بياناتك</li>
                  <li>• <strong>التصحيح:</strong> تحديث أو تصحيح بياناتك</li>
                  <li>• <strong>الحذف:</strong> طلب حذف حسابك وبياناتك</li>
                  <li>• <strong>النقل:</strong> نقل بياناتك لخدمة أخرى</li>
                  <li>• <strong>الاعتراض:</strong> رفض استخدام بياناتك لأغراض معينة</li>
                  <li>• <strong>التحكم:</strong> إدارة إعدادات الخصوصية</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">الاحتفاظ بالبيانات</h3>
                <p className="text-sm">نحتفظ ببياناتك طالما كان حسابك نشطاً. عند حذف الحساب، سيتم حذف البيانات خلال 30 يوماً، باستثناء ما يتطلبه القانون الاحتفاظ به.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">ملفات تعريف الارتباط</h3>
                <p className="text-sm">نستخدم ملفات تعريف الارتباط لتحسين تجربتك وحفظ تفضيلاتك. يمكنك التحكم فيها من إعدادات المتصفح.</p>
              </div>

              <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-3">
                <p className="text-sm"><strong>تحديثات السياسة:</strong> قد نحدث هذه السياسة من وقت لآخر. سنبلغك بأي تغييرات مهمة عبر التطبيق أو البريد الإلكتروني.</p>
              </div>
            </div>
          )
        };
      
      case 'community':
        return {
          title: 'قوانين المجتمع',
          icon: Users,
          content: (
            <div className="space-y-6 text-gray-300">
              <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border border-pink-600 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-pink-400" />
                  <span className="text-pink-400 font-semibold">مجتمع آمن وإيجابي</span>
                </div>
                <p className="text-sm">نحن نسعى لبناء مجتمع آمن ومحترم للجميع. هذه القوانين تضمن تجربة إيجابية لكل المستخدمين.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Phone className="w-5 h-5 ml-2 text-green-500" />
                  قواعد السلامة في المكالمات العشوائية
                </h3>
                <div className="bg-red-900/30 border border-red-600 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <span className="text-red-500 font-semibold">قواعد صارمة - مخالفتها تؤدي للحظر</span>
                  </div>
                  <ul className="text-sm space-y-1">
                    <li>• منع شرب الكحول أو التدخين أمام الكاميرا</li>
                    <li>• عدم استخدام ألفاظ نابية أو مسيئة</li>
                    <li>• يجب أن تكون جميع أجزاء الجسم مغطاة بشكل مناسب</li>
                    <li>• منع مشاركة المعلومات الشخصية (رقم هاتف، عنوان، إلخ)</li>
                    <li>• عدم طلب أو إرسال أموال أو هدايا</li>
                    <li>• منع التحرش أو السلوك المضايق</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Camera className="w-5 h-5 ml-2 text-blue-500" />
                  إرشادات المحتوى
                </h3>
                
                <div className="space-y-3">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <h4 className="font-medium text-white mb-2">الفيديوهات القصيرة:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• الحد الأقصى: 60 ثانية</li>
                      <li>• محتوى إبداعي وإيجابي فقط</li>
                      <li>• منع المحتوى العنيف أو المضر</li>
                      <li>• عدم انتهاك حقوق الطبع والنشر</li>
                    </ul>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-3">
                    <h4 className="font-medium text-white mb-2">المحتوى المحظور:</h4>
                    <div className="grid grid-cols-1 gap-1 text-sm">
                      <span>🚫 العري أو المحتوى الجنسي</span>
                      <span>🚫 العنف أو التهديدات</span>
                      <span>🚫 التنمر أو التحرش</span>
                      <span>🚫 خطاب الكراهية</span>
                      <span>🚫 ترويج الأنشطة غير القانونية</span>
                      <span>🚫 محتوى إيذاء النفس</span>
                      <span>🚫 المعلومات المضللة</span>
                      <span>🚫 المحتوى المخل بالآداب العامة</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <MessageCircle className="w-5 h-5 ml-2 text-purple-500" />
                  المحادثات والمجموعات
                </h3>
                <p className="text-sm mb-3">نتبع سياسات Telegram للمحادثات والمجموعات:</p>
                <ul className="space-y-2 text-sm">
                  <li>• احترام الخصوصية وعدم مشاركة محتوى خاص</li>
                  <li>• منع الرسائل المزعجة (Spam)</li>
                  <li>• عدم إضافة أشخاص لمجموعات بدون موافقتهم</li>
                  <li>• احترام قوانين كل مجموعة</li>
                  <li>• منع الروبوتات الضارة أو المزعجة</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">نظام الإبلاغ والمراجعة</h3>
                <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-3">
                  <p className="text-sm mb-2">إذا واجهت محتوى مخالف:</p>
                  <ul className="text-sm space-y-1">
                    <li>• استخدم زر "الإبلاغ" في المحتوى</li>
                    <li>• سيتم مراجعة التقرير خلال 24 ساعة</li>
                    <li>• قد نطلب معلومات إضافية</li>
                    <li>• ستحصل على تحديث حول حالة التقرير</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">العواقب والعقوبات</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span><strong>تحذير:</strong> للمخالفات البسيطة</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                    <span><strong>إيقاف مؤقت:</strong> من يوم إلى شهر</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span><strong>حظر دائم:</strong> للمخالفات الجسيمة</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">حماية القُصَّر</h3>
                <div className="bg-red-900/30 border border-red-600 rounded-lg p-3">
                  <p className="text-sm">نحن ملتزمون بحماية الأطفال والمراهقين. أي محتوى يستهدف أو يضر بالقُصَّر سيؤدي لحظر فوري ودائم، وقد نبلغ السلطات المختصة.</p>
                </div>
              </div>

              <div className="bg-green-900/30 border border-green-600 rounded-lg p-3">
                <p className="text-sm"><strong>تذكر:</strong> هذه القوانين تُحدَّث باستمرار لضمان بيئة آمنة. مراجعتها بانتظام مسؤوليتك كمستخدم.</p>
              </div>
            </div>
          )
        };
      
      default:
        return { title: '', icon: Shield, content: null };
    }
  };

  const policy = getPolicyContent();
  const Icon = policy.icon;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Icon className="w-6 h-6 text-pink-500" />
            <h2 className="text-xl font-bold text-white">{policy.title}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[65vh]">
          {policy.content}
        </div>
        
        <div className="p-6 border-t border-gray-700 bg-gray-800/50">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              إغلاق
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              فهمت وأوافق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
