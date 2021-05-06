const portalApiHostV1 = `/portalapi/api/1`;

export default {
  user: {
    profileInfo: `${portalApiHostV1}/auth/portal_profile_info`,
    getUserGroups: `${portalApiHostV1}/user_group/get_user_groups`,
  },
};
