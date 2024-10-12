import Part from "./Part";

export const getParts = async (req, res) => {
  try {
    const parts = await Part.find();
    res.json(parts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des pièces" });
  }
};
