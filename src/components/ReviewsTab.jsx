import React, { useState } from 'react';
import TeachersTable from './TeachersTable';
import ClassTeachersTable from './ClassTeachersTable';
import DepartmentHeadsTable from './DepartmentHeadsTable';
import Breadcrumb from '../../components/Breadcrumb';
import FormPrincipalsTable from './FormPrincipalsTable';
import Principal from './Principal';
import HouseMastersTable from './HouseMastersTable';
import Sanatorium from './Sanatorium';
import ClubPatronsTable from './ClubPatronsTable';
import SocietyPatronsTable from './SocietyPatronsTable';
import OtherStaff from './OtherStaff';

const tabs = [
  { name: 'All Teachers', component: <TeachersTable /> },
  { name: 'Class Teachers', component: <ClassTeachersTable /> },
  { name: 'Department Heads', component: <DepartmentHeadsTable /> },
  { name: "Principal's Office", component: <Principal /> },
  { name: 'Form Principals', component: <FormPrincipalsTable /> },
  { name: 'House Masters', component: <HouseMastersTable /> },
  { name: 'Club Patrons', component: <ClubPatronsTable /> },
  { name: 'Society Patrons', component: <SocietyPatronsTable /> },
  { name: 'Sanatorium', component: <Sanatorium /> },
  { name: 'IT Support', component: <OtherStaff /> }
];

function TeachersTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <>
      <Breadcrumb pageName="School Staff" />

      <div className="mx-auto px-3 py-6 lg:py-10 md:px-2 lg:px-5 bg-white dark:bg-strokedark rounded-lg shadow-lg">
        {/* Tab Buttons */}
        <div className="py-1 flex space-x-3 sm:space-x-6 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 border-b-2 border-gray dark:border-form-strokedark">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 font-medium text-sm sm:text-base rounded-t-lg focus:outline-none transition-all ${
                activeTab === tab.name
                  ? 'bg-primary text-white' 
                  : 'bg-[#fafafa] text-gray-700 hover:bg-gray dark:bg-gray-700 dark:text-gray dark:hover:bg-black dark:bg-graydark'
              }`}
              onClick={() => setActiveTab(tab.name)}
              aria-controls={`tab-${index}`}
              aria-selected={activeTab === tab.name}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-4 sm:py-6 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
          {tabs.map((tab, index) => (
            <div
              key={index}
              id={`tab-${index}`}
              className={`transition-opacity duration-500 ease-in-out ${
                activeTab === tab.name ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
              }`}
            >
              {tab.component}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TeachersTabs;
