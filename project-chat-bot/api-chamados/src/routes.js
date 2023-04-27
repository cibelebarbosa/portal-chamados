const express = require("express");
const router = express.Router();
const ChamadoController = require("./controllers/ChamadoController");

router.get("/chamados", ChamadoController.getAll);
router.get("/chamado/:id", ChamadoController.getById);
router.post("/chamado", ChamadoController.save);
router.put("/chamado/:id", ChamadoController.update);
router.delete("/chamado/:id", ChamadoController.delete);

router.get("/cursos", ChamadoController.getCursos);
module.exports = router;
