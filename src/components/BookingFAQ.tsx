"use client";

import { useState } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "What is included in the ticket price?",
    answer: "Your ticket includes admission to the luau, a full Hawaiian buffet dinner, welcome drink (alcoholic or non-alcoholic), and the complete entertainment show featuring traditional Hawaiian and Polynesian performances. Premium and VIP tickets include additional benefits as described on the booking page."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We offer a full refund for cancellations made at least 72 hours before the event. Cancellations within 72 hours of the event will receive a 50% refund. No refunds are available for no-shows or cancellations on the day of the event. However, you can transfer your booking to another person by contacting our customer service team."
  },
  {
    question: "Is there a dress code?",
    answer: "We recommend casual, comfortable attire. Many guests enjoy wearing Hawaiian/aloha shirts or sundresses, but this is not required. The event is outdoors, so comfortable shoes are recommended. We suggest bringing a light jacket or wrap as it can get cooler in the evening."
  },
  {
    question: "Are there vegetarian, vegan, or gluten-free options available?",
    answer: "Yes, we offer vegetarian, vegan, and gluten-free options. Please indicate any dietary requirements during the booking process or contact us at least 48 hours before the event to ensure we can accommodate your needs."
  },
  {
    question: "Is the luau suitable for children?",
    answer: "Absolutely! Our luau is family-friendly and children of all ages are welcome. We offer special children's pricing for ages 5-12, and children under 5 attend for free (but still need a reservation)."
  },
  {
    question: "What happens if it rains?",
    answer: "Our luau has both covered and open-air areas. In case of light rain, the show will continue under our covered areas. In case of severe weather, we may reschedule the event or offer you the option to attend another date or receive a full refund."
  },
  {
    question: "Is transportation provided?",
    answer: "Transportation is not included in the standard ticket price. However, we offer optional round-trip shuttle service from major hotels in Waikiki for an additional fee. You can add this option during the booking process."
  },
  {
    question: "How early should I arrive?",
    answer: "We recommend arriving 30 minutes before the scheduled start time. This allows time for check-in, welcome drinks, and to enjoy the pre-show activities and demonstrations."
  },
  {
    question: "Is the venue accessible for people with mobility issues?",
    answer: "Yes, our venue is accessible for guests with mobility issues. We have wheelchair-accessible pathways, seating areas, and restrooms. Please let us know about any special requirements during booking so we can ensure you have the best experience."
  },
  {
    question: "Can I purchase tickets at the door?",
    answer: "We strongly recommend booking in advance as our events often sell out. However, if tickets are still available, you can purchase them at the door (cash or credit card accepted). Please note that door prices may be higher than online booking prices."
  }
];

export default function BookingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-lg">{item.question}</span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            {openIndex === index && (
              <div className="p-4 bg-gray-50 border-t">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
