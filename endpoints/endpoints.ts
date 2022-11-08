import { baseUrl } from "../constant/base-url";

export const GetArticles_EndPoints = baseUrl + "ads_v21"
export const GetDetailArticle_EndPoints = baseUrl + "article/detail"
export const GetAllArticle_EndPoints = baseUrl + "article/list"
export const ReactionToArticle_EndPoints = baseUrl + "article/reaction"
export const GetDetailSosmed_EndPoints = baseUrl + "social/feed/public/detail"
export const GetListSosmed_EndPoints = baseUrl + ""
export const PostLoveStatus_EndPoints = baseUrl + ""
export const GetDetailProfile_EndPoints = baseUrl + "social/profile/public/user"
export const GetListStatusProfile_EndPoints = baseUrl + "social/feed/public/list"
export const GetListTestimoniProfile_EndPoints = baseUrl + "social/testimony/public/list"
export const GetDetailJob_EndPoints = baseUrl + "job/detailV2"
export const GetDetailProject_EndPoints = baseUrl + "pm/share/project/detail"

export const ConvertImageToBase64_EndPoints = baseUrl + "social/meta/image"

// Auth
export const LoginEmail_EndPoints = baseUrl + "auth/loginV2"
export const RegisterEmail_EndPoints = baseUrl + "auth/signupV4"
export const AuthWithProvider_EndPoints = baseUrl + "auth/googleV4"
export const SaveProfessionAuth_EndPoints = baseUrl + "training/save/profession"
export const ForgotPassword_EndPoints = baseUrl + "iForgotMyPassword"
export const UserCheckAuth_EndPoints = baseUrl + "user/checkAuth"

// Profile
export const DataProfileUser_EndPoints = baseUrl + "user/updateDevice"
export const ProfileCV_EndPoints = baseUrl + "user/profile/cv"
export const ProfileFreelance_EndPoints = baseUrl + "user/profile/freelance"
export const ProfilePortofolio_EndPoints = baseUrl + "user/get/portofolio"
export const UpdateProfileBiodata_EndPoints = baseUrl + "user/profile/freelance/update"
export const UpdateProfileCV_EndPoints = baseUrl + "user/profile/cv/update"
export const VerifyKTP_EndPoints = baseUrl + "user/verify/accountV2"
export const UpdateLanguage_EndPoints = baseUrl + "user/language"
export const UserLogout_EndPoints = baseUrl + "user/setLogout"

// begin colaboration
// == project module ==
export const GetListProject_EndPoints = baseUrl + "pm/list/project"
export const AddProject_EndPoints = baseUrl + "pm/create/project"
// == task module ==
export const GetListTask_EndPoints = baseUrl + "pm/task/list"
// == global module
export const GetListColor_EndPoints = baseUrl + "pm/list/color"
// end of collaboration

// global
export const GetListCity_EndPoints = baseUrl + "City"