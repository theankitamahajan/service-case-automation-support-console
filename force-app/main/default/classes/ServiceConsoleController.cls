public with sharing class ServiceConsoleController {
    public class ConsoleAction {
        @AuraEnabled public Id caseId;
        @AuraEnabled public String stage;
        @AuraEnabled public String ownerQueue;
        @AuraEnabled public String externalStatus;
        @AuraEnabled public Boolean escalationRequired;
        @AuraEnabled public String nextAction;
    }

    @AuraEnabled(cacheable=true)
    public static ConsoleAction loadCaseAction(Id caseId) {
        Case supportCase = [
            SELECT Id, Subject, Priority, Status, Origin
            FROM Case
            WHERE Id = :caseId
            WITH USER_MODE
            LIMIT 1
        ];
        return buildAction(supportCase);
    }

    public static ConsoleAction buildAction(Case supportCase) {
        ConsoleAction action = new ConsoleAction();
        action.caseId = supportCase.Id;
        action.stage = String.isBlank(supportCase.Status) ? 'New' : supportCase.Status;
        action.escalationRequired = supportCase.Priority == 'High';
        action.ownerQueue = action.escalationRequired ? 'Service Ops' : 'Product Support';
        action.externalStatus = 'Ready for named credential status lookup';
        action.nextAction = action.escalationRequired
            ? 'Publish service escalation event and create operations task'
            : 'Refresh external status and attach support macro';
        return action;
    }

    public static void publishEscalation(ConsoleAction action) {
        if (action == null || !action.escalationRequired) {
            return;
        }

        Service_Case_Update__e eventRecord = new Service_Case_Update__e(
            CaseId__c = String.valueOf(action.caseId),
            OwnerQueue__c = action.ownerQueue,
            ExternalStatus__c = action.externalStatus,
            NextAction__c = action.nextAction
        );
        EventBus.publish(eventRecord);
    }
}
