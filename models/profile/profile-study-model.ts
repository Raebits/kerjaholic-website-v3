export interface StudyProfileModel {
    id:          string;
    userId:      string;
    strata:      string;
    major:       string;
    year:        string;
    year_to:     string;
    institution: string;
    sequence:    number;
    created_at:  string;
    updated_at:  Date;
    strataId:    string;
}