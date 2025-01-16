import React from "react";

const TableauDonnees = ({ donnees }) => {
  if (!donnees.length) return null;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            {/* En-têtes : Récupérer les clés du premier élément de données */}
            {Object.keys(donnees[0]).map((cle) => (
              <th
                key={cle}
                className="border-b border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                {cle} {/* Chaque clé devient l'en-tête du tableau */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {donnees.map((ligne, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
            >
              {Object.values(ligne).map((valeur, idx) => (
                <td
                  key={idx}
                  className="border-b border-gray-300 px-6 py-4 text-sm text-gray-700"
                >
                  {valeur} {/* Chaque valeur du sous-thème est affichée dans la cellule */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableauDonnees;
