export interface ExperienceProfileModel {
    id:           string;
    userId:       string;
    posisi:       string;
    companyName:  string;
    startDate:    Date;
    endDate:      Date;
    lengthOfWork: number;
    deskripsi:    string;
    created_at:   Date;
    updated_at:   Date;
}