import { PortofolioDocumentModel } from "./portofolio-document-model";

export class ProfilePortofolioModel {
    status:   string = "";
    message:  string = "";
    document: PortofolioDocumentModel[] = [];
    link:     PortofolioDocumentModel[] = [];
}
