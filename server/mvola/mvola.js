const axios = require('axios')
const querystring = require('querystring')
const { v4: uuidv4 } = require('uuid')
const { Buffer } = require('buffer')

class MvolaApiClient {
  constructor(consumerKey, consumerSecret) {
    this.accessToken = null;
    this.baseURL = 'https://devapi.mvola.mg';
    this.XCorrelationID = uuidv4();

    // encoder le consumerKey et le consumerSecret en base64 pour l'authentification header
    this.authHeader = 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  }

  //pour recuperer le token generer par le consumerKey et consumerSecret
  async getToken() {
    const url = `${this.baseURL}/token`;

    const headers = {
      'Authorization': this.authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
    };

    const data = 'grant_type=client_credentials&scope=EXT_INT_MVOLA_SCOPE';

    try {
      const response = await axios.post(url, data, { headers });
      this.accessToken = response.data.access_token;
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  //pour faire une transaction
  async makeMerchantPayTransaction(amount, description, partnerTransid, requestDate, originalTxRef, customerNumber, MerchantNumber, companyName) {
    if (!this.accessToken) {
      throw new Error('Access token not available. Call getToken() first.');
    }

    const url = `${this.baseURL}/mvola/mm/transactions/type/merchantpay/1.0.0/`;

    const headers = {
      'Version': '1.0',
      'X-CorrelationID': this.XCorrelationID,
      'UserLanguage': 'MG',
      'UserAccountIdentifier': `msisdn;${MerchantNumber}`,
      'partnerName': companyName,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`,
      'Cache-Control': 'no-cache',
    };

    const data = {
      amount: amount.toString(),
      currency: "Ar",
      descriptionText: description,
      requestingOrganisationTransactionReference: partnerTransid,
      requestDate: requestDate,
      originalTransactionReference: originalTxRef,
      debitParty: [
        { "key": "msisdn", "value": customerNumber }
      ],
      creditParty: [
        { "key": "msisdn", "value": MerchantNumber }
      ],
      metadata: [
        { "key": "partnerName", "value": companyName },
        { "key": "fc", "value": "USD" },
        { "key": "amountFc", "value": "1" }
      ]
    };

    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // pour recuperer les donnees d'un transaction a partir du transID (objetReference)
  async getMerchantPayTransaction(transID, merchantNumber, companyName) {
    if (!this.accessToken) {
      throw new Error('Access token not available. Call getToken() first.');
    }

    const url = `${this.baseURL}/mvola/mm/transactions/type/merchantpay/1.0.0/${transID}`;

    const headers = {
      'Version': '1.0',
      'X-CorrelationID': this.XCorrelationID,
      'UserLanguage': 'FR',
      'UserAccountIdentifier': `msisdn;${merchantNumber}`,
      'partnerName': companyName,
      'Authorization': `Bearer ${this.accessToken}`,
      'Cache-Control': 'no-cache',
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // pour recuperer le status d'un transaction a partir du serverCorrelationId
  async getMerchantPayTransactionStatus(serverCorrelationId, merchantNumber, companyName) {
    if (!this.accessToken) {
      throw new Error('Access token not available. Call getToken() first.');
    }

    const url = `${this.baseURL}/mvola/mm/transactions/type/merchantpay/1.0.0/status/${serverCorrelationId}`;

    const headers = {
      'Version': '1.0',
      'X-CorrelationID': this.XCorrelationID,
      'UserLanguage': 'FR',
      'UserAccountIdentifier': `msisdn;${merchantNumber}`,
      'partnerName': companyName,
      'Authorization': `Bearer ${this.accessToken}`,
      'Cache-Control': 'no-cache',
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MvolaApiClient;