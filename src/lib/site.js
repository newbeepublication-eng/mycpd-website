// Where the myCPD app lives. Override with the PUBLIC_APP_URL environment variable if needed.
export const APP_URL = (import.meta.env.PUBLIC_APP_URL || 'https://app.mycpd.ie').replace(/\/$/, '');
export const SITE_NAME = 'myCPD.ie';
export const BASE44_APP_ID = '6880f4b195332c6510415675';
export const BASE44_API = `https://base44.app/api/apps/${BASE44_APP_ID}`;

export const links = {
  signIn: `${APP_URL}/signin`,
  startTrial: `${APP_URL}/signin`,
  teamTrial: `${APP_URL}/signinteam`,
  leaveReview: `${APP_URL}/leavereview`,
  invite: `${APP_URL}/Referrals`,
};

export const CONTACT_EMAIL = 'info@newbeepublication.com';
