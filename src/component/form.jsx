import React, { useState } from "react";
import ChargeurFichier from "./chargeurfichier"; // Importez le composant
import TableauDonnees from "./TableauDonnees";
import "./FormulaireDonnees.css";

const FormulaireDonnees = () => {
  const themes = [
    { id: 1, name: "Climatologie" },
    { id: 2, name: "Démographie" },
  ];

  const departements = [
    { id: 1, name: "Brakna" },
    { id: 2, name: "Wilaya 2" },
  ];

  const [selectedThemeId, setSelectedThemeId] = useState("");
  const [selectedDepartementId, setSelectedDepartementId] = useState("");
  const [fileData, setFileData] = useState({}); // Données par wilaya et thème
  const [filteredData, setFilteredData] = useState([]); // Données filtrées à afficher
  const [error, setError] = useState("");

  const handleThemeChange = (e) => {
    setSelectedThemeId(e.target.value);
    filterData(e.target.value, selectedDepartementId);
  };

  const handleDepartementChange = (e) => {
    setSelectedDepartementId(e.target.value);
    filterData(selectedThemeId, e.target.value);
  };

  const handleDataUploaded = (data) => {
    setFileData((prev) => ({ ...prev, [data.wilaya]: data.sheets }));
    setError("");
  };

  const filterData = (themeId, departementId) => {
    if (!themeId || !departementId) {
      setFilteredData([]);
      return;
    }

    const wilaya = departements.find((d) => d.id === parseInt(departementId))?.name;
    const theme = themes.find((t) => t.id === parseInt(themeId))?.name;

    if (!wilaya || !theme || !fileData[wilaya] || !fileData[wilaya][theme]) {
      setFilteredData([]);
      return;
    }

    setFilteredData(fileData[wilaya][theme]);
  };

  const handleManualInsert = () => {
    const manualData = [
      { Nom: "Jean Dupont", Âge: 30, Ville: "Paris" },
      { Nom: "Marie Curie", Âge: 35, Ville: "Lyon" },
    ];
    setFilteredData(manualData);
  };

  const handleAccept = () => alert("Données acceptées.");
  const handleReject = () => {
    setFilteredData([]);
    setSelectedThemeId("");
    setSelectedDepartementId("");
    alert("Données rejetées.");
  };

  return (
    <div className="custom">
      <h1 className="text-2xl font-bold mb-4">Formulaire d'importation de données</h1>
      <form className="space-y-4">
        <div className="flex space-x-4">
          <label className="block text-gray-700 font-medium mr-20">Thème :</label>
          <select
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={selectedThemeId}
            onChange={handleThemeChange}
          >
            <option value="">Sélectionnez un thème</option>
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4">
          <label className="block text-gray-700 font-medium mr-8">Département :</label>
          <select
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={selectedDepartementId}
            onChange={handleDepartementChange}
          >
            <option value="">Sélectionnez un département</option>
            {departements.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            type="button"
            onClick={handleManualInsert}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Insérer des données manuellement
          </button>
          <ChargeurFichier onDataUploaded={handleDataUploaded} /> {/* Utilisez le composant ici */}
        </div>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {filteredData.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Données importées :</h2>
          <TableauDonnees donnees={filteredData} />
          <div className="mt-4">
            <button
              onClick={handleAccept}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-4"
            >
              Accepter
            </button>
            <button
              onClick={handleReject}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Rejeter
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-gray-500">Aucune donnée à afficher.</p>
      )}
    </div>
  );
};

export default FormulaireDonnees;