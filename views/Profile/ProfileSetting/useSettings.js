import { useEffect } from "react";
import { useSelector } from "react-redux";
import { HOST } from "../../../constants/Host-URL";
import reduxAction from "../../../redux/action";

const useSettings = (dispatch) => {
  // const userEmail = useSelector((state) => state.userEmail || "");
  const userEmail = 'roshan.b@giglabz.com'
  const userDetails = useSelector((state) => state.userDetails || "");
  // const roleId = useSelector((state) => state.roleId || "");
  const roleId = 1
  const getUserDetails = async () => {
    let data;
    // await fetch(`${HOST}:8080/api/userprofile/get/${userEmail}/${roleId}`, {
    await fetch(`${HOST}:8080/api/userprofile/get/roshan.b@giglabz.com/1`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) =>
      res.json().then((result) => {
        data = result;
        if (roleId === 4) {
          result && dispatch({ type: reduxAction.USER_DATA, payload: result.provider });
        } else {
          result && dispatch({ type: reduxAction.USER_DATA, payload: result.participant });
        }
        result &&
          dispatch({
            type: reduxAction.UPDATE_ROLE_NAME,
            payload: result.role_name,
          });
      })
    );
    return data;
  };

  const handleOnNdisDialog = (dialogFor) => {
    if (dialogFor === 'ndis') {
      dispatch({ type: reduxAction.UPDATE_NDIS_AGREEMENT, payload: true });
    } else if (dialogFor === 'tc') {
      dispatch({ type: reduxAction.UPDATE_TERMS_AND_CONDITIONS, payload: true });
    }
    dispatch({ type: reduxAction.SHOW_NDIS_CONFIRMATION, payload: {show: false, text: '', onOkClick: ''} });
  }
  
  useEffect(() => {
    if (userEmail && roleId) {
      getUserDetails();
    }
  }, [userEmail, roleId]);

  useEffect(() => {
    if (userDetails && userDetails.ndisAgreement === 0 && userDetails.roleId === 1) {
      dispatch({ type: reduxAction.SHOW_NDIS_CONFIRMATION, payload: {show: true, text: 
        <h4>Please complete the <strong style={{fontSize: '14px'}}>NDIS</strong> declaration form</h4>
        , onOkClick: () => handleOnNdisDialog('ndis')} });
      dispatch({ type: reduxAction.UPDATE_NDIS_AGREEMENT_SIGN, payload: false });
      if (userDetails && userDetails.ndisTc === 0) {
        dispatch({ type: reduxAction.UPDATE_TERMS_AND_CONDITIONS_SIGN, payload: false });
      }
    } else if (userDetails && userDetails.ndisTc === 0) {
      dispatch({ type: reduxAction.SHOW_NDIS_CONFIRMATION, payload: {show: true, text: 
        <h4>Please complete <strong style={{fontSize: '14px'}}>Terms and Conditions</strong></h4>
        , onOkClick: () => handleOnNdisDialog('tc')} });
      dispatch({ type: reduxAction.UPDATE_TERMS_AND_CONDITIONS_SIGN, payload: false });
      if (userDetails && userDetails.ndisAgreement === 0) {
      
        dispatch({ type: reduxAction.UPDATE_NDIS_AGREEMENT_SIGN, payload: false });
      }
    }
    if (userDetails && userDetails.ndisAgreement === 1) {
 
      dispatch({ type: reduxAction.UPDATE_NDIS_AGREEMENT_SIGN, payload: true });
    }
    if (userDetails && userDetails.ndisTc === 1) {
      dispatch({ type: reduxAction.UPDATE_TERMS_AND_CONDITIONS_SIGN, payload: true });
    }
    if (userDetails && userDetails.ndisTc === -1) {
      dispatch({ type: reduxAction.UPDATE_TERMS_AND_CONDITIONS_SIGN, payload: false });
    }
    if (userDetails && userDetails.ndisAgreement === -1) {
     
      dispatch({ type: reduxAction.UPDATE_NDIS_AGREEMENT_SIGN, payload: false });
    }
    // if (userDetails && userDetails.ServiceAgreement === 1) {
    //   dispatch({ type: reduxAction.SERVICE_AGREEMENT, payload: true });
    // }
    // if (userDetails && userDetails.ServiceAgreement === 0) {
 
    //   dispatch({ type: reduxAction.SERVICE_AGREEMENT, payload: false });
    // }
  }, [userDetails]);

  return { getUserDetails };
};

export default useSettings;
