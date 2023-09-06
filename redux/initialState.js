export const initialState = {
  settingGroupGoal: [{ groupName: null, name: null, email: null }],
  settingmilestonedata: {
    breakdown: 0,
    expectedOutcome: "",
    goalId: 2183,
    milestone: [],
  },

  ShareGoalData: {
    family: {
      familyColleagueList: [],
    },
    goalId: 2184,
    reviewer: {
      parametersToReview: [],
      reviewerList: [],
    },
    shareGoalTo: 2,
  },

  settingFamilyData: [],

  settingReviewerData: [],

  parameterdata: [
    {
      id: 1,
      frequency: "",
      proofOfProgress: "",
      parameter: "Basic Needs (food, water, air, rest etc)",
    },
    {
      id: 2,
      frequency: "",
      proofOfProgress: "",
      parameter: "Security and Stability (home and personal safety)",
    },
    {
      id: 3,
      frequency: "",
      proofOfProgress: "",
      parameter: "Love and Belonging (relationships)",
    },
    { id: 4, frequency: "", proofOfProgress: "", parameter: "Esteem" },
    {
      id: 5,
      frequency: "",
      proofOfProgress: "",
      parameter: "Self Actualisation",
    },
  ],

  userDetails: [],
  userEmail: null,
  influencerGoalAreaData: {},
  achieverGoalAreaData: {},
  goalId: null,
  roleId: null,
  sharegoalId: null,

  milestonedata: {
    milestonename: "",
    milestonedesc: "",
    milestonestartdate: "",
    milestoneenddate: "",
    milestonecelebration: "",
  },

  shareFamilyData: {
    peoplefirstname: "",
    peoplelastname: "",
    peopleemail: "",
    peoplephno: "",
    reasontoshare1: "",
    peoplerole: "",
    peoplepermissions: "",
  },

  shareReviewerData: {
    reviewerfirstname: "",
    reviewerlastname: "",
    revieweremail: "",
    reviewerphno: "",
    reasontoshare2: "",
  },

  goalSummaryData: {
    dummyData: "",
    goalPriority: "",
    goalTitle: "",
    goalArea: "",
    goalAreaList: false,
    goalSubTypeList: "",
    chooseGoalArea: "",
    enterGoalArea: "",
    goalFor: "",
    goalSelectedSubType: "",
    groupName: "",
    name: "",
    email: "",
    goalType: "",
    recurring: "",
    startDate: null,
    targetDate: null,
    goalDescription: "",
    goalSelectedSubOption: "",
  },

  goalSummaryDataCollection:[],

  goalDialogueOptionsForInfluencer: [],
  roleName: "",
  userCurrentPage: "",
  forgotPassword: [],
  showNdisAgreement: false,
  showTermsNConditions: false,
  ndisAgreementSigned: false,
  ndisTCSigned: false,
  showConflictOfInterest: false,
  showConfirmationDialog: { show: false, text: "", onOkClick: "" },

  expectedoutcome: "",
};
