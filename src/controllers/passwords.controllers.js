import Password from "../models/password.model.js";

export const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ user : req.user.id }).populate("user");
    res.json(passwords);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPassword = async (req, res) => {
  try {
    const { siteName, password, iv } = req.body;
    const newPassword = new Password({
      siteName,
      password,
      iv,
      user: req.user.id,
    });
    await newPassword.save();
    res.json(newPassword);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePassword = async (req, res) => {
  try {
    const deletedPassword = await Password.findByIdAndDelete(req.params.id);
    if (!deletedPassword)
      return res.status(404).json({ message: "Password not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { siteName, password, iv } = req.body;
    const passwordUpdated = await Password.findOneAndUpdate(
      { _id: req.params.id },
      { siteName, password, iv },
      { new: true }
    );
    return res.json(passwordUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPassword = async (req, res) => {
  try {
    const password = await Password.findById(req.params.id);
    if (!password) return res.status(404).json({ message: "Password not found" });
    return res.json(password);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};