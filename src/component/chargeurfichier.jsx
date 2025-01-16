import React, { useState } from "react";
import * as XLSX from "xlsx";

const ChargeurFichier = ({ onDataUploaded }) => {
  const [fichier, setFichier] = useState(null);

  const handleFileChange = (e) => {
    const fichier = e.target.files[0];
    if (!fichier) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const classeur = XLSX.read(data, { type: "array" });

      // Extraire les données de chaque feuille
      const feuilles = {};
      classeur.SheetNames.forEach((nomFeuille) => {
        const feuille = classeur.Sheets[nomFeuille];
        const json = XLSX.utils.sheet_to_json(feuille);
        feuilles[nomFeuille] = json;
      });

      // Transmettre les données au composant parent
      onDataUploaded({
        wilaya: "Brakna", // Remplacez par la wilaya sélectionnée
        sheets: feuilles,
      });
    };

    reader.readAsArrayBuffer(fichier);
  };

  return (
    <div className="mt-4">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
};

export default ChargeurFichier;