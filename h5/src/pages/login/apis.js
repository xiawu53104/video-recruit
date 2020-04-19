import axios from '../../service/axios';

export const getImgCode = async (eq) => {
  let res = await axios({
    url: `/base/verificationCode/code.do?eq=${eq}`,
    data: {
      eq
    }
  });
  return res;
}

export const getSmsCode = async ({mobile, code, eq}) => {
  let res = await axios({
    url: `/interview/smsVerificationCode/sendLoginSms.do?mobile=${mobile}&code=${code}&eq=${eq}`,
  });
  return res;
}

export const doLogin = async ({mobile, smsCode}) => {
  let res = await axios({
    url: `/interview/user/login.do?mobile=${mobile}&smsCode=${smsCode}`
  });
  return res;
}
