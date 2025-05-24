const User = require("../models/User");
const Request = require("../models/Request");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ─── Înregistrare User ───────────────────────────────────────────
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email deja folosit." });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "Înregistrare reușită!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── Login User ──────────────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User-ul nu există." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Date invalide." });

    // Adăugăm rolul în payload
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── Listă antrenori ─────────────────────────────────────────────
exports.getTrainers = async (req, res) => {
  try {
    // Caută indiferent de litera mare/mică
    const trainers = await User.find({ role: { $regex: /^antrenor$/i } }).select("-password");
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── Creare cerere pentru antrenor ────────────────────────────────
exports.createRequest = async (req, res) => {
  try {
    const clientId = req.user.id;
    const { trainerId } = req.body;

    // Blochează dacă există deja o cerere ACCEPTATĂ sau ÎN AȘTEPTARE la acel antrenor
    const existing = await Request.findOne({
      client: clientId,
      trainer: trainerId,
      status: { $in: ["Acceptat", "În așteptare"] }
    });

    if (existing) {
      return res.status(400).json({
        error: "Ai deja o cerere activă (în așteptare sau acceptată) la acest antrenor!"
      });
    }

    // Dacă nu există, creează o cerere nouă (status default: „În așteptare”)
    const newRequest = new Request({
      client: clientId,
      trainer: trainerId
    });
    await newRequest.save();

    res.json({ message: "Cererea a fost trimisă cu succes!" });
  } catch (err) {
    console.error("EROARE LA CERERE:", err);
    res.status(500).json({ error: "Eroare la trimiterea cererii." });
  }
};


// ─── GET numai cereri „În așteptare”
exports.getRequests = async (req, res) => {
  const trainerId = req.user.id;
  const requests = await Request.find({ trainer: trainerId }).populate("client", "username email");
  res.json(requests);
};


// Acceptă cererea (updatează statusul în Mongo)
exports.acceptRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: "Acceptat" },
      { new: true }
    );
    if (!request) return res.status(404).json({ message: "Cerere negăsită" });
    res.json(request); // trimite cererea updatată
  } catch (err) {
    res.status(500).json({ message: "Eroare la acceptare", error: err.message });
  }
};

// Refuză cererea (updatează statusul în Mongo)
exports.rejectRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: "Refuzat" },
      { new: true }
    );
    if (!request) return res.status(404).json({ message: "Cerere negăsită" });
    res.json(request); // trimite cererea updatată
  } catch (err) {
    res.status(500).json({ message: "Eroare la refuzare", error: err.message });
  }
};

// Notificări pentru clientul logat
exports.getClientRequests = async (req, res) => {
  try {
    const clientId = req.user.id;
    const requests = await Request.find({ client: clientId })
      .populate("trainer", "username name");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Eroare la notificările clientului.' });
  }
};

// Marchează toate notificările ACCEPTATE/REFUZATE ca văzute pentru clientul logat
exports.markRequestsSeen = async (req, res) => {
  try {
    const clientId = req.user.id;
    await Request.updateMany(
      {
        client: clientId,
        status: { $in: ["Acceptat", "Refuzat"] },
        viewedByClient: false
      },
      { $set: { viewedByClient: true } }
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Eroare la marcarea notificărilor ca văzute." });
  }
};
