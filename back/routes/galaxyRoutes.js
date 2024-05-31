const express = require('express');
const router = express.Router();
const {
    createGalaxy,
    getGalaxies,
    getGalaxy,
    updateGalaxy,
    deleteGalaxy,
    getGalaxyStats,
} = require('../controllers/galaxyController');
const auth = require('../middleware/auth');

// Маршрут для создания галактики
router.post('/create', auth, createGalaxy);
// Маршрут для получения всех галактик
router.get('/all', auth, getGalaxies);

// Маршрут для получения одной галактики по ID
router.get('/view/:id', auth, getGalaxy);

// Маршрут для обновления галактики по ID
router.put('/update/:id', auth, updateGalaxy);


// Маршрут для удаления галактики по ID
router.delete('/delete/:id', auth, deleteGalaxy);

module.exports = router;

