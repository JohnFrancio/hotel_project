const db = require('../connexion/db')
const paiementModel = require('../models/paiement')
const reservationModel = require('../models/reservation')
const MvolaApiClient = require('../mvola/mvola')

const apiClient = new MvolaApiClient(process.env.consumerKey, process.env.consumerSecret)

const insertPaiement = async (req, res) => {
	try{
		const tokenResponse = await apiClient.getToken()

		const amount = req.body.prix
	    const description = "Payment for goods"
	    const partnerTransid = "12342342"
	    const requestDate = new Date().toISOString()
	    const originalTxRef = "789012"
	    const customerNumber = req.body.contact_user
	    const merchantNumber = "0343500004"
	    const companyName = "Hotelinao"
	    const id_reservation = req.params.id

	    const makeTransaction = await apiClient.makeMerchantPayTransaction(amount, description, partnerTransid,
	    requestDate, originalTxRef, customerNumber, merchantNumber, companyName)
	    if(makeTransaction.serverCorrelationId !== "" || makeTransaction.serverCorrelationId !== null){
	    	await reservationModel.updateReservation(id_reservation, (err, result) => {
		        if (err) {
					console.log(err.sqlMessage)
		        }
		    })
		    const data = {
		    	id_reservation,
		    	prix: parseInt(req.body.prix),
		    	serverCorrelationId: makeTransaction.serverCorrelationId,
		    }
		    paiementModel.insertPaiement(data, (err, result) => {
		        if (err) {
		            return res.send(err);
		        }
		        return res.json(result);
		    })
	    }
	}catch (error) {
	    console.error('Error:', error);
	}
}

const updatePaiement = async (req, res) => {
	try{
		const tokenResponse = await apiClient.getToken()

	    const merchantNumber = "0343500004"
	    const companyName = "Hotelinao"
	    const id_reservation = req.params.id

	    let paiement = Array()

	    await paiementModel.getPaiement(id_reservation, async (err, result) => {
		        if (err) {
					console.log(err.sqlMessage)
		        }
		        const serverCorrelationId = result[0].serverCorrelationId
		        const getTransactionStatus = await apiClient.getMerchantPayTransactionStatus(serverCorrelationId, 
	    	merchantNumber, companyName)
		        console.log(getTransactionStatus)
		        if(getTransactionStatus.objectReference !== "" || getTransactionStatus.objectReference !== null){
				    paiementModel.updatePaiement(getTransactionStatus.objectReference, id_reservation, (err, result) => {
				        if (err) {
				            return res.send(err);
				        }
				        return res.json(result);
				    })
			    }
		    })
	}catch (error) {
	    console.error('Error:', error);
	}
}

const getInfoPaiement = (req, res) => {
	paiementModel.getInfoPaiement(req.params.id, (err,results)=>{
        if (err) {
            return res.send(err.sqlMessage);
        }
        return res.json(results);
    })
}

module.exports = {
	getInfoPaiement,
	insertPaiement,
	updatePaiement
}