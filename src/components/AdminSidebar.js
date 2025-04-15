import React from 'react';

const AdminSidebar = ({ activeSection, setActiveSection }) => {
  const sections = [
    { name: 'Solicitudes', icon: '📋' },
    { name: 'Notificaciones', icon: '🔔' },
    { name: 'Usuarios', icon: '👥' }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl pt-24 z-40">
      <nav className="px-4">
        {sections.map((section) => (
          <button
            key={section.name}
            onClick={() => setActiveSection(section.name)}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-all duration-300 ${
              activeSection === section.name 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <span className="mr-2">{section.icon}</span>
            {section.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;