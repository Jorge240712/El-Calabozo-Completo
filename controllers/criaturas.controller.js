const supabase = require('../config/supabaseClient');

// GET /criaturas — Traer todas las criaturas
const getCriaturas = async (req, res) => {
    const { data, error } = await supabase.from('criaturas').select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.json(data);
};

// POST /criaturas — Crear una nueva criatura
const createCriatura = async (req, res) => {
    const { nombre, tipo, poder, capturada } = req.body;

    const { data, error } = await supabase
        .from('criaturas')
        .insert([{ nombre, tipo, poder, capturada }])
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data[0]);
};

// PUT /criaturas/:id — Actualizar una criatura
const updateCriatura = async (req, res) => {
    const { id } = req.params;
    const { nombre, tipo, poder, capturada } = req.body;

    const { data, error } = await supabase
        .from('criaturas')
        .update({ nombre, tipo, poder, capturada })
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
        return res.status(404).json({
            mensaje: "No se encontró la criatura."
        });
    }

    return res.status(200).json(data[0]);
};

// DELETE /criaturas/:id — Eliminar una criatura
const deleteCriatura = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('criaturas')
        .delete()
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
        return res.status(404).json({
            mensaje: "No se encontró la criatura para eliminar."
        });
    }

    return res.status(200).json({
        mensaje: "Criatura eliminada correctamente.",
        criaturaEliminada: data[0]
    });
};

// GET /criaturas/:id — Traer una sola criatura por su ID
const getCriaturaById = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('criaturas')
        .select('*')
        .eq('id', id)
        .single(); // 👈 Deuelve un solo objeto en vez de un array []

    if (error) {
        // .single() lanza un error específico cuando no encuentra filas (código PGRST116 en Supabase)
        return res.status(404).json({
            mensaje: "No se encontró la criatura con ese ID."
        });
    }

    return res.status(200).json(data);
};

// Exportamos todas las funciones para que las use el router
module.exports = {
    getCriaturas,
    createCriatura,
    updateCriatura,
    deleteCriatura,
    getCriaturaById
};