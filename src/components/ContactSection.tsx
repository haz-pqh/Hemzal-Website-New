import React, { useState } from 'react';
import { Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, Flame, Sparkles, ChevronDown, HelpCircle, Truck, Utensils, ShieldCheck, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { playPopSound } from '../utils/sound';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Pertanyaan Umum',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      id: 'faq-delivery',
      question: 'Adakah perkhidmatan penghantaran (Delivery) disediakan?',
      category: 'Penghantaran',
      icon: Truck,
      answer:
        'Ya! Kami menyediakan penghantaran ke rumah melalui GrabFood, Foodpanda, ShopeeFood serta pesanan terus melalui WhatsApp Delivery dengan radius sehingga 15km dari cawangan terdekat kami. Pesanan atas talian melalui laman web ini akan terus disambungkan ke WhatsApp rasmi untuk semakan caj penghantaran dan penghantaran pantas.',
    },
    {
      id: 'faq-flavor',
      question: 'Adakah ayam goreng mempunyai pilihan kepedasan yang berbeza?',
      category: 'Resepi & Sos Signature',
      icon: Flame,
      answer:
        'Kesemua ayam crispy kami dimasak segar menggunakan 100% Resepi Original Crispy signature kami yang rangup di luar dan berjus di dalam. Pilihan kepedasan dan keenakan perisa dinikmati melalui rangkaian 5 Sos Signature kami seperti Sos Cili Pedas, Korean Habanero (ekstrem pedas menggunakan cili segar Cameron Highland), Garlic 5-Star, Sos Keju Meleleh, serta Furikake & Togarashi 7 Rempah Jepun.',
    },
    {
      id: 'faq-halal',
      question: 'Adakah ayam dan semua ramuan dijamin 100% Halal?',
      category: 'Status Halal',
      icon: ShieldCheck,
      answer:
        'Semua bekalan ayam kami adalah 100% ayam segar tempatan yang disembelih mengikut syariat Islam dengan sijil Halal JAKIM. Kesemua sos signature dan perapan kami disediakan bersih di Dapur Pusat (Central Kitchen) yang berstatus Halal.',
    },
    {
      id: 'faq-portions',
      question: 'Berapakah saiz hidangan bagi Hemzal Special Bucket & Set Ayam?',
      category: 'Saiz Hidangan',
      icon: Utensils,
      answer:
        'Setiap set Signature boleh dipilih dalam kuantiti 2 PCS (hidangan individu), 6 PCS (2-3 orang), atau 10 PCS (keluarga). Bagi "Hemzal Special Bucket", ia mengandungi 10 ketul ayam rangup gergasi bersama 10 pek sos cili dan LENGKAP dengan SEMUA 5 cawan sos signature kami (Garlic, Keju, Habanero, Furikake & Togarashi) — sesuai untuk 3 hingga 5 orang.',
    },
    {
      id: 'faq-catering',
      question: 'Bolehkah saya membuat tempahan pukal / katering untuk majlis?',
      category: 'Katering & Majlis',
      icon: ShoppingBag,
      answer:
        'Boleh! Kami menerima tempahan katering untuk majlis hari jadi, jamuan pejabat, kenduri, dan acara korporat. Sila hubungi kami melalui borang di bawah atau WhatsApp kami sekurang-kurangnya 24 hingga 48 jam awal untuk pakej diskaun katering khas.',
    },
  ];

  const toggleFaq = (index: number) => {
    playPopSound();
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playPopSound();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
    });
    setSubmitted(true);
  };

  return (
    <section id="hubungi" className="py-20 bg-neutral-50 border-b border-neutral-200/80 relative overflow-hidden">
      {/* Subtle Ambient Red Glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(227,30,36,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest text-[#B45309]">
            <MessageSquare className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Khidmat Pelanggan & Maklum Balas</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 uppercase tracking-tight">
            HUBUNGI & <span className="text-[#D97706] drop-shadow-[0_2px_10px_rgba(217,119,6,0.15)]">SOALAN LAZIM (FAQ)</span>
          </h2>

          <p className="text-neutral-700 text-sm sm:text-base font-medium">
            Ada sebarang pertanyaan mengenai penghantaran, tahap kepedasan, atau tempahan majlis? Ketahui jawapannya di bawah atau hantar mesej terus kepada kami.
          </p>
        </div>

        {/* Collapsible FAQ Accordion Section */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6 justify-center sm:justify-start">
            <HelpCircle className="w-5 h-5 text-[#D97706]" />
            <h3 className="text-xl font-black text-neutral-900 uppercase tracking-tight">
              Soalan Lazim Pelanggan (FAQ)
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              const IconComponent = faq.icon;

              return (
                <div
                  key={faq.id}
                  id={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[#D97706]/50 shadow-md'
                      : 'bg-white border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-50/50 shadow-sm'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-[#D97706] text-white font-black'
                            : 'bg-amber-500/10 text-[#D97706] border border-amber-500/20'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-[#B45309] uppercase font-bold tracking-wider block">
                          {faq.category}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
                          {faq.question}
                        </h4>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                        isOpen
                          ? 'rotate-180 bg-[#E31E24] text-white border-[#E31E24]'
                          : 'bg-neutral-100 text-neutral-500 border-neutral-200'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-neutral-200/80 text-neutral-600 text-xs sm:text-sm leading-relaxed pl-16 sm:pl-20">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info Boxes */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Box */}
            <a
              href="https://wa.me/601121992135?text=Hai%20Hemzal%20Crispy%20Chicken,%20saya%20ada%20pertanyaan."
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-white hover:bg-neutral-50/50 border border-neutral-200/80 hover:border-[#25D366]/50 transition-all duration-300 flex items-center gap-4 group block shadow-sm hover:shadow-md"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#25D366]/15 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform shrink-0">
                <MessageSquare className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#25D366] tracking-wider">
                  Respons Pantas (WhatsApp)
                </span>
                <h4 className="font-black text-base text-neutral-900">+60 11-2199 2135</h4>
                <p className="text-xs text-neutral-600">Tekan untuk sembang terus bersama admin</p>
              </div>
            </a>

            {/* Email Box */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 flex items-center gap-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-[#D97706] shrink-0">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#B45309] tracking-wider">
                  Email Rasmi
                </span>
                <h4 className="font-black text-base text-neutral-900">hello@hemzalcrispychicken.com</h4>
                <p className="text-xs text-neutral-600">Untuk pertanyaan media & rasmi</p>
              </div>
            </div>

            {/* Operating Hours Box */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 flex items-center gap-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#E31E24]/10 flex items-center justify-center text-[#E31E24] shrink-0">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#E31E24] tracking-wider">
                  Waktu Operasi Dapur
                </span>
                <h4 className="font-black text-base text-neutral-900">10:30 AM – 11:00 PM</h4>
                <p className="text-xs text-neutral-600">Dibuka 7 hari seminggu (Termasuk Cuti Umum)</p>
              </div>
            </div>

            {/* HQ Address Box */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 space-y-2 shadow-sm">
              <h4 className="font-black text-sm text-neutral-900 flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#D97706]" /> Ibu Pejabat & Dapur Pusat Hemzal
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                No. 24G & 26G, Jalan Pandan Indah 4/6, Pandan Indah, 55100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-10 shadow-lg">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-neutral-900">Mesej Anda Berjaya Dihantar!</h3>
                <p className="text-sm text-neutral-700 max-w-md mx-auto">
                  Terima kasih, <strong>{formData.name}</strong>. Pegawai perhubungan pelanggan Hemzal akan membalas emel/telefon anda dalam masa 24 jam.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'Pertanyaan Umum', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold border border-neutral-300/80 transition-colors cursor-pointer"
                >
                  Hantar Mesej Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-neutral-900">Borang Mesej Pantas</h3>
                  <p className="text-xs text-neutral-600">Isi maklumat anda dan kami akan menghubungi anda segera.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 uppercase">
                      Nama Penuh <span className="text-[#E31E24]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Cth: Ahmad Danial"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300/80 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-[#D97706] transition-colors shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 uppercase">
                      Alamat Email <span className="text-[#E31E24]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Cth: ahmad@gmail.com"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300/80 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-[#D97706] transition-colors shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 uppercase">
                      Nombor Telefon (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Cth: 012-3456789"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300/80 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-[#D97706] transition-colors shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 uppercase">
                      Tujuan Mesej
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300/80 rounded-xl text-sm text-neutral-900 focus:outline-none focus:bg-white focus:border-[#D97706] transition-colors shadow-sm"
                    >
                      <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                      <option value="Tempahan Katering">Tempahan Katering & Acara</option>
                      <option value="Peluang Francais">Peluang Francais / Kerjasama</option>
                      <option value="Maklum Balas Makanan">Maklum Balas Makanan</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 uppercase">
                    Mesej Anda <span className="text-[#E31E24]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan butiran pertanyaan atau mesej anda di sini..."
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300/80 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-[#D97706] transition-colors shadow-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#E31E24] hover:bg-[#FDB913] text-white hover:text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#E31E24]/20 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Hantar Mesej Sekarang</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
