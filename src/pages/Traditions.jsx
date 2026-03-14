import { motion } from 'framer-motion';
import TraditionAccordion from '../components/TraditionAccordion';

const traditionsData = [
  {
    title: "၂၀၂၆ သင်္ကြန်စာ",
    content: (
      <div className="space-y-6">
        <p className="font-bold text-water-blue">၂၀၂၆ ခုနှစ်၊ မဟာသင်္ကြန်စာ ဟောတမ်း (နေ့ရက်အလိုက်)</p>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-gray-900 mb-1">၁။ သင်္ကြန်အကြိုနေ့ (ဧပြီလ ၁၃ ရက်)</h4>
            <p className="text-sm text-gray-600 mb-2">သိကြားမင်း ဆင်းသက်ရန် ကြိုဆိုသည့်နေ့။</p>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">ဆောင်ရန်:</p>
            <p className="text-sm text-gray-700">အတာအိုးတွင် ကံ့ကော်၊ သပြေ အစရှိသော ပန်း (၇) မျိုးဖြင့် ကြိုဆိုပါ။ အိမ်သန့်ရှင်းရေးလုပ်ခြင်းနှင့် စိတ်ကြည်လင်စွာ နေထိုင်ပါ။</p>
          </div>

          <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-gray-900 mb-1">၂။ သင်္ကြန်အကျနေ့ (ဧပြီလ ၁၄ ရက်)</h4>
            <p className="text-sm text-gray-600 mb-2">သိကြားမင်း လူ့ပြည်သို့ ဆင်းသက်သောနေ့ (မွန်းလွဲ ၁၂:၄၉:၅၈ နာရီ)။</p>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">ဟောတမ်း:</p>
            <p className="text-sm text-gray-700">သိကြားမင်းသည် နွား ကို စီး၍၊ ရေကရား ကို ကိုင်ဆောင်ကာ ဆင်းသက်မည်။ စိုက်ပျိုးရေးနှင့် ကုန်ထုတ်လုပ်မှု ကောင်းမွန်မည့်အပြင်၊ အေးချမ်းသာယာမှု ရှိမည့် နိမိတ်ရှိပါသည်။</p>
          </div>

          <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-gray-900 mb-1">၃။ သင်္ကြန်အကြတ်နေ့ (ဧပြီလ ၁၅ ရက်)</h4>
            <p className="text-sm text-gray-600 mb-2">သိကြားမင်း လူ့ပြည်တွင် ကိန်းဝပ်သောနေ့။ ဒါန၊ သီလ၊ ဘာဝနာ အမှုများကို အထူးပြုလုပ်ပါ။</p>
          </div>

          <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-gray-900 mb-1">၄။ သင်္ကြန်အတက်နေ့ (ဧပြီလ ၁၆ ရက်)</h4>
            <p className="text-sm text-gray-600 mb-2">သိကြားမင်း နတ်ပြည်သို့ ပြန်လည်တက်ရောက်သောနေ့ (ညနေ ၄:၅၄:၃၉ နာရီ)။</p>
            <p className="text-sm text-gray-700">နှစ်သစ်အတွက် ကံကောင်းခြင်းများ စုစည်းသောနေ့ ဖြစ်သည်။</p>
          </div>

          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
            <h4 className="font-bold text-emerald-900 mb-1">၅။ မြန်မာနှစ်ဆန်းတစ်ရက်နေ့ (ဧပြီလ ၁၇ ရက်)</h4>
            <p className="text-sm text-emerald-800">ငါးလွှတ်ခြင်း၊ နွားလွှတ်ခြင်း (ဇီဝိတဒါန) များ ပြုလုပ်ပါ။ မိဘဘိုးဘွားများကို ကန်တော့ပါ။</p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "နေ့နံအလိုက် အန္တရာယ်ကင်း ဟောတမ်း (Zodiac Guide)",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <h4 className="font-bold text-gray-900 mb-2">တနင်္ဂနွေသားသမီး</h4>
          <p className="text-sm text-gray-600 mb-1"><span className="font-bold">ဆောင်ရန်:</span> အလှူအတန်းရက်ရောပါ။ ပညာရေးနှင့် ကျန်းမာရေးအတွက် လှူဒါန်းပါ။</p>
          <p className="text-sm text-red-500/80 mb-2"><span className="font-bold text-red-600">ရှောင်ရန်:</span> အရှေ့မြောက်အရပ်သို့ ခရီးဝေးသွားခြင်းကို သတိပြုပါ။ စကားအပြောအဆိုကြောင့် မိတ်ပျက်တတ်သည်။</p>
          <p className="text-sm text-water-blue font-bold">အတာစား: အုန်းသီး၊ အုန်းနို့ပါသော မုန့်များ။</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <h4 className="font-bold text-gray-900 mb-2">တနင်္လာသားသမီး</h4>
          <p className="text-sm text-gray-600 mb-1"><span className="font-bold">ဆောင်ရန်:</span> လူကြီးမိဘများကို ကန်တော့ပါ။ စိတ်ရှည်သည်းခံပါ။</p>
          <p className="text-sm text-red-500/80 mb-2"><span className="font-bold text-red-600">ရှောင်ရန်:</span> ငွေကြေးအာမခံခြင်းနှင့် အစုစပ်လုပ်ငန်းများတွင် သတိထားပါ။ အဖြူရောင်ကို အထူးဝတ်ဆင်ပါ။</p>
          <p className="text-sm text-water-blue font-bold">အတာစား: ကောက်ညှင်း၊ မုန့်ဆန်း။</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <h4 className="font-bold text-gray-900 mb-2">အင်္ဂါသားသမီး</h4>
          <p className="text-sm text-gray-600 mb-1"><span className="font-bold">ဆောင်ရန်:</span> ဘုရားကျောင်းကန်သွား၍ သန့်ရှင်းရေးကုသိုလ်ယူပါ။</p>
          <p className="text-sm text-red-500/80 mb-2"><span className="font-bold text-red-600">ရှောင်ရန်:</span> ဒေါသရှေ့မထားပါနှင့်။ ချွန်ထက်သော လက်နက်ပစ္စည်းများ ကိုင်တွယ်ရာတွင် သတိပြုပါ။</p>
          <p className="text-sm text-water-blue font-bold">အတာစား: ယိုမျိုးစုံ သို့မဟုတ် အချိုပွဲများ။</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <h4 className="font-bold text-gray-900 mb-2">ဗုဒ္ဓဟူး/ရာဟု သားသမီး</h4>
          <p className="text-sm text-gray-600 mb-1"><span className="font-bold">ဆောင်ရန်:</span> စာအုပ်စာပေ လှူဒါန်းပါ။</p>
          <p className="text-sm text-red-500/80 mb-2"><span className="font-bold text-red-600">ရှောင်ရန်:</span> သူတစ်ပါးကိစ္စတွင် ကြားဝင်မပါပါနှင့်။ အဝါရောင် အဝတ်အထည်များကို အားပြုဝတ်ဆင်ပါ။</p>
          <p className="text-sm text-water-blue font-bold">အတာစား: ရွက်နု၊ ဟင်းရွက်သုပ်။</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <h4 className="font-bold text-gray-900 mb-2">ကြာသပတေးသားသမီး</h4>
          <p className="text-sm text-gray-600 mb-1"><span className="font-bold">ဆောင်ရန်:</span> ဆရာသမားများကို ပူဇော်ပါ။</p>
          <p className="text-sm text-red-500/80 mb-2"><span className="font-bold text-red-600">ရှောင်ရန်:</span> ကျန်းမာရေးကို ဂရုစိုက်ပါ။ အထူးသဖြင့် အစာအိမ်နှင့် အကြောပိုင်းဆိုင်ရာ သတိပြုပါ။</p>
          <p className="text-sm text-water-blue font-bold">အတာစား: ပဲမျိုးစုံ သို့မဟုတ် ပဲမုန့်များ။</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <h4 className="font-bold text-gray-900 mb-2">သောကြာသားသမီး</h4>
          <p className="text-sm text-gray-600 mb-1"><span className="font-bold">ဆောင်ရန်:</span> အနုပညာနှင့် ဖန်တီးမှုလုပ်ငန်းများ လုပ်ကိုင်ပါ။</p>
          <p className="text-sm text-red-500/80 mb-2"><span className="font-bold text-red-600">ရှောင်ရန်:</span> အပျော်အပါး အလွန်အကျွံ မလုပ်မိပါစေနှင့်။ အပြာရောင် သို့မဟုတ် ပန်းရောင် ဝတ်ဆင်ပါ။</p>
          <p className="text-sm text-water-blue font-bold">အတာစား: သီးနှံမျိုးစုံ သို့မဟုတ် သစ်သီးဖျော်ရည်။</p>
        </div>
        <div className="p-4 border-2 border-water-blue/20 bg-blue-50/30 rounded-2xl md:col-span-2">
          <h4 className="font-bold text-gray-900 mb-2">စနေသားသမီး</h4>
          <p className="text-sm text-gray-600 mb-1"><span className="font-bold">ဆောင်ရန်:</span> တရားဘာဝနာပွားများပါ။ မြေနှင့် ပတ်သက်သော အလုပ်များ အကျိုးပေးထွန်းကားမည်။</p>
          <p className="text-sm text-red-500/80 mb-2"><span className="font-bold text-red-600">ရှောင်ရန်:</span> စိတ်ဓာတ်ကျလွယ်တတ်သဖြင့် အပေါင်းအသင်းကောင်းများနှင့် နေပါ။ အနက်ရောင်ကို ရှောင်ပါ။</p>
          <p className="text-sm text-water-blue font-bold">အတာစား: အခါးဟင်း သို့မဟုတ် အရွက်။</p>
        </div>
      </div>
    )
  }
];

const Traditions = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6 pt-24 pb-32"
    >
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 font-heading">Tradition Hub</h1>
        <p className="text-gray-600">Discover the heritage of the Myanmar Water Festival.</p>
      </header>

      <TraditionAccordion items={traditionsData} />
    </motion.div>
  );
};

export default Traditions;
