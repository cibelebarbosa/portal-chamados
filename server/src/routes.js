const express = require("express");
const router = express.Router();
const ChamadoController = require("./controllers/ChamadoController");
const LoginController = require("./controllers/LoginController");
const CoordenadorController = require("./controllers/CoordenadorController");
const NodemailerController = require("./controllers/NodemailerController");

router.get("/chamados", ChamadoController.getAll);
router.get("/chamados/:id", ChamadoController.getAllById);
router.get("/chamado/:id", ChamadoController.getById);
router.post("/chamado", ChamadoController.save);
router.put("/chamado/:id", ChamadoController.update);
router.delete("/chamado/:id", ChamadoController.delete);

router.post("/login", LoginController.login)
router.post("/loginsave", LoginController.save);
router.get("/login", LoginController.getAll);
router.delete("/login/:id", LoginController.delete);

router.post("/coordenadores", CoordenadorController.save)
router.get("/coordenadores", CoordenadorController.getAllCoordenadores)
router.get("/coordenadores/:id", CoordenadorController.getById)
router.put("/coordenadores/:id", CoordenadorController.updateCoordenador);
router.delete("/coordenadores/:id", CoordenadorController.delete);
router.get("/diadominio", CoordenadorController.getAllDiasDominio)

router.post("/send", NodemailerController.sendEmail)

module.exports = router;
