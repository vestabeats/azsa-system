import React from 'react';

interface Tab {
  title: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ tabs, selected, setSelected, children }) => {
  return (
    <div>
      <div className='flex border-b'>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-sm font-medium ${
              selected === index
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-600'
            }`}
            onClick={() => setSelected(index)}
          >
            {tab.icon} {tab.title}
          </button>
        ))}
      </div>
      <div className='mt-4'>
        {children}
      </div>
    </div>
  );
};

export default Tabs;
