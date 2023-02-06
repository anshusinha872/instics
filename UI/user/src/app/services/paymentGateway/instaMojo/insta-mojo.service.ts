import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class InstamojoService {
  private apiKey: string = 'test_b2f8bee4f1fc4e114fd7bb864c5';
  private baseUrl: string = 'https://test.instamojo.com/';

  constructor() {}

  async createPaymentRequest(paymentDetails) {
    const url = this.baseUrl + 'payment-requests/';
    const headers = {
      'X-Api-Key': this.apiKey,
      'X-Auth-Token': 'test_239cd0cd6f2f18051ff135e134e',
    };
    try {
      const response = await axios.post(url, paymentDetails, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async getPaymentDetails(paymentRequestId) {
    const url = this.baseUrl + 'payment-requests/' + paymentRequestId + '/';
    const headers = {
      'X-Api-Key': this.apiKey,
      'X-Auth-Token': 'YOUR_AUTH_TOKEN',
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
