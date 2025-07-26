// import { useState } from 'react'

function App() {
  // Future use for test selection functionality
  // const [selectedTest, setSelectedTest] = useState(null)

  const tests = [
    {
      id: 'aq50',
      name: 'AQ-50',
      fullName: 'Autism Spectrum Quotient',
      description: 'Ein Screening-Test für Autismus-Spektrum-Störungen mit 50 Fragen',
      duration: '10-15 Minuten',
      status: 'Bald verfügbar'
    },
    {
      id: 'raads-r',
      name: 'RAADS-R',
      fullName: 'Ritvo Autism Asperger Diagnostic Scale-Revised',
      description: 'Diagnostisches Instrument für Erwachsene mit 80 Fragen',
      duration: '20-30 Minuten',
      status: 'Bald verfügbar'
    },
    {
      id: 'ados2',
      name: 'ADOS-2',
      fullName: 'Autism Diagnostic Observation Schedule',
      description: 'Strukturierte Beobachtungs-Assessment für die Autismus-Diagnose',
      duration: '45-60 Minuten',
      status: 'Bald verfügbar'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              🧩 Autism-Tests
            </h1>
            <p className="text-sm text-gray-600">
              Online-Testplattform für Autismus-Spektrum-Störungen
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Willkommen zur Autism-Tests Plattform
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Eine moderne, wissenschaftlich fundierte Plattform für standardisierte 
            Autismus-Tests und -Fragebögen in deutscher Sprache.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-yellow-800">
              <strong>⚠️ Wichtiger Hinweis:</strong> Diese Tests ersetzen keine 
              professionelle Diagnose und dienen nur zur Orientierung.
            </p>
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {tests.map((test) => (
            <div 
              key={test.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {test.name}
              </h3>
              <h4 className="text-sm text-gray-600 mb-3 font-medium">
                {test.fullName}
              </h4>
              <p className="text-gray-700 mb-4">
                {test.description}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">
                  ⏱️ {test.duration}
                </span>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {test.status}
                </span>
              </div>
              <button 
                className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded cursor-not-allowed"
                disabled
              >
                Test starten
              </button>
            </div>
          ))}
        </div>

        {/* Information Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              📊 Über die Tests
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Wissenschaftlich validierte Instrumente</li>
              <li>• Deutsche Übersetzungen</li>
              <li>• Benutzerfreundliche Oberfläche</li>
              <li>• Sichere Datenverarbeitung</li>
              <li>• Barrierefreie Gestaltung</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              🔧 Entwicklungsstand
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Projekt-Setup</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  ✅ Fertig
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">AQ-50 Implementation</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                  🚧 In Arbeit
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">RAADS-R Implementation</span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  📅 Geplant
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">ADOS-2 Implementation</span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  📅 Geplant
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              Entwickelt mit ❤️ für die Autismus-Community
            </p>
            <p className="text-sm">
              Open Source Projekt • GitHub: 
              <a 
                href="https://github.com/Huskynarr/autism-tests" 
                className="text-blue-600 hover:text-blue-800 ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Huskynarr/autism-tests
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
