const express = require("express");
const router  = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  register,
  login,
  getTrainers,
  createRequest,
  getRequests,
  getClientRequests, 
  acceptRequest,
  rejectRequest,
  markRequestsSeen
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login",    login);

router.use(authMiddleware);

router.get("/trainers",                   getTrainers);
router.post("/trainers/request",          createRequest);
router.get("/requests",                   getRequests);
router.get("/requests/client",            getClientRequests);
router.patch("/requests/accept/:id",      acceptRequest);
router.patch("/requests/reject/:id",      rejectRequest);
router.patch("/requests/client/mark-seen", markRequestsSeen);

module.exports = router;

