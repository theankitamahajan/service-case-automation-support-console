import { LightningElement, api, wire } from 'lwc';
import loadCaseAction from '@salesforce/apex/ServiceConsoleController.loadCaseAction';

export default class ServiceCaseConsole extends LightningElement {
    @api recordId;
    action;
    error;

    @wire(loadCaseAction, { caseId: '$recordId' })
    wiredAction({ data, error }) {
        if (data) {
            this.action = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.action = undefined;
        }
    }
}
