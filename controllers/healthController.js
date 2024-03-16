
const healthController = {};
healthController.health = async (req, res) => {
    res.send({
        status:"ok"
    });
}

module.exports = healthController;