import Intervention from "./Intervention";

export const getInterventions = async (req, res) => {
  try {
    const interventions = await Intervention.find();
    res.json(interventions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des interventions" });
  }
};
