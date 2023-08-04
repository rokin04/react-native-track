import reduxAction from "./action";
import { initialState } from "./initialState";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxAction.ADD_GROUP_PERSON:
      return { ...state, settingGroupGoal: action.payload };
    case reduxAction.DEL_GROUP_PERSON:
      return {
        ...state,
        settingGroupGoal: state.settingGroupGoal.filter((data) => {
          return data.email !== action.payload;
        }),
      };
    case reduxAction.MAKE_SETTING_GOAL_NULL:
      return { ...state, settingGroupGoal: action.payload };
    case reduxAction.USER_DATA:
      return { ...state, userDetails: action.payload };
    case reduxAction.UPDATE_USER_DATE_OF_BIRTH:
      return { ...state, userDateOfBirth: action.payload };
    case reduxAction.DISPLAY_USER_D0B:
      return { ...state, displayDOB: action.payload };
    case reduxAction.ADD_INTREST:
      return { ...state, userDetails: action.payload };
    case reduxAction.ADD_EMAIL_AFTER_LOGIN:
      return { ...state, userEmail: action.payload };
    case reduxAction.UPDATE_ACHIEVER_GOAL_AREA_DATA:
      return { ...state, achieverGoalAreaData: action.payload };
    case reduxAction.UPDATE_INFLUENCER_GOAL_AREA_DATA:
      return { ...state, influencerGoalAreaData: action.payload };
    case reduxAction.UPDATE_GOAL_ID:
      return { ...state, goalId: action.payload };
    case reduxAction.SHARE_GOAL_ID:
      return { ...state, sharegoalId: action.payload };
    case reduxAction.UPDATE_GOAL_SUMMARY_DATA:
      return { ...state, goalSummaryData: action.payload };
    case reduxAction.DISPLAY_STARTDATE:
      return { ...state, displayStartDate: action.payload };
    case reduxAction.DISPLAY_TARGETDATE:
      return { ...state, displayEndDate: action.payload };
    case reduxAction.UPDATE_ROLE_NAME:
      return { ...state, roleName: action.payload };
    case reduxAction.UPDATE_GOAL_PROGRESS:
      return { ...state, goalProgress: action.payload };
    case reduxAction.UPDATE_DIALOGBOX_OPTIONS_INFLUENCER:
      return { ...state, goalDialogueOptionsForInfluencer: action.payload };
    case reduxAction.GOALPROGRESS:
      return { ...state, goalProgress: action.payload };
    case reduxAction.ADD_FORGOT_PASSWORD_VALUES:
      return { ...state, forgotPassword: action.payload };
    case reduxAction.UPDATE_NDIS_AGREEMENT:
      return { ...state, showNdisAgreement: action.payload };
    case reduxAction.UPDATE_TERMS_AND_CONDITIONS:
      return { ...state, showTermsNConditions: action.payload };
    case reduxAction.CONFLICT_OF_INTEREST:
      return { ...state, showConflictOfInterest: action.payload };
    case reduxAction.UPDATE_TERMS_AND_CONDITIONS_SIGN:
      return { ...state, ndisTCSigned: action.payload };
    case reduxAction.UPDATE_NDIS_AGREEMENT_SIGN:
      return { ...state, ndisAgreementSigned: action.payload };
    case reduxAction.SHOW_NDIS_CONFIRMATION:
      return { ...state, showConfirmationDialog: action.payload };
    case reduxAction.SET_ROLEID:
      return { ...state, roleId: action.payload };
    default:
      return { ...state };
  }
};

export default reducer;
