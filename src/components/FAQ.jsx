import React, { useState } from 'react';

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border rounded p-4 mb-4">
      <div
        className="flex justify-between items-center cursor-pointer font-medium"
        onClick={toggleOpen}
      >
        <span>{question}</span>
        <span className={`transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}>
            {isOpen ? '▲' : '▼'}
        </span>
      </div>
      {isOpen && <div className="mt-2 p-2 border-t">{answer}</div>}
    </div>
  );
}

function FAQ({ items }) {
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Часто задаваемые вопросы</h2>
      {items.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}


const faqData = [
  {
    question: "За что отвечает кнопка 'Dashboard'?",
    answer: "Нажав на Dashboard, вы увидите Ваше ЭКГ в реальном времени."
  },
  {
    question: "За что отвечает кнопка 'Statistics'?",
    answer: "Нажав на Statistics, вы увидите результаты обработки вашего ЭКГ."
  },
  {
    question: "За что отвечает кнопка 'Users'?",
    answer: "Нажав на Users, вы сможете войти в аккаунт и увидеть данные о нём."
  },
  {
      question: "За что отвечает кнопка 'Github'?",
      answer: "Нажав на Github, вы увидите ссылку на наш репозиторий Git, в котором содержится весь код приложения."
  },
  {
    question: "За что отвечают кнопки 'Orders', 'Billings', 'Settings'?",
    answer: "В данный момент у данных кнопок отсутствует функционал. Ожидаются в будущих обновлениях."
  },
   {
    question: "Какие дополнительные компоненты необходимы для работы этого приложения?",
     answer: "Необходимо собрать и подключить к человеку по инструкции (https://theorycircuit.com/arduino-projects/heart-rate-monitor-ad8232-interface-arduino/): Arduino UNO, датчика ЭКГ AD8232, cоединительные провода и датчики с липучками."
   },
   {
    question: "Что делать, если вы не нашли ответ на свой вопрос или вам нужны наши контактные данные?",
     answer: "Телефон: 8-943-345-12-43 Почта: EKGsupport@yandex.ru"
   }
];

function App() {
    return <FAQ items={faqData} />
}

export default App;