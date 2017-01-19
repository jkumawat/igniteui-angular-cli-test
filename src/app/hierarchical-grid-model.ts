export class TeamGridModel {
    assignments: Array<TeamAssignmentModel> = new Array<TeamAssignmentModel>();
    roleName: string;
    roleId: number;

    constructor() { }
}


export class TeamAssignmentModel {
    userName: string;
    name: string;
    surName: string;
    givenName: string;
    department: string;

    constructor(assignmentID: number) {
        this.userName = 'User name ' + assignmentID;
        this.name = 'Name ' + assignmentID;
        this.surName = 'Surname ' + assignmentID;
        this.givenName = 'Given name ' + assignmentID;
        this.department = 'Department ' + assignmentID;
    }
}