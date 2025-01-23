export interface TranscriptPayload {
	// id: string;
	firstName: string;
	lastName: string;
	course: string;
	graduationYear: string;
	address: string;
	zipCode: string;
	requester: string;
	destinationNumber: string;
	city: string;
	matricNo: string;
	institution?: string;
	amount?: string;
	email?: string;
	destination?: string;
}

export interface AddVerificationPayload {
	firstName: string;
	lastName: string;
	instituteCharge: string;
	requester: string;
	ourCharge: string;
	middleName: string;
	certImage: string;
	email: string;
	dateOfBirth: string;
	course: string;
	studentId: string;
	qualification: string;
	classification: string;
	admissionYear: string;
	graduationYear: string;
	enrollmentStatus: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	institution: any;
	date: string;
}
export interface ConfirmVerification {
	firstName: string;
	lastName: string;
	instituteCharge: string;
	requester: string;
	ourCharge: string;
	middleName: string;
	certImage: string;
	email: string;
	dateOfBirth: string;
	course: string;
	studentId: string;
	qualification: string;
	classification: string;
	admissionYear: string;
	graduationYear: string;
	enrollmentStatus: boolean;

	date: string;
}

export interface IMessage {
	message: string;
	subject: string;
	dateTime: Date;
	id: string;
}
