const Galaxy = require('../models/Galaxy');

// Создание галактики
exports.createGalaxy = async (req, res) => {
    const { name, description, distance, photo } = req.body;
    if (!name || !distance || !photo || !description) {
        return res.status(400).json({ error: 'Поля name и distance должны быть заполнены' });
    }

    try {
        const galaxy = new Galaxy({ name, distance,description, photo });
        await galaxy.save();
        res.json(galaxy);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Получение всех галактик
exports.getGalaxies = async (req, res) => {
    try {
        const galaxies = await Galaxy.find();
        res.json(galaxies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Получение одной галактики по ID
exports.getGalaxy = async (req, res) => {
    try {
        const galaxy = await Galaxy.findById(req.params.id);
        if (!galaxy) {
            return res.status(404).json({ msg: 'Galaxy not found' });
        }
        res.json(galaxy);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Обновление галактики по ID
exports.updateGalaxy = async (req, res) => {
    const { name, description, distance, photo } = req.body; // Добавили photo
    try {
        let galaxy = await Galaxy.findById(req.params.id);
        if (!galaxy) {
            return res.status(404).json({ msg: 'Galaxy not found' });
        }
        galaxy.name = name || galaxy.name;
        galaxy.description = description || galaxy.description;
        galaxy.distance = distance || galaxy.distance;
        galaxy.photo = photo || galaxy.photo; // Добавили photo
        await galaxy.save();
        res.json(galaxy);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Удаление галактики по ID
exports.deleteGalaxy = async (req, res) => {
    try {
        const galaxy = await Galaxy.findById(req.params.id);
        if (!galaxy) {
            return res.status(404).json({ msg: 'Galaxy not found' });
        }
        await Galaxy.deleteOne({ _id: req.params.id });
        res.json({ msg: 'Galaxy removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
//test
exports.getGalaxyStats = async (req, res, next) => {
    try {
        const galaxyStats = await Galaxy.aggregate([
            { $group: { _id: null, count: { $sum: 1 } } }
        ]);
        res.json(galaxyStats);
    } catch (err) {
        next(err);
    }
};

