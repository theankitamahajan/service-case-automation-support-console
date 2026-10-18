@IsTest
private class ServiceConsoleControllerTest {
    @IsTest
    static void highPriorityCaseRequiresEscalation() {
        Case supportCase = new Case(
            Subject = 'Replacement equipment stuck before carrier handoff',
            Origin = 'Phone',
            Priority = 'High',
            Status = 'New'
        );
        insert supportCase;

        Test.startTest();
        ServiceConsoleController.ConsoleAction action = ServiceConsoleController.loadCaseAction(supportCase.Id);
        ServiceConsoleController.publishEscalation(action);
        Test.stopTest();

        System.assertEquals(true, action.escalationRequired);
        System.assertEquals('Service Ops', action.ownerQueue);
    }

    @IsTest
    static void mediumPriorityCaseUsesProductSupport() {
        Case supportCase = new Case(
            Subject = 'Calibration failure after firmware update',
            Origin = 'Chat',
            Priority = 'Medium',
            Status = 'Working'
        );
        insert supportCase;

        ServiceConsoleController.ConsoleAction action = ServiceConsoleController.loadCaseAction(supportCase.Id);

        System.assertEquals(false, action.escalationRequired);
        System.assertEquals('Product Support', action.ownerQueue);
    }
}
