export const initialState = {
    settingGroupGoal: [{ groupName: null, name: null, email: null }],

    settingmilestonedata: [{milestonename: null,milestonedesc: null,milestonestartdate: null,milestoneenddate: null,milestonecelebration: null,milestoneprogress:null}],

    settingFamilyData: [{peoplefirstname: null,peoplelastname: null, peopleemail: null, peoplephno: null, reasontoshare1: null, peoplerole: null, peoplepermissions: null}],

    settingReviewerData: [{reviewerfirstname: null, reviewerlastname: null, revieweremail: null, reviewerphno: null, reasontoshare2: null}],
    
    userDetails: [],
    userEmail: null,
    influencerGoalAreaData: {},
    achieverGoalAreaData: {},
    goalId: null,
    roleId: null,
    sharegoalId: null,

    milestonedata:{
      milestonename:"",
      milestonedesc:"",
      milestonestartdate:"",
      milestoneenddate:"",
      milestonecelebration:"",
      milestoneprogress:""
    },

    shareFamilyData:{
      peoplefirstname:"",
      peoplelastname:"",
      peopleemail:"",
      peoplephno:"",
      reasontoshare1:"",
      peoplerole:"",
      peoplepermissions:""
    },

    shareReviewerData:{
      reviewerfirstname:"",
      reviewerlastname:"",
      revieweremail:"",
      reviewerphno:"",
      reasontoshare2:""
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
    goalDialogueOptionsForInfluencer: [],
    roleName: "",
    userCurrentPage: "",
    forgotPassword: [],
    showNdisAgreement: false,
    showTermsNConditions: false,
    ndisAgreementSigned: false,
    ndisTCSigned: false,
    showConflictOfInterest: false,
    showConfirmationDialog: {show: false, text: '', onOkClick: ''},

    expectedoutcome:"",
  };
