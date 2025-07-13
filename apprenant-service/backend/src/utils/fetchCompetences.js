const axios = require("axios");

// Fetch all competences and filter by given codes
const getCompetencesByCodes = async (codes) => {
  try {
    const response = await axios.get("http://localhost:5001/api/competences");
    const allCompetences = response.data;

    // Only return the competences whose 'code' is in the list
    return allCompetences.filter((comp) => codes.includes(comp.code));
  } catch (err) {
    console.error(
      "Error fetching competences from Competence-Service:",
      err.message
    );
    return [];
  }
};

module.exports = { getCompetencesByCodes };
