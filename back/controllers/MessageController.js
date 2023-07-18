const Message = require('../models/mensaje_model');

function send(req, res){
    const data = req.body;

    const message = new Message();
    message.de = data.de;
    message.para = data.para;
    message.msm = data.msm;

    message.save()
    .then(message_save => {
        if(message_save){
            res.status(200).send({message: message_save});
        } else {
            res.status(204).send({});
        }
    })
    .catch(err => {
        res.status(500).send({message: err});
    })
}

function data_msm(req, res){
    const data = req.body;
    const de = req.params['de'];
    const para = req.params['para'];

    const filtro = {
        '$or': [
            {
                '$and': [
                    {
                        'para': de
                    },
                    {
                        'de': para
                    }
                ]
            },
            {
                '$and': [
                    {
                        'para': para
                    },
                    {
                        'de': de
                    }
                ]
            }
        ]
    }

    Message.find(filtro).sort({createAt: 1}).exec().then(messages => {
        res.status(200).send({messages: messages});
    }).catch( err => {
        res.status(204).send({message: err})
    })
}

module.exports = {
    send,
    data_msm
}