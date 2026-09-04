import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Sparkles } from 'lucide-react';
import { FAQS } from '../data/faq';
import { RESTAURANT_CONFIG } from '../config';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hola 👋 ${RESTAURANT_CONFIG.restaurantName}, tengo una consulta sobre sus pedidos y promociones.`
    );
    window.open(`https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="faq" className="py-14 bg-white border-b border-neutral-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D62828] font-bold text-xs uppercase tracking-wider mb-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Respuestas Rápidas</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#141414] tracking-tight">
              Preguntas Frecuentes 🤔
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-sm font-medium">
            Despeja tus dudas sobre métodos de entrega, tiempo de cocción y zonas de cobertura.
          </p>
        </div>

        {/* Bento Accordions List */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#FAF8F5] border-neutral-300 shadow-sm'
                    : 'bg-white border-neutral-200/90 hover:border-neutral-300'
                }`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-heading font-black text-sm sm:text-base text-[#141414] hover:text-[#D62828] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-red-100 text-[#D62828] rotate-180' : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-200/60 pt-3.5 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bento Dark Help Box */}
        <div className="mt-6 p-6 sm:p-7 bg-[#141414] text-white rounded-3xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="text-center sm:text-left space-y-1">
            <h4 className="font-heading font-black text-lg text-white">
              ¿Tienes otra duda o pedido personalizado?
            </h4>
            <p className="text-xs text-neutral-300">
              Escríbenos directamente a nuestra central de WhatsApp y un asesor te atenderá de inmediato.
            </p>
          </div>
          <button
            onClick={handleWhatsAppInquiry}
            className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 flex-shrink-0 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar por WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
};

